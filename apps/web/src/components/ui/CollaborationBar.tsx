import { useState, useEffect } from 'react';
import { CheckSquare } from 'lucide-react';
import toast from 'react-hot-toast';
import { ConfirmModal } from './ConfirmModal';

export function CollaborationBar({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
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
    setNotes('');
    toast.success('Notes cleared');
    setIsConfirmOpen(false);
  };

  return (
    <>
      {isOpen && (
        <div className="absolute top-12 right-0 w-[350px] bg-[#0F172A] border border-[#1E293B] rounded-xl shadow-2xl p-4 flex flex-col h-[500px] z-[200]">
          <div className="flex items-center justify-between mb-4 border-b border-[#1E293B] pb-3">
            <h3 className="font-semibold text-sm text-white flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-[#3B82F6]" />
              Architecture Record Book
            </h3>
            <button onClick={onClose} className="text-[#64748B] hover:text-white">×</button>
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
              onClick={() => setIsConfirmOpen(true)}
              className="text-[10px] text-red-400 hover:text-red-300 font-semibold"
            >
              Clear Notes
            </button>
          </div>
        </div>
      )}
      <ConfirmModal
        isOpen={isConfirmOpen}
        title="Clear Design Notes"
        message="Are you sure you want to clear all your design notes? This action cannot be undone."
        confirmText="Clear Notes"
        isDestructive={true}
        onConfirm={handleClear}
        onCancel={() => setIsConfirmOpen(false)}
      />
    </>
  );
}
