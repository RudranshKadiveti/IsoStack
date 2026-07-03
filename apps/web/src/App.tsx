import { useEffect } from 'react';
import { BuilderCanvas } from './components/canvas/BuilderCanvas';
import { PromptBar } from './components/panels/PromptBar';
import { NodeDetailPane } from './components/panels/NodeDetailPane';

import { AppSidebar } from './components/panels/AppSidebar';
import { CollaborationBar } from './components/ui/CollaborationBar';
import { AuthModal } from './components/ui/AuthModal';
import { useUIStore } from './store/useUIStore';
import { useAuthStore } from './store/useAuthStore';

import { Toaster } from 'react-hot-toast';

import { TooltipProvider } from './components/ui/tooltip';

export default function App() {
  const isLoading = useUIStore((s) => s.isLoading);
  const { session, initialized, initialize } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) {
    return (
      <div className="flex w-screen h-screen items-center justify-center bg-[#0F172A]">
        <div className="w-8 h-8 rounded-full border-2 border-[#3B82F6] border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex w-screen h-screen overflow-hidden bg-[#0F172A] select-none text-[#F1F5F9] font-sans">
      {!session && <AuthModal />}
      <Toaster
        position="top-center"
        toastOptions={{
          style: { background: '#1E293B', color: '#F1F5F9', border: '1px solid #334155', fontSize: 13 },
        }}
      />

      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-[#0B0F1A]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#3B82F6] border-t-transparent animate-spin mb-4" />
            <p className="text-[#3B82F6] text-sm font-semibold tracking-wide">Designing architecture…</p>
            <p className="text-[#64748B] text-xs mt-1">Generating nodes and enforcing constraints</p>
          </div>
        </div>
      )}

      {/* Left Sidebar (Services) */}
      <AppSidebar />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        
        {/* Top Header / Prompt */}
        <div className="absolute top-0 w-full z-10 flex items-start justify-center p-4 py-6 pointer-events-none pr-16">
          <div className="pointer-events-auto w-full max-w-2xl px-4">
            <PromptBar />
          </div>
        </div>

        <CollaborationBar />

        {/* The React Flow Canvas */}
        <div className="flex-1 bg-[#0B0F1A] relative z-0">
          <BuilderCanvas />
        </div>
      </div>

      {/* Right Properties Panel */}
      <div className="w-[320px] h-full flex-shrink-0 z-20">
        <NodeDetailPane />
      </div>

      </div>
    </TooltipProvider>
  );
}
