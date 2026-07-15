# Command System and Shortcuts

The editor provides a keyboard-first interaction model that goes beyond simple hotkeys. It includes command-style entry points, context-aware shortcuts, and actions that can be triggered from the canvas, the node details experience, or the broader app shell.

## Shortcut Design

Keyboard shortcuts are not just convenience features. They are part of the editor’s core interaction language. Actions such as selection traversal, duplication, grouping, zooming, running, and saving are routed through a centralized shortcut system.

This gives the editor a consistent action model:

- a shortcut is a command trigger;
- the command resolves to a workflow or UI action;
- the action updates the document or view state accordingly.

## Command Surface Patterns

The front end also includes command-based surfaces such as command palettes and contextual action menus. These systems are important because they offer the same capabilities in a discoverable way for users who prefer navigation over memorized shortcuts.

## Architectural Benefit

The command system reduces the amount of bespoke interaction code in individual components. Instead of each view implementing its own action mapping, the editor centralizes those entry points and reuses them across surfaces.
