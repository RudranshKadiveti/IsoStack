import { useState, useEffect } from 'react';
import { BookOpen, CheckSquare, Save } from 'lucide-react';
import toast from 'react-hot-toast';

export function CollaborationBar() {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(() => {
    return localStorage.getItem('isostack_design_notes') || '';
  });

  // Save notes when they change
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      localStorage.setItem('isostack_design_notes', notes);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [notes]);

  const handleClear = () => {
    if (confirm('Clear all design notes?')) {
      setNotes('');
      toast.success('Notes cleared');
    }
  };

  return (
    <div className="absolute top-4 right-4 z-[100] flex items-center gap-2 pointer-events-auto">
      <button
        onClick={() => setShowNotes(!showNotes)}
        className={`px-3 h-9 flex items-center gap-2 rounded-lg border transition-colors shadow-sm ${showNotes ? 'bg-[#3B82F6]/20 border-[#3B82F6] text-[#3B82F6]' : 'bg-[#0F172A] border-[#1E293B] text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]'}`}
        title="Design Notes"
      >
        <BookOpen className="w-4 h-4" />
        <span className="text-xs font-semibold">Design Notes</span>
      </button>

      {/* Notes Sidebar */}
      {showNotes && (
        <div className="absolute top-12 right-0 w-[350px] bg-[#0F172A] border border-[#1E293B] rounded-xl shadow-2xl p-4 flex flex-col h-[500px]">
          <div className="flex items-center justify-between mb-4 border-b border-[#1E293B] pb-3">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#3B82F6]" />
              Architecture Record Book
            </h3>
            <button onClick={() => setShowNotes(false)} className="text-[#64748B] hover:text-white">×</button>
          </div>
          
          <div className="flex-1 flex flex-col">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Jot down your architectural decisions, constraints, to-dos, and design considerations here..."
              className="flex-1 w-full bg-[#0B0F1A] border border-[#1E293B] rounded-lg p-3 text-xs text-[#E2E8F0] focus:outline-none focus:border-[#3B82F6] resize-none font-mono"
            />
          </div>

          <div className="mt-4 pt-3 border-t border-[#1E293B] flex justify-between items-center">
            <p className="text-[10px] text-[#64748B]">Auto-saved locally</p>
            <button 
              onClick={handleClear}
              className="text-[10px] text-red-400 hover:text-red-300 font-semibold"
            >
              Clear Notes
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
