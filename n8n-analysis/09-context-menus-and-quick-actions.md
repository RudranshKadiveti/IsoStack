# Context Menus and Quick Actions

Context menus and quick actions help users perform common operations without leaving the primary interaction surface. These systems are especially important in the canvas, where users often need to act on a selected node or group directly at the point of interaction.

## Purpose of Context Menus

Context menus provide a localized action surface that is tied to the current selection, hovered element, or workflow region. They are useful for operations such as:

- duplicating or deleting nodes
- opening node creation flows
- grouping or ungrouping selections
- executing workflows or inspecting node details

## Why They Matter

They keep the interface efficient by reducing the amount of navigation needed for frequent actions. Rather than forcing the user to move to a toolbar or sidebar, the editor offers relevant actions in context.

## Architectural Pattern

The context-menu system is typically generated from the current workflow state and the available capabilities for the selected item. This means the menu is not a static list of commands; it is a dynamic view of what the current state allows.

## Architectural Significance

Context menus demonstrate how the UI makes complex editor operations feel lightweight. They are a good example of feature-specific surfaces built on top of the same underlying workflow and selection model.
