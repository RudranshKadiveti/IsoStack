import os
from pathlib import Path
import re
from openai import AsyncOpenAI
import asyncio
from models.arch_schema import ArchGraph, RootBoilerplate, NodeBoilerplate

def get_folder_path(node: dict) -> str:
    layer = node.get("layer", "services").lower()
    layer = re.sub(r'[^a-z0-9]+', '-', layer).strip('-')
    label = (node.get("label") or node.get("id", "")).lower()
    label = re.sub(r'[^a-z0-9]+', '-', label).strip('-')
    return f"{layer}/{label}"

def clean_md(text: str) -> str:
    text = text.strip()
    if text.startswith("```markdown"):
        text = text[len("```markdown"):].strip()
    elif text.startswith("```md"):
        text = text[len("```md"):].strip()
    elif text.startswith("```"):
        text = text[len("```"):].strip()
    
    if text.endswith("```"):
        text = text[:-3].strip()
    return text

client = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
SYSTEM_PROMPT = (Path(__file__).parent.parent / "prompts" / "arch_system_prompt.txt").read_text()
BOILERPLATE_SYSTEM_PROMPT = (Path(__file__).parent.parent / "prompts" / "boilerplate_agent_prompt.txt").read_text()

def build_user_message(prompt: str, existing_ids: list[str] | None) -> str:
    msg = f"PROJECT DESCRIPTION:\n{prompt.strip()}"
    if existing_ids:
        msg += f"\n\nEXISTING NODES (preserve these IDs exactly, only extend the graph with new nodes):\n{', '.join(existing_ids)}"
    msg += "\n\nGenerate the full architecture now."
    print("DEBUG: Message to LLM:\n", msg)
    return msg

async def generate_architecture(
    prompt: str,
    existing_ids: list[str] | None = None,
) -> ArchGraph:
    response = await client.beta.chat.completions.parse(
        model="gpt-4o",
        temperature=0.3,
        max_tokens=4096,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user",   "content": build_user_message(prompt, existing_ids)},
        ],
        response_format=ArchGraph,
    )
    return response.choices[0].message.parsed

async def generate_agent_briefing(graph: dict) -> str:
    actual_folders = "\n".join([f"- {n.get('label', '')}: `/{get_folder_path(n)}`" for n in graph.get('nodes', [])])
    prompt = f"""
Based on the following architecture design, project title, and workflow, create a MASSIVE, highly detailed Agent Briefing (target: 1000+ words).
This document will be read by AI coding agents and human developers who need to implement this project from scratch.

Include the following sections in meticulous detail:
1. **Executive Summary**: What this project is and its primary goals.
2. **Phase-wise Execution Plan**: Break down the implementation into granular phases, from initial setup to deployment.
3. **Organized Folder Structure**: Define the directory tree for the monorepo using a beautiful ASCII tree format. YOU MUST USE THESE EXACT PATHS as the base folders, and expand them to show `README.md` and typical source files inside them:
{actual_folders}
Example format:
```text
project-root/
├── README.md
├── architecture.md
├── agent_briefing.md
├── compute/
│   └── orchestrator/
│       ├── README.md
│       └── main.py
└── data/
    └── postgresql-database/
        ├── README.md
        └── docker-compose.yml
```
4. **Dependencies & Tech Stack List**: List exact technologies, libraries, and frameworks required for each node.
5. **Setup Instructions**: Step-by-step instructions on how to install dependencies and run the project locally.
6. **Coding Guidelines & Patterns**: Standards for error handling, state management, and testing.

Project Title: {graph.get('project_name', 'Untitled')}
Description: {graph.get('description', '')}
Workflow: {graph.get('overall_workflow', '')}
Nodes: {', '.join([n.get('label', '') + ' (' + n.get('serviceType', '') + ')' for n in graph.get('nodes', [])])}

Format the output in clean Markdown. Provide as much exhaustive detail as possible.
"""
    response = await client.chat.completions.create(
        model="gpt-4o",
        temperature=0.3,
        messages=[
            {"role": "system", "content": "You are a senior technical architect and project manager creating comprehensive documentation."},
            {"role": "user", "content": prompt}
        ]
    )
    return clean_md(response.choices[0].message.content or "")

async def generate_architecture_doc(graph: dict) -> str:
    prompt = f"""
Create a highly detailed Architecture Specification Document (target: 1000+ words) based on the following design.

Include:
1. **System Overview**: High level view of the architecture.
2. **Component Details**: For EVERY node, provide an extensive section detailing its responsibilities, endpoints/APIs, data models, and scaling strategy.
3. **Data Flow & Interactions**: How do the components talk to each other? Detail the synchronous and asynchronous flows.
4. **Security & Authentication**: How is the system secured?

Project Title: {graph.get('project_name', 'Untitled')}
Description: {graph.get('description', '')}
Workflow: {graph.get('overall_workflow', '')}

Nodes Details:
"""
    for n in graph.get('nodes', []):
        prompt += f"\n- {n.get('label', '')} (Type: {n.get('serviceType', '')}, Layer: {n.get('layer', '')}): {n.get('description', '')}. Responsibilities: {', '.join(n.get('responsibilities', []))}"
        
    response = await client.chat.completions.create(
        model="gpt-4o",
        temperature=0.3,
        messages=[
            {"role": "system", "content": "You are a master system architect writing a definitive architecture document."},
            {"role": "user", "content": prompt}
        ]
    )
    return clean_md(response.choices[0].message.content or "")

async def generate_readme_doc(graph: dict) -> str:
    actual_folders = "\n".join([f"- {n.get('label', '')}: `/{get_folder_path(n)}`" for n in graph.get('nodes', [])])
    prompt = f"""
Write a comprehensive, professional `README.md` for this project repository.

It MUST include:
1. Beautiful Header with Project Name and Description. Include this aesthetic banner image just below the title: `![Banner](https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80)`
2. **Features**: Bulleted list of core features based on the architecture.
3. **Folder Structure**: A visual ASCII tree representing the structure. YOU MUST USE THESE EXACT PATHS as the base folders, and expand them to show `README.md` and typical source files inside them:
{actual_folders}
Example format:
```text
project-root/
├── README.md
├── architecture.md
├── agent_briefing.md
├── compute/
│   └── orchestrator/
│       ├── README.md
│       └── main.py
└── data/
    └── postgresql-database/
        ├── README.md
        └── docker-compose.yml
```
4. **Prerequisites & Dependencies**: Tools needed to run this (Node.js, Docker, Python, etc.).
5. **Getting Started**: Exact terminal commands to install and start the services locally.
6. **Architecture Summary**: A brief explanation of how the services fit together.

Project Title: {graph.get('project_name', 'Untitled')}
Description: {graph.get('description', '')}
Nodes: {', '.join([n.get('label', '') for n in graph.get('nodes', [])])}

Write this in standard Markdown.
"""
    response = await client.chat.completions.create(
        model="gpt-4o",
        temperature=0.3,
        messages=[
            {"role": "system", "content": "You are an open-source maintainer writing the ultimate README.md file."},
            {"role": "user", "content": prompt}
        ]
    )
    return clean_md(response.choices[0].message.content or "")

async def generate_root_boilerplate(graph: dict) -> RootBoilerplate:
    prompt = f"""
Generate the Phase 1 Root Boilerplate for the following architecture:
Project Title: {graph.get('project_name', 'Untitled')}
Description: {graph.get('description', '')}

You MUST generate the root `docker-compose.yml`, a `.gitignore`, and any shared data models in a `shared/` directory.

Nodes:
"""
    for n in graph.get('nodes', []):
        prompt += f"\n- {n.get('label', '')} (Type: {n.get('serviceType', '')}). Folder: `/{get_folder_path(n)}`"
    
    # We use a loop for retry logic if Pydantic parsing fails
    for attempt in range(3):
        try:
            response = await client.beta.chat.completions.parse(
                model="gpt-4o",
                temperature=0.3,
                messages=[
                    {"role": "system", "content": BOILERPLATE_SYSTEM_PROMPT},
                    {"role": "user", "content": prompt}
                ],
                response_format=RootBoilerplate,
            )
            return response.choices[0].message.parsed
        except Exception as e:
            if attempt == 2:
                raise e
            await asyncio.sleep(2 ** attempt)

async def generate_node_boilerplate(node: dict, graph: dict, shared_schemas: str) -> NodeBoilerplate:
    prompt = f"""
Generate the Phase 2 Service Boilerplate for the following specific node.

Target Node: {node.get('label', '')}
Type: {node.get('serviceType', '')}
Folder Path: `/{get_folder_path(node)}`
Description: {node.get('description', '')}
Responsibilities: {', '.join(node.get('responsibilities', []))}
Dependencies: {', '.join(node.get('dependencies', []))}

Here are the EXACT contents of the `shared/` schemas that were generated in Phase 1. 
You MUST use these exact class/model names if your service needs them. Do not redefine them.
SHARED SCHEMAS:
{shared_schemas}

Generate the boilerplate files for THIS NODE ONLY. You must output the code for this service, replacing placeholders.
"""
    for attempt in range(3):
        try:
            response = await client.beta.chat.completions.parse(
                model="gpt-4o",
                temperature=0.3,
                messages=[
                    {"role": "system", "content": BOILERPLATE_SYSTEM_PROMPT},
                    {"role": "user", "content": prompt}
                ],
                response_format=NodeBoilerplate,
            )
            return response.choices[0].message.parsed
        except Exception as e:
            if attempt == 2:
                raise e
            await asyncio.sleep(2 ** attempt)
