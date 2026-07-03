from pydantic import BaseModel
from typing import Optional

class GenerateRequest(BaseModel):
    prompt: str
    existing_node_ids: Optional[list[str]] = None

class DescribeNodeRequest(BaseModel):
    node_type: str
    label: str
    project_context: str

class WorkspaceRequest(BaseModel):
    graph: dict           # the full ArchGraph as raw dict
    target_path: str      # absolute local path
