import subprocess, json, tempfile, os, time, base64, shutil, asyncio
import httpx
from typing import List, Optional
from pydantic import BaseModel
from pathlib import Path
from dependencies import get_current_user
from fastapi import APIRouter, HTTPException, Depends, Request
from models.request_models import WorkspaceRequest, PushToGithubRequest, GenerateBoilerplateRequest, GenerateBoilerplateResponse, PushBoilerplateRequest
import uuid
from services.openai_service import generate_agent_briefing, generate_architecture_doc, generate_readme_doc, generate_root_boilerplate, generate_node_boilerplate

router = APIRouter()
CLI_PATH = Path(__file__).parent.parent.parent.parent / "packages/workspace-gen/src/index.ts"

# Rate Limiting: 5 pushes per minute per user
RATE_LIMITS = {}

def check_rate_limit(user_id: str):
    now = time.time()
    if user_id not in RATE_LIMITS:
        RATE_LIMITS[user_id] = []
    # filter timestamps older than 60 seconds
    RATE_LIMITS[user_id] = [t for t in RATE_LIMITS[user_id] if now - t < 60]
    if len(RATE_LIMITS[user_id]) >= 5:
        raise HTTPException(status_code=429, detail="Rate limit exceeded. Maximum 5 pushes per minute.")
    RATE_LIMITS[user_id].append(now)

router = APIRouter()
CLI_PATH = Path(__file__).parent.parent.parent.parent / "packages/workspace-gen/src/index.ts"

@router.post("/workspace")
async def generate_workspace(
    req: WorkspaceRequest,
    user: dict = Depends(get_current_user)
):
    temp_file = Path(tempfile.gettempdir()) / f"isostack_graph_{os.getpid()}.json"
    temp_file.write_text(json.dumps(req.graph), encoding="utf-8")
    
    npx_cmd = "npx.cmd" if os.name == "nt" else "npx"
    cli_dir = CLI_PATH.parent.parent
    try:
        result = subprocess.run(
            [npx_cmd, "tsx", str(CLI_PATH), str(temp_file), req.target_path],
            capture_output=True, text=True, timeout=30, cwd=str(cli_dir)
        )
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)
        return {"success": True, "message": result.stdout.strip()}
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="Workspace generation timed out")
    finally:
        if temp_file.exists():
            temp_file.unlink()

# ============================================
# MODELS
# ============================================

class RepositoryItem(BaseModel):
    id: int
    name: str
    url: str
    description: Optional[str]
    is_private: bool

class RepositoriesResponse(BaseModel):
    repos: List[RepositoryItem]

class CreateBranchRequest(BaseModel):
    repo_name: str
    branch_name: str

# ============================================
# ENDPOINT: Get User's GitHub Repositories
# ============================================

@router.get("/github/user-repos", response_model=RepositoriesResponse)
async def get_user_repos(
    request: Request,
    user: dict = Depends(get_current_user)
):
    """
    Fetch authenticated user's GitHub repositories.
    
    Returns list of repos the user can push to.
    Requires user to be authenticated with GitHub OAuth.
    
    Raises:
        401: User not authenticated with GitHub
        500: GitHub API error or network failure
    """
    
    try:
        user_id = user.get("sub") or user.get("id")
        
        if not user_id:
            raise HTTPException(
                status_code=401,
                detail="User not authenticated"
            )
        
        supabase_url = os.environ.get("SUPABASE_URL")
        supabase_key = os.environ.get("SUPABASE_ANON_KEY")
        auth_header = request.headers.get("Authorization")
        
        # Get stored token from Supabase
        async with httpx.AsyncClient() as client:
            db_res = await client.get(
                f"{supabase_url}/rest/v1/user_github_tokens?user_id=eq.{user_id}&select=token,github_username",
                headers={"apikey": supabase_key, "Authorization": auth_header}
            )
            data = db_res.json()
            if not data or len(data) == 0:
                raise HTTPException(
                    status_code=401,
                    detail="Please log in with GitHub to access this feature"
                )
            
            token = data[0]["token"]
        
    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"GitHub authentication token not found. Please log in again. {str(e)}"
        )
    
    try:
        # Call GitHub API to list repos
        async with httpx.AsyncClient() as client:
            response = await client.get(
                'https://api.github.com/user/repos',
                headers={
                    'Authorization': f'token {token}',
                    'Accept': 'application/vnd.github.v3+json'
                },
                params={
                    'per_page': 100,
                    'sort': 'updated',
                    'direction': 'desc'
                },
                timeout=10.0
            )
        
        if response.status_code == 401:
            raise HTTPException(
                status_code=401,
                detail="GitHub token expired or invalid. Please log in again."
            )
        
        if response.status_code == 403:
            raise HTTPException(
                status_code=403,
                detail="Access denied. Check GitHub token permissions."
            )
        
        if response.status_code != 200:
            raise HTTPException(
                status_code=500,
                detail=f"GitHub API error: {response.status_code}"
            )
        
        repos = response.json()
        
        # Transform to our schema
        repo_list = [
            RepositoryItem(
                id=r['id'],
                name=r['name'],
                url=r['clone_url'],
                description=r['description'],
                is_private=r['private']
            )
            for r in repos
        ]
        
        return RepositoriesResponse(repos=repo_list)
        
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="GitHub API request timed out. Try again."
        )
    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=500,
            detail=f"Failed to fetch repositories: {str(e)}"
        )

@router.get("/github/branches")
async def get_branches(request: Request, repo: str, user: dict = Depends(get_current_user)):
    """
    Fetch all branches for a GitHub repository.
    """
    try:
        user_id = user.get("sub") or user.get("id")
        
        token_record = supabase.table('user_github_tokens') \
            .select('token, github_username') \
            .eq('user_id', str(user_id)) \
            .single() \
            .execute()
            
        token = token_record.data['token']
        github_username = token_record.data['github_username']
    except Exception as e:
        # Fallback to httpx if supabase client not available
        supabase_url = os.environ.get("SUPABASE_URL")
        supabase_key = os.environ.get("SUPABASE_ANON_KEY")
        auth_header = request.headers.get("Authorization")
        
        async with httpx.AsyncClient() as client:
            db_res = await client.get(
                f"{supabase_url}/rest/v1/user_github_tokens?user_id=eq.{user.get('sub') or user.get('id')}&select=token,github_username",
                headers={"apikey": supabase_key, "Authorization": auth_header}
            )
            data = db_res.json()
            if not data or len(data) == 0:
                raise HTTPException(status_code=401, detail="Not authenticated")
            
            token = data[0]["token"]
            github_username = data[0]["github_username"]
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f'https://api.github.com/repos/{github_username}/{repo}/branches',
                headers={
                    'Authorization': f'token {token}',
                    'Accept': 'application/vnd.github.v3+json'
                },
                params={'per_page': 100},
                timeout=10.0
            )
        
        if response.status_code == 401:
            raise HTTPException(status_code=401, detail="Token invalid")
        
        if response.status_code == 404:
            raise HTTPException(status_code=404, detail="Repository not found")
        
        if response.status_code != 200:
            raise HTTPException(status_code=500, detail=f"GitHub API error: {response.status_code}")
        
        branches = response.json()
        branch_list = [
            {'name': b['name'], 'protected': b['protected']} for b in branches
        ]
        
        return {'branches': branch_list}
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch branches: {str(e)}")

@router.post("/github/create-branch")
async def create_branch(request: Request, payload: CreateBranchRequest, user: dict = Depends(get_current_user)):
    """
    Create a new branch in user's GitHub repository.
    """
    try:
        user_id = user.get("sub") or user.get("id")
        
        token_record = supabase.table('user_github_tokens') \
            .select('token, github_username') \
            .eq('user_id', str(user_id)) \
            .single() \
            .execute()
            
        token = token_record.data['token']
        github_username = token_record.data['github_username']
    except Exception as e:
        supabase_url = os.environ.get("SUPABASE_URL")
        supabase_key = os.environ.get("SUPABASE_ANON_KEY")
        auth_header = request.headers.get("Authorization")
        
        async with httpx.AsyncClient() as client:
            db_res = await client.get(
                f"{supabase_url}/rest/v1/user_github_tokens?user_id=eq.{user.get('sub') or user.get('id')}&select=token,github_username",
                headers={"apikey": supabase_key, "Authorization": auth_header}
            )
            data = db_res.json()
            if not data or len(data) == 0:
                raise HTTPException(status_code=401, detail="Not authenticated")
            
            token = data[0]["token"]
            github_username = data[0]["github_username"]
    
    if not payload.branch_name or not payload.branch_name.strip():
        raise HTTPException(status_code=400, detail="Branch name cannot be empty")
    
    import re
    if not re.match(r'^[a-zA-Z0-9/_-]+$', payload.branch_name):
        raise HTTPException(
            status_code=400, 
            detail="Invalid branch name. Use alphanumeric characters, hyphens, underscores, or forward slashes."
        )
    
    try:
        async with httpx.AsyncClient() as client:
            branches_response = await client.get(
                f'https://api.github.com/repos/{github_username}/{payload.repo_name}/branches',
                headers={
                    'Authorization': f'token {token}',
                    'Accept': 'application/vnd.github.v3+json'
                },
                timeout=10.0
            )
            
            if branches_response.status_code != 200:
                raise HTTPException(status_code=500, detail="Failed to get branches")
            
            branches = branches_response.json()
            if not branches:
                raise HTTPException(status_code=400, detail="Repository has no branches")
            
            main_branch = next((b for b in branches if b['name'] == 'main'), branches[0])
            sha = main_branch['commit']['sha']
            
            create_response = await client.post(
                f'https://api.github.com/repos/{github_username}/{payload.repo_name}/git/refs',
                headers={
                    'Authorization': f'token {token}',
                    'Accept': 'application/vnd.github.v3+json'
                },
                json={
                    'ref': f'refs/heads/{payload.branch_name}',
                    'sha': sha
                },
                timeout=10.0
            )
            
            if create_response.status_code == 422:
                raise HTTPException(status_code=409, detail=f"Branch '{payload.branch_name}' already exists")
            
            if create_response.status_code not in [200, 201]:
                raise HTTPException(status_code=500, detail="Failed to create branch")
            
            return {
                'status': 'success',
                'message': f'Branch "{payload.branch_name}" created',
                'branch_name': payload.branch_name
            }
        
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to create branch: {str(e)}")

@router.post("/generate-boilerplate", response_model=GenerateBoilerplateResponse)
async def generate_boilerplate(
    req: GenerateBoilerplateRequest,
    user: dict = Depends(get_current_user)
):
    check_rate_limit(user.get("id", user.get("sub")))
    
    generation_id = str(uuid.uuid4())
    temp_dir = Path(tempfile.gettempdir()) / f"isostack_gen_{generation_id}"
    temp_dir.mkdir(parents=True, exist_ok=True)
    
    graph_file = temp_dir / "graph.json"
    graph_file.write_text(json.dumps(req.graph_data), encoding="utf-8")
    
    npx_cmd = "npx.cmd" if os.name == "nt" else "npx"
    cli_dir = CLI_PATH.parent.parent
    
    result = subprocess.run(
        [npx_cmd, "tsx", str(CLI_PATH), str(graph_file), str(temp_dir)],
        capture_output=True, text=True, timeout=30, cwd=str(cli_dir)
    )
    if result.returncode != 0:
        raise HTTPException(status_code=500, detail="Workspace skeleton generation failed: " + result.stderr)

    if req.png_data and req.png_data.startswith("data:image/png;base64,"):
        try:
            (temp_dir / "architecture.png").write_bytes(base64.b64decode(req.png_data.split(",")[1]))
        except: pass 

    try:
        root_bp = await generate_root_boilerplate(req.graph_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Phase 1 shared-schema generation failed: {str(e)}")

    for f in root_bp.files:
        p = temp_dir / f.path
        p.parent.mkdir(parents=True, exist_ok=True)
        p.write_text(f.content, encoding="utf-8")
    
    shared_content = []
    for f in root_bp.files:
        if f.path.startswith("shared/") or f.path.startswith("common/"):
            shared_content.append(f"--- {f.path} ---\n{f.content}")
    shared_schemas = "\n".join(shared_content)

    max_concurrency = int(os.environ.get("MAX_CONCURRENT_LLM_CALLS", "4"))
    sem = asyncio.Semaphore(max_concurrency)
    
    nodes = req.graph_data.get("nodes", [])
    gap_report_lines = list(root_bp.decisions_needed)
    
    success_count = 0
    validation_errors = []

    async def process_node(node):
        nonlocal success_count
        async with sem:
            try:
                node_bp = await generate_node_boilerplate(node, req.graph_data, shared_schemas)
                for f in node_bp.files:
                    p = temp_dir / f.path
                    p.parent.mkdir(parents=True, exist_ok=True)
                    p.write_text(f.content, encoding="utf-8")
                gap_report_lines.extend(node_bp.decisions_needed)
                
                env_file = next((f for f in node_bp.files if "env" in f.path.lower()), None)
                main_file = next((f for f in node_bp.files if "main" in f.path.lower() or "index" in f.path.lower() or "app" in f.path.lower()), None)
                if main_file and env_file:
                    import re
                    env_usages = re.findall(r'(?:os\.environ\.get|process\.env\.)\??\[?[\'"]?([A-Z0-9_]+)', main_file.content)
                    for eu in set(env_usages):
                        if eu not in env_file.content:
                            validation_errors.append(f"Node '{node.get('label')}' uses {eu} but it is missing from its .env.example")
                success_count += 1
            except Exception as e:
                gap_report_lines.append(f"Node '{node.get('label')}' failed LLM generation and fell back to static skeleton. Error: {str(e)}")

    await asyncio.gather(*(process_node(n) for n in nodes))
    
    arch_md, agent_briefing, readme_md = await asyncio.gather(
        generate_architecture_doc(req.graph_data),
        generate_agent_briefing(req.graph_data),
        generate_readme_doc(req.graph_data)
    )
    (temp_dir / "architecture.md").write_text(arch_md, encoding="utf-8")
    (temp_dir / "agent_briefing.md").write_text(agent_briefing, encoding="utf-8")
    (temp_dir / "README.md").write_text(readme_md, encoding="utf-8")
    
    dc_path = temp_dir / "docker-compose.yml"
    if dc_path.exists():
        import yaml
        try:
            dc_data = yaml.safe_load(dc_path.read_text())
            services = dc_data.get("services", {})
            node_labels = [n.get("label", "").lower() for n in nodes]
            for srv_name in services.keys():
                if not any(nl in srv_name.lower() or srv_name.lower() in nl for nl in node_labels):
                    validation_errors.append(f"docker-compose.yml references unknown service '{srv_name}'")
        except: pass

    gap_content = "# Gap Report & Decisions Needed\n\n"
    if validation_errors:
        gap_content += "## Validation Errors\n" + "\n".join(f"- {e}" for e in validation_errors) + "\n\n"
    gap_content += "## AI Decisions & Missing Items\n" + "\n".join(f"- {g}" for g in gap_report_lines if g.strip())
    
    (temp_dir / "gap_report.md").write_text(gap_content, encoding="utf-8")

    return GenerateBoilerplateResponse(
        generation_id=generation_id,
        gap_report=gap_content,
        success_ratio=f"{success_count}/{len(nodes)}"
    )

@router.post("/push-boilerplate")
async def push_boilerplate(
    request: Request,
    req: PushBoilerplateRequest,
    user: dict = Depends(get_current_user)
):
    check_rate_limit(user.get("id", user.get("sub")))
    
    supabase_url = os.environ.get("SUPABASE_URL")
    supabase_key = os.environ.get("SUPABASE_ANON_KEY")
    auth_header = request.headers.get("Authorization")
    
    async with httpx.AsyncClient() as client:
        db_res = await client.get(
            f"{supabase_url}/rest/v1/user_github_tokens?user_id=eq.{user.get('sub') or user.get('id')}&select=token,github_username",
            headers={"apikey": supabase_key, "Authorization": auth_header}
        )
        data = db_res.json()
        if not data or len(data) == 0:
            raise HTTPException(status_code=401, detail="GitHub token not found. Please log in with GitHub.")
        
        token = data[0]["token"]
        github_username = data[0]["github_username"]

    target_path = Path(tempfile.gettempdir()) / f"isostack_gen_{req.generation_id}"
    if not target_path.exists():
        raise HTTPException(status_code=404, detail="Generation session not found or expired.")
        
    try:
        auth_repo_url = f"https://{github_username}:{token}@github.com/{github_username}/{req.repo_name}.git"
        branch_name = req.branch_name
        
        subprocess.run(["git", "init"], cwd=str(target_path), check=True)
        subprocess.run(["git", "add", "."], cwd=str(target_path), check=True)
        
        status_res = subprocess.run(["git", "status", "--porcelain"], cwd=str(target_path), capture_output=True, text=True)
        if not status_res.stdout.strip():
            raise HTTPException(status_code=400, detail="No files generated to push.")
            
        subprocess.run(["git", "config", "user.name", "IsoStack AI"], cwd=str(target_path), check=True)
        subprocess.run(["git", "config", "user.email", "ai@isostack.io"], cwd=str(target_path), check=True)
        subprocess.run(["git", "commit", "-m", "Updated project via AI Boilerplate Generator"], cwd=str(target_path), check=True)
        
        subprocess.run(["git", "branch", "-M", branch_name], cwd=str(target_path), check=True)
        subprocess.run(["git", "remote", "add", "origin", auth_repo_url], cwd=str(target_path), check=True)
        subprocess.run(["git", "pull", "origin", branch_name, "--allow-unrelated-histories", "--no-edit"], cwd=str(target_path), capture_output=True, text=True)
        
        push_res = subprocess.run(["git", "push", "-u", "origin", branch_name], cwd=str(target_path), capture_output=True, text=True)
        if push_res.returncode != 0:
            err_msg = push_res.stderr.replace(token, "***")
            raise HTTPException(status_code=400, detail="Failed to push to GitHub. Git error: " + err_msg)

        return {
            "status": "success", 
            "message": f"Successfully pushed to {req.repo_name}!",
            "repo_url": f"https://github.com/{github_username}/{req.repo_name}"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        shutil.rmtree(target_path, ignore_errors=True)