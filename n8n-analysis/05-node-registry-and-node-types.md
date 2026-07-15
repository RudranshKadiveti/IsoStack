# Node Registry and Node Types

The node registry is the frontend’s catalog of available node definitions. It provides the metadata needed to display nodes in the editor, populate the node creator experience, and render parameter forms in the node configuration UI.

## What the Registry Provides

The node-type layer is responsible for making node definitions discoverable and usable in the interface. It supplies information such as:

- node family and category
- display labels and subtitles
- parameter schema and UI hints
- trigger and execution characteristics
- compatibility and version information

This information is central to the editor because the same node type may be shown in multiple places: the canvas, the node creator, the NDV, and the context menu.

## Why a Separate Registry Exists

The editor cannot rely on the workflow document alone for node presentation. The workflow document contains instances of nodes in a given workflow, but the UI also needs the broader catalog of what a node can do. The registry bridges that gap by providing node-type knowledge independent of any single workflow instance.

## Relationship to the Workflow State

Workflow instances reference node types, but the registry is a shared source of behavior and metadata. This separation helps the system remain composable: the same node type can appear in many canvases or contexts without duplicating the metadata each time.

## Architectural Significance

The node registry is one of the main reasons the editor can feel extensible. It allows the UI to present nodes consistently even as the underlying integration ecosystem grows.
