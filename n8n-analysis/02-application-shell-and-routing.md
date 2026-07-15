# Application Shell and Routing

The application shell is the outer frame that hosts the editor experience. It is responsible for bootstrapping the major services, establishing shared providers, and deciding which views should be visible for a given route or feature state.

## Bootstrapping Responsibilities

The main application entrypoint wires together the foundational dependencies:

- Vue runtime and global plugins
- routing setup
- Pinia stores
- telemetry and telemetry context
- shared UI and design-system registration

This means the shell does not implement workflow editing logic directly. Instead, it creates the environment in which the editor views can operate.

## Route-Driven Structure

The router acts as a coordination layer. It defines routes that resolve to the appropriate editor views and feature pages, while also supporting feature-aware behavior such as auth handling, route-level guards, and lazy-loaded modules.

The resulting model is intentionally split:

- the router decides what experience should be shown;
- the feature modules decide how the experience should behave;
- the stores provide the shared state that both layers rely on.

## Main Shell Components

A typical workflow editor session is composed from several shell-level surfaces:

- the main navigation/sidebar
- the current workflow view
- modal or panel overlays such as the node details experience
- secondary surfaces for logs, execution feedback, or command entry

The shell’s job is therefore less about domain behavior and more about composition. It ensures that the right feature surfaces are mounted, layered, and connected to the same workflow context.

## Architectural Significance

The routing structure is one of the main reasons the editor feels coherent. It prevents feature logic from bleeding into the top-level app and makes it possible to evolve the experience around feature modules rather than around one large page component.
