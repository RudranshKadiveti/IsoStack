import { Sparkles } from 'lucide-react';

export function AIInsights() {
  return (
    <div className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 h-full flex flex-col">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="w-5 h-5 text-[#3B82F6]" />
        <h2 className="text-lg font-bold text-[#111827]">AI Insights</h2>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center p-4">
        <div className="w-12 h-12 bg-[#E5E7EB] rounded-full flex items-center justify-center mb-4">
          <Sparkles className="w-5 h-5 text-[#9CA3AF]" />
        </div>
        <h3 className="text-[#111827] font-semibold mb-2">No Insights Yet</h3>
        <p className="text-sm text-[#4B5563] max-w-[250px]">
          Start building your architecture to receive personalized AI recommendations, cost optimizations, and security alerts.
        </p>
      </div>
    </div>
  );
}
