# Design System and UI Primitives

The frontend relies on a shared design-system package for reusable UI primitives. This is important because the editor must remain consistent across panels, dialogs, buttons, forms, overlays, and icons while still supporting highly specialized workflows.

## Design-System Role

The design system provides:

- shared visual language and tokens
- reusable components such as buttons, cards, dialogs, and inputs
- layout and spacing conventions
- interaction patterns for accessibility and consistency

Using the design system makes the editor feel like a coherent product instead of a collection of one-off components.

## Why It Matters for the Editor

The workflow editor is deeply interactive and needs many small UI decisions to remain predictable. Shared primitives help preserve that consistency even as the surface area grows across features.

## Architectural Relationship

The editor UI consumes the design system rather than re-implementing common patterns from scratch. In that sense, the design system serves as the visual and interaction foundation for the product experience.
