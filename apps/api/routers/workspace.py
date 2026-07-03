import subprocess, json, sys
from pathlib import Path
from fastapi import APIRouter, HTTPException
from models.request_models import WorkspaceRequest

router = APIRouter()
CLI_PATH = Path(__file__).parent.parent.parent.parent / "packages/workspace-gen/src/index.ts"

@router.post("/workspace")
async def generate_workspace(req: WorkspaceRequest):
    try:
        result = subprocess.run(
            ["npx", "tsx", str(CLI_PATH), json.dumps(req.graph), req.target_path],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)
        return {"success": True, "message": result.stdout.strip()}
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="Workspace generation timed out")
