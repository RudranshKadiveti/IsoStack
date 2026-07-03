import { create } from 'zustand';

interface UIState {
  isLoading: boolean;
  isDetailPaneOpen: boolean;
  isAddNodeOpen: boolean;
  setLoading: (v: boolean) => void;
  setDetailPane: (v: boolean) => void;
  setAddNodeOpen: (v: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isLoading: false,
  isDetailPaneOpen: false,
  isAddNodeOpen: false,
  setLoading: (v) => set({ isLoading: v }),
  setDetailPane: (v) => set({ isDetailPaneOpen: v }),
  setAddNodeOpen: (v) => set({ isAddNodeOpen: v }),
}));
