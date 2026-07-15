from fastapi import APIRouter, HTTPException, Form, UploadFile, File
from models.request_models import GenerateRequest, DescribeNodeRequest, GenerateDocsRequest
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

class DocsResponse(PydanticBase):
    markdown: str

@router.post("/generate-docs", response_model=DocsResponse)
async def generate_docs(
    req: GenerateDocsRequest,
    user: dict = Depends(get_current_user)
):
    system_prompt = """You are an expert Cloud Software Architect.
Your task is to analyze a JSON representation of a cloud architecture and generate a highly professional, comprehensive Technical Specification in Markdown format.

The document MUST contain the following sections:
# Architecture Overview
[A high-level summary of the system, its purpose, and its primary data flows]

# Infrastructure Summary
[A categorized list of the primary components used (Compute, Database, Storage, etc.) and their roles]

# Deployment Guide
[A high-level set of instructions or considerations for deploying this architecture into a production environment (e.g., CI/CD, IaC, security boundaries)]

# Architecture Decision Records (ADR)
[Highlight 2 or 3 assumed architectural decisions based on the components chosen, outlining Context, Decision, and Consequences]

Make the document detailed, structured, and strictly in Markdown."""

    try:
        response = await _openai.chat.completions.create(
            model="gpt-4o",
            max_tokens=1500,
            temperature=0.3,
            messages=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": f"Here is the architecture blueprint:\n\n{json.dumps(req.graph_data, indent=2)}"}
            ]
        )
        md = response.choices[0].message.content
        if not md:
            md = "Failed to generate documentation."
        return DocsResponse(markdown=md)
    except Exception as e:
        import traceback
        print(f"Error generating docs: {traceback.format_exc()}")
        raise HTTPException(status_code=500, detail=str(e))
