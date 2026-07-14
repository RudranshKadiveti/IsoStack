import { Plus, Search, Download, LayoutTemplate, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';

export function QuickActions() {
  const navigate = useNavigate();
  const createWorkspace = useWorkspaceStore((s) => s.createWorkspace);

  const actions = [
    {
      id: 'create',
      label: 'Create Workspace',
      icon: Plus,
      color: 'text-blue-400',
      bg: 'bg-blue-400/10',
      border: 'hover:border-blue-400/50',
    },
    {
      id: 'review',
      label: 'Review Architecture',
      icon: Search,
      color: 'text-emerald-400',
      bg: 'bg-emerald-400/10',
      border: 'hover:border-emerald-400/50',
    },
    {
      id: 'import',
      label: 'Import Architecture',
      icon: Download,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10',
      border: 'hover:border-purple-400/50',
    },
    {
      id: 'templates',
      label: 'Browse Templates',
      icon: LayoutTemplate,
      color: 'text-amber-400',
      bg: 'bg-amber-400/10',
      border: 'hover:border-amber-400/50',
    },
  ];

  return (
    <section className="mb-12">
      <h2 className="text-sm font-semibold text-[#6B7280] uppercase tracking-wider mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, i) => {
          const Icon = action.icon;
          const isLocked = action.id === 'import';

          return (
            <motion.button
              key={action.id}
              onClick={() => {
                if (isLocked) {
                  import('react-hot-toast').then(m => m.toast('This feature is currently under construction or planned for the next version of the application', { icon: '🔒' }));
                  return;
                }
                if (action.id === 'create') {
                  const id = createWorkspace('Untitled Architecture');
                  navigate(`/workspace/${id}`);
                } else if (action.id === 'templates') {
                  navigate('/templates');
                } else if (action.id === 'review') {
                  navigate('/review');
                }
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={isLocked ? {} : { y: -2 }}
              className={`flex items-center gap-4 p-4 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] ${isLocked ? 'opacity-70 cursor-not-allowed' : action.border} transition-all text-left shadow-sm ${isLocked ? '' : 'hover:shadow-md'} group relative`}
            >
              {isLocked && (
                <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-[#E5E7EB] flex items-center justify-center">
                  <Lock className="w-3 h-3 text-[#4B5563]" />
                </div>
              )}
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${action.bg} ${action.color} ${isLocked ? 'opacity-50' : ''}`}>
                <Icon className={`w-5 h-5 transition-transform ${isLocked ? '' : 'group-hover:scale-110'}`} />
              </div>
              <span className={`font-semibold ${isLocked ? 'text-[#4B5563]' : 'text-[#111827]'}`}>{action.label}</span>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
