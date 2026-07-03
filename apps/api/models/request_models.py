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

class PushToGithubRequest(BaseModel):
    repo_name: str
    branch_name: str
    graph_data: dict
    png_data: Optional[str] = None

class GenerateBoilerplateRequest(BaseModel):
    graph_data: dict
    png_data: Optional[str] = None

class GenerateBoilerplateResponse(BaseModel):
    generation_id: str
    gap_report: str
    success_ratio: str

class PushBoilerplateRequest(BaseModel):
    generation_id: str
    repo_name: str
    branch_name: str

class ChatMessage(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    context_data: Optional[str] = None
