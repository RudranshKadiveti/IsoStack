import { useAuthStore } from '../../store/useAuthStore';
import type { Workspace } from '../../lib/types/workspace';
import { ArrowRight, Activity, Cloud, DollarSign, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export function WelcomeSection({ latestWorkspace }: { latestWorkspace: Workspace | null }) {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const username = user?.email?.split('@')[0] || 'Builder';

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#111827] mb-2 tracking-tight">Welcome back, {username}</h1>
        <p className="text-[#4B5563] text-sm">Continue building where you left off.</p>
      </div>

      {latestWorkspace && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-[#E5E7EB] to-[#F9FAFB] rounded-2xl border border-[#D1D5DB] p-6 shadow-xl relative overflow-hidden group"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#3B82F6]/20 transition-colors duration-500"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <div className="px-2 py-0.5 rounded bg-[#3B82F6]/20 border border-[#3B82F6]/30 text-[#3B82F6] text-[10px] font-bold uppercase tracking-wider">
                  Last Opened
                </div>
                <span className="text-xs font-medium text-[#6B7280]">{latestWorkspace.lastOpened}</span>
              </div>
              <h2 className="text-2xl font-bold text-[#111827] mb-4">{latestWorkspace.name}</h2>
              
              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Health</span>
                    <span className="text-sm font-semibold text-[#111827]">{latestWorkspace.healthScore > 0 ? `${latestWorkspace.healthScore}%` : <span className="text-[#4B5563] italic">Unanalyzed</span>}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-blue-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Cloud</span>
                    <span className="text-sm font-semibold text-[#111827]">{latestWorkspace.serviceCount > 0 ? latestWorkspace.cloudProvider : <span className="text-[#4B5563] italic">N/A</span>}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-amber-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Cost</span>
                    <span className="text-sm font-semibold text-[#111827]">{latestWorkspace.estimatedCost > 0 ? `$${latestWorkspace.estimatedCost}/mo` : <span className="text-[#4B5563] italic">Unanalyzed</span>}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-purple-400" />
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-[#6B7280] tracking-wider">Services</span>
                    <span className="text-sm font-semibold text-[#111827]">{latestWorkspace.serviceCount || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <button 
              onClick={() => navigate(`/workspace/${latestWorkspace.id}`)}
              className="flex-shrink-0 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/20 transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
            >
              Continue Editing
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
