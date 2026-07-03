import subprocess, json, tempfile, os
from pathlib import Path
from dependencies import get_current_user
from fastapi import APIRouter, HTTPException, Depends
from models.request_models import WorkspaceRequest

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
