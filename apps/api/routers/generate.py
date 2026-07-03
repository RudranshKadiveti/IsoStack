from fastapi import APIRouter, HTTPException, Form, UploadFile, File
from models.request_models import GenerateRequest, DescribeNodeRequest
from models.arch_schema import ArchGraph
from services.openai_service import generate_architecture
from services.layout_service import resolve_grid_collisions
from services.file_extractor import extract_text_from_upload

from openai import AsyncOpenAI
from pydantic import BaseModel as PydanticBase
import os
import json

from typing import Annotated, Optional

router = APIRouter()

from dependencies import get_current_user
from fastapi import Depends

@router.post("/generate", response_model=ArchGraph)
async def generate(
    prompt: Annotated[str, Form(...)],
    existing_node_ids: Annotated[Optional[str], Form()] = None,
    files: Annotated[list[UploadFile], File()] = [],
    user: dict = Depends(get_current_user)
):
    print(f"DEBUG: Received prompt: {prompt}")
    print(f"DEBUG: Received files: {files}")
    try:
        ids_list = None
        if existing_node_ids:
            try:
                ids_list = json.loads(existing_node_ids)
            except Exception:
                ids_list = None
                
        file_text = ""
        for f in files:
            if f and f.filename:
                print(f"DEBUG: Processing file: {f.filename}")
                extracted = extract_text_from_upload(f)
                print(f"DEBUG: Extracted length: {len(extracted) if extracted else 0}")
                if extracted:
                    file_text += f"\n--- File: {f.filename} ---\n{extracted}\n"
            
        final_prompt = prompt.strip()
        if file_text:
            if not final_prompt:
                final_prompt = "Design a complete architecture based entirely on the requirements outlined in the attached document context."
            final_prompt += f"\n\nDOCUMENT CONTEXT:\n{file_text}"

        print(f"DEBUG: Final prompt length: {len(final_prompt)}")
        graph = await generate_architecture(final_prompt, ids_list)
        graph = resolve_grid_collisions(graph)
        return graph
    except Exception as e:
        import traceback
        traceback.print_exc()
        with open("error_log.txt", "a") as f:
            f.write(traceback.format_exc() + "\n")
        raise HTTPException(status_code=500, detail=str(e))

_openai = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])

class NodeDescription(PydanticBase):
    description: str
    responsibilities: list[str]
    metrics: dict  # { expected_rps, data_size, sla } all Optional[str]

@router.post("/describe-node")
async def describe_node(
    req: DescribeNodeRequest,
    user: dict = Depends(get_current_user)
):
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
# Trigger reload for python-multipart update
