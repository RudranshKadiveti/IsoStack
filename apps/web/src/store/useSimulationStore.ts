import { create } from 'zustand';

interface SimulationState {
  isSimulating: boolean;
  isPaused: boolean;
  activeNodeId: string | null;
  activeEdgeId: string | null;
  message: string | null;
  failureMode: string | null;
  startSimulation: () => void;
  stopSimulation: () => void;
  togglePause: () => void;
  setActiveElement: (nodeId: string | null, edgeId: string | null, msg: string | null, failure: string | null) => void;
}

export const useSimulationStore = create<SimulationState>((set) => ({
  isSimulating: false,
  isPaused: false,
  activeNodeId: null,
  activeEdgeId: null,
  message: null,
  failureMode: null,
  startSimulation: () => set({ isSimulating: true, isPaused: false, activeNodeId: null, activeEdgeId: null, message: null, failureMode: null }),
  stopSimulation: () => set({ isSimulating: false, isPaused: false, activeNodeId: null, activeEdgeId: null, message: null, failureMode: null }),
  togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
  setActiveElement: (nodeId, edgeId, msg, failure) => set({ activeNodeId: nodeId, activeEdgeId: edgeId, message: msg, failureMode: failure }),
}));
