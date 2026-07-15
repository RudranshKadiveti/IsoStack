# Telemetry and Observability

The frontend includes telemetry and observability hooks that help track how users interact with the product. These hooks are not the center of the architecture, but they influence how features are built and how the editor evolves.

## Why Observability Matters

The editor is complex and highly interactive. Telemetry helps product and engineering teams understand which flows are used, where users struggle, and which interactions are most meaningful.

## Typical Signals

Telemetry can capture events such as:

- opening the node details view
- changing node parameters
- running workflows
- switching panels or display modes
- using keyboard shortcuts or command surfaces

These signals are useful because they reveal the live behavior of the interface beyond static code structure.

## Architectural Role

Telemetry is typically wired in at the component and composable boundaries rather than embedded deep into the core domain model. That keeps the business logic clean while preserving visibility into how the product is used.

## Architectural Importance

Observability complements the architecture by making it easier to understand real user behavior and adjust the experience over time.
