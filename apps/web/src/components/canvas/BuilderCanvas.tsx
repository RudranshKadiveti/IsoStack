import { useMemo, useCallback, useEffect } from 'react';
import { ReactFlow, MiniMap, Controls, Background, BackgroundVariant, addEdge, useNodesState, useEdgesState, ConnectionMode, SelectionMode } from '@xyflow/react';
import type { Connection, Edge } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useArchStore } from '../../store/useArchStore';
import { getLayoutedElements } from '../../lib/flowLayout';
import { ServiceNode } from './ServiceNode';
import { CustomEdge } from './CustomEdge';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '@radix-ui/react-context-menu';
import { Plus, Copy } from 'lucide-react';
import { NodeRegistry } from '../../lib/registry/NodeRegistry';

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
  const duplicateNodes = useArchStore(s => s.duplicateNodes);
  const addNodeToStore = useArchStore(s => s.addNode);

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

  // Keyboard Shortcuts Hook Logic
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if inside an input or textarea
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes((e.target as HTMLElement).tagName)) return;

      const selectedNodeIds = nodes.filter(n => n.selected).map(n => n.id);

      // Select All (Ctrl/Cmd + A)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setNodes(nds => nds.map(n => ({ ...n, selected: true })));
        setEdges(eds => eds.map(edge => ({ ...edge, selected: true })));
      }

      // Duplicate (Ctrl/Cmd + D)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        if (selectedNodeIds.length > 0) {
          duplicateNodes(selectedNodeIds);
        }
      }

      // Undo (Ctrl/Cmd + Z)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z' && !e.shiftKey) {
        e.preventDefault();
        useArchStore.temporal.getState().undo();
      }

      // Redo (Ctrl/Cmd + Y or Ctrl/Cmd + Shift + Z)
      if ((e.ctrlKey || e.metaKey) && (e.key.toLowerCase() === 'y' || (e.key.toLowerCase() === 'z' && e.shiftKey))) {
        e.preventDefault();
        useArchStore.temporal.getState().redo();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nodes, edges, duplicateNodes, setNodes, setEdges]);

  const handleAddDefaultNode = (type: string) => {
    const def = NodeRegistry.getNode(type);
    if (!def) return;
    addNodeToStore({
      id: `${type}_${Math.random().toString(36).substring(2, 9)}`,
      serviceType: type,
      variantId: def.defaultVariant,
      label: def.label,
      description: def.description,
      position: { x: 100, y: 100 },
      layer: 'compute', // Default generic layer
      tags: def.tags || [],
      responsibilities: [],
      metrics: { expected_rps: null, data_size: null, sla: null },
      grid_hint: { col: 3, row: 3 },
    });
  };

  return (
    <div className="w-full h-full bg-[#FFFFFF]">
      <ContextMenu>
        <ContextMenuTrigger asChild>
          <div className="w-full h-full block">
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
              colorMode="light"
              connectionMode={ConnectionMode.Loose}
              connectionLineStyle={{ stroke: '#3B82F6', strokeWidth: 2 }}
              defaultEdgeOptions={{ type: 'default', animated: true }}
              minZoom={0.1}
              maxZoom={4}
              snapToGrid={true}
              snapGrid={[24, 24]}
              selectionMode={SelectionMode.Partial}
              panOnScroll={true}
              selectionOnDrag={true}
              panOnDrag={[1, 2]} // Middle click and Right click to pan
              className="bg-gray-50/50"
            >
              <Background variant={BackgroundVariant.Dots} gap={24} size={2} color="#E5E7EB" />
              <Controls 
                className="bg-white border-gray-200 fill-gray-500 shadow-lg rounded-xl overflow-hidden [&>button]:border-b-gray-100"
                showInteractive={false}
              />
              <MiniMap 
                nodeColor={(n: any) => {
                  const st = n.data?.node?.serviceType;
                  if (['postgresql', 'mongodb'].includes(st)) return '#3B82F6';
                  if (['redis'].includes(st)) return '#F97316';
                  if (['fastapi', 'django', 'nodejs'].includes(st)) return '#8B5CF6';
                  return '#D1D5DB';
                }}
                maskColor="rgba(255, 255, 255, 0.8)"
                className="bg-white/90 border border-gray-200 shadow-xl rounded-xl backdrop-blur-md overflow-hidden"
                style={{ bottom: 20, right: 20 }}
              />
            </ReactFlow>
          </div>
        </ContextMenuTrigger>
        
        <ContextMenuContent className="min-w-[220px] bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 shadow-2xl p-1 z-50 text-sm font-medium font-sans">
          <ContextMenuItem 
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
            onClick={() => handleAddDefaultNode('nodejs')}
          >
            <Plus className="w-4 h-4 text-blue-500" />
            Add Compute Node
          </ContextMenuItem>
          <ContextMenuItem 
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
            onClick={() => handleAddDefaultNode('postgresql')}
          >
            <Plus className="w-4 h-4 text-emerald-500" />
            Add Database Node
          </ContextMenuItem>
          <ContextMenuSeparator className="h-px bg-gray-200 my-1 mx-2" />
          <ContextMenuItem 
            className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
            onClick={() => {
              const selectedIds = nodes.filter(n => n.selected).map(n => n.id);
              if (selectedIds.length > 0) duplicateNodes(selectedIds);
            }}
          >
            <Copy className="w-4 h-4 text-gray-400" />
            Duplicate Selected
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </div>
  );
}
