import { Activity } from 'lucide-react';

export function RecentActivity() {
  return (
    <div className="bg-[#0F172A] border border-[#1E293B] rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-[#94A3B8]" />
        <h2 className="text-lg font-bold text-[#F1F5F9]">Recent Activity</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="w-12 h-12 bg-[#1E293B] rounded-full flex items-center justify-center mb-4">
          <Activity className="w-5 h-5 text-[#475569]" />
        </div>
        <h3 className="text-[#F1F5F9] font-semibold mb-2">No Recent Activity</h3>
        <p className="text-sm text-[#94A3B8] max-w-[250px]">
          Actions you take on your workspaces, like exporting Terraform or deploying, will appear here.
        </p>
      </div>
    </div>
  );
}
