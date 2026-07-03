import { useState, useRef } from 'react';
import { useGenerateArch } from '../../hooks/useGenerateArch';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';

export function PromptBar() {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { generate, error } = useGenerateArch();
  const graph = useArchStore((s) => s.graph);
  const isLoading = useUIStore((s) => s.isLoading);

  const handleSubmit = () => {
    if (!prompt.trim() && files.length === 0) return;
    const existingIds = (graph?.nodes || []).map((n) => n.id);
    generate(prompt, existingIds, files);
    setFiles([]); // Clear files after submission
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const newFiles = Array.from(e.target.files);
    setFiles(prev => {
      const combined = [...prev, ...newFiles];
      return combined.slice(0, 5); // Max 5 files
    });
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {files.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 self-start">
          {files.map((file, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#1E293B] border border-[#334155] text-xs text-[#E2E8F0] px-3 py-1.5 rounded-full shadow-lg">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
              <span className="max-w-[150px] truncate">{file.name}</span>
              <button onClick={() => removeFile(i)} className="ml-1 text-[#94A3B8] hover:text-red-400">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}
      <div className="relative w-full flex gap-2 bg-[#0B0F1A]/90 backdrop-blur-md border border-[#1E293B] p-2 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.4)]">
        <input
          type="file"
          multiple
          ref={fileInputRef}
          className="hidden"
          accept=".pdf,.docx,.txt,.json,.md"
          onChange={handleFileChange}
        />
        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={files.length >= 5}
          className={`px-3 transition-colors flex items-center justify-center ${files.length >= 5 ? 'text-[#334155] cursor-not-allowed' : 'text-[#64748B] hover:text-[#3B82F6]'}`}
          title="Attach architecture document (Max 5)"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"/></svg>
        </button>
        <input
          className="flex-1 bg-transparent border-none text-[#F1F5F9] px-2 py-2 text-sm outline-none placeholder:text-[#475569] font-[Inter]"
          placeholder="Describe your system or attach a document..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || (!prompt.trim() && files.length === 0)}
          className="bg-[#3B82F6] hover:bg-[#2563EB] disabled:opacity-50 text-white rounded-lg px-5 py-2.5 text-sm font-medium transition-colors whitespace-nowrap"
        >
          {isLoading ? 'Generating…' : 'Generate'}
        </button>
        {error && (
          <div className="absolute top-full mt-2 left-2 text-red-400 text-xs bg-[#0F172A] border border-red-900 px-3 py-1.5 rounded-md shadow-lg z-10">{error}</div>
        )}
      </div>
    </div>
  );
}
