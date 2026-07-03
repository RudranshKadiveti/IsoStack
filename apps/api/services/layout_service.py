from models.arch_schema import ArchGraph

def resolve_grid_collisions(graph: ArchGraph) -> ArchGraph:
    """Ensure no two nodes share the same (col, row) grid position."""
    occupied: set[tuple[int, int]] = set()
    nodes = list(graph.nodes)
    for node in nodes:
        col, row = node.grid_hint.col, node.grid_hint.row
        while (col, row) in occupied:
            row += 1
            if row > 7:
                row = 0
                col = min(col + 1, 7)
        occupied.add((col, row))
        node.grid_hint.col = col
        node.grid_hint.row = row
    return graph.model_copy(update={"nodes": nodes})
