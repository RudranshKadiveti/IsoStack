# IsoStack - Remaining Tasks (Milestone 2)

Based on the n8n gap analysis, here are the architectural tasks remaining for a future session:

1. **State Management Separation (Store Split)**
   - Split `useArchStore.ts` into `useDocumentStore` (Nodes, Edges, Metadata, History) and `useUIStore` (Zoom, Pan, active selection, panels).
   - Ensure the `zundo` time-travel middleware is *only* applied to the Document Store so UI actions (like selecting a node) don't trigger undo/redo history points.

2. **Grouping & Sub-flows**
   - Implement "Group Nodes" in React Flow (e.g., drawing a bounding box representing a VPC, Subnet, or bounded context) that child nodes can be attached to.
   - Requires updating `ArchNode` schema to support `parentId` and extent constraints.

3. **Simulation / Execution & Run Data**
   - (Deferred to future milestones based on requirements).
