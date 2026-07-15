# Evolution and Maintenance

The n8n frontend is structured in a way that supports both rapid iteration and long-term maintenance. Its architecture favors modularity, shared state, and domain boundaries that are meaningful to the product rather than to implementation convenience alone.

## Why the Architecture Endures

The editor has grown into a sophisticated product, but its structure remains understandable because each subsystem has a clear role. The canvas manages visualization and manipulation, the document model manages workflow truth, the NDV manages focused configuration, and the shell provides composition and navigation.

## Maintenance Implications

This structure helps when adding features because new capabilities can often be introduced as additional layers or submodules rather than by expanding one massive component. That reduces coupling and makes it easier to reason about change.

## Architectural Lesson

The largest insight from the frontend architecture is that product coherence comes from strong boundaries. The editor feels manageable not because it is simple, but because its complexity is distributed across well-understood responsibilities.
