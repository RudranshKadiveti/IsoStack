import { useState } from 'react';
import toast from 'react-hot-toast';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';
import { generateWorkspace } from '../../lib/api';
import { SERVICE_CATALOG } from '../../lib/services.catalog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDown, AlertTriangle, Info, XCircle, DollarSign, Activity, Zap, FileText, Link, Cloud, Image, FileSpreadsheet } from 'lucide-react';
import { AlternateApproachesPanel } from './AlternateApproachesPanel';
import { DeploymentPanel } from './DeploymentPanel';
import { SecurityPanel } from './SecurityPanel';
import { validateArchitecture } from '../../lib/architecture.validator';
import { estimateCost } from '../../lib/cost.estimator';
import { generateTerraform } from '../../lib/export.terraform';
import { generateOpenAPI } from '../../lib/export.openapi';
import { analyzePerformance } from '../../lib/performance.analyzer';
import { toPng } from 'html-to-image';

function getDifficultyBadge(nodeCount: number) {
  if (nodeCount <= 5) return { label: 'basic',        color: '#10B981', bg: '#064E3B' };
  if (nodeCount <= 8) return { label: 'intermediate', color: '#F59E0B', bg: '#78350F' };
  return              { label: 'advanced',      color: '#EF4444', bg: '#7F1D1D' };
}

export function NodeDetailPane() {
  const selectedId = useArchStore((s) => s.selectedNodeId);
  const graph = useArchStore((s) => s.graph);
  const removeNode = useArchStore((s) => s.removeNode);
  const selectNode = useArchStore((s) => s.selectNode);
  const updateNodeVariant = useArchStore((s) => s.updateNodeVariant);

  const [path, setPath] = useState('C:/projects/myapp');
  const [wsStatus, setWsStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const setDetailPane = useUIStore((s) => s.setDetailPane);
  const [activeTab, setActiveTab] = useState<'properties' | 'templates' | 'security' | 'deployment'>('properties');

  const [isWorkflowExpanded, setIsWorkflowExpanded] = useState(false);

  if (!graph) return (
    <div className="h-full w-full bg-[#0B0F1A] border-l border-[#1E293B] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.5)] z-20 overflow-hidden overflow-y-auto">
      <div className="p-5 border-b border-[#1E293B] flex-shrink-0">
         <h2 className="text-[#F1F5F9] text-lg font-bold leading-tight flex-1 mr-2">Templates</h2>
         <p className="text-[#64748B] text-xs leading-relaxed mt-1">Start by loading a template or describe your idea to generate one.</p>
      </div>
      <AlternateApproachesPanel />
    </div>
  );

  const node = graph.nodes?.find((n) => n.id === selectedId);
  const edgeCount = graph.edges?.filter(
    (e) => e.source === selectedId || e.target === selectedId
  )?.length || 0;
  
  // Look up catalog info for the selected node
  const serviceDef = node ? SERVICE_CATALOG.find(s => s.type === node.serviceType) : null;
  const variantDef = serviceDef?.variants.find(v => v.id === node?.variantId);
  const color = serviceDef?.accentColor || '#3B82F6';
  const Icon = serviceDef?.icon;
  
  const difficulty = getDifficultyBadge(graph.nodes?.length || 0);
  const metCount = graph.utilities_checklist?.filter((u) => u.met)?.length || 0;
  const totalCount = graph.utilities_checklist?.length || 0;

  async function handleGenerate() {
    if (!path.trim() || !graph) return;
    setWsStatus('loading');
    try {
      await generateWorkspace(graph, path.trim());
      setWsStatus('done');
      toast.success('Workspace files generated!');
    } catch {
      setWsStatus('error');
      toast.error('Workspace generation failed');
    }
  }

  return (
    <div className="h-full w-full bg-[#0B0F1A] border-l border-[#1E293B] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.5)] z-20 overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-[#1E293B] flex-shrink-0">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-[#F1F5F9] text-lg font-bold leading-tight flex-1 mr-2">
            {graph.project_name}
          </h2>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0"
            style={{ color: difficulty.color, borderColor: difficulty.color, background: `${difficulty.bg}66` }}
          >
            {difficulty.label}
          </span>
        </div>
        <p className="text-[#64748B] text-xs leading-relaxed">{graph.description}</p>
        {graph.overall_workflow && (
          <div className="mt-3 bg-[#1E293B]/50 border border-[#334155] rounded-lg overflow-hidden transition-all duration-300">
            <button 
              onClick={() => setIsWorkflowExpanded(!isWorkflowExpanded)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-[#334155]/30 transition-colors"
            >
              <p className="text-[#94A3B8] text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Activity size={12} className="text-[#3B82F6]" />
                Architecture Workflow
              </p>
              <ChevronDown className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${isWorkflowExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isWorkflowExpanded && (
              <div className="px-3 pb-3 pt-0">
                <p className="text-[#CBD5E1] text-[11px] leading-relaxed">{graph.overall_workflow}</p>
              </div>
            )}
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex gap-4 mt-4 border-b border-[#1E293B]">
          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === 'properties' ? 'text-[#F1F5F9] border-[#3B82F6]' : 'text-[#64748B] border-transparent hover:text-[#94A3B8]'}`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === 'security' ? 'text-[#F1F5F9] border-[#3B82F6]' : 'text-[#64748B] border-transparent hover:text-[#94A3B8]'}`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`pb-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === 'deployment' ? 'text-[#F1F5F9] border-[#3B82F6]' : 'text-[#64748B] border-transparent hover:text-[#94A3B8]'}`}
          >
            Deployment
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`pb-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === 'templates' ? 'text-[#F1F5F9] border-[#3B82F6]' : 'text-[#64748B] border-transparent hover:text-[#94A3B8]'}`}
          >
            Templates
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {activeTab === 'templates' ? (
          <AlternateApproachesPanel />
        ) : activeTab === 'security' ? (
          <SecurityPanel />
        ) : activeTab === 'deployment' ? (
          <DeploymentPanel />
        ) : (
          <>
            {/* Selected node details */}
            {node && (
              <div className="p-4 border-b border-[#1E293B]" style={{ background: `color-mix(in oklch, ${color} 5%, transparent)` }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-[10px] uppercase tracking-widest font-semibold text-[#475569]">Selected Node</p>
                  <button
                    onClick={() => { setDetailPane(false); selectNode(null); }}
                    className="text-[#475569] hover:text-[#94A3B8] text-xl leading-none"
                  >
                    ×
                  </button>
                </div>

                {/* Service identity */}
                <div className="flex items-center gap-3 mb-3">
                  {Icon && (
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `color-mix(in oklch, ${color} 15%, transparent)`, border: `1px solid color-mix(in oklch, ${color} 30%, transparent)` }}
                    >
                      <Icon className="w-5 h-5" style={{ color }} />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#F1F5F9] font-semibold truncate">{node.label}</h3>
                    <span 
                      className="text-[10px] font-mono"
                      style={{ color }}
                    >
                      {serviceDef?.label || node.serviceType}
                    </span>
                  </div>
                </div>

                {/* Variant selector */}
                {serviceDef && serviceDef.variants.length > 1 && (
                  <div className="mb-3">
                    <p className="text-[10px] uppercase tracking-wider text-[#475569] font-semibold mb-1.5">Variant</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg border border-[#1E293B] bg-[#0F172A] hover:border-[#334155] text-sm text-[#F1F5F9] transition-colors">
                          <span>{variantDef?.label || node.variantId}</span>
                          <ChevronDown className="w-4 h-4 text-[#64748B]" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-[260px]">
                        {serviceDef.variants.map((v) => (
                          <DropdownMenuItem
                            key={v.id}
                            onClick={() => updateNodeVariant(node.id, v.id)}
                            className={node.variantId === v.id ? 'bg-[#1E293B]' : ''}
                          >
                            <div className="flex flex-col py-0.5">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{v.label}</span>
                                {node.variantId === v.id && (
                                  <span className="text-[10px] text-[#3B82F6] font-mono">current</span>
                                )}
                              </div>
                              <p className="text-[10px] text-[#64748B] mt-0.5">{v.description}</p>
                              <div className="flex gap-1 mt-1 flex-wrap">
                                {v.tags.map(tag => (
                                  <span key={tag} className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">{tag}</span>
                                ))}
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                )}

                <p className="text-[#94A3B8] text-xs leading-relaxed mb-3">{node.description}</p>

                {/* Tags */}
                {node.tags && node.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {node.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#1E293B] text-[#94A3B8]">{tag}</span>
                    ))}
                  </div>
                )}

                {node.responsibilities && node.responsibilities.length > 0 && (
                  <ul className="space-y-1 mb-3">
                    {node.responsibilities.map((r, i) => (
                      <li key={i} className="flex items-start gap-2 text-[#CBD5E1] text-xs">
                        <span style={{ color }} className="flex-shrink-0 mt-0.5">▸</span> {r}
                      </li>
                    ))}
                  </ul>
                )}

                {node.plan_alignment && (
                  <div className="mb-3 bg-[#0F172A] border border-[#1E293B] rounded p-2.5">
                    <p className="text-[10px] uppercase tracking-wider text-[#475569] font-semibold mb-1 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                      Plan Alignment
                    </p>
                    <p className="text-[#94A3B8] text-[11px] leading-relaxed">{node.plan_alignment}</p>
                  </div>
                )}

                {node.metrics && (
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {([['RPS', node.metrics.expected_rps], ['Data', node.metrics.data_size], ['SLA', node.metrics.sla]] as [string, string | null][]).map(([label, val]) => (
                      <div key={label} className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2 text-center shadow-inner">
                        <p className="text-[#475569] text-[9px] uppercase">{label}</p>
                        <p className="text-[#F1F5F9] text-[10px] font-mono mt-0.5">{val ?? '—'}</p>
                      </div>
                    ))}
                  </div>
                )}

                <p className="text-[#475569] text-xs mb-3">{edgeCount} connection{edgeCount !== 1 ? 's' : ''}</p>

                <button
                  onClick={() => { removeNode(node.id); setDetailPane(false); selectNode(null); }}
                  className="w-full py-1.5 rounded border border-red-900/40 text-red-400 hover:bg-red-900/20 text-xs transition-colors font-medium"
                >
                  Remove Node
                </button>
              </div>
            )}

            {/* Validation Issues */}
            {(graph.nodes?.length || 0) > 0 && (
              <div className="p-4 border-b border-[#1E293B]">
                <p className="text-[#475569] text-[10px] uppercase tracking-widest font-semibold mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" /> Architecture Health</span>
                </p>
                <div className="space-y-2">
                  {validateArchitecture(graph).map(issue => (
                    <div key={issue.id} className="rounded-lg p-3 border shadow-sm" style={{
                      borderColor: issue.severity === 'error' ? '#7F1D1D40' : issue.severity === 'warning' ? '#78350F40' : '#1E293B',
                      background: issue.severity === 'error' ? '#450a0a' : issue.severity === 'warning' ? '#451a03' : '#0F172A'
                    }}>
                      <div className="flex items-start gap-2.5">
                        {issue.severity === 'error' ? <XCircle className="w-4 h-4 text-red-500 mt-0.5" /> : 
                         issue.severity === 'warning' ? <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5" /> : 
                         <Info className="w-4 h-4 text-blue-500 mt-0.5" />}
                        <div>
                          <p className={`text-xs font-bold ${issue.severity === 'error' ? 'text-red-400' : issue.severity === 'warning' ? 'text-amber-400' : 'text-blue-400'}`}>
                            {issue.title}
                          </p>
                          <p className="text-[#94A3B8] text-[10px] mt-1 leading-relaxed">{issue.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Performance Metrics */}
            {(graph.nodes?.length || 0) > 0 && (
              <div className="p-4 border-b border-[#1E293B]">
                <p className="text-[#475569] text-[10px] uppercase tracking-widest font-semibold mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-yellow-400" /> Performance Analysis</span>
                </p>
                {(() => {
                  const perf = analyzePerformance(graph);
                  return (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2 text-center shadow-inner">
                          <p className="text-[#475569] text-[9px] uppercase">Latency Score</p>
                          <p className="text-emerald-400 text-sm font-mono mt-0.5">{perf.latencyScore}/100</p>
                        </div>
                        <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2 text-center shadow-inner">
                          <p className="text-[#475569] text-[9px] uppercase">Throughput</p>
                          <p className="text-blue-400 text-sm font-mono mt-0.5">{perf.throughputLevel}</p>
                        </div>
                        <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2 text-center shadow-inner">
                          <p className="text-[#475569] text-[9px] uppercase">Availability</p>
                          <p className="text-purple-400 text-sm font-mono mt-0.5">{perf.availability}</p>
                        </div>
                        <div className="bg-[#0B0F1A] border border-[#1E293B] rounded p-2 text-center shadow-inner">
                          <p className="text-[#475569] text-[9px] uppercase">Complexity</p>
                          <p className="text-orange-400 text-sm font-mono mt-0.5">{perf.complexityScore}/100</p>
                        </div>
                      </div>
                      {perf.bottlenecks.length > 0 && (
                        <div className="mt-2">
                          <p className="text-[#94A3B8] text-[10px] mb-1 font-semibold">Potential Bottlenecks:</p>
                          <ul className="list-disc pl-4 text-[10px] text-[#64748B] space-y-0.5">
                            {perf.bottlenecks.map((b, i) => <li key={i}>{b}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Cost Estimate */}
            {(graph.nodes?.length || 0) > 0 && (
              <div className="p-4 border-b border-[#1E293B]">
                <p className="text-[#475569] text-[10px] uppercase tracking-widest font-semibold mb-3 flex items-center justify-between">
                  <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" /> Estimated Cost</span>
                  <span className="text-emerald-400 font-mono">${estimateCost(graph).awsMonthly}/mo</span>
                </p>
                <div className="flex gap-2 mb-3">
                  <div className="flex-1 bg-[#1E293B]/50 border border-[#334155] rounded p-1.5 text-center">
                    <p className="text-[8px] text-[#94A3B8] uppercase">AWS</p>
                    <p className="text-xs font-mono text-[#F8FAFC]">${estimateCost(graph).awsMonthly}</p>
                  </div>
                  <div className="flex-1 bg-[#1E293B]/50 border border-[#334155] rounded p-1.5 text-center">
                    <p className="text-[8px] text-[#94A3B8] uppercase">GCP</p>
                    <p className="text-xs font-mono text-[#F8FAFC]">${estimateCost(graph).gcpMonthly}</p>
                  </div>
                  <div className="flex-1 bg-[#1E293B]/50 border border-[#334155] rounded p-1.5 text-center">
                    <p className="text-[8px] text-[#94A3B8] uppercase">Azure</p>
                    <p className="text-xs font-mono text-[#F8FAFC]">${estimateCost(graph).azureMonthly}</p>
                  </div>
                </div>
                <div className="space-y-1.5 max-h-40 overflow-y-auto pr-1">
                  {estimateCost(graph).breakdown.map(item => (
                    <div key={item.nodeId} className="flex justify-between items-center text-xs p-1.5 hover:bg-[#1E293B] rounded">
                      <span className="text-[#CBD5E1] truncate mr-2" title={item.description}>{item.label}</span>
                      <span className="text-[#94A3B8] font-mono">${item.cost}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Requirements section */}
            <div className="p-4 border-b border-[#1E293B]">
              <p className="text-[#475569] text-[10px] uppercase tracking-widest font-semibold mb-3 flex items-center justify-between">
                <span>Requirements</span>
                <span className="font-mono lowercase text-[#64748B]">{metCount}/{totalCount} met</span>
              </p>
              <div className="space-y-2">
                {graph.utilities_checklist?.map((u, i) => (
                  <div
                    key={i}
                    onClick={() => useArchStore.getState().toggleUtility(i)}
                    className="rounded-lg p-3 border shadow-sm cursor-pointer hover:brightness-110 transition-all"
                    style={{
                      borderColor: u.met ? '#16532920' : '#7F1D1D20',
                      background: u.met ? '#052e16' : '#1c0a0a',
                    }}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="text-base flex-shrink-0 mt-0.5">
                        {u.met ? (
                          <span className="text-[#22C55E]">⊙</span>
                        ) : (
                          <span className="text-[#EF4444]">⊗</span>
                        )}
                      </span>
                      <div>
                        <p
                          className="text-sm font-semibold leading-tight"
                          style={{ color: u.met ? '#4ADE80' : '#F87171' }}
                        >
                          {u.item}
                        </p>
                        <p className="text-[#94A3B8] text-xs mt-1 leading-relaxed">{u.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4">
              <p className="text-[#475569] text-[10px] uppercase tracking-widest font-semibold mb-3">Actions</p>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(graph, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = 'isostack-arch.json'; a.click();
                    URL.revokeObjectURL(url);
                    toast.success('JSON exported!');
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#1E293B] bg-[#0F172A] hover:bg-[#1E293B] hover:border-[#3B82F6]/50 text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-medium transition-all flex items-center justify-center gap-2"
                >
                  <span>{'{ }'}</span> JSON
                </button>
                <button
                  onClick={() => {
                    const md = `# ${graph.project_name}\n\n${graph.description}\n\n## Architecture Nodes\n${(graph.nodes || []).map(n => `- **${n.label}** (${n.serviceType}): ${n.description}`).join('\n')}`;
                    const blob = new Blob([md], { type: 'text/markdown' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = 'architecture.md'; a.click();
                    URL.revokeObjectURL(url);
                    toast.success('Markdown exported!');
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#1E293B] bg-[#0F172A] hover:bg-[#1E293B] hover:border-[#3B82F6]/50 text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FileText className="w-4 h-4" /> Markdown
                </button>
                <button
                  onClick={() => {
                    const api = generateOpenAPI(graph);
                    const blob = new Blob([api], { type: 'text/yaml' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = 'openapi.yaml'; a.click();
                    URL.revokeObjectURL(url);
                    toast.success('OpenAPI exported!');
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#1E293B] bg-[#0F172A] hover:bg-[#1E293B] hover:border-[#3B82F6]/50 text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Link className="w-4 h-4" /> OpenAPI
                </button>
                <button
                  onClick={() => {
                    const tf = generateTerraform(graph);
                    const blob = new Blob([tf], { type: 'text/plain' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = 'main.tf'; a.click();
                    URL.revokeObjectURL(url);
                    toast.success('Terraform exported!');
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#1E293B] bg-[#0F172A] hover:bg-[#1E293B] hover:border-[#3B82F6]/50 text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Cloud className="w-4 h-4" /> TF
                </button>
              </div>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={async () => {
                    const flowEl = document.querySelector('.react-flow') as HTMLElement;
                    if (!flowEl) return toast.error('Canvas not found');
                    toast.loading('Exporting image...', { id: 'img-export' });
                    try {
                      const dataUrl = await toPng(flowEl, { backgroundColor: '#0B0F1A' });
                      const a = document.createElement('a'); a.href = dataUrl; a.download = 'architecture.png'; a.click();
                      toast.success('Image exported!', { id: 'img-export' });
                    } catch (e) {
                      toast.error('Export failed', { id: 'img-export' });
                    }
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#1E293B] bg-[#0F172A] hover:bg-[#1E293B] hover:border-[#3B82F6]/50 text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-medium transition-all flex items-center justify-center gap-2"
                >
                  <Image className="w-4 h-4" /> PNG
                </button>
                <button
                  onClick={() => {
                    const est = estimateCost(graph);
                    let csv = 'Component,Cost (USD)\n';
                    est.breakdown.forEach(item => {
                      csv += `"${item.label}",${item.cost}\n`;
                    });
                    csv += `Total,${est.totalMonthly}\n`;
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = 'cost-estimate.csv'; a.click();
                    URL.revokeObjectURL(url);
                    toast.success('CSV exported!');
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#1E293B] bg-[#0F172A] hover:bg-[#1E293B] hover:border-[#3B82F6]/50 text-[#94A3B8] hover:text-[#F1F5F9] text-xs font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" /> CSV
                </button>
              </div>
              
              <div className="flex gap-2">
                <input
                  className="flex-1 bg-[#0F172A] border border-[#1E293B] focus:border-[#3B82F6]/50 text-[10px] rounded-lg px-2.5 py-2 outline-none font-mono text-[#64748B] transition-colors"
                  placeholder="Workspace path…"
                  value={path}
                  onChange={(e) => setPath(e.target.value)}
                />
                <button
                  onClick={handleGenerate}
                  disabled={wsStatus === 'loading'}
                  className="bg-[#1D4ED8] hover:bg-[#2563EB] disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                >
                  {wsStatus === 'loading' ? '…' : wsStatus === 'done' ? '✓' : 'Build'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
