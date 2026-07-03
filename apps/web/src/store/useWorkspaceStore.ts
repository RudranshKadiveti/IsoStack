import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Workspace } from '../lib/types/workspace';
import type { ArchTemplate } from '../lib/architecture.templates';

interface WorkspaceState {
  workspaces: Workspace[];
  customTemplates: ArchTemplate[];
  searchQuery: string;
  createWorkspace: (name?: string) => string;
  updateWorkspace: (id: string, data: Partial<Workspace>) => void;
  deleteWorkspace: (id: string) => void;
  duplicateWorkspace: (id: string) => void;
  setSearchQuery: (query: string) => void;
  addCustomTemplate: (template: ArchTemplate) => void;
}

const generateId = () => `wksp_${Math.random().toString(36).substr(2, 9)}`;
const getTimestamp = () => new Date().toISOString();

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set, get) => ({
      workspaces: [],
      customTemplates: [],
      searchQuery: '',

      addCustomTemplate: (template) => {
        set((state) => ({ customTemplates: [template, ...state.customTemplates] }));
      },

      createWorkspace: (name = 'Untitled Architecture') => {
        const id = generateId();
        const newWorkspace: Workspace = {
          id,
          name,
          createdAt: getTimestamp(),
          updatedAt: getTimestamp(),
          lastOpened: 'Just now',
          autosaveAt: 'Just now',
          status: 'Draft',
          healthScore: 0,
          estimatedCost: 0,
          cloudProvider: 'AWS',
          serviceCount: 0,
          favorite: false,
          architectureVersion: '1.0',
          graph: null,
        };

        set((state) => ({ workspaces: [newWorkspace, ...state.workspaces] }));
        return id;
      },

      updateWorkspace: (id, data) => {
        set((state) => ({
          workspaces: state.workspaces.map((w) =>
            w.id === id
              ? {
                  ...w,
                  ...data,
                  updatedAt: getTimestamp(),
                }
              : w
          ),
        }));
      },

      deleteWorkspace: (id) => {
        set((state) => ({
          workspaces: state.workspaces.filter((w) => w.id !== id),
        }));
      },

      duplicateWorkspace: (id) => {
        const state = get();
        const existing = state.workspaces.find((w) => w.id === id);
        if (existing) {
          const newId = generateId();
          const duplicated: Workspace = {
            ...existing,
            id: newId,
            name: `${existing.name} (Copy)`,
            createdAt: getTimestamp(),
            updatedAt: getTimestamp(),
            lastOpened: 'Just now',
            autosaveAt: 'Just now',
          };
          set((state) => ({ workspaces: [duplicated, ...state.workspaces] }));
        }
      },

      setSearchQuery: (query) => {
        set({ searchQuery: query });
      },
    }),
    {
      name: 'isostack-workspaces',
    }
  )
);
