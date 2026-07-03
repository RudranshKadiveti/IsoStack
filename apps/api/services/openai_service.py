import os
from pathlib import Path
from openai import AsyncOpenAI
from models.arch_schema import ArchGraph

client = AsyncOpenAI(api_key=os.environ["OPENAI_API_KEY"])
SYSTEM_PROMPT = (Path(__file__).parent.parent / "prompts" / "arch_system_prompt.txt").read_text()

def build_user_message(prompt: str, existing_ids: list[str] | None) -> str:
    msg = f"PROJECT DESCRIPTION:\n{prompt.strip()}"
    if existing_ids:
        msg += f"\n\nEXISTING NODES (preserve these IDs exactly, only extend the graph with new nodes):\n{', '.join(existing_ids)}"
    msg += "\n\nGenerate the full architecture now."
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
