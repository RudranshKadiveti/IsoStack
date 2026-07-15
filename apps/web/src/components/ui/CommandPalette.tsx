import { useEffect, useState } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { useArchStore } from '../../store/useArchStore';
import { useWorkspaceStore } from '../../store/useWorkspaceStore';
import { useSimulationStore } from '../../store/useSimulationStore';
import { NodeRegistry } from '../../lib/registry/NodeRegistry';
import { exportToImage, exportToJson, exportToTerraform } from '../../lib/exportUtils';
import { 
  Search,
  Box, 
  Trash2, 
  Play, 
  Save, 
  Image as ImageIcon,
  FileText,
  Code
} from 'lucide-react';
import { toast } from 'react-hot-toast';

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  
  const addNode = useArchStore((s) => s.addNode);
  const graph = useArchStore((s) => s.graph);
  const setGraph = useArchStore((s) => s.setGraph);
  
  const startSimulation = useSimulationStore((s) => s.startSimulation);
  const addCustomTemplate = useWorkspaceStore((s) => s.addCustomTemplate);

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
      <div 
        className="w-full max-w-xl bg-white rounded-xl shadow-2xl overflow-hidden border border-gray-200" 
        onClick={(e) => e.stopPropagation()}
      >
        <Command 
          className="w-full h-full flex flex-col"
          loop
        >
          <div className="flex items-center px-4 border-b border-gray-100">
            <Search className="w-5 h-5 text-gray-400 mr-2 shrink-0" />
            <Command.Input 
              autoFocus
              className="w-full bg-transparent border-none outline-none py-4 text-base text-gray-900 placeholder:text-gray-400"
              placeholder="Type a command or search nodes..." 
            />
          </div>

          <Command.List className="max-h-[350px] overflow-y-auto p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500">
              No results found.
            </Command.Empty>

            <Command.Group heading="Actions" className="px-2 text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">
              <Command.Item 
                onSelect={() => {
                  setOpen(false);
                  startSimulation();
                  toast.success('Simulation started');
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-gray-100"
              >
                <Play className="w-4 h-4 text-emerald-500" />
                Run Simulation
              </Command.Item>
              
              <Command.Item 
                onSelect={() => {
                  setOpen(false);
                  if (graph && graph.nodes && graph.nodes.length > 0) {
                    addCustomTemplate({
                      id: `custom_${Date.now()}`,
                      name: graph.project_name || 'My Custom Template',
                      description: graph.description || 'A custom architecture template.',
                      category: 'My Templates',
                      pros: [],
                      cons: [],
                      nodes: graph.nodes,
                      edges: graph.edges
                    });
                    toast.success('Saved as template!');
                  } else {
                    toast.error('Canvas is empty.');
                  }
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-gray-100"
              >
                <Save className="w-4 h-4 text-blue-500" />
                Save as Template
              </Command.Item>

              <Command.Item 
                onSelect={() => {
                  setOpen(false);
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
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-red-600 rounded-lg cursor-pointer hover:bg-red-50 aria-selected:bg-red-50"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
                Clear Canvas
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Export" className="px-2 text-xs font-semibold text-gray-500 mb-2 mt-4 uppercase tracking-wider">
              <Command.Item 
                onSelect={async () => {
                  setOpen(false);
                  const toastId = toast.loading('Exporting Image...');
                  try {
                    await exportToImage(graph?.project_name || 'architecture');
                    toast.success('Image exported successfully', { id: toastId });
                  } catch (e) {
                    toast.error('Failed to export image', { id: toastId });
                  }
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-gray-100"
              >
                <ImageIcon className="w-4 h-4 text-purple-500" />
                Export as PNG
              </Command.Item>
              <Command.Item 
                onSelect={() => {
                  setOpen(false);
                  if (graph) {
                    exportToJson(graph as any, graph.project_name || 'architecture');
                    toast.success('JSON exported');
                  }
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-gray-100"
              >
                <FileText className="w-4 h-4 text-orange-500" />
                Export as JSON
              </Command.Item>
              <Command.Item 
                onSelect={() => {
                  setOpen(false);
                  if (graph) {
                    exportToTerraform(graph as any, graph.project_name || 'architecture');
                    toast.success('Terraform exported');
                  }
                }}
                className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-gray-100"
              >
                <Code className="w-4 h-4 text-gray-600" />
                Export Terraform
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Add Nodes" className="px-2 text-xs font-semibold text-gray-500 mb-2 mt-4 uppercase tracking-wider">
              {NodeRegistry.getAllNodes().map((def) => {
                const IconComponent = def.fallbackIcon;
                return (
                  <Command.Item
                    key={def.type}
                    value={`Add Node: ${def.label} ${def.type} ${def.category}`}
                    onSelect={() => {
                      setOpen(false);
                      const newNode: any = {
                        id: `${def.type}_${Math.random().toString(36).substring(2, 9)}`,
                        serviceType: def.type,
                        label: def.label,
                        description: def.description,
                        variantId: def.variants?.[0]?.id || 'default',
                        position: { x: window.innerWidth / 2 - 100, y: window.innerHeight / 2 - 100 },
                        layer: 'compute', // Default generic layer
                        tags: def.tags || [],
                        responsibilities: [],
                        metrics: { expected_rps: null, data_size: null, sla: null },
                        grid_hint: { col: 3, row: 3 },
                      };
                      addNode(newNode);
                      toast.success(`Added ${def.label}`);
                    }}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-gray-900 rounded-lg cursor-pointer hover:bg-gray-100 aria-selected:bg-gray-100"
                  >
                    {IconComponent ? (
                      <IconComponent className="w-4 h-4" style={{ color: def.accentColor || '#6B7280' }} />
                    ) : (
                      <div 
                        className="w-4 h-4 rounded-sm flex items-center justify-center shrink-0" 
                        style={{ backgroundColor: def.accentColor || '#6B7280' }}
                      />
                    )}
                    <span>{def.label}</span>
                    <span className="ml-auto text-xs text-gray-400">{def.category}</span>
                  </Command.Item>
                );
              })}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
