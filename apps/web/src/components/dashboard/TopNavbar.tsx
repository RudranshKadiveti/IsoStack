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
    <div className="h-16 px-6 flex items-center justify-between border-b border-[#E5E7EB] bg-[#F9FAFB]/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex-1 flex items-center">
        <h1 className="text-xl font-semibold text-[#111827] tracking-tight">{getPageTitle()}</h1>
      </div>

      <div className="flex-1 flex justify-center max-w-lg">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7280] group-focus-within:text-[#3B82F6] transition-colors" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={location.pathname === '/templates' ? "Search templates... (Ctrl+K)" : "Search workspaces... (Ctrl+K)"}
            className="w-full bg-[#E5E7EB] border border-[#D1D5DB] rounded-lg pl-10 pr-4 py-2 text-sm text-[#111827] placeholder-[#6B7280] focus:outline-none focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] transition-all"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#F9FAFB] border border-[#D1D5DB] text-[10px] font-medium text-[#4B5563]">
              <span className="text-xs">⌘</span> K
            </kbd>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-end gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="relative p-2 text-[#4B5563] hover:text-[#111827] transition-colors rounded-full hover:bg-[#E5E7EB]">
              <Bell className="w-5 h-5" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 bg-[#F9FAFB] border-[#E5E7EB] z-50 p-6 flex flex-col items-center justify-center text-center shadow-2xl">
             <BellOff className="w-8 h-8 text-[#9CA3AF] mb-3" />
             <p className="text-sm font-semibold text-[#111827]">All caught up!</p>
             <p className="text-xs text-[#4B5563] mt-1">You have no new notifications.</p>
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
