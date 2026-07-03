import { create } from 'zustand';
import type { ArchGraph, ArchNode, ArchEdge } from '../lib/types';

export const BUILDER_CONFIG = {
  maxNodes: 500,
};

interface ArchState {
  graph: ArchGraph | null;
  isDirty: boolean;
  selectedNodeId: string | null;
  maxNodes: number;
  setDirty: (dirty: boolean) => void;
  setGraph: (graph: ArchGraph) => void;
  updateProjectName: (name: string) => void;
  selectNode: (id: string | null) => void;
  addNode: (node: ArchNode) => void;
  removeNode: (id: string) => void;
  updateNodePosition: (id: string, col: number, row: number) => void;
  updateNodePositionXY: (id: string, x: number, y: number) => void;
  addEdge: (edge: ArchEdge) => void;
  removeEdge: (id: string) => void;
  toggleUtility: (index: number) => void;
  updateNodeVariant: (id: string, variantId: string) => void;
  loadTemplate: (template: any) => void;
  customServices: any[];
  addCustomService: (service: any) => void;
}

export const useArchStore = create<ArchState>((set) => ({
  graph: null,
  isDirty: false,
  selectedNodeId: null,
  maxNodes: BUILDER_CONFIG.maxNodes,
  customServices: [],
  setDirty: (dirty) => set({ isDirty: dirty }),
  addCustomService: (service) => set((s) => ({ customServices: [...s.customServices, service] })),
  setGraph: (graph) => set({ graph, isDirty: false }),
  updateProjectName: (name) => set((state) => ({ isDirty: true, graph: state.graph ? { ...state.graph, project_name: name } : null })),
  selectNode: (id) => set({ selectedNodeId: id }),
  loadTemplate: (template) => set((s) => s.graph ? {
    isDirty: true,
    graph: {
      ...s.graph,
      nodes: template.nodes,
      edges: template.edges,
      description: template.description
    }
  } : s),
  addNode: (node) => set((s) => s.graph
    ? { isDirty: true, graph: { ...s.graph, nodes: [...(s.graph.nodes || []), node] } }
    : s),
  removeNode: (id) => set((s) => s.graph ? {
    isDirty: true,
    graph: {
      ...s.graph,
      nodes: (s.graph.nodes || []).filter((n) => n.id !== id),
      edges: (s.graph.edges || []).filter((e) => e.source !== id && e.target !== id),
    }
  } : s),
  updateNodePosition: (id, col, row) => set((s) => s.graph ? {
    isDirty: true,
    graph: {
      ...s.graph,
      nodes: (s.graph.nodes || []).map((n) =>
        n.id === id ? { ...n, grid_hint: { col, row } } : n
      ),
    }
  } : s),
  updateNodePositionXY: (id, x, y) => set((s) => s.graph ? {
    isDirty: true,
    graph: {
      ...s.graph,
      nodes: (s.graph.nodes || []).map((n) =>
        n.id === id ? { ...n, position: { x, y } } : n
      ),
    }
  } : s),
  addEdge: (edge) => set((s) => s.graph
    ? { isDirty: true, graph: { ...s.graph, edges: [...(s.graph.edges || []), edge] } }
    : s),
  removeEdge: (id) => set((s) => s.graph ? {
    isDirty: true,
    graph: { ...s.graph, edges: (s.graph.edges || []).filter((e) => e.id !== id) }
  } : s),
  toggleUtility: (index) => set((s) => s.graph ? {
    isDirty: true,
    graph: {
      ...s.graph,
      utilities_checklist: (s.graph.utilities_checklist || []).map((u, i) =>
        i === index ? { ...u, met: !u.met } : u
      ),
    }
  } : s),
  updateNodeVariant: (id, variantId) => set((s) => s.graph ? {
    isDirty: true,
    graph: {
      ...s.graph,
      nodes: (s.graph.nodes || []).map((n) =>
        n.id === id ? { ...n, variantId } : n
      ),
    }
  } : s),
}));
