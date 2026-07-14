import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
  isDestructive?: boolean;
}

export function ConfirmModal({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  isDestructive = false
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[#FFFFFF]/80 backdrop-blur-sm">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
        >
          <button 
            onClick={onCancel}
            className="absolute top-4 right-4 text-[#6B7280] hover:text-[#111827] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="flex gap-4 items-start mb-6">
            <div className={`p-3 rounded-full shrink-0 ${isDestructive ? 'bg-red-500/20 text-red-400' : 'bg-[#3B82F6]/20 text-[#3B82F6]'}`}>
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="pt-1">
              <h3 className="text-lg font-semibold text-[#111827] mb-1">{title}</h3>
              <p className="text-[#4B5563] text-sm leading-relaxed">{message}</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 rounded-lg text-sm font-medium text-[#4B5563] hover:text-[#111827] hover:bg-[#E5E7EB] transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onCancel();
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors shadow-lg ${
                isDestructive 
                  ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                  : 'bg-[#3B82F6] hover:bg-[#2563EB] shadow-blue-500/20'
              }`}
            >
              {confirmText}
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
