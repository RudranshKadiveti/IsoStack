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

# 🚀 Future Roadmap

IsoStack is designed to evolve beyond an AI architecture generator into a complete intelligent system design platform. Below are the planned improvements and long-term vision for the project.

---

## 🧠 AI Reasoning & Transparency

### Architecture Confidence Score

Provide a confidence score for every generated architecture, highlighting areas where the AI is highly certain and where additional user input could improve recommendations.

Example:

* **Confidence:** 91%
* High Confidence: Database selection, API layer, authentication
* Low Confidence: Traffic estimates, scaling assumptions

---

### Assumptions Panel

Display all assumptions the AI made while generating the architecture.

Examples:

* Expected daily users
* Deployment environment
* Authentication strategy
* Scaling requirements
* Geographic regions

Users will be able to edit assumptions and regenerate improved architectures.

---

### Explain Every Decision

Every generated component should include reasoning explaining why it was selected.

Example:

**Redis**

* Purpose: Cache frequently accessed data
* Reason: Read-heavy workload with low-latency requirements
* Alternative: Memcached

This transforms IsoStack into both a design tool and a learning platform.

---

## 🏗 Architecture Exploration

### Multiple Architecture Alternatives

Instead of producing a single design, generate multiple production-ready solutions optimized for different priorities.

Examples:

* 💰 Cost Optimized
* ⚖ Balanced
* 🚀 High Performance
* 🏢 Enterprise Scale

Users can compare trade-offs before choosing an architecture.

---

### Dynamic Traffic Simulation

Introduce an interactive workload slider.

Examples:

* 10 users
* 100 users
* 1,000 users
* 100,000 users
* 10 million users

As traffic increases, IsoStack dynamically evolves the architecture by introducing:

* Load balancers
* CDNs
* Caching layers
* Message queues
* Database replicas
* Auto-scaling services

---

### Failure Simulation

Allow users to simulate infrastructure failures and visualize their impact.

Examples:

* Database outage
* Redis failure
* Queue congestion
* API Gateway failure

IsoStack will display:

* System impact
* Availability reduction
* Latency increase
* Recovery recommendations
* Suggested redundancy improvements

---

## 📊 Intelligent Analysis

### Architecture Health Timeline

Track architecture improvements over time and visualize system maturity as new components are added.

---

### Complexity Meter

Estimate architectural complexity based on service count, dependencies, and communication patterns.

Levels:

* Beginner
* Intermediate
* Advanced
* Enterprise

---

### Detailed Cost Breakdown

Provide per-service cloud cost estimates for:

* AWS
* Google Cloud
* Microsoft Azure

Rather than a single estimated monthly cost, users can understand exactly which services contribute to infrastructure expenses.

---

### Interactive Validation Engine

Instead of only reporting issues, IsoStack will allow one-click fixes.

Examples:

* Missing authentication
* No monitoring
* Single point of failure
* Missing caching
* Public database exposure

Users can automatically insert recommended components directly into the architecture.

---

## 📚 Educational Features

### Learn Why

Selecting any service opens an educational panel explaining:

* What the service does
* Why it was selected
* Advantages
* Limitations
* Common alternatives
* Typical production use cases

---

### Learning Resources

Recommend official documentation, tutorials, videos, and architecture articles related to the selected technologies.

---

### Architecture Pattern Recognition

Automatically identify and explain design patterns present in generated systems.

Examples:

* Microservices
* Event-Driven Architecture
* CQRS
* Saga Pattern
* Layered Architecture
* Serverless

---

## 🤝 Collaboration

### Version History

Maintain snapshots of architecture evolution so users can revisit previous iterations.

---

### Shareable Architecture Links

Generate public shareable links for architecture diagrams.

---

### Team Comments

Allow collaborators to leave comments directly on architecture components for design reviews.

---

## 🤖 Advanced AI Features

### Multi-Model Support

Support multiple LLM providers, allowing users to compare architectural recommendations from:

* OpenAI
* Anthropic Claude
* Google Gemini
* Future open-source models

---

### AI Architecture Critic

After generating an architecture, a secondary AI reviews it and provides:

* Weaknesses
* Risk analysis
* Scalability concerns
* Security recommendations
* Suggested improvements

This acts as an automated architecture review process.

---

### Requirement Gap Detection

Automatically detect missing production requirements.

Examples:

* Missing encryption
* Missing audit logs
* Missing backups
* Missing monitoring
* Missing disaster recovery
* Missing compliance controls

---

## ⚡ Developer Productivity

### Workspace Scaffold Generator

Generate production-ready project scaffolds based on the selected architecture.

Future support includes:

* Backend services
* Infrastructure templates
* Docker configurations
* CI/CD pipelines
* Starter documentation

---

### Deployment Pipeline Integration

Integrate directly with deployment platforms such as:

* GitHub Actions
* Terraform Cloud
* Vercel
* Railway
* Kubernetes

---

## 🥽 Long-Term Vision — Project JARVIS

The ultimate vision for IsoStack is to evolve into an interactive AI architecture assistant inspired by systems like JARVIS.

### Gesture-Based Architecture Design

Using computer vision and hand tracking, users will be able to interact with architecture diagrams naturally.

Examples:

* Grab and move services with hand gestures
* Connect components by pointing
* Resize infrastructure visually
* Zoom and navigate using gestures
* Create new services without touching a mouse

---

### Voice-Controlled Architecture Editing

Allow natural language commands such as:

* "Replace PostgreSQL with MongoDB."
* "Scale this service horizontally."
* "Add Redis caching."
* "Generate a Kubernetes deployment."

The architecture updates instantly while preserving consistency.

---

### Conversational Architecture Assistant

Instead of simply generating diagrams, IsoStack becomes an AI design partner capable of discussing architectural trade-offs, suggesting improvements, answering questions, and iteratively refining systems through conversation.

---

### Real-Time Architecture Copilot

Continuously monitor the architecture as users make changes and proactively recommend:

* Better scalability
* Lower cost alternatives
* Improved fault tolerance
* Security enhancements
* Performance optimizations

---

### Immersive Architecture Visualization

Explore large distributed systems in immersive 3D or AR/VR environments, making complex infrastructures easier to understand, inspect, and present.

---

## 🌌 Long-Term Goal

The long-term goal of IsoStack is to become an intelligent software architecture platform that helps engineers move seamlessly from **idea → architecture → validation → deployment**, combining AI-assisted design, interactive visualization, automated best practices, and natural human-computer interaction into a single developer experience.


## Contributing

This project is in early development. Contributions and feedback are welcome — please open an issue before submitting a pull request.

---

<div align="center">

Built by [Rudransh Kadiveti](https://github.com/RudranshKadiveti)

</div>
