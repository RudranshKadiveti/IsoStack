# State Management and Stores

The frontend uses Pinia-based stores to manage editor state in a structured way. The store layer is important because it allows the UI to separate transient interaction state from the underlying workflow document and to share state across several components without excessive prop drilling.

## Store Roles

The store system is used for several kinds of state:

- workflow document state
- execution state
- node-details and panel preferences
- UI state such as selection, focus, or onboarding flags

This makes the editor resilient to complex interactions because state changes can be centralized and coordinated.

## Why the Store Pattern Fits

The editor has many independent but overlapping concerns. A node selection change, for example, may affect the canvas, the NDV, the command palette, and the properties panel. Stores provide a shared substrate for these updates.

## Architectural Pattern

The overall approach is not one giant global store. Instead, the system favors multiple scoped stores that align with domain boundaries. The workflow document store acts as a major domain store, while more focused stores handle interaction-specific concerns such as node-details UI or experimental view modes.

## Architectural Significance

The store architecture gives the editor a stable state model without turning every component into a state owner. It creates a clear separation between persistent workflow data and transient UI behavior.
