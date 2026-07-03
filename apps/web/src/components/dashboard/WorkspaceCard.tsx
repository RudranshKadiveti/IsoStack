import { MoreVertical, ExternalLink, Copy, Edit2, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import type { Workspace } from '../../lib/types/workspace';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useState } from 'react';
import { ConfirmModal } from '../ui/ConfirmModal';

export function WorkspaceCard({ workspace }: { workspace: Workspace }) {
  const navigate = useNavigate();
  const { duplicateWorkspace, updateWorkspace, deleteWorkspace } = useWorkspaceStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getStatusColor = (status: Workspace['status']) => {
    switch (status) {
      case 'Completed': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'Review Required': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-amber-400';
    return 'text-red-400';
  };

  return (
    <>
      <motion.div 
        whileHover={{ y: -4 }}
        className="group bg-[#0F172A] border border-[#1E293B] hover:border-[#334155] rounded-xl overflow-hidden shadow-lg transition-all flex flex-col h-full relative"
      >
        {/* Thumbnail Area */}
        <div 
          className="h-32 bg-[#1E293B]/50 w-full relative flex-shrink-0 cursor-pointer overflow-hidden flex items-center justify-center border-b border-[#1E293B]"
          onClick={() => navigate(`/workspace/${workspace.id}`)}
        >
          {workspace.thumbnail ? (
            <img src={workspace.thumbnail} alt={workspace.name} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#475569]">
              <div className="w-16 h-16 rounded-full border border-dashed border-[#475569] flex items-center justify-center opacity-50">
                 <span className="text-xs">Preview</span>
              </div>
            </div>
          )}
          
          {/* Status Badge */}
          <div className="absolute top-3 left-3">
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide border uppercase ${getStatusColor(workspace.status)} backdrop-blur-md`}>
              {workspace.status}
            </span>
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 flex-1 flex flex-col">
          <div className="flex justify-between items-start mb-1">
            <h3 
              className="text-[#F1F5F9] font-bold text-base truncate cursor-pointer hover:text-[#3B82F6] transition-colors"
              onClick={() => navigate(`/workspace/${workspace.id}`)}
            >
              {workspace.name}
            </h3>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-[#64748B] hover:text-[#F1F5F9] p-1 rounded-md hover:bg-[#1E293B] transition-colors -mr-1">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-[#0F172A] border-[#1E293B] z-50 shadow-2xl">
                <DropdownMenuItem className="text-[#F1F5F9] hover:bg-[#1E293B] hover:text-[#3B82F6] cursor-pointer" onClick={() => navigate(`/workspace/${workspace.id}`)}>
                  <ExternalLink className="w-4 h-4 mr-2" /> Open
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-[#F1F5F9] hover:bg-[#1E293B] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicateWorkspace(workspace.id);
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" /> Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-[#F1F5F9] hover:bg-[#1E293B] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    const newName = window.prompt('Enter new workspace name:', workspace.name);
                    if (newName && newName.trim() !== '') {
                      updateWorkspace(workspace.id, { name: newName.trim() });
                    }
                  }}
                >
                  <Edit2 className="w-4 h-4 mr-2" /> Rename
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="text-[#EF4444] hover:bg-[#EF4444]/10 hover:text-[#EF4444] cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsDeleteModalOpen(true);
                  }}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-xs text-[#64748B] mb-4 font-medium">Last edited {workspace.lastOpened}</p>

          <div className="grid grid-cols-2 gap-y-3 gap-x-2 mt-auto">
            <div className="flex flex-col">
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold mb-0.5">Health</span>
              {workspace.healthScore > 0 ? (
                <span className={`text-sm font-bold ${getHealthColor(workspace.healthScore)}`}>{workspace.healthScore}%</span>
              ) : (
                <span className="text-xs text-[#94A3B8] italic">Unanalyzed</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold mb-0.5">Cloud</span>
              {workspace.serviceCount > 0 ? (
                <span className="text-sm font-semibold text-[#CBD5E1]">{workspace.cloudProvider}</span>
              ) : (
                <span className="text-xs text-[#94A3B8] italic">N/A</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold mb-0.5">Cost</span>
              {workspace.estimatedCost > 0 ? (
                <span className="text-sm font-semibold text-[#CBD5E1]">${workspace.estimatedCost}/mo</span>
              ) : (
                <span className="text-xs text-[#94A3B8] italic">Unanalyzed</span>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#64748B] uppercase tracking-wider font-semibold mb-0.5">Services</span>
              <span className="text-sm font-semibold text-[#CBD5E1]">{workspace.serviceCount || 0} Nodes</span>
            </div>
          </div>
        </div>
      </motion.div>
      <ConfirmModal 
        isOpen={isDeleteModalOpen}
        title="Delete Workspace"
        message={`Are you sure you want to delete "${workspace.name}"? This action cannot be undone.`}
        confirmText="Delete"
        isDestructive={true}
        onConfirm={() => deleteWorkspace(workspace.id)}
        onCancel={() => setIsDeleteModalOpen(false)}
      />
    </>
  );
}
