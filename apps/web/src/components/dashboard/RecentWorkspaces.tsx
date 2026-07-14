import { WorkspaceCard } from './WorkspaceCard';
import type { Workspace } from '../../lib/types/workspace';
import { motion } from 'framer-motion';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useNavigate } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export function RecentWorkspaces({ workspaces, isSearch }: { workspaces: Workspace[], isSearch?: boolean }) {
  const createWorkspace = useWorkspaceStore((s) => s.createWorkspace);
  const navigate = useNavigate();

  const handleCreate = () => {
    const id = createWorkspace('Untitled Architecture');
    navigate(`/workspace/${id}`);
  };

  if (workspaces.length === 0) {
    if (isSearch) {
      return (
        <section className="mb-12">
          <div className="bg-[#F9FAFB] border border-[#E5E7EB] border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
            <h3 className="text-xl font-bold text-[#111827] mb-2">No results found</h3>
            <p className="text-[#4B5563] max-w-sm mb-6">Try adjusting your search query.</p>
          </div>
        </section>
      );
    }

    return (
      <section className="mb-12">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">Recent Workspaces</h2>
        </div>
        <div className="bg-[#F9FAFB] border border-[#E5E7EB] border-dashed rounded-2xl p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-[#E5E7EB] rounded-full flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-[#3B82F6]" />
          </div>
          <h3 className="text-xl font-bold text-[#111827] mb-2">Welcome to IsoStack</h3>
          <p className="text-[#4B5563] max-w-sm mb-6">Let's build your first architecture. Start from scratch or use one of our best-practice templates.</p>
          <div className="flex gap-4">
            <button 
              onClick={handleCreate}
              className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-2.5 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500/20"
            >
              Create Workspace
            </button>
            <button className="bg-[#E5E7EB] hover:bg-[#D1D5DB] border border-[#D1D5DB] text-[#111827] px-6 py-2.5 rounded-lg font-semibold transition-colors">
              Browse Templates
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider">
          {isSearch ? 'Search Results' : 'Recent Workspaces'}
        </h2>
        {!isSearch && (
          <button className="text-sm text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors">View All</button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {workspaces.map((workspace, i) => (
          <motion.div
            key={workspace.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <WorkspaceCard workspace={workspace} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
