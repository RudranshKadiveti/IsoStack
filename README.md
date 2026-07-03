<div style="text-align: center;">

```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   ▀█▀  █▀▀  █▀█  █▀▀  ▀█▀  ▄▀█  █▀▀  █▄▀           ║
║    █   ▀▀█  █ █  ▀▀█   █   █▀█  █    █▀▄           ║
║   ▀▀▀  ▀▀▀  ▀▀▀  ▀▀▀   ▀▀  ▀ ▀  ▀▀▀  ▀ ▀           ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```
**AI-Powered System Architecture Designer**

</div>


[![Status](https://img.shields.io/badge/status-under%20development-orange?style=flat-square&labelColor=1a1a2e)](https://github.com/RudranshKadiveti/IsoStack)
[![Tech](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-3B82F6?style=flat-square&labelColor=1a1a2e)](https://vitejs.dev/)
[![Backend](https://img.shields.io/badge/backend-FastAPI%20%2B%20Python-009688?style=flat-square&labelColor=1a1a2e)](https://fastapi.tiangolo.com/)
[![AI](https://img.shields.io/badge/AI-GPT--4o-7C3AED?style=flat-square&labelColor=1a1a2e)](https://openai.com/)
[![License](https://img.shields.io/badge/license-MIT-gray?style=flat-square&labelColor=1a1a2e)](./LICENSE)

*Describe a product. Get a production-grade infrastructure diagram.*

</div>

---

## Overview

IsoStack is an intelligent architecture design tool that converts plain-language project descriptions into fully-specified, production-grade system diagrams. Powered by GPT-4o, it reasons about your system requirements and produces a node-graph of services, databases, message queues, gateways, and observability layers — complete with annotated connections, cost estimates, performance scores, and a compliance checklist.

Built for engineers who want to think in architecture rather than boilerplate.

---

## Current Feature Set

| Feature | Status |
|---|---|
| AI-generated architecture from natural language prompt | ✅ Implemented |
| Interactive React Flow canvas (drag, connect, delete) | ✅ Implemented |
| 60+ service catalog (backend, database, cache, queue, CDN, observability, auth) | ✅ Implemented |
| Per-node detail panel with metrics, tags, responsibilities | ✅ Implemented |
| Real-time architecture health validation | ✅ Implemented |
| Performance analysis (latency, throughput, availability, complexity) | ✅ Implemented |
| Cost estimation across AWS / GCP / Azure | ✅ Implemented |
| Pre-built architecture templates (10+ scenarios) | ✅ Implemented |
| OpenAPI spec export | ✅ Implemented |
| Cloud-agnostic Terraform export | ✅ Implemented |
| Auto-generated markdown deployment guide | ✅ Implemented |
| Architecture Record Book (in-canvas note taking) | ✅ Implemented |
| Workspace scaffold generator | 🔄 In Progress |
| Authentication and user accounts | 🔲 Not Started |
| Diagram sharing / collaboration | 🔲 Not Started |
| Deployment pipeline integration | 🔲 Not Started |

---

## Architecture

```
IsoStack/
├── apps/
│   ├── api/                    # FastAPI backend
│   │   ├── routers/            # REST endpoints (generate, workspace, health)
│   │   ├── services/           # OpenAI integration, layout engine
│   │   ├── models/             # Pydantic schemas (enforced AI output)
│   │   └── prompts/            # System prompts for the AI engine
│   └── web/                    # Vite + React frontend
│       └── src/
│           ├── components/     # Canvas, sidebar, panels, UI primitives
│           ├── store/          # Zustand state (arch graph, UI state)
│           ├── lib/            # Validator, cost estimator, exporters, layout
│           └── hooks/          # AI generation hook
└── packages/
    └── workspace-gen/          # TypeScript workspace scaffold generator
```

---

## How It Works

```
User types a project description
        │
        ▼
FastAPI /generate endpoint
        │
        ▼
GPT-4o (structured output mode) ──► ArchGraph JSON
        │
        ├── nodes[]                — services, databases, gateways, etc.
        ├── edges[]                — typed connections between nodes
        ├── utilities_checklist[]  — requirement compliance
        └── alternative_architectures[]
        │
        ▼
Layout engine resolves grid positions
        │
        ▼
React Flow renders interactive canvas
        │
        ▼
Side panels compute:
  ├── Validation issues
  ├── Performance metrics
  ├── Cost estimates (AWS / GCP / Azure)
  ├── Deployment guide
  └── OpenAPI / Terraform export
```

---

## Stack

**Frontend**
- React 18 + TypeScript
- Vite
- React Flow (canvas rendering)
- Zustand (state management)
- Tailwind CSS

**Backend**
- Python 3.12
- FastAPI
- OpenAI Python SDK (structured output via `beta.chat.completions.parse`)
- Pydantic v2

**Tooling**
- pnpm workspaces (monorepo)
- uv (Python package management)
- TSX (workspace generator runtime)

---

## Getting Started

### Prerequisites

- Node.js 18+, pnpm 8+
- Python 3.12+, uv
- An OpenAI API key with GPT-4o access

### Backend

```bash
cd apps/api
cp .env.example .env          # Fill in your OPENAI_API_KEY
uv sync
uv run uvicorn main:app --port 8000 --reload
```

### Frontend

```bash
pnpm install
pnpm --filter web dev
```

The app will be available at `http://localhost:5173`.

---

## Development Status

> **This project is under active development.**
>
> Core functionality is working end-to-end. Several features listed in the roadmap above are planned but not yet implemented. APIs and data schemas may change between commits without notice. Not recommended for production use in its current state.

---

## Roadmap

- Persistent project storage with user accounts
- Shareable architecture links with version history
- Deployment pipeline integration (GitHub Actions, Terraform Cloud)
- Multi-model AI support (Claude, Gemini)
- Team collaboration with real-time cursors

---

## Contributing

This project is in early development. Contributions and feedback are welcome — please open an issue before submitting a pull request.

---

<div align="center">

Built by [Rudransh Kadiveti](https://github.com/RudranshKadiveti)

</div>
