import { useMemo, useCallback, useEffect } from 'react';
import { ReactFlow, MiniMap, Controls, Background, BackgroundVariant, addEdge, useNodesState, useEdgesState, ConnectionMode } from '@xyflow/react';
import type { Connection, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useArchStore } from '../../store/useArchStore';
import { getLayoutedElements } from '../../lib/flowLayout';
import { ServiceNode } from './ServiceNode';
import { CustomEdge } from './CustomEdge';

const nodeTypes = {
  serviceNode: ServiceNode,
};

const edgeTypes = {
  default: CustomEdge,
  network: CustomEdge,
};

export function BuilderCanvas() {
  const graph = useArchStore((s) => s.graph);
  
  const { initialNodes, initialEdges } = useMemo(() => {
    if (!graph) return { initialNodes: [], initialEdges: [] };
    const { nodes, edges } = getLayoutedElements(graph);
    return { initialNodes: nodes, initialEdges: edges };
  }, [graph]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // Sync state when graph changes (like from AI generation)
  // Use effect so we don't sync mid-render, which causes drag issues
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  const removeNode = useArchStore(s => s.removeNode);
  const removeEdge = useArchStore(s => s.removeEdge);
  const updateNodePositionXY = useArchStore(s => s.updateNodePositionXY);
  const addStoreEdge = useArchStore(s => s.addEdge);

  const onNodesDelete = useCallback((deleted: any[]) => {
    deleted.forEach((n) => removeNode(n.id));
  }, [removeNode]);

  const onEdgesDelete = useCallback((deleted: any[]) => {
    deleted.forEach((e) => removeEdge(e.id));
  }, [removeEdge]);

  const onConnect = useCallback((params: Connection | Edge) => {
    const id = 'id' in params ? params.id : `${params.source}__${params.target}`;
    setEdges((eds) => addEdge({ ...params, id, animated: true, type: 'default', style: { stroke: '#3B82F6', strokeWidth: 2 } } as Edge, eds));
    addStoreEdge({
      id,
      source: params.source,
      target: params.target,
      type: 'sync_http',
      label: '',
      bidirectional: false
    });
  }, [setEdges, addStoreEdge]);

  return (
    <div className="w-full h-full bg-[#0B0F1A]">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodesDelete={onNodesDelete}
        onEdgesDelete={onEdgesDelete}
        onNodeDragStop={(_, node) => updateNodePositionXY(node.id, node.position.x, node.position.y)}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
        colorMode="dark"
        connectionMode={ConnectionMode.Loose}
        minZoom={0.2}
        maxZoom={4}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#1E293B" />
        <Controls 
          className="bg-[#0F172A] border-[#1E293B] fill-[#94A3B8]"
          showInteractive={false}
        />
        <MiniMap 
          nodeColor={(n: any) => {
            const st = n.data?.node?.serviceType;
            if (['postgresql', 'mongodb'].includes(st)) return '#3B82F6';
            if (['redis'].includes(st)) return '#F97316';
            if (['fastapi', 'django', 'nodejs'].includes(st)) return '#8B5CF6';
            return '#1E293B';
          }}
          maskColor="rgba(11, 15, 26, 0.7)"
          className="bg-[#0F172A] border-[#1E293B]"
        />
      </ReactFlow>
    </div>
  );
}
