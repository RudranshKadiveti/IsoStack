# Execution and Run Data

Execution and run-data views are an integral part of the editor experience. They let the user inspect the behavior of nodes during workflow execution and connect visual feedback with the underlying workflow model.

## Purpose of the Execution Layer

The execution features help users understand:

- which nodes ran
- which data passed through them
- what errors occurred and where
- how different runs or branches are represented

This adds a runtime lens on top of the static workflow representation.

## Relationship to the Workflow Document

The execution layer does not replace the document model; it overlays onto it. The workflow document remains the structural source of truth, while execution views show how the workflow behaved when run.

## Why This Is Distinct from Editing

Editing and execution are closely connected but conceptually different. Editing concerns structure and configuration; execution concerns observed behavior. The architecture preserves that distinction by keeping the runtime view as a coordinated layer rather than merging it into the editing state.

## Architectural Significance

Execution feedback is one of the strongest examples of the editor’s layered design. It adds a temporal dimension to a primarily structural interface without sacrificing coherence.
