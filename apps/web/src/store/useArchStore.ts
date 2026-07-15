import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { temporal } from 'zundo';
import type { ArchGraph, ArchNode, ArchEdge } from '../lib/types';

export const BUILDER_CONFIG = {
  maxNodes: 500,
};

interface ArchState {
  graph: ArchGraph | null;
  isDirty: boolean;
  selectedNodeId: string | null;
  maxNodes: number;
  favoriteNodes: string[];
  recentNodes: string[];
  customServices: any[];
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
  updateNodeProperties: (id: string, properties: Record<string, any>) => void;
  loadTemplate: (template: any) => void;
  addCustomService: (service: any) => void;
  toggleFavorite: (serviceType: string) => void;
  addRecentNode: (serviceType: string) => void;
  duplicateNodes: (ids: string[]) => void;
}

export const useArchStore = create<ArchState>()(
  temporal(
    persist(
      (set) => ({
        graph: null,
        isDirty: false,
        selectedNodeId: null,
        maxNodes: BUILDER_CONFIG.maxNodes,
        customServices: [],
        favoriteNodes: [],
        recentNodes: [],
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
        updateNodeProperties: (id, properties) => set((s) => s.graph ? {
          isDirty: true,
          graph: {
            ...s.graph,
            nodes: (s.graph.nodes || []).map((n) =>
              n.id === id ? { ...n, properties } : n
            ),
          }
        } : s),
        toggleFavorite: (serviceType) => set((s) => ({
          favoriteNodes: s.favoriteNodes.includes(serviceType)
            ? s.favoriteNodes.filter((t) => t !== serviceType)
            : [...s.favoriteNodes, serviceType],
        })),
        addRecentNode: (serviceType) => set((s) => {
          const newRecents = [serviceType, ...s.recentNodes.filter((t) => t !== serviceType)].slice(0, 10);
          return { recentNodes: newRecents };
        }),
        duplicateNodes: (ids) => set((s) => {
          if (!s.graph) return s;
          const nodesToDuplicate = s.graph.nodes?.filter(n => ids.includes(n.id)) || [];
          if (nodesToDuplicate.length === 0) return s;
          
          const newNodes = nodesToDuplicate.map(n => ({
            ...n,
            id: `${n.serviceType}_${Math.random().toString(36).substring(2, 9)}`,
            position: n.position ? { x: n.position.x + 50, y: n.position.y + 50 } : undefined,
            grid_hint: n.grid_hint ? { col: n.grid_hint.col + 1, row: n.grid_hint.row + 1 } : { col: 1, row: 1 },
          }));
          
          return {
            isDirty: true,
            graph: {
              ...s.graph,
              nodes: [...(s.graph.nodes || []), ...newNodes]
            }
          };
        }),
      }),
      {
        name: 'isostack-arch-store',
        partialize: (state) => ({
          favoriteNodes: state.favoriteNodes,
          recentNodes: state.recentNodes,
        }),
      }
    ),
    {
      partialize: (state) => {
        const { graph } = state;
        return { graph };
      },
      limit: 50,
      equality: (pastState, currentState) => {
        // Prevent recording uninteresting changes (like just selection changing, which is currently handled mostly by selectedNodeId but graph might not change)
        return JSON.stringify(pastState.graph) === JSON.stringify(currentState.graph);
      },
    }
  )
);
