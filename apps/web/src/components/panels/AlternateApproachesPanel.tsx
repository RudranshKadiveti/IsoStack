import { useArchStore } from '../../store/useArchStore';
import { ARCHITECTURE_TEMPLATES } from '../../lib/architecture.templates';
import toast from 'react-hot-toast';
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { ConfirmModal } from '../ui/ConfirmModal';

export function AlternateApproachesPanel() {
  const loadTemplate = useArchStore(s => s.loadTemplate);
  const [confirmTemplateId, setConfirmTemplateId] = useState<string | null>(null);

  const handleLoad = (templateId: string) => {
    setConfirmTemplateId(templateId);
  };

  const confirmLoad = () => {
    if (confirmTemplateId) {
      const template = ARCHITECTURE_TEMPLATES[confirmTemplateId];
      if (template) {
        loadTemplate(template);
        toast.success(`Loaded ${template.name}`);
      }
      setConfirmTemplateId(null);
    }
  };

  return (
    <>
      <div className="p-4 space-y-4">
        <div className="mb-4">
          <h3 className="text-sm font-semibold text-[#111827] mb-1">Insights & Templates</h3>
          <p className="text-xs text-[#4B5563]">Explore alternative architectural patterns and load them into your canvas to start building instantly.</p>
        </div>

        {(() => {
          const graph = useArchStore.getState().graph;
          if (!graph || !graph.nodes || graph.nodes.length === 0) return null;
          
          const hasDb = graph.nodes.some(n => n.layer === 'database');
          const hasCache = graph.nodes.some(n => n.layer === 'cache');
          const hasCompute = graph.nodes.some(n => n.layer === 'compute');
          const hasCdn = graph.nodes.some(n => ['cloudflare', 'aws_cloudfront'].includes(n.serviceType));
          
          const tips = [];
          if (hasDb && !hasCache) tips.push('Add a Redis/Memcached layer to reduce database read load and improve response times.');
          if (hasCompute && !hasCdn) tips.push('Consider adding a CDN (like Cloudflare) to edge-cache static assets and reduce compute bandwidth.');
          if (graph.nodes.length > 5 && !graph.nodes.some(n => n.layer === 'messaging')) tips.push('Your architecture is growing. Consider decoupling synchronous API calls with a Message Queue (Kafka/RabbitMQ).');
          
          if (tips.length === 0) return null;

          return (
            <div className="bg-[#E5E7EB]/50 border border-[#D1D5DB] rounded-xl p-4 mb-6">
              <h4 className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Context-Aware Optimizations
              </h4>
              <ul className="space-y-2">
                {tips.map((tip, i) => (
                  <li key={i} className="text-[11px] text-[#374151] leading-relaxed flex items-start gap-1.5">
                    <span className="text-amber-500 mt-0.5">•</span> {tip}
                  </li>
                ))}
              </ul>
            </div>
          );
        })()}

        <div className="space-y-4">
          {Object.values(ARCHITECTURE_TEMPLATES).map(template => (
            <div key={template.id} className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
              <div className="p-4 border-b border-[#E5E7EB]">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-[#111827]">{template.name}</h4>
                    <p className="text-xs text-[#6B7280] mt-1">{template.description}</p>
                  </div>
                  <button
                    onClick={() => handleLoad(template.id)}
                    className="px-3 py-1.5 bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0 ml-3"
                  >
                    Load
                  </button>
                </div>
              </div>

              <div className="p-4 bg-[#FFFFFF]/50">
                <div className="mb-3">
                  <h5 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Pros</h5>
                  <ul className="space-y-1">
                    {template.pros.map((pro, i) => (
                      <li key={i} className="text-[11px] text-[#4B5563] flex items-start gap-1.5">
                        <span className="text-emerald-500 font-bold leading-none">+</span>
                        <span className="leading-tight">{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider mb-2">Cons</h5>
                  <ul className="space-y-1">
                    {template.cons.map((con, i) => (
                      <li key={i} className="text-[11px] text-[#4B5563] flex items-start gap-1.5">
                        <span className="text-rose-500 font-bold leading-none">-</span>
                        <span className="leading-tight">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <ConfirmModal
        isOpen={!!confirmTemplateId}
        title="Load Template"
        message={`This will replace your current architecture with the "${confirmTemplateId ? ARCHITECTURE_TEMPLATES[confirmTemplateId]?.name : ''}" template. Continue?`}
        confirmText="Load Template"
        onConfirm={confirmLoad}
        onCancel={() => setConfirmTemplateId(null)}
      />
    </>
  );
}
