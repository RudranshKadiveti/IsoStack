from fastapi import APIRouter, HTTPException
from models.request_models import GenerateRequest, DescribeNodeRequest
from models.arch_schema import ArchGraph
from services.openai_service import generate_architecture
from services.layout_service import resolve_grid_collisions

from openai import AsyncOpenAI
from pydantic import BaseModel as PydanticBase
import os

router = APIRouter()

@router.post("/generate", response_model=ArchGraph)
async def generate(req: GenerateRequest):
    graph = await generate_architecture(req.prompt, req.existing_node_ids)
    graph = resolve_grid_collisions(graph)
    return graph

_openai = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])

class NodeDescription(PydanticBase):
    description: str
    responsibilities: list[str]
    metrics: dict  # { expected_rps, data_size, sla } all Optional[str]

@router.post("/describe-node")
async def describe_node(req: DescribeNodeRequest):
    response = await _openai.beta.chat.completions.parse(
        model="gpt-4o",
        max_tokens=400,
        temperature=0.3,
        messages=[
            {
                "role": "system",
                "content": "You are a concise infrastructure documentation engine. Describe the given node's role within the project context. Be specific to the project, not generic.",
            },
            {
                "role": "user",
                "content": f"Node type: {req.node_type}\nLabel: {req.label}\nProject context: {req.project_context}",
            },
        ],
        response_format=NodeDescription,
    )
    return response.choices[0].message.parsed
