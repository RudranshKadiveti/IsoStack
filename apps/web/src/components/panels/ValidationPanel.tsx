import { useState, useMemo, useEffect } from 'react';
import { useArchStore } from '../../store/useArchStore';
import { validateGraph } from '../../lib/architecture.validator';
import { AlertTriangle, Info, XCircle, ShieldAlert, CheckCircle2, ChevronUp, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ValidationPanel() {
  const graph = useArchStore((s) => s.graph);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [panelHeight, setPanelHeight] = useState(250);
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Toggle terminal with Ctrl + ` (backtick) or Cmd + `
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setIsVisible(prev => !prev);
        if (!isVisible) setIsOpen(true); // Open it when made visible
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isVisible]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const startY = e.clientY;
    const startHeight = panelHeight;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaY = startY - moveEvent.clientY;
      const newHeight = Math.max(100, Math.min(window.innerHeight - 200, startHeight + deltaY));
      setPanelHeight(newHeight);
      if (!isOpen && deltaY > 20) setIsOpen(true); // Auto open if dragged up
    };

    const handleMouseUp = () => {
      document.body.style.cursor = 'default';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    document.body.style.cursor = 'ns-resize';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const issues = useMemo(() => {
    if (!graph || !graph.nodes || graph.nodes.length === 0) return [];
    return validateGraph(graph.nodes, graph.edges || []);
  }, [graph]);

  const errors = issues.filter(i => i.severity === 'error');
  const warnings = issues.filter(i => i.severity === 'warning');
  const infos = issues.filter(i => i.severity === 'info');

  const hasIssues = issues.length > 0;
  
  if (!isVisible) return null;

  return (
    <div className="absolute bottom-0 left-0 w-full z-[100] bg-white shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
      {/* Resizable Drag Handle */}
      <div 
        className="w-full h-2 cursor-ns-resize hover:bg-blue-500/20 active:bg-blue-500/40 transition-colors flex items-center justify-center border-t border-gray-200"
        onMouseDown={handleMouseDown}
      >
        <div className="w-12 h-1 bg-gray-300 rounded-full" />
      </div>

      {/* Terminal Header / Toggle Bar */}
      <div 
        className="h-10 px-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-gray-500" />
            <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">Terminal</span>
          </div>

          <div className="w-px h-4 bg-gray-200" />

          {/* Badges */}
          <div className="flex items-center gap-3">
            {!hasIssues ? (
              <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                0 Issues
              </span>
            ) : (
              <>
                {errors.length > 0 && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-red-600">
                    <XCircle className="w-3.5 h-3.5" />
                    {errors.length} Errors
                  </span>
                )}
                {warnings.length > 0 && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-amber-600">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    {warnings.length} Warnings
                  </span>
                )}
                {infos.length > 0 && (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-blue-600">
                    <Info className="w-3.5 h-3.5" />
                    {infos.length} Info
                  </span>
                )}
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="text-gray-400 hover:text-gray-900 transition-colors p-1 rounded hover:bg-gray-200">
            {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              setIsVisible(false);
            }}
            className="text-gray-400 hover:text-red-600 transition-colors p-1 rounded hover:bg-red-50 ml-2"
            title="Close Terminal (Ctrl+`)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Terminal Content (Collapsible) */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: panelHeight }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="w-full bg-gray-50 overflow-hidden"
          >
            <div className="h-full overflow-y-auto p-4 space-y-2 font-mono text-sm">
              {!hasIssues ? (
                <div className="flex flex-col items-center justify-center h-full opacity-50 text-gray-500">
                  <CheckCircle2 className="w-8 h-8 mb-2 text-emerald-500" />
                  <p>System Architecture is fully validated.</p>
                  <p className="text-xs mt-1">No structural issues detected.</p>
                </div>
              ) : (
                issues.map((issue) => (
                  <div 
                    key={issue.id}
                    className={`p-2.5 rounded border flex items-start gap-3
                      ${issue.severity === 'error' ? 'bg-red-50/50 border-red-100 text-red-900' :
                        issue.severity === 'warning' ? 'bg-amber-50/50 border-amber-100 text-amber-900' :
                        'bg-blue-50/50 border-blue-100 text-blue-900'
                      }
                    `}
                  >
                    {issue.severity === 'error' ? (
                      <XCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                    ) : issue.severity === 'warning' ? (
                      <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="leading-tight">{issue.message}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
