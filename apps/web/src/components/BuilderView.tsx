import { BuilderCanvas } from './canvas/BuilderCanvas';
import { PromptBar } from './panels/PromptBar';
import { NodeDetailPane } from './panels/NodeDetailPane';
import { AppSidebar } from './panels/AppSidebar';
import { CollaborationBar } from './ui/CollaborationBar';
import { useUIStore } from '../store/useUIStore';
import { useArchStore } from '../store/useArchStore';
import { useWorkspaceStore } from '../store/useWorkspaceStore';
import { ArrowLeft, Save, Star, Trash2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { ARCHITECTURE_TEMPLATES } from '../lib/architecture.templates';
import { toast } from 'react-hot-toast';
import { FloatingCopilot } from './dashboard/FloatingCopilot';
import { ConfirmModal } from './ui/ConfirmModal';

export function BuilderView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isLoading = useUIStore((s) => s.isLoading);
  
  const workspaces = useWorkspaceStore((s) => s.workspaces);
  const updateWorkspace = useWorkspaceStore((s) => s.updateWorkspace);
  
  const graph = useArchStore((s) => s.graph);
  const setGraph = useArchStore((s) => s.setGraph);
  
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [isClearConfirmOpen, setIsClearConfirmOpen] = useState(false);
  const isInitialMount = useRef(true);

  // Load Workspace on Mount
  useEffect(() => {
    if (id) {
      if (id.startsWith('template_')) {
        const templateId = id.replace('template_', '');
        const template = ARCHITECTURE_TEMPLATES[templateId];
        if (template) {
          setGraph(JSON.parse(JSON.stringify({
            project_name: template.name,
            description: template.description,
            nodes: template.nodes,
            edges: template.edges,
            utilities_checklist: [],
            alternative_architectures: []
          })));
        }
      } else if (id.startsWith('custom_')) {
        const customTemplates = useWorkspaceStore.getState().customTemplates || [];
        const template = customTemplates.find(t => t.id === id);
        if (template) {
          setGraph(JSON.parse(JSON.stringify({
            project_name: template.name,
            description: template.description,
            nodes: template.nodes,
            edges: template.edges,
            utilities_checklist: [],
            alternative_architectures: []
          })));
        }
      } else {
        const workspace = workspaces.find((w) => w.id === id);
        if (workspace) {
          if (workspace.graph) {
            setGraph(workspace.graph);
          } else {
            // Initialize empty graph if none exists
            setGraph({
              project_name: workspace.name,
              description: '',
              nodes: [],
              edges: [],
              utilities_checklist: [],
              alternative_architectures: []
            });
          }
        }
      }
    }
  }, [id]); // Only run when ID changes to load initial state

  // Evaluate Metrics Helper
  const evaluateMetrics = (currentGraph: any) => {
    const nodes = currentGraph.nodes || [];
    let estimatedCost = 0;
    let cloudProvider = 'AWS'; // Default
    let healthScore = 50; // Base score

    if (nodes.length === 0) return { estimatedCost: 0, cloudProvider: 'N/A', healthScore: 0 };

    let hasLB = false;
    let hasCache = false;

    nodes.forEach((n: any) => {
      const type = n.serviceType || '';
      // Cost estimation
      if (['postgresql', 'mysql', 'mongodb', 'cassandra'].includes(type)) estimatedCost += 45;
      else if (['redis', 'memcached'].includes(type)) { estimatedCost += 20; hasCache = true; }
      else if (['kafka', 'rabbitmq'].includes(type)) estimatedCost += 60;
      else if (['aws_lambda', 'gcp_functions'].includes(type)) estimatedCost += 5;
      else if (['api_gateway', 'kong', 'nginx', 'haproxy'].includes(type)) { estimatedCost += 15; hasLB = true; }
      else estimatedCost += 25; // Default compute node

      // Cloud Provider detection
      if (type.includes('aws') || type.includes('dynamodb') || type.includes('sqs')) cloudProvider = 'AWS';
      if (type.includes('gcp') || type.includes('firestore') || type.includes('pubsub')) cloudProvider = 'GCP';
      if (type.includes('azure')) cloudProvider = 'Azure';
      if (type.includes('cloudflare')) cloudProvider = 'Cloudflare';
      if (type.includes('supabase')) cloudProvider = 'Supabase';
    });

    // Health Score calculation
    if (nodes.length > 2) healthScore += 10;
    if (hasLB) healthScore += 15;
    if (hasCache) healthScore += 15;
    if (nodes.length > 10) healthScore += 10;
    
    return { estimatedCost, cloudProvider, healthScore: Math.min(healthScore, 100) };
  };

  // Autosave when Graph changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (id && graph) {
      if (id.startsWith('template_') || id.startsWith('custom_')) {
        // Preview mode: Fork on edit
        let template;
        if (id.startsWith('template_')) {
          const templateId = id.replace('template_', '');
          template = ARCHITECTURE_TEMPLATES[templateId];
        } else {
          const customTemplates = useWorkspaceStore.getState().customTemplates || [];
          template = customTemplates.find(t => t.id === id);
        }

        if (template) {
          const hasChanged = JSON.stringify(graph.nodes) !== JSON.stringify(template.nodes) || 
                             JSON.stringify(graph.edges) !== JSON.stringify(template.edges);
          
          if (hasChanged) {
            setSaveStatus('saving');
            const createWorkspace = useWorkspaceStore.getState().createWorkspace;
            const metrics = evaluateMetrics(graph);
            const newId = createWorkspace(graph.project_name || template.name);
            
            updateWorkspace(newId, {
              name: graph.project_name || 'Untitled Workspace',
              graph,
              serviceCount: graph.nodes?.length || 0,
              estimatedCost: metrics.estimatedCost,
              cloudProvider: metrics.cloudProvider,
              healthScore: metrics.healthScore,
              autosaveAt: 'Just now',
              lastOpened: 'Just now',
              updatedAt: new Date().toISOString()
            });
            navigate(`/workspace/${newId}`, { replace: true });
          }
        }
      } else {
        // Normal autosave
        setSaveStatus('saving');
        const timeout = setTimeout(() => {
          const metrics = evaluateMetrics(graph);
          updateWorkspace(id, {
            name: graph.project_name || 'Untitled Workspace',
            graph,
            serviceCount: graph.nodes?.length || 0,
            estimatedCost: metrics.estimatedCost,
            cloudProvider: metrics.cloudProvider,
            healthScore: metrics.healthScore,
            autosaveAt: 'Just now',
            lastOpened: 'Just now',
            updatedAt: new Date().toISOString()
          });
          setSaveStatus('saved');
        }, 1000); // 1s debounce
        
        return () => clearTimeout(timeout);
      }
    }
  }, [graph, id]);

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[#0F172A] select-none text-[#F1F5F9] font-sans">
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-[200] flex items-center justify-center bg-[#0B0F1A]/80 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full border-2 border-[#3B82F6] border-t-transparent animate-spin mb-4" />
            <p className="text-[#3B82F6] text-sm font-semibold tracking-wide">Designing architecture…</p>
            <p className="text-[#64748B] text-xs mt-1">Generating nodes and enforcing constraints</p>
          </div>
        </div>
      )}

      {/* Left Sidebar (Services) */}
      <AppSidebar />

      {/* Main Canvas Area */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        
        {/* Top Navigation & Status */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-3 py-1.5 bg-[#1E293B]/80 hover:bg-[#334155] border border-[#334155] rounded-lg text-sm text-[#F1F5F9] font-medium backdrop-blur-md transition-colors shadow-lg whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Dashboard</span>
            </button>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 flex justify-center items-center pointer-events-auto min-w-0 px-4 w-full max-w-[400px]">
            {graph && (!id?.startsWith('template_') && !id?.startsWith('custom_')) && (
              <input
                type="text"
                value={graph.project_name || ''}
                onChange={(e) => {
                  useArchStore.getState().updateProjectName(e.target.value);
                }}
                placeholder="Untitled Workspace"
                className="bg-transparent border border-transparent hover:border-[#334155] focus:border-[#3B82F6] focus:bg-[#0B0F1A]/80 rounded-md px-2 py-1 text-[#F1F5F9] font-semibold text-lg w-full max-w-[400px] text-center outline-none transition-all placeholder-[#64748B] text-ellipsis overflow-hidden whitespace-nowrap"
              />
            )}
            
            {graph && (id?.startsWith('template_') || id?.startsWith('custom_')) && (
              <h2 className="text-[#F1F5F9] font-semibold text-lg px-2 py-1 text-center truncate w-full max-w-[400px]">
                {graph.project_name || 'Template Preview'}
              </h2>
            )}
          </div>

          <div className="pointer-events-auto flex items-center justify-end gap-2">
            {(!id?.startsWith('template_') && !id?.startsWith('custom_')) && graph?.nodes?.length > 0 && (
              <>
                <button
                  onClick={() => setIsClearConfirmOpen(true)}
                  className="px-3 py-1.5 bg-[#ef4444]/10 hover:bg-[#ef4444]/20 border border-[#ef4444]/30 rounded-full text-xs font-medium text-[#ef4444] backdrop-blur-md transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear Canvas
                </button>
                <button
                  onClick={() => {
                    const addCustomTemplate = useWorkspaceStore.getState().addCustomTemplate;
                    addCustomTemplate({
                      id: `custom_${Date.now()}`,
                      name: graph.project_name || 'My Custom Template',
                      description: graph.description || 'A custom architecture template.',
                      category: 'My Templates',
                      pros: ['Custom built for my needs'],
                      cons: [],
                      nodes: graph.nodes,
                      edges: graph.edges
                    });
                    toast.success('Saved as template!');
                  }}
                  className="px-3 py-1.5 bg-[#1E293B]/80 hover:bg-[#334155] border border-[#334155] rounded-full text-xs font-medium text-[#F1F5F9] backdrop-blur-md transition-colors whitespace-nowrap shrink-0"
                >
                  Save as Template
                </button>
              </>
            )}
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1E293B]/80 border border-[#334155] rounded-full text-xs font-medium text-[#94A3B8] backdrop-blur-md whitespace-nowrap shrink-0">
              {id?.startsWith('template_') ? (
              <>
                <div className="w-3.5 h-3.5 flex items-center justify-center text-amber-400">
                  <Star className="w-full h-full fill-current" />
                </div>
                Template Preview
              </>
            ) : saveStatus === 'saving' ? (
              <>
                <div className="w-3 h-3 rounded-full border-2 border-[#94A3B8] border-t-transparent animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 text-[#3B82F6]" />
                Saved just now
              </>
            )}
            </div>
            <CollaborationBar />
          </div>
        </div>

        {/* Top Header / Prompt */}
        <div className="absolute top-0 w-full z-10 flex items-start justify-center p-4 py-6 pointer-events-none pr-16 mt-8">
          <div className="pointer-events-auto w-full max-w-2xl px-4">
            <PromptBar />
          </div>
        </div>

        {/* The React Flow Canvas */}
        <div className="flex-1 bg-[#0B0F1A] relative z-0">
          <BuilderCanvas />
        </div>

        <FloatingCopilot />
      </div>

      {/* Right Properties Panel */}
      <div className="w-[320px] h-full flex-shrink-0 z-20">
        <NodeDetailPane />
      </div>

      <ConfirmModal
        isOpen={isClearConfirmOpen}
        title="Clear Canvas"
        message="Are you sure you want to clear the entire architecture? This action cannot be undone."
        confirmText="Clear Canvas"
        isDestructive={true}
        onConfirm={() => {
          if (graph) {
            setGraph({
              ...graph,
              nodes: [],
              edges: [],
              utilities_checklist: [],
              alternative_architectures: []
            });
            toast.success('Canvas cleared');
          }
          setIsClearConfirmOpen(false);
        }}
        onCancel={() => setIsClearConfirmOpen(false)}
      />
    </div>
  );
}
