import { useArchStore } from '../../store/useArchStore';
import { ARCHITECTURE_TEMPLATES } from '../../lib/architecture.templates';
import toast from 'react-hot-toast';

export function AlternateApproachesPanel() {
  const loadTemplate = useArchStore(s => s.loadTemplate);

  const handleLoad = (templateId: string) => {
    const template = ARCHITECTURE_TEMPLATES[templateId];
    if (template) {
      if (confirm(`This will replace your current architecture with the "${template.name}" template. Continue?`)) {
        loadTemplate(template);
        toast.success(`Loaded ${template.name}`);
      }
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-[#F1F5F9] mb-1">Insights & Templates</h3>
        <p className="text-xs text-[#94A3B8]">Explore alternative architectural patterns and load them into your canvas to start building instantly.</p>
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
          <div className="bg-[#1E293B]/50 border border-[#334155] rounded-xl p-4 mb-6">
            <h4 className="text-xs font-bold text-amber-400 mb-2 flex items-center gap-1.5">
              <span>💡</span> Context-Aware Optimizations
            </h4>
            <ul className="space-y-2">
              {tips.map((tip, i) => (
                <li key={i} className="text-[11px] text-[#CBD5E1] leading-relaxed flex items-start gap-1.5">
                  <span className="text-amber-500 mt-0.5">•</span> {tip}
                </li>
              ))}
            </ul>
          </div>
        );
      })()}

      <div className="space-y-4">
        {Object.values(ARCHITECTURE_TEMPLATES).map(template => (
          <div key={template.id} className="bg-[#0F172A] border border-[#1E293B] rounded-xl overflow-hidden shadow-sm">
            <div className="p-4 border-b border-[#1E293B]">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#F1F5F9]">{template.name}</h4>
                  <p className="text-xs text-[#64748B] mt-1">{template.description}</p>
                </div>
                <button
                  onClick={() => handleLoad(template.id)}
                  className="px-3 py-1.5 bg-[#1D4ED8] hover:bg-[#2563EB] text-white text-xs font-semibold rounded-lg transition-colors flex-shrink-0 ml-3"
                >
                  Load
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 divide-x divide-[#1E293B]">
              <div className="p-3 bg-[color-mix(in_oklch,#10B981_5%,transparent)]">
                <p className="text-[10px] uppercase font-bold text-[#10B981] mb-2 tracking-wider">Pros</p>
                <ul className="space-y-1.5">
                  {template.pros.map((p, i) => (
                    <li key={i} className="text-xs text-[#E2E8F0] flex items-start gap-1.5">
                      <span className="text-[#34D399] mt-0.5">+</span>
                      <span className="leading-tight">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-3 bg-[color-mix(in_oklch,#EF4444_5%,transparent)]">
                <p className="text-[10px] uppercase font-bold text-[#EF4444] mb-2 tracking-wider">Cons</p>
                <ul className="space-y-1.5">
                  {template.cons.map((c, i) => (
                    <li key={i} className="text-xs text-[#E2E8F0] flex items-start gap-1.5">
                      <span className="text-[#F87171] mt-0.5">-</span>
                      <span className="leading-tight">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
