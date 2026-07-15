# Workflow Document Model

The workflow document model is the conceptual center of the editor UI. It represents the current workflow as a document-like object and exposes the structure that the canvas, node settings, execution panels, and interaction systems all depend on.

## Role of the Document Store

The document store is treated as the primary source of truth for the editor. It owns or coordinates:

- node definitions and their current values
- connections between nodes
- groups and group metadata
- workflow-level metadata such as IDs and document identity
- derived views for rendering and editing

This makes the editor more predictable because many UI surfaces are not maintaining their own parallel copies of workflow state. They consume what the document model exposes.

## Why It Matters

A workflow editor needs to support many simultaneous perspectives of the same object:

- the canvas sees a spatial, visual representation;
- the node details view sees a form-driven representation;
- execution panels see runtime data overlaid onto the same nodes;
- commands and actions need a consistent shape for mutation.

The document model provides a stable meeting point for these perspectives.

## Derived State and Render Projection

The editor does not rely on one raw workflow object for every UI concern. Instead, it uses projection layers to create render-friendly and interaction-friendly views from the underlying document. This is useful for:

- canvas layout and node display sizing
- collapsed or expanded group states
- execution-aware rendering
- node selection and bulk operations

That split between canonical document state and derived view state is a central design choice in the architecture.

## Architectural Summary

If the application shell is the frame, the workflow document model is the engine room. It keeps the editor coherent even when different surfaces need different ways of looking at the same workflow.
