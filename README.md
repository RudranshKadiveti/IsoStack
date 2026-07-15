<div align="center">

```
╔══════════════════════════════════════════════════════╗
║                                                        ║
║   ▀█▀  █▀▀  █▀█  █▀▀  ▀█▀  ▄▀█  █▀▀  █▄▀              ║
║    █   ▀▀█  █ █  ▀▀█   █   █▀█  █    █▀▄              ║
║   ▀▀▀  ▀▀▀  ▀▀▀  ▀▀▀   ▀▀  ▀ ▀  ▀▀▀  ▀ ▀              ║
║                                                        ║
╚══════════════════════════════════════════════════════╝
```

### The Professional Canvas for System Design

*A web-based system architecture modeling tool, built with the interaction fidelity of VS Code and the canvas ergonomics of n8n.*

[![Status](https://img.shields.io/badge/status-active%20development-orange?style=flat-square&labelColor=1a1a2e)](https://github.com/RudranshKadiveti/IsoStack)
[![Milestone](https://img.shields.io/badge/milestone-2%20%E2%80%94%20Editor%20Foundation-8B5CF6?style=flat-square&labelColor=1a1a2e)](#-milestone-history)
[![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-3B82F6?style=flat-square&labelColor=1a1a2e)](https://vitejs.dev/)
[![Canvas](https://img.shields.io/badge/canvas-React%20Flow-FF0072?style=flat-square&labelColor=1a1a2e)](https://reactflow.dev/)
[![State](https://img.shields.io/badge/state-Zustand%20%2B%20Zundo-F59E0B?style=flat-square&labelColor=1a1a2e)](https://github.com/pmndrs/zustand)
[![UI](https://img.shields.io/badge/primitives-Radix%20UI-161618?style=flat-square&labelColor=1a1a2e)](https://www.radix-ui.com/)
[![License](https://img.shields.io/badge/license-MIT-gray?style=flat-square&labelColor=1a1a2e)](./LICENSE)

*Describe a system. Compose it visually. Own the diagram, not just the drawing.*

</div>

---

## Table of Contents

- [Overview](#overview)
- [Why IsoStack](#why-isostack)
- [Features](#-features)
  - [Dynamic Node Registry](#-dynamic-node-registry)
  - [Context-Aware Properties (NDV)](#️-context-aware-properties-ndv)
  - [Advanced Canvas Interactions](#️-advanced-canvas-interactions)
  - [Command Palette & Discovery](#-command-palette--discovery)
  - [Keyboard Shortcuts](#️-keyboard-shortcuts)
  - [Context Menus](#️-context-menus)
  - [Time-Travel History](#-time-travel-history)
  - [Export & Import](#-export--import)
- [How It Works](#-how-it-works)
- [Architecture](#️-architecture)
- [Tech Stack](#-tech-stack)
- [Design System](#-design-system)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Project Conventions](#-project-conventions)
- [Development Status](#-development-status)
- [Milestone History](#-milestone-history)
- [Roadmap](#️-roadmap)
- [FAQ](#-faq)
- [Contributing](#-contributing)
- [License](#-license)

---

## Overview

**IsoStack** is a system architecture modeling and design tool built for engineers who think visually. It provides a fast, keyboard-driven, infinitely-extensible canvas for composing distributed systems out of real-world building blocks — databases, gateways, queues, caches, and services — with the kind of interaction polish typically reserved for professional IDEs and node-based automation tools.

With the completion of **Milestone 2: Professional Editor Foundation**, IsoStack has evolved from a diagramming surface into a genuine **editor**: a registry-driven architecture, context-aware property panels, full undo/redo history, fuzzy-search command discovery, and multi-format export — all engineered to make designing a system feel as fluid as writing code.

IsoStack is not trying to be a generic whiteboard. Every node on the canvas represents a real, opinionated piece of infrastructure — a Postgres instance, a Node.js runtime, a Redis cache, an API gateway — and the editor is built around that fact. The registry, the properties panel, and the command palette all read from the same source of truth, so the tool never drifts into "just shapes and arrows."

---

## Why IsoStack

Most architecture diagrams live and die in slide decks or static whiteboard exports — disconnected from the systems they describe, and painful to keep up to date. IsoStack takes the opposite approach:

- **Structured, not freeform.** Every component is a typed node with real metadata, not an arbitrary rectangle.
- **Editor-grade interactions.** Undo/redo, lasso selection, command palettes, and keyboard shortcuts — the muscle memory engineers already have from VS Code and n8n should carry over directly.
- **Registry-driven, not hardcoded.** Adding a new service to the catalog is a data change, not a UI rewrite.
- **Portable by default.** Architectures export cleanly to PNG, SVG, and JSON, so diagrams can live in documentation, PRs, or version control — not just inside the tool.

---

## ✨ Features

### 🧩 Dynamic Node Registry

At the core of IsoStack is a fully decoupled node registry — a single source of truth that defines every service's metadata:

- **Icons** — visual identity per node type
- **Variants** — e.g. PostgreSQL vs. MySQL vs. MongoDB under a shared "Database" category
- **Categories** — Database, Cache, Queue, Gateway, Compute, Observability, Auth, and more
- **Tags** — searchable, freeform classifiers (`sql`, `in-memory`, `pub/sub`, `serverless`, etc.)
- **Aliases** — alternate names and abbreviations so search "just works" (`pg`, `postgres`, `psql` all resolve to the same node)

Because the sidebar, the command palette, and the properties panel all query this same registry, introducing a brand-new service to IsoStack is a matter of **adding a data entry**, not touching rendering logic in three different places. This is the architectural decision that makes every other editor feature possible without duplicated logic.

### 🎛️ Context-Aware Properties (NDV)

The **Node Detail View (NDV)** is IsoStack's property inspector, and it is entirely dynamic. Rather than rendering a fixed set of fields for every node, it reads the selected node's registry definition and generates the appropriate inputs on the fly:

- A **PostgreSQL** node surfaces port configuration, connection pool size, and replication settings.
- A **Node.js runtime** node surfaces memory limits, entry points, and environment variables.
- A **Redis cache** node surfaces eviction policy and max memory settings.

This means the properties panel scales automatically as the registry grows — new variants get correct, tailored property forms for free, without any additional per-node UI code.

### 🖱️ Advanced Canvas Interactions

The canvas is built on React Flow but heavily extended for real editing workflows:

- **Lasso Selection** — drag a selection box across the canvas to select multiple nodes at once, mirroring the selection model of professional design and IDE tools.
- **Bulk Movement** — reposition entire groups of selected nodes together, preserving relative layout.
- **Bulk Deletion** — remove multiple selected nodes (and their connected edges) in a single action.
- **Predictable, editor-grade feel** — interactions are tuned to avoid the jittery, imprecise feel common in many canvas tools, taking cues from how n8n and Figma handle multi-select.

### ⌘ Command Palette & Discovery

A fast, global command palette — summoned instantly and backed directly by the node registry — brings VS Code–style discovery to architecture design:

- **Fuzzy search** across node names, aliases, categories, vendors, and tags
- **Instant insertion** — select a result and the node is placed directly onto the canvas
- Designed so that a user who knows *roughly* what they want ("queue", "pg", "cdn") never has to hunt through a nested sidebar

### ⌨️ Keyboard Shortcuts

A centralized shortcut manager provides first-class support for the muscle-memory commands engineers expect out of any serious editor:

| Shortcut | Action | Notes |
|---|---|---|
| `Ctrl+Z` | Undo | Steps backward through full canvas history |
| `Ctrl+Y` | Redo | Steps forward through undone actions |
| `Ctrl+D` | Duplicate | Clones the current selection with a positional offset |
| `Ctrl+A` | Select All | Selects every node currently on the canvas |

The shortcut manager is centralized rather than scattered across components, so adding new bindings in future milestones (e.g. `Ctrl+G` for grouping) is a single, predictable change.

### 🖥️ Context Menus

Right-click, contextual menus — built on **Radix UI** for accessibility and consistent behavior — bring localized actions directly to the cursor:

- Add a new node at the exact clicked position
- Duplicate the current selection
- Access canvas-level actions without breaking flow by reaching for a toolbar

### ⏪ Time-Travel History

Every mutation to the canvas — node creation, movement, deletion, property edits, connections — is tracked through **Zundo**, layered transparently on top of the core **Zustand** store. This gives IsoStack:

- Deep, granular undo/redo (not just a single-step "oops" safety net)
- A consistent, predictable history model that will directly underpin **collaborative editing** in a future milestone
- A foundation for the upcoming **Store Split** (see [Roadmap](#️-roadmap)), which will scope this history tracking exclusively to persistent document state

### 📤 Export & Import

Architectures in IsoStack are portable by design:

- **PNG export** — a flattened, presentation-ready snapshot of the current canvas
- **SVG export** — a scalable, vector-perfect diagram suitable for docs and design reviews
- **JSON export** — the full, structured architecture state, including every node, property, and connection
- **JSON import** — rehydrate a previously exported architecture back into a live, fully editable canvas session

This means an IsoStack architecture can live in a Git repository, a design doc, or a PR description — not just inside the tool itself.

---

## 🔄 How It Works

```
User opens the IsoStack canvas
        │
        ▼
Node Registry loads
  (icons, variants, categories, tags, aliases)
        │
        ├──► Sidebar renders categorized, filterable node list
        ├──► Command Palette indexes registry for fuzzy search
        └──► Context Menus reference registry for "Add Node" actions
        │
        ▼
User inserts nodes onto the React Flow canvas
  (via sidebar, command palette, or right-click menu)
        │
        ▼
Zustand store (wrapped in Zundo) records canvas state
        │
        ├── Node creation / deletion
        ├── Position + connection changes
        ├── Lasso-selected bulk operations
        └── Property edits from the NDV
        │
        ▼
Node Detail View (NDV) reads the selected node's
registry definition and renders matching property inputs
        │
        ▼
Every mutation is pushed onto the Zundo history stack
        │
        ├──► Ctrl+Z / Ctrl+Y walk backward/forward through state
        │
        ▼
User exports the finished architecture
        │
        ├── PNG  → flattened raster snapshot
        ├── SVG  → scalable vector diagram
        └── JSON → full structured state (re-importable)
```

---

## 🏛️ Architecture

IsoStack's editor is built around a strict separation between **what a node is** (the registry) and **how it behaves on screen** (the canvas and panels). This is what keeps the properties panel, the command palette, and the sidebar perfectly in sync without duplicated logic anywhere in the codebase.

```
IsoStack/
└── apps/
    └── web/                          # Vite + React + TypeScript frontend
        └── src/
            ├── registry/              # Node registry — the single source of truth
            │   ├── nodeDefinitions/   # Metadata: icons, variants, categories, tags, aliases
            │   ├── categories.ts      # Category taxonomy (Database, Cache, Queue, etc.)
            │   └── index.ts           # Registry lookup + query utilities
            │
            ├── components/
            │   ├── canvas/            # React Flow canvas surface
            │   │   ├── LassoSelection.tsx
            │   │   ├── CanvasContextMenu.tsx
            │   │   └── NodeRenderer.tsx
            │   ├── commandPalette/    # Fuzzy search + registry-backed discovery
            │   │   ├── CommandPalette.tsx
            │   │   └── fuzzySearch.ts
            │   ├── nodeDetailPane/    # Context-aware (NDV) property editor
            │   │   ├── NodeDetailPane.tsx
            │   │   └── propertyRenderers/   # Per-type input components
            │   ├── sidebar/           # Registry-driven node catalog
            │   └── ui/                # Shared UI primitives (design tokens)
            │
            ├── store/
            │   ├── architectureStore.ts  # Zustand store, wrapped in zundo for undo/redo
            │   └── shortcuts.ts          # Centralized keyboard shortcut manager
            │
            ├── lib/
            │   ├── exporters/         # PNG / SVG / JSON export logic
            │   ├── importers/         # JSON import + state hydration
            │   └── layout/            # Node positioning helpers
            │
            └── hooks/                 # Shared canvas + editor hooks
```

### Key architectural principles

1. **Single source of truth.** The registry is the only place node metadata is defined. Every consumer (sidebar, palette, NDV) reads from it — nothing is duplicated or hardcoded downstream.
2. **State isolation (in progress).** The current store handles both persistent document data and transient UI state. Milestone 3 formally separates these (see [Roadmap](#️-roadmap)).
3. **History as a first-class citizen.** Undo/redo isn't bolted on — every store mutation flows through Zundo, making history tracking a structural guarantee rather than a per-feature afterthought.
4. **Composable exports.** Export logic is decoupled from the canvas renderer, so PNG, SVG, and JSON exports all derive from the same underlying architecture state rather than three separate code paths.

---

## 🧱 Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Framework** | React 18 + TypeScript | Type-safe, component-driven UI |
| **Build Tool** | Vite | Fast dev server + optimized builds |
| **Canvas Engine** | [React Flow](https://reactflow.dev/) (`@xyflow/react`) | Node-graph rendering and interaction |
| **State Management** | [Zustand](https://github.com/pmndrs/zustand) | Lightweight, unopinionated global state |
| **History Tracking** | [Zundo](https://github.com/charkour/zundo) | Time-travel undo/redo middleware for Zustand |
| **UI / Styling** | Vanilla CSS + design tokens | Consistent, themeable visual language |
| **Icons** | [Lucide React](https://lucide.dev/) | Crisp, consistent iconography |
| **Overlays / Menus** | [Radix UI](https://www.radix-ui.com/) | Accessible, unstyled context menu primitives |

---

## 🎨 Design System

IsoStack's visual language is built on a token-based CSS system rather than a heavyweight UI framework, keeping the editor lightweight and fully customizable:

- **Color tokens** define the canvas background, node states (default, selected, hovered), and category-based accent colors
- **Spacing and radius tokens** keep node cards, panels, and menus visually consistent across the app
- **Typography tokens** standardize font weights and sizes between the sidebar, NDV, and command palette
- Icons are sourced consistently from **Lucide React**, ensuring every registry entry has a matching, stylistically consistent glyph

This approach keeps the editor's look fully under project control, rather than inheriting the defaults of a third-party component library.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** 9 or higher

### Installation

```bash
git clone https://github.com/RudranshKadiveti/IsoStack.git
cd IsoStack
npm install
```

### Run the development server

```bash
npm run dev
```

The app will be available at:

```
http://localhost:5173
```

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Starts the Vite development server with hot module reload |
| `npm run build` | Type-checks and produces an optimized production build |
| `npm run preview` | Serves the production build locally for final verification |
| `npm run lint` | Runs the project's linting rules across the codebase |

---

## 📐 Project Conventions

- **Registry-first development.** New node types are added by extending `registry/nodeDefinitions/`, not by writing bespoke UI components.
- **Typed everything.** All node metadata, store state, and property schemas are fully typed with TypeScript — the registry acts as the contract between data and UI.
- **No silent store mutations.** All canvas mutations flow through the Zustand store's defined actions so they're captured correctly by the Zundo history middleware.
- **Composable panels.** Property inputs in the NDV are built as small, reusable renderers keyed by property type, not as one large per-node form.

---

## 🧭 Development Status

> **IsoStack is under active development.**
>
> **Milestone 2 — Professional Editor Foundation** is complete. The registry-driven canvas, context-aware property panels, command palette, keyboard shortcuts, lasso selection, undo/redo history, and export/import pipeline are all working end-to-end.
>
> APIs, store shape, and internal schemas may still change between commits without notice. Not yet recommended for production use.

---

## 🏁 Milestone History

### ✅ Milestone 1 — Foundation
Initial canvas setup, basic node rendering, and the earliest version of the service catalog.

### ✅ Milestone 2 — Professional Editor Foundation *(current)*
A ground-up upgrade of the editor experience, drawing inspiration from the frontend architecture of tools like **n8n** and **VS Code**:

- Dynamic, decoupled node registry powering the entire UI
- Context-aware Node Detail View (NDV)
- Lasso selection with bulk move/delete
- Registry-backed command palette with fuzzy search
- Centralized keyboard shortcut manager
- Radix UI–powered right-click context menus
- Full undo/redo history via Zustand + Zundo
- PNG / SVG / JSON export and JSON import

### 🔜 Milestone 3 — Store Split Architecture *(in progress)*
See [Roadmap](#️-roadmap) below for full detail.

---

## 🗺️ Roadmap

### Milestone 3 — Store Split Architecture *(in progress)*

The current Zustand store handles both persistent architecture data and transient UI state in one place. This milestone splits it cleanly into:

- **Document Store** — the persistent, undo-tracked source of truth for the architecture itself (nodes, edges, properties). This is the only store wrapped in Zundo going forward.
- **UI Store** — transient interaction state (current selection, hover state, panel visibility, palette open/closed) that should **never** pollute undo/redo history.

This separation directly sets up cleaner history semantics and is a prerequisite for real-time collaborative editing.

### Canvas Grouping

Introduce **visual bounded contexts** on the canvas, allowing nodes to be grouped into containers that represent real infrastructure boundaries:

- VPCs and Subnets
- Custom logical groupings (e.g. "Payments Domain", "Public Zone")
- Collapse/expand groups, and move an entire group as a single unit

### AI Generation & Simulation *(deferred)*

Natural-language-driven architecture generation, dynamic traffic simulation, and failure-mode analysis are planned, but intentionally **deferred** until the core editor foundation — registry, store architecture, and grouping — is fully mature. Building AI generation on top of an unstable editor foundation would mean rebuilding it twice.

### Longer-Term Vision

- Shareable architecture links with version history
- Real-time, multi-cursor team collaboration
- Cloud cost estimation mapped across AWS / GCP / Azure
- Multi-model AI design assistance and automated architecture critique
- Deployment pipeline integrations (GitHub Actions, Terraform Cloud, Kubernetes)

---

## ❓ FAQ

**Is IsoStack an AI diagram generator?**
Not currently. Milestone 2 focused entirely on making the manual editing experience excellent — registry-driven nodes, undo/redo, command palette, and export. AI-assisted generation is on the long-term roadmap but is intentionally deferred until the editor foundation (in particular, the Milestone 3 store split) is complete.

**Can I add my own node types?**
Yes — the registry is designed for exactly this. Adding a new entry to `registry/nodeDefinitions/` with the right metadata (icon, category, variant, tags, aliases) makes it immediately available in the sidebar, the command palette, and the NDV, with no additional UI work required.

**Why Zustand + Zundo instead of Redux?**
Zustand keeps the store API minimal and unopinionated, which fits IsoStack's registry-driven philosophy. Zundo layers time-travel history on top without needing a separate action-replay system, making full undo/redo a near-drop-in addition rather than a significant architectural investment.

**Is there a backend?**
The current milestone is fully client-side, focused on the editor experience. Persistent storage, sharing, and collaboration are part of the roadmap and will introduce backend services in a future milestone.

---

## 🤝 Contributing

This project is in early, active development. Contributions and feedback are welcome — please open an issue before submitting a pull request so scope and direction can be aligned ahead of time.

---

## 📄 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for details.

---

<div align="center">

Built by [Rudransh Kadiveti](https://github.com/RudranshKadiveti)

</div>
