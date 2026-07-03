import { useState } from 'react';
import { useGenerateArch } from '../../hooks/useGenerateArch';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';

export function PromptBar() {
  const [prompt, setPrompt] = useState('');
  const { generate, error } = useGenerateArch();
  const graph = useArchStore((s) => s.graph);
  const isLoading = useUIStore((s) => s.isLoading);

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    const existingIds = (graph?.nodes || []).map((n) => n.id);
    generate(prompt, existingIds);
  };

  return (
    <div className="relative w-full flex gap-2 bg-[#0B0F1A]/90 backdrop-blur-md border border-[#1E293B] p-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
      <input
        className="flex-1 bg-[#0F172A] border border-[#1E293B] text-[#F1F5F9] rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#3B82F6] placeholder:text-[#475569] font-[Inter]"
        placeholder="Describe your system architecture… (e.g. Serverless payment processing API with analytics)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <button
        onClick={handleSubmit}
        disabled={isLoading}
        className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap"
      >
        {isLoading ? 'Generating…' : 'Generate'}
      </button>
      {error && (
        <div className="absolute top-full mt-2 left-2 text-red-400 text-xs bg-[#0F172A] border border-red-900 px-3 py-1.5 rounded-md shadow-lg">{error}</div>
      )}
    </div>
  );
}
