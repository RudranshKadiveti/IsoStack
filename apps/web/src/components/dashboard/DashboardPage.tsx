import { WelcomeSection } from './WelcomeSection';
import { QuickActions } from './QuickActions';
import { RecentWorkspaces } from './RecentWorkspaces';
import { AIInsights } from './AIInsights';
import { RecentActivity } from './RecentActivity';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useLocation } from 'react-router-dom';

import { TemplatesPage } from './TemplatesPage';

export function DashboardPage() {
  const { workspaces, searchQuery } = useWorkspaceStore();
  const location = useLocation();

  const filteredWorkspaces = workspaces.filter(w => 
    w.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const latestWorkspace = workspaces.length > 0 ? workspaces[0] : null;

  // Render different views based on route
  if (location.pathname === '/workspaces') {
    return (
      <div className="p-8 max-w-7xl mx-auto pb-24">
        <RecentWorkspaces workspaces={filteredWorkspaces} isSearch={!!searchQuery} />
      </div>
    );
  }

  if (location.pathname === '/templates') {
    return <TemplatesPage />;
  }

  if (location.pathname === '/review' || location.pathname === '/starred' || location.pathname === '/shared') {
    return (
      <div className="p-8 max-w-7xl mx-auto pb-24 flex items-center justify-center mt-20">
        <p className="text-[#94A3B8]">This feature is under construction.</p>
      </div>
    );
  }

  // Default Dashboard view
  return (
    <div className="p-8 max-w-7xl mx-auto pb-24">
      {latestWorkspace && !searchQuery && (
        <WelcomeSection latestWorkspace={latestWorkspace} />
      )}
      
      {!searchQuery && <QuickActions />}
      
      <RecentWorkspaces workspaces={filteredWorkspaces} isSearch={!!searchQuery} />
      
      {!searchQuery && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[400px]">
          <AIInsights />
          <RecentActivity />
        </div>
      )}
    </div>
  );
}
