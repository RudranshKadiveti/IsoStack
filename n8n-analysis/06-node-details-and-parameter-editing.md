# Node Details and Parameter Editing

The node details experience, often called the NDV, is the editor’s focused configuration surface. It opens when a node is selected for deeper inspection or editing and presents a structured view of the node’s behavior, output, and parameters.

## Core Purpose

The NDV is responsible for three related concerns:

- showing the active node’s parameter configuration
- exposing run data and execution input/output context
- enabling focused editing without losing the larger workflow context

This makes it a specialized overlay rather than a generic settings page.

## Interaction Structure

The NDV is a composition of several panels:

- a main parameters panel for node configuration
- input and output panels for execution and data inspection
- a header and navigation affordances for moving between context and workflow view

The layout is intentionally modular so that different node types can present their settings in ways that suit their behavior.

## State Coordination

The NDV relies on a workflow-scoped store to coordinate active-node state, panel display modes, run selection, and display context. This keeps the node inspection experience synchronized with the rest of the editor.

## Architectural Importance

The NDV demonstrates a recurring pattern in the frontend: specialized experiences are mounted over the same underlying workflow state rather than re-implementing it. That allows the editor to offer both broad canvas editing and deep node inspection with a shared foundation.
