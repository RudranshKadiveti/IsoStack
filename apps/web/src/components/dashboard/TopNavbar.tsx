import { Search, Bell, Plus, BellOff } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu';

export function TopNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { searchQuery, setSearchQuery, createWorkspace } = useWorkspaceStore();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/': return 'Dashboard';
      case '/workspaces': return 'Workspaces';
      case '/templates': return 'Templates';
      case '/review': return 'Architecture Review';
      case '/starred': return 'Starred Workspaces';
      case '/shared': return 'Shared Workspaces';
      case '/settings': return 'Settings';
      case '/profile': return 'Profile';
      default: return 'Overview';
    }
  };

  const handleCreateWorkspace = () => {
    const id = createWorkspace('Untitled Architecture');
    navigate(`/workspace/${id}`);
  };

  return (
    <div className="h-16 px-6 flex items-center justify-between border-b border-[#1E293B] bg-[#0F172A]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex-1 flex items-center">
        <h1 className="text-xl font-semibold text-[#F1F5F9] tracking-tight">{getPageTitle()}</h1>
      </div>

      <div className="flex-1 flex justify-center max-w-lg">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] group-focus-within:text-[#3B82F6] transition-colors" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={location.pathname === '/templates' ? "Search templates... (Ctrl+K)" : "Search workspaces... (Ctrl+K)"}
            className="w-full bg-[#1E293B] border border-[#334155] rounded-lg pl-10 pr-4 py-2 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#0F172A] border border-[#334155] text-[10px] font-medium text-[#94A3B8]">
              <span className="text-xs">⌘</span> K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 text-[#94A3B8] hover:text-[#F1F5F9] transition-colors rounded-full hover:bg-[#1E293B]">
              <Bell className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-[#0F172A] border-[#1E293B] z-50 p-6 flex flex-col items-center justify-center text-center shadow-2xl">
             <BellOff className="w-8 h-8 text-[#475569] mb-3" />
             <p className="text-sm font-semibold text-[#F1F5F9]">All caught up!</p>
             <p className="text-xs text-[#94A3B8] mt-1">You have no new notifications.</p>
          </DropdownMenuContent>
        </DropdownMenu>

        <button 
          onClick={handleCreateWorkspace}
          className="flex items-center gap-2 bg-[#3B82F6] hover:bg-[#2563EB] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-lg shadow-blue-500/20"
        >
          <Plus className="w-4 h-4" />
          <span className="hidden sm:inline">New Workspace</span>
        </button>
      </div>
    </div>
  );
}
