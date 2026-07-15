# n8n Frontend Architecture Guide

This folder contains a documentation-oriented architecture handbook for the n8n frontend. It is intentionally descriptive rather than implementation-heavy, and focuses on how the editor experience is composed, why its major subsystems exist, and how they interact.

## Reading Order

1. Start with the overview to understand the high-level layers.
2. Follow the shell, routing, and workflow document documents for the editor backbone.
3. Continue with the canvas, node registry, NDV, and state-management chapters.
4. Finish with interaction, design system, execution, testing, and evolution notes.

## Document Map

- [01-frontend-architecture-overview.md](01-frontend-architecture-overview.md) — the big-picture structure of the editor UI.
- [02-application-shell-and-routing.md](02-application-shell-and-routing.md) — how the app boots and how route-driven views are organized.
- [03-workflow-document-model.md](03-workflow-document-model.md) — the document-centric state model that powers the editor.
- [04-canvas-engine.md](04-canvas-engine.md) — the workflow canvas subsystem and viewport interaction model.
- [05-node-registry-and-node-types.md](05-node-registry-and-node-types.md) — how node metadata is discovered and presented.

## Design Intent

The frontend is organized around a few durable principles:

- a workflow document is the primary source of truth;
- the editor shell is route-driven and feature-oriented;
- the canvas is a specialized interaction surface, not a generic page;
- node configuration, execution feedback, and command entry points are separate but coordinated experiences.

This guide documents those patterns without recreating the product itself.
