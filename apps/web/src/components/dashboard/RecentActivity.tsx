import { Activity } from 'lucide-react';

export function RecentActivity() {
  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-[#4B5563]" />
        <h2 className="text-lg font-bold text-[#111827]">Recent Activity</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="w-12 h-12 bg-[#E5E7EB] rounded-full flex items-center justify-center mb-4">
          <Activity className="w-5 h-5 text-[#9CA3AF]" />
        </div>
        <h3 className="text-[#111827] font-semibold mb-2">No Recent Activity</h3>
        <p className="text-sm text-[#4B5563] max-w-[250px]">
          Actions you take on your workspaces, like exporting Terraform or deploying, will appear here.
        </p>
      </div>
    </div>
  );
}
