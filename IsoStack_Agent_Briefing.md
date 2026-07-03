# IsoStack — Complete Agent Briefing
### Everything to paste into Antigravity to build this project

---

> **How to use this document:** Each section below is a self-contained task block. Work through them in order, one section per agent session. Paste the full block — context header, task list, and constraints — into Antigravity each time. Never skip sections; each one's output is the next one's input.

---

## SESSION 0 — Project Bootstrap & Monorepo Init

### Context
You are building IsoStack — a web platform that converts a plain-text project description into an interactive isometric 3D architecture canvas. The tech stack is: React 18 + Vite (frontend), React Three Fiber + Drei for 3D, Zustand for state, Tailwind CSS + shadcn/ui for panels, FastAPI + Python 3.11 (backend), OpenAI GPT-4o API for AI generation, and a Node.js CLI for local file generation.

The monorepo root is `isostack/`. All frontend code lives in `apps/web/`, all backend code in `apps/api/`, and the file generator in `packages/workspace-gen/`.

### Task
Set up the full monorepo skeleton with correct tooling configs. Do not write any application logic yet — only scaffold.

1. Create `isostack/pnpm-workspace.yaml`:
```yaml
packages:
  - 'apps/*'
  - 'packages/*'
```

2. Create `isostack/apps/web/` using Vite React-TS template. Install these packages:
   - Runtime: `@react-three/fiber @react-three/drei three zustand axios`
   - Dev: `@types/three tailwindcss postcss autoprefixer`
   - Run `npx tailwindcss init -p` after install.

3. Create `isostack/apps/api/` as a Python project using `uv`. Install:
   - `fastapi uvicorn openai pydantic python-dotenv`

4. Create `isostack/packages/workspace-gen/` as a Node package. Install:
   - Runtime: `handlebars tsx`
   - Dev: `@types/node typescript`

5. Create the full directory skeleton (empty files with correct paths, no content yet):
```
apps/web/src/
  main.tsx
  App.tsx
  index.css
  components/canvas/IsoCanvas.tsx
  components/canvas/IsoCamera.tsx
  components/canvas/ArchNode.tsx
  components/canvas/ArchEdge.tsx
  components/canvas/NodeLabel.tsx
  components/canvas/GridFloor.tsx
  components/canvas/SceneController.tsx
  components/panels/PromptBar.tsx
  components/panels/NodeDetailPane.tsx
  components/panels/UtilitiesPanel.tsx
  components/panels/AddNodeSearch.tsx
  store/useArchStore.ts
  store/useUIStore.ts
  hooks/useGenerateArch.ts
  hooks/useIsoCoords.ts
  hooks/useDragNode.ts
  lib/api.ts
  lib/isoLayout.ts
  lib/nodeColors.ts
  lib/types.ts

apps/api/
  main.py
  routers/generate.py
  routers/workspace.py
  routers/health.py
  services/openai_service.py
  services/layout_service.py
  services/workspace_service.py
  models/arch_schema.py
  models/request_models.py
  prompts/arch_system_prompt.txt
  .env

packages/workspace-gen/src/
  index.ts
  generators/directoryGen.ts
  generators/boilerplateGen.ts
  generators/indexGen.ts
```

6. Create `apps/api/.env` with the single line:
```
OPENAI_API_KEY=your_key_here
```

### Constraints
- Do not write any component logic. Empty files only, correct paths only.
- `tailwind.config.ts` must include `content: ['./index.html','./src/**/*.{ts,tsx}']`.
- `vite.config.ts` must proxy `/api` to `http://localhost:8000`.
- Python project must use `pyproject.toml`, not `requirements.txt`.
- The AI service file is named `openai_service.py` — do not use any other name.

---

## SESSION 1 — TypeScript Types & Shared Schema

### Context
The monorepo scaffold exists. Now define every shared TypeScript type that the rest of the frontend will import from `lib/types.ts`. These types must mirror the exact JSON schema that the backend AI agent will return.

### Task
Write the complete contents of `apps/web/src/lib/types.ts`:

```typescript
export type NodeType =
  | 'Compute' | 'Database' | 'Cache' | 'Queue'
  | 'Storage' | 'Gateway' | 'Auth' | 'CDN' | 'Observer' | 'External';

export type LayerType =
  | 'client' | 'gateway' | 'compute' | 'data'
  | 'cache' | 'queue' | 'storage' | 'observability' | 'auth' | 'external';

export type EdgeType =
  | 'sync_http' | 'async_event' | 'data_stream'
  | 'db_query' | 'cache_read' | 'auth_check';

export interface GridHint {
  col: number; // 0–7
  row: number; // 0–7
}

export interface NodeMetrics {
  expected_rps: string | null;
  data_size: string | null;
  sla: string | null;
}

export interface ArchNode {
  id: string;                    // snake_case
  label: string;
  type: NodeType;
  layer: LayerType;
  technology: string;
  description: string;
  responsibilities: string[];
  metrics: NodeMetrics;
  grid_hint: GridHint;
  // Runtime-only (added by frontend, not in AI JSON):
  position?: [number, number, number]; // resolved 3D coords
}

export interface ArchEdge {
  id: string;                    // format: "source_id__target_id"
  source: string;                // node id
  target: string;                // node id
  type: EdgeType;
  label: string;
  bidirectional: boolean;
}

export interface UtilityItem {
  item: string;
  status: 'required' | 'recommended' | 'optional';
  checked?: boolean;             // frontend-only toggle state
}

export interface AlternativeArch {
  name: string;
  tradeoff: string;
}

export interface ArchGraph {
  project_name: string;
  description: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
  utilities_checklist: UtilityItem[];
  alternative_architectures: AlternativeArch[];
}
```

Also write `apps/web/src/lib/nodeColors.ts`:

```typescript
import type { NodeType } from './types';

export const NODE_COLORS: Record<NodeType, string> = {
  Compute:  '#3B82F6',
  Database: '#10B981',
  Cache:    '#F59E0B',
  Queue:    '#8B5CF6',
  Storage:  '#6B7280',
  Gateway:  '#EF4444',
  Auth:     '#EC4899',
  CDN:      '#06B6D4',
  Observer: '#14B8A6',
  External: '#9CA3AF',
};

export const EDGE_COLORS: Record<string, string> = {
  sync_http:    '#60A5FA',
  async_event:  '#FB923C',
  data_stream:  '#34D399',
  db_query:     '#A3E635',
  cache_read:   '#FCD34D',
  auth_check:   '#F472B6',
};
```

### Constraints
- All types must be `export interface` or `export type`. No classes.
- The `ArchNode` type must include the optional `position` field — it is added by the frontend's `useIsoCoords` hook, not by the AI.
- Do not add any extra fields beyond what is listed.

---

## SESSION 2 — Zustand Stores

### Context
Types are defined in `lib/types.ts`. Now build both Zustand stores. The arch store holds the live architecture graph. The UI store holds panel visibility and loading states.

### Task

Write `apps/web/src/store/useArchStore.ts`:
```typescript
import { create } from 'zustand';
import type { ArchGraph, ArchNode, ArchEdge } from '../lib/types';

interface ArchState {
  graph: ArchGraph | null;
  selectedNodeId: string | null;
  setGraph: (graph: ArchGraph) => void;
  selectNode: (id: string | null) => void;
  addNode: (node: ArchNode) => void;
  removeNode: (id: string) => void;
  updateNodePosition: (id: string, col: number, row: number) => void;
  addEdge: (edge: ArchEdge) => void;
  removeEdge: (id: string) => void;
  toggleUtility: (index: number) => void;
}

export const useArchStore = create<ArchState>((set) => ({
  graph: null,
  selectedNodeId: null,
  setGraph: (graph) => set({ graph }),
  selectNode: (id) => set({ selectedNodeId: id }),
  addNode: (node) => set((s) => s.graph
    ? { graph: { ...s.graph, nodes: [...s.graph.nodes, node] } }
    : s),
  removeNode: (id) => set((s) => s.graph ? {
    graph: {
      ...s.graph,
      nodes: s.graph.nodes.filter((n) => n.id !== id),
      edges: s.graph.edges.filter((e) => e.source !== id && e.target !== id),
    }
  } : s),
  updateNodePosition: (id, col, row) => set((s) => s.graph ? {
    graph: {
      ...s.graph,
      nodes: s.graph.nodes.map((n) =>
        n.id === id ? { ...n, grid_hint: { col, row } } : n
      ),
    }
  } : s),
  addEdge: (edge) => set((s) => s.graph
    ? { graph: { ...s.graph, edges: [...s.graph.edges, edge] } }
    : s),
  removeEdge: (id) => set((s) => s.graph ? {
    graph: { ...s.graph, edges: s.graph.edges.filter((e) => e.id !== id) }
  } : s),
  toggleUtility: (index) => set((s) => s.graph ? {
    graph: {
      ...s.graph,
      utilities_checklist: s.graph.utilities_checklist.map((u, i) =>
        i === index ? { ...u, checked: !u.checked } : u
      ),
    }
  } : s),
}));
```

Write `apps/web/src/store/useUIStore.ts`:
```typescript
import { create } from 'zustand';

interface UIState {
  isLoading: boolean;
  isDetailPaneOpen: boolean;
  isAddNodeOpen: boolean;
  setLoading: (v: boolean) => void;
  setDetailPane: (v: boolean) => void;
  setAddNodeOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  isDetailPaneOpen: false,
  isAddNodeOpen: false,
  setLoading: (v) => set({ isLoading: v }),
  setDetailPane: (v) => set({ isDetailPaneOpen: v }),
  setAddNodeOpen: (v) => set({ isAddNodeOpen: v }),
}));
```

### Constraints
- Use `zustand` only. No Redux, no Context API.
- Every action must be a pure state update — no API calls inside the store.
- `removeNode` must also remove all edges where `source === id` OR `target === id`.

---

## SESSION 3 — Backend: Pydantic Models & FastAPI App

### Context
The frontend types exist. Now build the Python backend. FastAPI serves on port 8000. It has three routes: `GET /health`, `POST /generate`, `POST /workspace`. CORS must allow `http://localhost:5173`. The AI service file is `openai_service.py` — this name must be used everywhere it is referenced.

### Task

**1. Write `apps/api/models/arch_schema.py`** — Pydantic models that mirror `lib/types.ts` exactly:

```python
from enum import Enum
from typing import Optional
from pydantic import BaseModel, field_validator

class NodeType(str, Enum):
    Compute = "Compute"; Database = "Database"; Cache = "Cache"
    Queue = "Queue"; Storage = "Storage"; Gateway = "Gateway"
    Auth = "Auth"; CDN = "CDN"; Observer = "Observer"; External = "External"

class LayerType(str, Enum):
    client = "client"; gateway = "gateway"; compute = "compute"
    data = "data"; cache = "cache"; queue = "queue"
    storage = "storage"; observability = "observability"
    auth = "auth"; external = "external"

class EdgeType(str, Enum):
    sync_http = "sync_http"; async_event = "async_event"
    data_stream = "data_stream"; db_query = "db_query"
    cache_read = "cache_read"; auth_check = "auth_check"

class GridHint(BaseModel):
    col: int; row: int
    @field_validator('col', 'row')
    @classmethod
    def in_range(cls, v):
        assert 0 <= v <= 7, "grid_hint col/row must be 0-7"
        return v

class NodeMetrics(BaseModel):
    expected_rps: Optional[str] = None
    data_size: Optional[str] = None
    sla: Optional[str] = None

class ArchNode(BaseModel):
    id: str; label: str; type: NodeType; layer: LayerType
    technology: str; description: str
    responsibilities: list[str]; metrics: NodeMetrics; grid_hint: GridHint

class ArchEdge(BaseModel):
    id: str; source: str; target: str
    type: EdgeType; label: str; bidirectional: bool

class UtilityItem(BaseModel):
    item: str
    status: str  # "required" | "recommended" | "optional"

class AlternativeArch(BaseModel):
    name: str; tradeoff: str

class ArchGraph(BaseModel):
    project_name: str; description: str
    nodes: list[ArchNode]; edges: list[ArchEdge]
    utilities_checklist: list[UtilityItem]
    alternative_architectures: list[AlternativeArch]

    @field_validator('nodes')
    @classmethod
    def min_nodes(cls, v):
        assert len(v) >= 5, "Must have at least 5 nodes"
        ids = [n.id for n in v]
        assert len(ids) == len(set(ids)), "Duplicate node IDs"
        return v
```

**2. Write `apps/api/models/request_models.py`**:
```python
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
```

**3. Write `apps/api/main.py`**:
```python
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import generate, workspace, health

app = FastAPI(title="IsoStack API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True, allow_methods=["*"], allow_headers=["*"],
)

app.include_router(health.router)
app.include_router(generate.router)
app.include_router(workspace.router)
```

**4. Write `apps/api/routers/health.py`**:
```python
from fastapi import APIRouter
router = APIRouter()

@router.get("/health")
async def health(): return {"status": "ok"}
```

**5. Write `apps/api/routers/generate.py`**:
```python
from fastapi import APIRouter, HTTPException
from models.request_models import GenerateRequest
from models.arch_schema import ArchGraph
from services.openai_service import generate_architecture
from services.layout_service import resolve_grid_collisions

router = APIRouter()

@router.post("/generate", response_model=ArchGraph)
async def generate(req: GenerateRequest):
    graph = await generate_architecture(req.prompt, req.existing_node_ids)
    graph = resolve_grid_collisions(graph)
    return graph
```

### Constraints
- CORS must only allow `http://localhost:5173`. Do not allow `*`.
- All Pydantic models must use `BaseModel`, not dataclasses.
- `field_validator` must enforce the `0–7` grid range on `GridHint`.
- The `/generate` route imports from `services.openai_service` — do not use any other module name.
- The `/generate` route calls `resolve_grid_collisions` before returning — this is mandatory.

---

## SESSION 4 — OpenAI Service & System Prompt

### Context
FastAPI routes exist. Now implement the OpenAI integration — the most critical service. It lives at `apps/api/services/openai_service.py`. It uses `client.beta.chat.completions.parse()` with the `ArchGraph` Pydantic model passed directly as the `response_format`. This is OpenAI's Structured Outputs feature: the SDK natively enforces the schema at the API level, which means there is no need for JSON fence stripping, manual `json.loads()`, `ValidationError` retry loops, or self-correction prompts. The returned `parsed` object is already a fully validated `ArchGraph` instance.

### Task

**1. Write the system prompt** at `apps/api/prompts/arch_system_prompt.txt` — paste this verbatim, no modifications:

```
You are IsoStack Architect — a deterministic infrastructure topology engine.

YOUR ONLY JOB: Analyze the user's project description and produce a complete, production-grade system architecture. The output schema is enforced externally — you do not need to worry about JSON formatting. Focus entirely on the quality, realism, and coherence of the architecture itself.

ARCHITECTURE RULES:
- Infer a realistic, production-grade architecture — not a toy one.
- Include between 5 and 14 nodes. Never fewer than 5.
- Every node must have at least one edge connecting it to the graph. No isolated nodes.
- Node IDs must be snake_case slugs (e.g., "api_gateway", "user_db").
- Every string value must be concise (max 2 sentences).
- Assign each node a "layer" from this fixed enum only: ["client", "gateway", "compute", "data", "cache", "queue", "storage", "observability", "auth", "external"]
- Assign "grid_hint" col and row to every node. Use a logical spatial layout:
    - col 0 = leftmost (client-facing); higher col = deeper in the stack (databases, storage at col 4+)
    - row = vertical position; spread nodes sharing a layer across different rows
    - Keep all col and row values between 0 and 7 inclusive
- For edges, "type" must be one of: ["sync_http", "async_event", "data_stream", "db_query", "cache_read", "auth_check"]
- For node "type", use one of: ["Compute", "Database", "Cache", "Queue", "Storage", "Gateway", "Auth", "CDN", "Observer", "External"]
- utilities_checklist must contain between 4 and 8 items.
- alternative_architectures must contain exactly 2 entries.
```

**2. Write `apps/api/services/openai_service.py`**:

```python
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
```

**3. Write `apps/api/services/layout_service.py`**:

```python
from models.arch_schema import ArchGraph

def resolve_grid_collisions(graph: ArchGraph) -> ArchGraph:
    """Ensure no two nodes share the same (col, row) grid position."""
    occupied: set[tuple[int, int]] = set()
    nodes = list(graph.nodes)
    for node in nodes:
        col, row = node.grid_hint.col, node.grid_hint.row
        while (col, row) in occupied:
            row += 1
            if row > 7:
                row = 0
                col = min(col + 1, 7)
        occupied.add((col, row))
        node.grid_hint.col = col
        node.grid_hint.row = row
    return graph.model_copy(update={"nodes": nodes})
```

### Constraints
- The service file must be named `openai_service.py`. Do not rename it.
- Use `client.beta.chat.completions.parse()` — not `client.chat.completions.create()`. The `.parse()` method is what activates Structured Outputs and returns a typed `parsed` object.
- Pass `response_format=ArchGraph` directly — the Pydantic model class itself, not a dict or JSON schema string.
- Return `response.choices[0].message.parsed` directly — this is already a fully validated `ArchGraph` instance. Do not call `json.loads()`, `model_validate()`, or any manual parsing on it.
- Do not add any retry loop, JSON fence stripper, or `ValidationError` handler — Structured Outputs eliminates all of these.
- `temperature` must be `0.3`. `model` must be `"gpt-4o"`. `max_tokens` must be `4096`.
- The system prompt must be loaded from the `.txt` file at runtime — do not hardcode it inline in the service.

---

## SESSION 5 — Isometric Coordinate Hook & API Client

### Context
Backend is complete. Now build the two most important frontend utilities: the API client and the `useIsoCoords` hook that converts `grid_hint` to 3D world coordinates.

### Task

**1. Write `apps/web/src/lib/api.ts`**:
```typescript
import axios from 'axios';
import type { ArchGraph } from './types';

const client = axios.create({ baseURL: '/api' });

export async function generateArchitecture(
  prompt: string,
  existingNodeIds?: string[]
): Promise<ArchGraph> {
  const { data } = await client.post<ArchGraph>('/generate', {
    prompt,
    existing_node_ids: existingNodeIds ?? null,
  });
  return data;
}

export async function generateWorkspace(
  graph: ArchGraph,
  targetPath: string
): Promise<{ success: boolean; message: string }> {
  const { data } = await client.post('/workspace', {
    graph,
    target_path: targetPath,
  });
  return data;
}
```

**2. Write `apps/web/src/hooks/useIsoCoords.ts`**:
```typescript
import type { LayerType } from '../lib/types';

const ISO_CELL_W = 2.2;
const ISO_CELL_H = 1.4;
const ISO_LAYER_Z = 0.6;

const LAYER_Z_INDEX: Record<LayerType, number> = {
  client:        0,
  gateway:       1,
  auth:          1.5,
  compute:       2,
  queue:         2.5,
  cache:         3,
  data:          3.5,
  storage:       4,
  external:      4.5,
  observability: 1,
};

export function gridToIso(
  col: number,
  row: number,
  layer: LayerType
): [number, number, number] {
  const x = (col - row) * (ISO_CELL_W / 2);
  const y = (col + row) * (ISO_CELL_H / 2) * -0.5;
  const z = (LAYER_Z_INDEX[layer] ?? 0) * ISO_LAYER_Z;
  return [x, y, z];
}
```

**3. Write `apps/web/src/hooks/useGenerateArch.ts`**:
```typescript
import { useState } from 'react';
import { generateArchitecture } from '../lib/api';
import { gridToIso } from './useIsoCoords';
import { useArchStore } from '../store/useArchStore';
import { useUIStore } from '../store/useUIStore';
import type { ArchGraph, ArchNode } from '../lib/types';

export function useGenerateArch() {
  const [error, setError] = useState<string | null>(null);
  const setGraph = useArchStore((s) => s.setGraph);
  const setLoading = useUIStore((s) => s.setLoading);

  async function generate(prompt: string, existingIds?: string[]) {
    setLoading(true);
    setError(null);
    try {
      const graph: ArchGraph = await generateArchitecture(prompt, existingIds);
      // Resolve 3D positions for each node
      const nodesWithPositions: ArchNode[] = graph.nodes.map((node) => ({
        ...node,
        position: gridToIso(node.grid_hint.col, node.grid_hint.row, node.layer),
      }));
      setGraph({ ...graph, nodes: nodesWithPositions });
    } catch (e: any) {
      setError(e?.response?.data?.detail ?? 'Generation failed');
    } finally {
      setLoading(false);
    }
  }

  return { generate, error };
}
```

**4. Write `apps/web/src/lib/isoLayout.ts`** — utility for assigning a fresh grid position to newly added nodes:
```typescript
import type { ArchNode } from './types';

export function nextAvailableCell(
  existingNodes: ArchNode[]
): { col: number; row: number } {
  const occupied = new Set(
    existingNodes.map((n) => `${n.grid_hint.col},${n.grid_hint.row}`)
  );
  for (let col = 0; col <= 7; col++) {
    for (let row = 0; row <= 7; row++) {
      if (!occupied.has(`${col},${row}`)) return { col, row };
    }
  }
  return { col: 7, row: 7 }; // fallback
}
```

### Constraints
- `gridToIso` must return a `[number, number, number]` tuple, not an object.
- `useGenerateArch` must attach `position` to every node before calling `setGraph` — this is what `ArchNode.tsx` reads for placement.
- The API client baseURL must be `'/api'` (proxied by Vite to port 8000), not a hardcoded `localhost` URL.
- Do not add `async/await` inside a Zustand store action — all async logic lives in `useGenerateArch`.

---

## SESSION 6 — 3D Canvas: Core Scene

### Context
Stores, hooks, and types are complete. Now build the isometric 3D canvas. This is the visual heart of the product. All components live in `components/canvas/`.

### Task

**1. Write `apps/web/src/components/canvas/IsoCanvas.tsx`**:
```tsx
import { Canvas } from '@react-three/fiber';
import { SceneController } from './SceneController';
import { GridFloor } from './GridFloor';

export function IsoCanvas() {
  return (
    <Canvas
      orthographic
      camera={{ zoom: 80, position: [10, 10, 10], near: 0.1, far: 1000 }}
      style={{ background: '#0B0F1A', width: '100%', height: '100%' }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={1.2} />
      <GridFloor />
      <SceneController />
    </Canvas>
  );
}
```

**2. Write `apps/web/src/components/canvas/GridFloor.tsx`**:
```tsx
import { useRef } from 'react';
import { GridHelper } from 'three';
import { useHelper } from '@react-three/drei';

export function GridFloor() {
  return (
    <group rotation={[0, 0, 0]}>
      <gridHelper args={[40, 40, '#1E293B', '#1E293B']} position={[0, -0.5, 0]} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.51, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshBasicMaterial color="#0B0F1A" transparent opacity={0.95} />
      </mesh>
    </group>
  );
}
```

**3. Write `apps/web/src/components/canvas/ArchNode.tsx`**:
```tsx
import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import type { Mesh } from 'three';
import { NODE_COLORS } from '../../lib/nodeColors';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';
import type { ArchNode as ArchNodeType } from '../../lib/types';

interface Props { node: ArchNodeType; }

export function ArchNode({ node }: Props) {
  const ref = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const selectNode = useArchStore((s) => s.selectNode);
  const setDetailPane = useUIStore((s) => s.setDetailPane);
  const color = NODE_COLORS[node.type];
  const pos = node.position ?? [0, 0, 0];

  useFrame(() => {
    if (!ref.current) return;
    const target = hovered ? 1.15 : 1;
    ref.current.scale.lerp({ x: target, y: target, z: target } as any, 0.1);
  });

  return (
    <group position={pos}>
      <mesh
        ref={ref}
        onClick={() => { selectNode(node.id); setDetailPane(true); }}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <boxGeometry args={[1, 0.5, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={hovered ? 0.4 : 0.1} />
      </mesh>
      <Html center position={[0, 0.6, 0]} style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(11,15,26,0.85)',
          color: '#F1F5F9',
          padding: '2px 8px',
          borderRadius: 4,
          fontSize: 11,
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          border: `1px solid ${color}44`,
        }}>
          {node.label}
        </div>
      </Html>
    </group>
  );
}
```

**4. Write `apps/web/src/components/canvas/ArchEdge.tsx`**:
```tsx
import { Line } from '@react-three/drei';
import { EDGE_COLORS } from '../../lib/nodeColors';
import { useArchStore } from '../../store/useArchStore';

export function ArchEdge() {
  const graph = useArchStore((s) => s.graph);
  if (!graph) return null;

  const nodeMap = new Map(graph.nodes.map((n) => [n.id, n.position ?? [0,0,0]]));

  return (
    <>
      {graph.edges.map((edge) => {
        const src = nodeMap.get(edge.source);
        const tgt = nodeMap.get(edge.target);
        if (!src || !tgt) return null;
        const color = EDGE_COLORS[edge.type] ?? '#94A3B8';
        const mid: [number,number,number] = [
          (src[0]+tgt[0])/2,
          (src[1]+tgt[1])/2 + 0.5,
          (src[2]+tgt[2])/2,
        ];
        return (
          <Line
            key={edge.id}
            points={[src, mid, tgt]}
            color={color}
            lineWidth={1.5}
            dashed={edge.type === 'async_event'}
            dashSize={0.15}
            gapSize={0.1}
          />
        );
      })}
    </>
  );
}
```

**5. Write `apps/web/src/components/canvas/SceneController.tsx`**:
```tsx
import { useArchStore } from '../../store/useArchStore';
import { ArchNode } from './ArchNode';
import { ArchEdge } from './ArchEdge';

export function SceneController() {
  const graph = useArchStore((s) => s.graph);
  if (!graph) return null;

  return (
    <>
      {graph.nodes.map((node) => <ArchNode key={node.id} node={node} />)}
      <ArchEdge />
    </>
  );
}
```

### Constraints
- Camera `zoom: 80` and `position: [10, 10, 10]` are exact — do not change them.
- `ArchNode` must use `useFrame` for scale animation (lerp approach), not CSS transitions.
- `ArchEdge` must use a midpoint arc via the `mid` point to give edges a slight curve. Flat straight lines are not acceptable.
- `async_event` edges must be rendered as dashed lines using Drei `<Line dashed />`.
- Do not use `@react-spring/three` for the scale animation in this session — plain `useFrame` lerp only.

---

## SESSION 7 — UI Panels: PromptBar, NodeDetailPane, UtilitiesPanel

### Context
The 3D canvas renders. Now build the three HUD panels that overlay the canvas. All panels are absolutely positioned over `<IsoCanvas>`. Use Tailwind for styling. The color palette is: background `#0B0F1A`, surface `#0F172A`, border `#1E293B`, text-primary `#F1F5F9`, text-muted `#94A3B8`, accent `#3B82F6`.

### Task

**1. Write `apps/web/src/components/panels/PromptBar.tsx`**:
```tsx
import { useState } from 'react';
import { useGenerateArch } from '../../hooks/useGenerateArch';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';

export function PromptBar() {
  const [prompt, setPrompt] = useState('');
  const { generate, error } = useGenerateArch();
  const graph = useArchStore((s) => s.graph);
  const isLoading = useUIStore((s) => s.isLoading);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    const existingIds = graph?.nodes.map((n) => n.id);
    generate(prompt, existingIds);
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex gap-2 w-[600px] max-w-[90vw]">
      <input
        className="flex-1 bg-[#0F172A] border border-[#1E293B] text-[#F1F5F9] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#3B82F6] placeholder:text-[#475569] font-[Inter]"
        placeholder="Describe your system architecture…"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors"
      >
        {isLoading ? 'Generating…' : 'Generate'}
      </button>
      {error && (
        <div className="absolute top-full mt-1 left-0 text-red-400 text-xs">{error}</div>
      )}
    </div>
  );
}
```

**2. Write `apps/web/src/components/panels/NodeDetailPane.tsx`**:
```tsx
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';
import { NODE_COLORS } from '../../lib/nodeColors';

export function NodeDetailPane() {
  const selectedId = useArchStore((s) => s.selectedNodeId);
  const graph = useArchStore((s) => s.graph);
  const removeNode = useArchStore((s) => s.removeNode);
  const selectNode = useArchStore((s) => s.selectNode);
  const isOpen = useUIStore((s) => s.isDetailPaneOpen);
  const setDetailPane = useUIStore((s) => s.setDetailPane);

  const node = graph?.nodes.find((n) => n.id === selectedId);
  const edgeCount = graph?.edges.filter(
    (e) => e.source === selectedId || e.target === selectedId
  ).length ?? 0;

  if (!node) return null;
  const color = NODE_COLORS[node.type];

  return (
    <div className={`absolute top-0 right-0 h-full w-80 bg-[#0F172A] border-l border-[#1E293B] z-30 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} overflow-y-auto`}>
      <div className="p-5 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: `${color}22`, color }}>
              {node.type}
            </span>
            <h2 className="text-[#F1F5F9] text-lg font-semibold mt-1">{node.label}</h2>
            <p className="text-[#94A3B8] text-xs font-mono">{node.id}</p>
          </div>
          <button onClick={() => { setDetailPane(false); selectNode(null); }} className="text-[#475569] hover:text-[#94A3B8] text-xl leading-none">×</button>
        </div>

        {/* Technology */}
        <div>
          <p className="text-[#475569] text-xs uppercase tracking-wider mb-1">Technology</p>
          <span className="text-[#F1F5F9] text-sm font-mono bg-[#1E293B] px-2 py-1 rounded">{node.technology}</span>
        </div>

        {/* Description */}
        <div>
          <p className="text-[#475569] text-xs uppercase tracking-wider mb-1">Role</p>
          <p className="text-[#94A3B8] text-sm leading-relaxed">{node.description}</p>
        </div>

        {/* Responsibilities */}
        <div>
          <p className="text-[#475569] text-xs uppercase tracking-wider mb-2">Responsibilities</p>
          <ul className="space-y-1">
            {node.responsibilities.map((r, i) => (
              <li key={i} className="flex items-center gap-2 text-[#CBD5E1] text-sm">
                <span style={{ color }} className="text-xs">▸</span> {r}
              </li>
            ))}
          </ul>
        </div>

        {/* Metrics */}
        <div>
          <p className="text-[#475569] text-xs uppercase tracking-wider mb-2">Metrics</p>
          <div className="grid grid-cols-3 gap-2">
            {[['RPS', node.metrics.expected_rps], ['Data', node.metrics.data_size], ['SLA', node.metrics.sla]].map(([label, val]) => (
              <div key={label} className="bg-[#1E293B] rounded p-2 text-center">
                <p className="text-[#475569] text-xs">{label}</p>
                <p className="text-[#F1F5F9] text-xs font-mono mt-0.5">{val ?? '—'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Connections */}
        <div className="text-[#475569] text-sm">{edgeCount} connection{edgeCount !== 1 ? 's' : ''}</div>

        {/* Delete */}
        <button
          onClick={() => { removeNode(node.id); setDetailPane(false); selectNode(null); }}
          className="w-full mt-4 py-2 rounded border border-red-900 text-red-400 hover:bg-red-900/20 text-sm transition-colors"
        >
          Remove Node
        </button>
      </div>
    </div>
  );
}
```

**3. Write `apps/web/src/components/panels/UtilitiesPanel.tsx`**:
```tsx
import { useState } from 'react';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';
import { generateWorkspace } from '../../lib/api';

export function UtilitiesPanel() {
  const graph = useArchStore((s) => s.graph);
  const toggleUtility = useArchStore((s) => s.toggleUtility);
  const [path, setPath] = useState('');
  const [wsStatus, setWsStatus] = useState<'idle'|'loading'|'done'|'error'>('idle');

  if (!graph) return null;

  async function handleGenerate() {
    if (!path.trim() || !graph) return;
    setWsStatus('loading');
    try {
      await generateWorkspace(graph, path.trim());
      setWsStatus('done');
    } catch { setWsStatus('error'); }
  }

  return (
    <div className="absolute bottom-4 right-4 z-20 w-72 bg-[#0F172A] border border-[#1E293B] rounded-xl overflow-hidden">
      {/* Checklist */}
      <div className="p-4 border-b border-[#1E293B]">
        <p className="text-[#475569] text-xs uppercase tracking-wider mb-3">Utilities Checklist</p>
        <div className="space-y-2">
          {graph.utilities_checklist.map((u, i) => (
            <label key={i} className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!u.checked} onChange={() => toggleUtility(i)}
                className="rounded border-[#1E293B] bg-[#0B0F1A]" />
              <span className="text-[#CBD5E1] text-xs flex-1">{u.item}</span>
              <span className={`text-xs px-1.5 py-0.5 rounded font-mono ${
                u.status === 'required' ? 'bg-red-900/30 text-red-400' :
                u.status === 'recommended' ? 'bg-amber-900/30 text-amber-400' :
                'bg-slate-800 text-slate-400'
              }`}>{u.status}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Alternative architectures */}
      <div className="p-4 border-b border-[#1E293B]">
        <p className="text-[#475569] text-xs uppercase tracking-wider mb-3">Alternatives</p>
        <div className="space-y-2">
          {graph.alternative_architectures.map((alt, i) => (
            <div key={i} className="bg-[#1E293B] rounded p-2">
              <p className="text-[#F1F5F9] text-xs font-medium">{alt.name}</p>
              <p className="text-[#94A3B8] text-xs mt-0.5">{alt.tradeoff}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Workspace Generator */}
      <div className="p-4">
        <p className="text-[#475569] text-xs uppercase tracking-wider mb-2">Generate Workspace</p>
        <input
          className="w-full bg-[#0B0F1A] border border-[#1E293B] text-[#F1F5F9] text-xs rounded px-3 py-1.5 mb-2 font-mono outline-none focus:border-[#3B82F6]"
          placeholder="/Users/you/projects/myapp"
          value={path}
          onChange={(e) => setPath(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          disabled={wsStatus === 'loading'}
          className="w-full py-2 rounded bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white text-sm font-medium transition-colors"
        >
          {wsStatus === 'loading' ? 'Writing files…' : wsStatus === 'done' ? '✓ Done' : wsStatus === 'error' ? 'Error – retry' : 'Generate Workspace'}
        </button>
      </div>
    </div>
  );
}
```

### Constraints
- All color values must come from the palette defined in the Context header above. No off-palette colors.
- `NodeDetailPane` slide-in transition must be CSS `translate-x` driven by the `isOpen` Zustand value — no JS animation.
- `UtilitiesPanel` must show `wsStatus` feedback inline on the button — no separate alert or modal.
- Font families: `Inter` for all body text, `font-mono` (JetBrains Mono or system mono) for IDs, technology names, and paths.

---

## SESSION 8 — App Root Assembly

### Context
All components exist. Now wire everything together in `App.tsx` and `main.tsx`.

### Task

**1. Write `apps/web/src/App.tsx`**:
```tsx
import { IsoCanvas } from './components/canvas/IsoCanvas';
import { PromptBar } from './components/panels/PromptBar';
import { NodeDetailPane } from './components/panels/NodeDetailPane';
import { UtilitiesPanel } from './components/panels/UtilitiesPanel';
import { useUIStore } from './store/useUIStore';

export default function App() {
  const isLoading = useUIStore((s) => s.isLoading);

  return (
    <div className="w-screen h-screen bg-[#0B0F1A] overflow-hidden relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#0B0F1A]/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-[#94A3B8] text-sm">Generating architecture…</p>
          </div>
        </div>
      )}

      {/* 3D Canvas — fills entire screen */}
      <IsoCanvas />

      {/* HUD Panels — overlay the canvas */}
      <PromptBar />
      <NodeDetailPane />
      <UtilitiesPanel />
    </div>
  );
}
```

**2. Write `apps/web/src/main.tsx`**:
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**3. Write `apps/web/src/index.css`**:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Inter', sans-serif; background: #0B0F1A; color: #F1F5F9; }
```

**4. Update `tailwind.config.ts`** to add the font families:
```ts
import type { Config } from 'tailwindcss';
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
} satisfies Config;
```

**5. Update `apps/web/vite.config.ts`** to proxy API calls:
```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
```

### Constraints
- The loading overlay must use `backdrop-blur-sm` — this gives a polished feel during generation.
- `IsoCanvas` must be the bottom-most layer (rendered first, no `z-index`). All panels use `z-20` or higher.
- `React.StrictMode` must be kept — do not remove it.

---

## SESSION 9 — Workspace Generator CLI

### Context
The frontend and backend are complete. Now build the Node.js CLI in `packages/workspace-gen/` that receives the architecture JSON and writes a real directory structure to the user's local filesystem.

### Task

**1. Write `packages/workspace-gen/src/index.ts`** — CLI entry point:
```typescript
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';
import type { ArchGraph } from './types'; // copy the type inline or import

const graph: ArchGraph = JSON.parse(process.argv[2]);
const targetPath: string = process.argv[3];

import { generateDirectories } from './generators/directoryGen';
import { generateBoilerplate } from './generators/boilerplateGen';
import { generateIndex } from './generators/indexGen';

generateDirectories(graph, targetPath);
generateBoilerplate(graph, targetPath);
generateIndex(graph, targetPath);

console.log(`IsoStack: wrote workspace to ${targetPath}`);
```

**2. Write `packages/workspace-gen/src/generators/directoryGen.ts`**:
```typescript
import { mkdirSync } from 'fs';
import { join } from 'path';

export function generateDirectories(graph: any, base: string) {
  mkdirSync(base, { recursive: true });
  for (const node of graph.nodes) {
    mkdirSync(join(base, node.id), { recursive: true });
  }
}
```

**3. Write `packages/workspace-gen/src/generators/boilerplateGen.ts`**:
```typescript
import { writeFileSync } from 'fs';
import { join } from 'path';

const TEMPLATES: Record<string, (node: any) => Record<string, string>> = {
  Compute: (n) => ({
    'Dockerfile': `FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nEXPOSE 3000\nCMD ["node", "index.js"]\n`,
    'index.js': `// ${n.label}\n// Technology: ${n.technology}\n// ${n.description}\n\nconst http = require('http');\nconst server = http.createServer((req, res) => res.end('${n.label} OK'));\nserver.listen(3000);\n`,
    'package.json': JSON.stringify({ name: n.id, version: '1.0.0', description: n.description }, null, 2),
    'README.md': `# ${n.label}\n\n${n.description}\n\n## Responsibilities\n${n.responsibilities.map((r: string) => `- ${r}`).join('\n')}\n`,
  }),
  Database: (n) => ({
    'init.sql': `-- ${n.label} initialization\n-- Technology: ${n.technology}\n\nCREATE DATABASE IF NOT EXISTS ${n.id};\n`,
    '.env.example': `DB_HOST=localhost\nDB_PORT=5432\nDB_NAME=${n.id}\nDB_USER=postgres\nDB_PASSWORD=change_me\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  Cache: (n) => ({
    'redis.conf': `# ${n.label}\nmaxmemory 256mb\nmaxmemory-policy allkeys-lru\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  Queue: (n) => ({
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: confluentinc/cp-kafka:7.6.0\n    environment:\n      KAFKA_BROKER_ID: 1\n      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181\n`,
    'topics.sh': `#!/bin/bash\n# Create topics for ${n.label}\nkafka-topics.sh --create --topic ${n.id}-events --partitions 3 --replication-factor 1\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  Gateway: (n) => ({
    'kong.yml': `_format_version: "3.0"\nservices: []\nroutes: []\n# ${n.label} — ${n.technology}\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  Storage: (n) => ({
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: minio/minio\n    command: server /data\n    environment:\n      MINIO_ROOT_USER: admin\n      MINIO_ROOT_PASSWORD: change_me\n`,
    '.env.example': `S3_ENDPOINT=http://localhost:9000\nS3_BUCKET=${n.id}\nS3_ACCESS_KEY=admin\nS3_SECRET_KEY=change_me\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
};

const DEFAULT = (n: any) => ({
  'README.md': `# ${n.label}\n\nType: ${n.type}\nTechnology: ${n.technology}\n\n${n.description}\n\n## Responsibilities\n${n.responsibilities.map((r: string) => `- ${r}`).join('\n')}\n`,
});

export function generateBoilerplate(graph: any, base: string) {
  for (const node of graph.nodes) {
    const files = (TEMPLATES[node.type] ?? DEFAULT)(node);
    for (const [filename, content] of Object.entries(files)) {
      const path = require('path').join(base, node.id, filename);
      require('fs').writeFileSync(path, content);
    }
  }
}
```

**4. Write `packages/workspace-gen/src/generators/indexGen.ts`**:
```typescript
import { writeFileSync } from 'fs';
import { join } from 'path';

export function generateIndex(graph: any, base: string) {
  // Root README
  const readme = [
    `# ${graph.project_name}`,
    `\n${graph.description}`,
    `\n## Architecture\n`,
    ...graph.nodes.map((n: any) => `- **${n.label}** (${n.technology}): ${n.description}`),
    `\n## Services\n`,
    ...graph.nodes.map((n: any) => `- \`${n.id}/\``),
    `\n## Getting Started\n\`\`\`bash\ndocker-compose up\n\`\`\``,
  ].join('\n');
  writeFileSync(join(base, 'README.md'), readme);

  // Root docker-compose
  const services = graph.nodes
    .filter((n: any) => ['Compute','Database','Cache','Queue','Storage'].includes(n.type))
    .map((n: any) => `  ${n.id}:\n    build: ./${n.id}\n    # ${n.technology}`)
    .join('\n');
  writeFileSync(join(base, 'docker-compose.yml'), `version: '3.8'\nservices:\n${services}\n`);
}
```

**5. Write `apps/api/routers/workspace.py`**:
```python
import subprocess, json, sys
from pathlib import Path
from fastapi import APIRouter, HTTPException
from models.request_models import WorkspaceRequest

router = APIRouter()
CLI_PATH = Path(__file__).parent.parent.parent.parent / "packages/workspace-gen/src/index.ts"

@router.post("/workspace")
async def generate_workspace(req: WorkspaceRequest):
    try:
        result = subprocess.run(
            ["npx", "tsx", str(CLI_PATH), json.dumps(req.graph), req.target_path],
            capture_output=True, text=True, timeout=30,
        )
        if result.returncode != 0:
            raise HTTPException(status_code=500, detail=result.stderr)
        return {"success": True, "message": result.stdout.strip()}
    except subprocess.TimeoutExpired:
        raise HTTPException(status_code=504, detail="Workspace generation timed out")
```

### Constraints
- Every node type must have at least a `README.md` file generated — the `DEFAULT` fallback ensures this.
- The CLI receives the graph JSON as a command-line argument string (not via stdin) to avoid shell escaping issues.
- `subprocess.run` timeout must be 30 seconds. Do not remove it.
- The `docker-compose.yml` at the root must only include `Compute`, `Database`, `Cache`, `Queue`, and `Storage` nodes — not `Gateway`, `CDN`, or `External`.

---

## SESSION 10 — Polish: Entry Animation & Visual Depth

### Context
Everything works. Now make it visually stunning. Add the staggered node drop-in animation, edge draw-on animation, and particle flow on async edges.

### Task

**1. Update `ArchNode.tsx`** to add a drop-in entry animation:

Add a `birthTime` ref and use `useFrame` to animate `position.y` from `+5` (above) down to the final position with a bounce easing over 800ms:

```tsx
// Add inside ArchNode, before return:
const birthRef = useRef(Date.now() + node.grid_hint.col * 80 + node.grid_hint.row * 40); // stagger delay

useFrame(() => {
  if (!ref.current) return;
  const elapsed = Date.now() - birthRef.current;
  const t = Math.min(elapsed / 800, 1);
  // Bounce easing
  const bounce = t < 0.7
    ? 1 - Math.pow(1 - t / 0.7, 3)
    : 1 + Math.sin((t - 0.7) / 0.3 * Math.PI) * 0.08 * (1 - t);
  const targetY = pos[1];
  ref.current.position.y = (targetY + 5) * (1 - bounce) + targetY * bounce;
});
```

**2. Update `ArchEdge.tsx`** to add a draw-on animation:

Add a `progress` uniform to each edge that goes from `0 → 1` over 600ms after a delay based on edge index:
```tsx
// For each edge, track birthtime per edge id
// Use useFrame to interpolate a `drawRange` on the Line's geometry
// Simplest approach: use opacity lerp from 0→1 with a delay
// Add 'transparent' and 'opacity' props to <Line> driven by a per-edge ref
```

**3. Add particle dots on `async_event` edges:**

For each async_event edge, render a `<mesh>` small sphere that moves from `src` to `tgt` in a loop using `useFrame`:
```tsx
function FlowParticle({ src, tgt, color }: { src: [number,number,number], tgt: [number,number,number], color: string }) {
  const ref = useRef<any>(null);
  const t = useRef(Math.random()); // stagger start
  useFrame((_, delta) => {
    t.current = (t.current + delta * 0.4) % 1;
    if (!ref.current) return;
    ref.current.position.set(
      src[0] + (tgt[0]-src[0]) * t.current,
      src[1] + (tgt[1]-src[1]) * t.current + Math.sin(t.current * Math.PI) * 0.5,
      src[2] + (tgt[2]-src[2]) * t.current,
    );
  });
  return <mesh ref={ref}><sphereGeometry args={[0.06, 6, 6]} /><meshBasicMaterial color={color} /></mesh>;
}
```

Add `<FlowParticle>` inside `ArchEdge` for every edge where `type === 'async_event'`.

**4. Add camera intro zoom** in `IsoCanvas.tsx`:

```tsx
// Add inside the Canvas, as a child component:
function CameraIntro() {
  const { camera } = useThree();
  const start = useRef(Date.now());
  useFrame(() => {
    const t = Math.min((Date.now() - start.current) / 3000, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    (camera as any).zoom = 30 + ease * 50; // 30 → 80
    camera.updateProjectionMatrix();
  });
  return null;
}
```

### Constraints
- Stagger delay formula: `node.grid_hint.col * 80 + node.grid_hint.row * 40` milliseconds. This creates a left-to-right, top-to-bottom cascade.
- `FlowParticle` must use `Math.sin(t * Math.PI) * 0.5` for the arc — this creates a natural flow arc, not a straight line.
- Camera intro must go from `zoom: 30` to `zoom: 80` over 3000ms using cubic ease-out. Do not change those values.
- Performance: if the scene has more than 12 nodes, skip `FlowParticle` for all but the first 3 async edges to maintain 60fps.

---

## SESSION 11 — Final Integration Test & Error Handling

### Context
All features are complete. Now add robust error handling throughout and verify the full happy path works end-to-end. The AI layer uses OpenAI Structured Outputs via `client.beta.chat.completions.parse()`, which natively guarantees schema compliance — the only errors to handle are network failures, API quota errors, and downstream workspace CLI errors.

### Task

**1. Add a toast notification system** — install `react-hot-toast` and wrap `App.tsx`:
```tsx
import { Toaster } from 'react-hot-toast';
// Add inside the root div, before everything else:
<Toaster position="top-center" toastOptions={{ style: { background: '#0F172A', color: '#F1F5F9', border: '1px solid #1E293B' } }} />
```

**2. Update `useGenerateArch.ts`** to use `toast.error` on failure and `toast.success` on completion.

**3. Add a JSON export button** to `UtilitiesPanel.tsx`:
```tsx
function exportJSON(graph: ArchGraph) {
  const blob = new Blob([JSON.stringify(graph, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = 'isostack-arch.json'; a.click();
  URL.revokeObjectURL(url);
}
// Add a button above the Workspace Generator section that calls exportJSON(graph)
```

**4. Add the `+` add-node button** — a floating `+` button bottom-left that, when clicked, opens a modal with a list of all `NodeType` options. Selecting one adds a default node using `nextAvailableCell` from `isoLayout.ts` and calls `POST /api/describe-node` for its AI-generated description.

**5. Add `POST /describe-node`** to `apps/api/routers/generate.py`. This endpoint uses the OpenAI client imported from `openai_service.py` and also uses Structured Outputs with a small inline Pydantic model:

```python
from openai import AsyncOpenAI
from pydantic import BaseModel as PydanticBase
import os, json

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
```

**6. Verify these 5 end-to-end scenarios all work without errors:**
1. SaaS project prompt → canvas renders → hover node → detail pane opens
2. E-commerce prompt → canvas renders → delete a node → edges update
3. IoT pipeline prompt → add new Compute node via `+` button → drag to reposition
4. Real-time chat prompt → export JSON → valid JSON file downloads
5. Any prompt → generate workspace to a local path → directory tree exists on disk

### Constraints
- `toast` must fire on both success and error — never fail silently.
- The JSON export must trigger a real browser file download, not open in a new tab.
- `POST /describe-node` must use `client.beta.chat.completions.parse()` with `response_format=NodeDescription` — not a raw `create()` call with manual JSON parsing.
- `POST /describe-node` must never exceed `max_tokens: 400`.
- The `+` add-node button must be positioned `bottom-4 left-4` so it doesn't overlap the Utilities Panel.

---

## REFERENCE: Complete API Contract

Every route, method, request shape, and response shape in one place for quick lookup.

```
GET  /health
  → { "status": "ok" }

POST /generate
  Request:  { "prompt": string, "existing_node_ids": string[] | null }
  Response: ArchGraph (see schema in SESSION 1)
  AI:       gpt-4o via client.beta.chat.completions.parse(response_format=ArchGraph)

POST /workspace
  Request:  { "graph": ArchGraph, "target_path": string }
  Response: { "success": boolean, "message": string }

POST /describe-node
  Request:  { "node_type": string, "label": string, "project_context": string }
  Response: { "description": string, "responsibilities": string[], "metrics": NodeMetrics }
  AI:       gpt-4o via client.beta.chat.completions.parse(response_format=NodeDescription)
```

---

## REFERENCE: Color & Visual Tokens

```
Background:       #0B0F1A
Surface:          #0F172A
Border:           #1E293B
Text Primary:     #F1F5F9
Text Muted:       #94A3B8
Text Faint:       #475569
Accent Blue:      #3B82F6

Node Colors:
  Compute   #3B82F6    Edge Colors:
  Database  #10B981      sync_http    #60A5FA
  Cache     #F59E0B      async_event  #FB923C
  Queue     #8B5CF6      data_stream  #34D399
  Storage   #6B7280      db_query     #A3E635
  Gateway   #EF4444      cache_read   #FCD34D
  Auth      #EC4899      auth_check   #F472B6
  CDN       #06B6D4
  Observer  #14B8A6
  External  #9CA3AF
```

---

## REFERENCE: Run Commands

```bash
# Backend (Terminal 1)
cd apps/api
uvicorn main:app --reload --port 8000

# Frontend (Terminal 2)
cd apps/web
pnpm dev

# Test the API directly
curl -X POST http://localhost:8000/generate \
  -H "Content-Type: application/json" \
  -d '{"prompt": "A real-time chat app with message history and user presence"}'
```
