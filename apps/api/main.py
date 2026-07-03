from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import generate, workspace, health, chat

app = FastAPI(title="IsoStack API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(generate.router)
app.include_router(workspace.router)
app.include_router(chat.router)

# Trigger reload for .env update 2
