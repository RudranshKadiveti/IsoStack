import { NavLink } from 'react-router-dom';
import { Home, FolderOpen, LayoutTemplate, ShieldCheck, Star, Share2, Settings, LogOut, Lock } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';

export function DashboardSidebar() {
  const { user } = useAuthStore();

  const navItemClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
      isActive
        ? 'bg-[#1E293B] text-[#F1F5F9]'
        : 'text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]/50'
    }`;

  return (
    <div className="w-[280px] h-full bg-[#0B0F1A] border-r border-[#1E293B] flex flex-col flex-shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-20">
      {/* Logo */}
      <div className="h-16 px-6 flex items-center border-b border-[#1E293B]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 flex items-center justify-center rounded-full overflow-hidden border-2 border-[#334155]/60 shadow-md bg-[#0B0F1A] flex-shrink-0">
            <img src="/logo.png" alt="IsoStack Logo" className="w-full h-full object-cover object-center scale-110" />
          </div>
          <span className="text-[#F1F5F9] text-xl font-medium tracking-wide" style={{ fontFamily: "'Newsreader', serif" }}>IsoStack</span>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8">
        
        <div className="space-y-1">
          <NavLink to="/" className={navItemClass}>
            <Home className="w-4 h-4" /> Dashboard
          </NavLink>
          <NavLink to="/workspaces" className={navItemClass}>
            <FolderOpen className="w-4 h-4" /> Workspaces
          </NavLink>
          <NavLink to="/templates" className={navItemClass}>
            <LayoutTemplate className="w-4 h-4" /> Templates
          </NavLink>
          <NavLink to="/review" className={navItemClass}>
            <ShieldCheck className="w-4 h-4" /> Architecture Review
          </NavLink>
        </div>

        <div className="space-y-1">
          <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider mb-2 px-3">Quick Links</h3>
          <NavLink to="/starred" className={navItemClass}>
            <Star className="w-4 h-4" /> Starred
          </NavLink>
          <button 
            onClick={() => import('react-hot-toast').then(m => m.toast('This feature is currently under construction or planned for the next version of the application', { icon: '🔒' }))}
            className={`${navItemClass({ isActive: false })} opacity-50 cursor-not-allowed w-full`}
          >
            <div className="flex items-center gap-3 flex-1">
              <Share2 className="w-4 h-4" /> Shared
            </div>
            <Lock className="w-3.5 h-3.5 text-[#64748B]" />
          </button>
        </div>
      </div>

      {/* Settings & Profile */}
      <div className="p-4 border-t border-[#1E293B] space-y-2 bg-[#0F172A]/50">
        <NavLink to="/settings" className={navItemClass}>
          <Settings className="w-4 h-4" /> Settings
        </NavLink>

        <NavLink to="/profile" className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-lg hover:bg-[#1E293B] transition-colors border border-transparent hover:border-[#334155]">
          <div className="w-8 h-8 rounded-full bg-[#3B82F6] flex items-center justify-center text-xs font-bold text-white flex-shrink-0 shadow-inner">
            {user?.email?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div className="flex flex-col flex-1 truncate">
            <span className="text-sm font-semibold text-[#F1F5F9] truncate">{user?.email?.split('@')[0] || 'User'}</span>
            <span className="text-xs text-[#64748B] truncate">{user?.email}</span>
          </div>
        </NavLink>
        
        <button
          onClick={async () => {
            await useAuthStore.getState().signOut();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 mt-1 rounded-lg transition-colors text-sm font-medium text-red-400/80 hover:text-red-400 hover:bg-red-400/10"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </div>
    </div>
  );
}
