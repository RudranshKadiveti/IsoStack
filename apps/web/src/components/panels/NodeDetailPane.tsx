import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';
import { generateBoilerplate, pushBoilerplate, getUserRepos, getBranches, createBranch } from '../../lib/api';
import { NodeRegistry } from '../../lib/registry/NodeRegistry';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { ChevronDown, AlertTriangle, Info, XCircle, DollarSign, Activity, Zap, FileText, Link, Cloud, Image, FileSpreadsheet, Loader2, Plus, Trash2 } from 'lucide-react';
import { AlternateApproachesPanel } from './AlternateApproachesPanel';
import { DeploymentPanel } from './DeploymentPanel';
import { SecurityPanel } from './SecurityPanel';
import { toPng } from 'html-to-image';
import { generateOpenAPI } from '../../lib/export.openapi';
import { generateTerraform } from '../../lib/export.terraform';
import { estimateCost } from '../../lib/cost.estimator';

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

  const [repositories, setRepositories] = useState<any[]>([]);
  const [selectedRepo, setSelectedRepo] = useState<string>('');
  const [loadingRepos, setLoadingRepos] = useState(false);
  const [wsStatus, setWsStatus] = useState<'idle' | 'loading' | 'preview' | 'error' | 'pushing' | 'done'>('idle');
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [gapReport, setGapReport] = useState<string | null>(null);
  const [successRatio, setSuccessRatio] = useState<string | null>(null);

  // Branch state
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<string>('');
  const [loadingBranches, setLoadingBranches] = useState(false);
  const [showCreateBranch, setShowCreateBranch] = useState(false);
  const [newBranchName, setNewBranchName] = useState('');
  const [creatingBranch, setCreatingBranch] = useState(false);

  useEffect(() => {
    async function fetchRepos() {
      setLoadingRepos(true);
      try {
        const repos = await getUserRepos();
        setRepositories(repos || []);
      } catch (err: any) {
        if (err?.response?.status !== 401) {
          toast.error('Failed to load repositories');
        }
      } finally {
        setLoadingRepos(false);
      }
    }
    fetchRepos();
  }, []);

  const loadBranches = async (repoName: string) => {
    setLoadingBranches(true);
    setBranches([]);
    setSelectedBranch('');
    try {
      const b = await getBranches(repoName);
      setBranches(b || []);
      if (b?.some((x: any) => x.name === 'main')) setSelectedBranch('main');
      else if (b?.length > 0) setSelectedBranch(b[0].name);
    } catch (err: any) {
      toast.error('Failed to fetch branches');
    } finally {
      setLoadingBranches(false);
    }
  };

  useEffect(() => {
    if (selectedRepo) {
      loadBranches(selectedRepo);
    }
  }, [selectedRepo]);

  const handleCreateBranch = async () => {
    if (!newBranchName.trim()) return toast.error('Please enter a branch name');
    setCreatingBranch(true);
    try {
      await createBranch(selectedRepo, newBranchName);
      toast.success(`Branch "${newBranchName}" created`);
      setNewBranchName('');
      setShowCreateBranch(false);
      setSelectedBranch(newBranchName);
      await loadBranches(selectedRepo);
    } catch (err: any) {
      toast.error(err?.response?.data?.detail || 'Failed to create branch');
    } finally {
      setCreatingBranch(false);
    }
  };

  const setDetailPane = useUIStore((s) => s.setDetailPane);
  const [activeTab, setActiveTab] = useState<'properties' | 'templates' | 'security' | 'deployment'>('properties');

  const [isWorkflowExpanded, setIsWorkflowExpanded] = useState(false);

  if (!graph) return (
    <div className="h-full w-full bg-[#FFFFFF] border-l border-[#E5E7EB] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.5)] z-20 overflow-hidden overflow-y-auto">
      <div className="p-5 border-b border-[#E5E7EB] flex-shrink-0">
         <h2 className="text-[#111827] text-lg font-bold leading-tight flex-1 mr-2">Templates</h2>
         <p className="text-[#6B7280] text-xs leading-relaxed mt-1">Start by loading a template or describe your idea to generate one.</p>
      </div>
      <AlternateApproachesPanel />
    </div>
  );

  const node = graph.nodes?.find((n) => n.id === selectedId);
  const edgeCount = graph.edges?.filter(
    (e) => e.source === selectedId || e.target === selectedId
  )?.length || 0;
  
  // Look up catalog info for the selected node
  const serviceDef = node ? NodeRegistry.getNode(node.serviceType) : null;
  const variantDef = serviceDef?.variants.find(v => v.id === node?.variantId);
  const color = serviceDef?.accentColor || '#3B82F6';
  const Icon = serviceDef?.fallbackIcon;
  
  const difficulty = getDifficultyBadge(graph.nodes?.length || 0);
  const metCount = graph.utilities_checklist?.filter((u) => u.met)?.length || 0;
  const totalCount = graph.utilities_checklist?.length || 0;

  async function handleGenerate() {
    if (!selectedRepo) return toast.error('Please select a repository');
    if (!selectedBranch) return toast.error('Please select a branch');
    if (!graph) return;
    
    setWsStatus('loading');
    try {
      const flowEl = document.querySelector('.react-flow') as HTMLElement;
      let pngDataUrl = null;
      if (flowEl) {
        pngDataUrl = await toPng(flowEl, { backgroundColor: '#FFFFFF' });
      }
      
      const result = await generateBoilerplate(graph, pngDataUrl);
      setGenerationId(result.generation_id);
      setGapReport(result.gap_report);
      setSuccessRatio(result.success_ratio);
      setWsStatus('preview');
      toast.success('Boilerplate generated! Please review the gap report.');
    } catch (err: any) {
      setWsStatus('error');
      toast.error(err?.response?.data?.detail || 'Failed to generate boilerplate');
    }
  }

  async function handlePush() {
    if (!generationId || !selectedRepo || !selectedBranch) return;
    setWsStatus('pushing');
    try {
      const result = await pushBoilerplate(generationId, selectedRepo, selectedBranch);
      setWsStatus('done');
      toast.success(result.message || 'Pushed to GitHub successfully!');
    } catch (err: any) {
      setWsStatus('error');
      toast.error(err?.response?.data?.detail || 'Failed to push to GitHub');
    }
  }

  return (
    <div className="h-full w-full bg-[#FFFFFF] border-l border-[#E5E7EB] flex flex-col shadow-[-4px_0_24px_rgba(0,0,0,0.5)] z-20 overflow-hidden">
      
      {/* Header */}
      <div className="p-5 border-b border-[#E5E7EB] flex-shrink-0">
        <div className="flex items-start justify-between mb-2">
          <h2 className="text-[#111827] text-lg font-bold leading-tight flex-1 mr-2">
            {graph.project_name}
          </h2>
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full border flex-shrink-0"
            style={{ color: difficulty.color, borderColor: difficulty.color, background: `${difficulty.bg}66` }}
          >
            {difficulty.label}
          </span>
        </div>
        <p className="text-[#6B7280] text-xs leading-relaxed">{graph.description}</p>
        {graph.overall_workflow && (
          <div className="mt-3 bg-[#E5E7EB]/50 border border-[#D1D5DB] rounded-lg overflow-hidden transition-all duration-300">
            <button 
              onClick={() => setIsWorkflowExpanded(!isWorkflowExpanded)}
              className="w-full flex items-center justify-between p-3 text-left hover:bg-[#D1D5DB]/30 transition-colors"
            >
              <p className="text-[#4B5563] text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1.5">
                <Activity size={12} className="text-[#3B82F6]" />
                Architecture Workflow
              </p>
              <ChevronDown className={`w-3.5 h-3.5 text-[#4B5563] transition-transform duration-200 ${isWorkflowExpanded ? 'rotate-180' : ''}`} />
            </button>
            {isWorkflowExpanded && (
              <div className="px-3 pb-3 pt-0">
                <p className="text-[#374151] text-[11px] leading-relaxed">{graph.overall_workflow}</p>
              </div>
            )}
          </div>
        )}
        
        {/* Tabs */}
        <div className="flex gap-4 mt-4 border-b border-[#E5E7EB]">
          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === 'properties' ? 'text-[#111827] border-[#3B82F6]' : 'text-[#6B7280] border-transparent hover:text-[#4B5563]'}`}
          >
            Properties
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`pb-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === 'security' ? 'text-[#111827] border-[#3B82F6]' : 'text-[#6B7280] border-transparent hover:text-[#4B5563]'}`}
          >
            Security
          </button>
          <button
            onClick={() => setActiveTab('deployment')}
            className={`pb-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === 'deployment' ? 'text-[#111827] border-[#3B82F6]' : 'text-[#6B7280] border-transparent hover:text-[#4B5563]'}`}
          >
            Deployment
          </button>
          <button
            onClick={() => setActiveTab('templates')}
            className={`pb-2 text-xs font-semibold transition-colors border-b-2 ${activeTab === 'templates' ? 'text-[#111827] border-[#3B82F6]' : 'text-[#6B7280] border-transparent hover:text-[#4B5563]'}`}
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
              <div className="p-0 flex flex-col h-full bg-[#FAFAFA]">
                {/* Node Identity Header (Sticky) */}
                <div className="sticky top-0 z-10 bg-white border-b border-gray-200 p-5 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-[11px] uppercase tracking-[0.15em] font-bold text-gray-500">Node Details</p>
                    <button
                      onClick={() => { setDetailPane(false); selectNode(null); }}
                      className="text-gray-400 hover:text-gray-900 transition-colors p-1"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex items-center gap-4">
                    {Icon && (
                      <div 
                        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border bg-white"
                        style={{ borderColor: `color-mix(in oklch, ${color} 30%, transparent)` }}
                      >
                        <Icon className="w-6 h-6" style={{ color }} />
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-black text-lg font-bold truncate tracking-tight">{node.label}</h3>
                      <p className="text-[12px] font-mono mt-0.5" style={{ color }}>{serviceDef?.label || node.serviceType}</p>
                    </div>
                  </div>
                </div>

                <div className="p-5 space-y-6">
                  {/* Variant Selection */}
                  {serviceDef && serviceDef.variants.length > 1 && (
                    <div className="space-y-2">
                      <label className="text-black text-xs font-semibold uppercase tracking-wider">Variant</label>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-md border border-gray-200 bg-white hover:border-gray-300 text-sm text-black transition-all shadow-sm">
                            <span className="font-medium">{variantDef?.label || node.variantId}</span>
                            <ChevronDown className="w-4 h-4 text-gray-500" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-[280px] bg-white border-gray-200 shadow-xl rounded-xl">
                          {serviceDef.variants.map((v) => (
                            <DropdownMenuItem
                              key={v.id}
                              onClick={() => updateNodeVariant(node.id, v.id)}
                              className={`p-3 cursor-pointer ${node.variantId === v.id ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                            >
                              <div className="flex flex-col">
                                <div className="flex items-center justify-between">
                                  <span className="font-semibold text-black text-sm">{v.label}</span>
                                  {node.variantId === v.id && (
                                    <span className="text-[10px] bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">Active</span>
                                  )}
                                </div>
                                <p className="text-[11px] text-gray-600 mt-1 leading-relaxed">{v.description}</p>
                              </div>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}

                  {/* Dynamic Properties */}
                  {serviceDef?.propertiesSchema && serviceDef.propertiesSchema.length > 0 && (
                    <div className="space-y-3">
                      <label className="text-black text-xs font-semibold uppercase tracking-wider">Properties</label>
                      <div className="space-y-3 bg-white border border-gray-100 p-3 rounded-md shadow-sm">
                        {serviceDef.propertiesSchema.map((field) => {
                          const value = node.properties?.[field.name] ?? field.defaultValue;
                          return (
                            <div key={field.name} className="flex flex-col gap-1">
                              <label className="text-[11px] font-semibold text-gray-700">{field.label}</label>
                              {field.type === 'boolean' ? (
                                <select 
                                  className="border border-gray-200 rounded px-2 py-1.5 text-xs text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  value={value ? 'true' : 'false'}
                                  onChange={(e) => useArchStore.getState().updateNodeProperties(node.id, { ...node.properties, [field.name]: e.target.value === 'true' })}
                                >
                                  <option value="true">True</option>
                                  <option value="false">False</option>
                                </select>
                              ) : field.type === 'select' && field.options ? (
                                <select 
                                  className="border border-gray-200 rounded px-2 py-1.5 text-xs text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  value={value}
                                  onChange={(e) => useArchStore.getState().updateNodeProperties(node.id, { ...node.properties, [field.name]: e.target.value })}
                                >
                                  {field.options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                                </select>
                              ) : (
                                <input 
                                  type={field.type === 'number' ? 'number' : 'text'}
                                  className="border border-gray-200 rounded px-2 py-1.5 text-xs text-black focus:outline-none focus:ring-1 focus:ring-blue-500"
                                  value={value}
                                  onChange={(e) => useArchStore.getState().updateNodeProperties(node.id, { ...node.properties, [field.name]: field.type === 'number' ? Number(e.target.value) : e.target.value })}
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Description & Tags */}
                  <div className="space-y-2">
                    <label className="text-black text-xs font-semibold uppercase tracking-wider">Overview</label>
                    <p className="text-gray-700 text-sm leading-relaxed bg-white border border-gray-100 p-3 rounded-md shadow-sm">
                      {node.description}
                    </p>
                    {node.tags && node.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {node.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-mono px-2 py-1 rounded-md bg-gray-100 border border-gray-200 text-black shadow-sm">{tag}</span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Metrics */}
                  {node.metrics && (
                    <div className="space-y-2">
                      <label className="text-black text-xs font-semibold uppercase tracking-wider">Metrics</label>
                      <div className="grid grid-cols-3 gap-3">
                        {([['RPS', node.metrics.expected_rps], ['Data', node.metrics.data_size], ['SLA', node.metrics.sla]] as [string, string | null][]).map(([label, val]) => (
                          <div key={label} className="bg-white border border-gray-200 rounded-md p-3 text-center shadow-sm">
                            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-wider">{label}</p>
                            <p className="text-black text-xs font-mono font-bold mt-1">{val ?? '—'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Responsibilities */}
                  {node.responsibilities && node.responsibilities.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-black text-xs font-semibold uppercase tracking-wider">Responsibilities</label>
                      <ul className="space-y-2 bg-white border border-gray-100 p-3 rounded-md shadow-sm">
                        {node.responsibilities.map((r, i) => (
                          <li key={i} className="flex items-start gap-2 text-black text-sm leading-relaxed">
                            <span style={{ color }} className="flex-shrink-0 mt-1 mr-1 w-1.5 h-1.5 rounded-full bg-current opacity-70"></span> {r}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Delete Action */}
                  <div className="pt-4 border-t border-gray-200">
                    <button
                      onClick={() => { removeNode(node.id); setDetailPane(false); selectNode(null); }}
                      className="w-full py-2.5 rounded-md border border-red-200 bg-white hover:bg-red-50 text-red-600 text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2"
                    >
                      <Trash2 className="w-4 h-4" /> Delete Node
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Removed Dummy Global Graph Details */}

            {/* Requirements section */}
            <div className="p-4 border-b border-[#E5E7EB]">
              <p className="text-[#9CA3AF] text-[10px] uppercase tracking-widest font-semibold mb-3 flex items-center justify-between">
                <span>Requirements</span>
                <span className="font-mono lowercase text-[#6B7280]">{metCount}/{totalCount} met</span>
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
                        <p className="text-[#4B5563] text-xs mt-1 leading-relaxed">{u.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="p-4">
              <p className="text-[#9CA3AF] text-[10px] uppercase tracking-widest font-semibold mb-3">Actions</p>
              <div className="flex gap-2 mb-2">
                <button
                  onClick={() => {
                    const blob = new Blob([JSON.stringify(graph, null, 2)], { type: 'application/json' });
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a'); a.href = url; a.download = 'isostack-arch.json'; a.click();
                    URL.revokeObjectURL(url);
                    toast.success('JSON exported!');
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#E5E7EB] hover:border-[#3B82F6]/50 text-[#4B5563] hover:text-[#111827] text-xs font-medium transition-all flex items-center justify-center gap-2"
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
                  className="flex-1 py-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#E5E7EB] hover:border-[#3B82F6]/50 text-[#4B5563] hover:text-[#111827] text-xs font-medium transition-all flex items-center justify-center gap-2"
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
                  className="flex-1 py-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#E5E7EB] hover:border-[#3B82F6]/50 text-[#4B5563] hover:text-[#111827] text-xs font-medium transition-all flex items-center justify-center gap-2"
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
                  className="flex-1 py-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#E5E7EB] hover:border-[#3B82F6]/50 text-[#4B5563] hover:text-[#111827] text-xs font-medium transition-all flex items-center justify-center gap-2"
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
                      const dataUrl = await toPng(flowEl, { backgroundColor: '#FFFFFF' });
                      const a = document.createElement('a'); a.href = dataUrl; a.download = 'architecture.png'; a.click();
                      toast.success('Image exported!', { id: 'img-export' });
                    } catch (e) {
                      toast.error('Export failed', { id: 'img-export' });
                    }
                  }}
                  className="flex-1 py-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#E5E7EB] hover:border-[#3B82F6]/50 text-[#4B5563] hover:text-[#111827] text-xs font-medium transition-all flex items-center justify-center gap-2"
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
                  className="flex-1 py-2 rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] hover:bg-[#E5E7EB] hover:border-[#3B82F6]/50 text-[#4B5563] hover:text-[#111827] text-xs font-medium transition-all flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" /> CSV
                </button>
              </div>
              
              <div className="flex flex-col gap-2">
                {loadingRepos ? (
                  <div className="text-xs text-[#4B5563] text-center py-2 flex justify-center items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading repositories...</div>
                ) : (
                  <select
                    className="w-full bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#3B82F6]/50 text-xs rounded-lg px-2.5 py-2 outline-none font-mono text-[#6B7280] transition-colors appearance-none"
                    value={selectedRepo}
                    onChange={(e) => setSelectedRepo(e.target.value)}
                  >
                    <option value="" disabled>Select a GitHub Repository</option>
                    {repositories.map((repo) => (
                      <option key={repo.id} value={repo.name}>
                        {repo.name} {repo.is_private ? '(Private)' : ''}
                      </option>
                    ))}
                  </select>
                )}
                
                {selectedRepo && (
                  <>
                    {loadingBranches ? (
                      <div className="text-xs text-[#4B5563] text-center py-2 flex justify-center items-center gap-1.5"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading branches...</div>
                    ) : (
                      <select
                        className="w-full bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#3B82F6]/50 text-xs rounded-lg px-2.5 py-2 outline-none font-mono text-[#6B7280] transition-colors appearance-none"
                        value={selectedBranch}
                        onChange={(e) => setSelectedBranch(e.target.value)}
                      >
                        <option value="" disabled>Select a Branch</option>
                        {branches.map((branch) => (
                          <option key={branch.name} value={branch.name}>
                            {branch.name} {branch.protected ? '(Protected)' : ''}
                          </option>
                        ))}
                      </select>
                    )}

                    {!showCreateBranch ? (
                      <button
                        onClick={() => setShowCreateBranch(true)}
                        className="w-full py-1.5 rounded-lg border border-[#E5E7EB] bg-transparent hover:bg-[#E5E7EB] text-[#4B5563] hover:text-[#111827] text-xs font-medium transition-all flex items-center justify-center gap-1.5"
                      >
                        <Plus className="w-3 h-3" /> Create New Branch
                      </button>
                    ) : (
                      <div className="flex gap-1.5">
                        <input
                          type="text"
                          placeholder="e.g. feature/new-arch"
                          value={newBranchName}
                          onChange={(e) => setNewBranchName(e.target.value)}
                          disabled={creatingBranch}
                          className="flex-1 bg-[#F9FAFB] border border-[#E5E7EB] focus:border-[#3B82F6]/50 text-xs rounded-lg px-2 py-1 outline-none font-mono text-[#030712] transition-colors"
                        />
                        <button
                          onClick={handleCreateBranch}
                          disabled={creatingBranch || !newBranchName.trim()}
                          className="bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors flex items-center justify-center min-w-[50px]"
                        >
                          {creatingBranch ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Create'}
                        </button>
                        <button
                          onClick={() => { setShowCreateBranch(false); setNewBranchName(''); }}
                          disabled={creatingBranch}
                          className="bg-transparent border border-[#E5E7EB] hover:bg-[#E5E7EB] text-[#4B5563] text-xs px-2.5 py-1 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </>
                )}

                {(wsStatus === 'preview' || wsStatus === 'pushing') ? (
                  <div className="flex flex-col gap-2 mt-2">
                    <div className="bg-[#E5E7EB] rounded-lg p-3 text-xs text-[#1F2937] max-h-48 overflow-y-auto">
                      <h4 className="font-bold text-[#3B82F6] mb-2">Generation Preview ({successRatio} Nodes Success)</h4>
                      <div className="whitespace-pre-wrap font-mono text-[10px] opacity-90">{gapReport}</div>
                    </div>
                    <button
                      onClick={handlePush}
                      disabled={wsStatus === 'pushing'}
                      className="w-full bg-[#10B981] hover:bg-[#059669] disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex justify-center items-center gap-2"
                    >
                      {wsStatus === 'pushing' ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Pushing to {selectedBranch}...</> : 'Review & Push'}
                    </button>
                    <button
                      onClick={() => setWsStatus('idle')}
                      disabled={wsStatus === 'pushing'}
                      className="w-full bg-transparent border border-[#D1D5DB] hover:bg-[#D1D5DB] disabled:opacity-50 text-[#4B5563] text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={handleGenerate}
                    disabled={wsStatus === 'loading' || !selectedRepo || !selectedBranch}
                    className="w-full bg-[#1D4ED8] hover:bg-[#2563EB] disabled:opacity-50 text-white text-xs font-semibold px-3 py-2 rounded-lg transition-colors flex justify-center items-center gap-2 mt-1"
                  >
                    {wsStatus === 'loading' ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Generating AI Boilerplate...</> : wsStatus === 'done' ? '✓ Pushed' : 'Generate & Review Boilerplate'}
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
