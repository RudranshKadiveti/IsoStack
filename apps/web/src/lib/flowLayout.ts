import type { Node, Edge } from '@xyflow/react';
import type { ArchGraph } from './types';

// Convert our grid cols (0-7) to X, and rows to Y
// Grid size: roughly 250px apart
const COL_WIDTH = 250;
const ROW_HEIGHT = 150;

export function getLayoutedElements(graph: ArchGraph) {
  const nodes: Node[] = (graph.nodes || []).map((node) => {
    return {
      id: node.id,
      type: 'serviceNode',
      position: Array.isArray((node as any).position)
        ? { x: (node as any).position[0], y: (node as any).position[1] }
        : node.position?.x !== undefined 
          ? { x: node.position.x, y: node.position.y }
          : { 
              x: (node.grid_hint?.col || 0) * COL_WIDTH, 
              y: (node.grid_hint?.row || 0) * ROW_HEIGHT 
            },
      data: { node },
    };
  });

  const edges: Edge[] = (graph.edges || []).map((edge) => {
    return {
      id: edge.id,
      source: edge.source,
      target: edge.target,
      animated: true,
      style: { stroke: '#3B82F6', strokeWidth: 2 },
      label: edge.label,
      labelStyle: { fill: '#94A3B8', fontSize: 10, fontFamily: 'monospace' },
      labelBgStyle: { fill: '#1E293B' },
      labelBgPadding: [4, 2],
      labelBgBorderRadius: 4,
    };
  });

  return { nodes, edges };
}
