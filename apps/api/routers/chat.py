from fastapi import APIRouter, HTTPException, Depends
from models.request_models import ChatRequest
from dependencies import get_current_user
from openai import AsyncOpenAI
from pydantic import BaseModel
import os

router = APIRouter()
_openai = AsyncOpenAI(api_key=os.environ.get("OPENAI_API_KEY", ""))

class ChatResponse(BaseModel):
    reply: str

@router.post("/chat", response_model=ChatResponse)
async def chat_with_aarkus(
    req: ChatRequest,
    user: dict = Depends(get_current_user)
):
    try:
        if req.context_data:
            system_prompt = f"""You are Aarkus, a highly intelligent and helpful AI assistant for the IsoStack platform.
You are currently assisting the user based on their active context.

CONTEXT:
{req.context_data}

If the context contains a JSON blueprint of an architecture (nodes and edges), act as a Senior Cloud Architect. Analyze what the user has built so far, and answer their questions about it intelligently, offering specific recommendations (e.g., if they ask what database to use, look at their existing services and suggest the most appropriate database, rather than giving a generic answer).
If the context contains a list of workspaces, act as a general helpful agent navigating their dashboard. You can remind them what projects they have, help them find templates, or answer general questions.

Always maintain a professional, concise, and slightly magical tone. Do NOT use markdown code blocks for normal text, only for code.
"""
        else:
            system_prompt = """You are Aarkus, a highly intelligent and helpful AI assistant for the IsoStack platform. You help users navigate their dashboard, build architectures, and manage workspaces."""

        messages = [{"role": "system", "content": system_prompt}]
        
        for msg in req.messages:
            messages.append({"role": msg.role, "content": msg.content})

        response = await _openai.chat.completions.create(
            model="gpt-4o",
            max_tokens=800,
            temperature=0.7,
            messages=messages,
        )

        reply_content = response.choices[0].message.content or "I couldn't process that request."
        
        return ChatResponse(reply=reply_content)
    except Exception as e:
        import traceback
        with open("chat_error.log", "a") as f: f.write(f"ChatException: {traceback.format_exc()}\n")
        raise HTTPException(status_code=500, detail=str(e))
