# Node Creator and Discovery

The node creator is the editor’s discovery surface for finding and inserting nodes. It is one of the most important UX layers because workflows are assembled through node discovery as much as through direct manipulation.

## Core Function

The node creator helps users:

- browse available node types
- search within the catalog
- decide where a node should be inserted
- understand the node family and purpose before adding it

This experience sits between the workflow canvas and the broader node registry. It converts node metadata into a guided insertion experience.

## UX Role

The node creator is not only a search UI. It also shapes the mental model of the editor by making the node ecosystem feel navigable and approachable. That is crucial in a platform with many integrations and node variants.

## Architectural Relationship

It depends on the node registry for the available options and on the workflow document model for insertion context. This creates a strong separation of concerns: the catalog defines what is available, while the workflow state defines where it should go.

## Architectural Importance

Node discovery is one of the clearest examples of how the frontend turns a technical catalog into an ergonomic product experience.
