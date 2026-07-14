import { Outlet } from 'react-router-dom';
import { DashboardSidebar } from './DashboardSidebar';
import { TopNavbar } from './TopNavbar';
import { FloatingCopilot } from './FloatingCopilot';

export function DashboardLayout() {
  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#F9FAFB] select-none text-[#111827] font-sans">
      <DashboardSidebar />
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        <TopNavbar />
        <main className="flex-1 overflow-y-auto bg-[#FFFFFF] relative z-0">
          <Outlet />
        </main>
      </div>
      <FloatingCopilot />
    </div>
  );
}
