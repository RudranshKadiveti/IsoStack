# Canvas Engine

The workflow canvas is the most visible subsystem in the frontend. It is responsible for rendering nodes and connections, handling selection, supporting pan and zoom, and translating user input into workflow actions.

## Core Responsibilities

The canvas subsystem manages:

- node and connection rendering
- viewport transforms and canvas navigation
- node selection and multi-selection
- group rendering and grouping logic
- interaction affordances such as dragging, panning, and zoom controls

A large part of the editor experience depends on this layer feeling immediate and predictable, especially when workflows become larger and more complex.

## Interaction Model

The canvas is designed to be both visual and operational. Nodes can be moved, selected, duplicated, grouped, and inspected, while the view itself can be navigated using keyboard shortcuts, drag gestures, or toolbar controls.

This makes the canvas a hybrid surface:

- a visual map of the workflow
- an interaction plane for manipulation
- a coordination hub for other editor features

## Relationship to the Document Model

The canvas does not own the workflow itself. Instead, it consumes data from the document model and translates it into a viewport-aware rendering model. That keeps the view layer responsive and makes it easier to reason about selection state and node layout without entangling them with the underlying workflow data.

## Grouping and Layout Awareness

The canvas also supports group structures, which adds another layer of abstraction. Groups are not just visual containers; they can influence selection behavior, hiding, expansion, and context-menu availability. This is one reason the canvas architecture is richer than a simple node graph renderer.

## Architectural Role

The canvas is the editor’s primary collaboration surface. It brings the workflow into a navigable, manipulable form and acts as the main bridge between user intent and workflow state change.
