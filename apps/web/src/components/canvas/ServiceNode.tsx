import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';
import { useSimulationStore } from '../../store/useSimulationStore';
import type { ArchNode } from '../../lib/types';
import { NodeRegistry } from '../../lib/registry/NodeRegistry';
import { ContextMenu, ContextMenuTrigger, ContextMenuContent, ContextMenuItem, ContextMenuSeparator } from '@radix-ui/react-context-menu';
import { Trash2, Copy } from 'lucide-react';

interface ServiceNodeProps {
  data: { node: ArchNode };
  selected: boolean;
}

function ServiceNodeComponent({ data, selected }: ServiceNodeProps) {
  const { node } = data;
  
  // Find the service definition
  const serviceDef = NodeRegistry.getNode(node.serviceType);
  const variantDef = serviceDef?.variants.find(v => v.id === node.variantId);

  const color = serviceDef?.accentColor || '#3B82F6';
  const Icon = serviceDef?.fallbackIcon;
  const iconUrl = serviceDef?.iconUrl;
  const shape = serviceDef?.shape || 'rectangle';
  
  const selectNode = useArchStore(s => s.selectNode);
  const setDetailPane = useUIStore(s => s.setDetailPane);
  const activeNodeId = useSimulationStore(s => s.activeNodeId);
  const removeNode = useArchStore(s => s.removeNode);
  const duplicateNodes = useArchStore(s => s.duplicateNodes);
  const isSimulatingActive = activeNodeId === node.id;

  const handleClick = () => {
    selectNode(node.id);
    setDetailPane(true);
  };

  let shapeClasses = 'rounded-xl';
  if (shape === 'cylinder') shapeClasses = 'rounded-3xl';
  if (shape === 'pill') shapeClasses = 'rounded-full px-2';
  if (shape === 'hexagon') shapeClasses = 'rounded-md clip-hexagon'; // Assuming CSS support, else just a variant
  if (shape === 'cloud') shapeClasses = 'rounded-3xl shadow-md border-t-4';

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <div 
          className={`group relative flex items-stretch bg-white border transition-all duration-200 cursor-pointer w-[240px] ${shapeClasses} ${
            isSimulatingActive 
              ? 'shadow-2xl scale-105 z-50 ring-4 ring-offset-2 ring-emerald-500 border-emerald-500' 
              : selected 
                ? 'shadow-xl border-blue-500 ring-4 ring-blue-500/30' 
                : 'shadow-sm border-gray-200 hover:shadow-lg hover:border-blue-400 hover:ring-4 hover:ring-blue-400/10 hover:-translate-y-0.5'
          }`}
          onClick={handleClick}
        >
          {/* Target Handle (Left) */}
          <Handle 
            type="target" 
            position={Position.Left} 
            className={`w-3 h-6 !bg-white !border-2 rounded-full transition-colors ${selected ? '!border-blue-500' : '!border-gray-300 group-hover:!border-gray-400'}`}
            style={{ left: -6, zIndex: 10 }}
          />
          
          {/* Source Handle (Right) */}
          <Handle 
            type="source" 
            position={Position.Right} 
            className={`w-3 h-6 !bg-white !border-2 rounded-full transition-colors ${selected ? '!border-blue-500' : '!border-gray-300 group-hover:!border-gray-400'}`}
            style={{ right: -6, zIndex: 10 }}
          />

          {/* Left Icon Area */}
          <div 
            className={`flex items-center justify-center w-14 shrink-0 border-r border-gray-100 relative overflow-hidden ${shapeClasses.includes('full') ? 'rounded-l-full' : 'rounded-l-xl'}`}
            style={{ backgroundColor: `color-mix(in oklch, ${color} 10%, white)` }}
          >
            {/* Subtle accent strip on the very left edge */}
            <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />
            <div 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-xl bg-white shadow-sm"
              style={{ color }}
            >
              {iconUrl ? (
                <img src={iconUrl} alt={serviceDef?.label} className="w-5 h-5 object-contain" />
              ) : Icon ? (
                <Icon className="w-5 h-5" />
              ) : (
                <span>?</span>
              )}
            </div>
          </div>

          {/* Right Content Area */}
          <div className={`flex flex-col py-3 px-3 overflow-hidden flex-1 justify-center bg-white ${shapeClasses.includes('full') ? 'rounded-r-full' : 'rounded-r-xl'}`}>
            <span className="text-gray-900 text-sm font-semibold truncate leading-tight tracking-tight">
              {node.label}
            </span>
            <span className="text-gray-500 text-[11px] truncate mt-0.5 tracking-wide">
              {variantDef ? variantDef.label : (serviceDef?.label || node.serviceType)}
            </span>
          </div>
        </div>
      </ContextMenuTrigger>

      <ContextMenuContent className="min-w-[180px] bg-white/95 backdrop-blur-md rounded-xl border border-gray-200 shadow-2xl p-1 z-50 text-sm font-medium font-sans">
        <ContextMenuItem 
          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none hover:bg-gray-100 focus:bg-gray-100 text-gray-700"
          onClick={() => duplicateNodes([node.id])}
        >
          <Copy className="w-4 h-4 text-gray-400" />
          Duplicate
        </ContextMenuItem>
        <ContextMenuSeparator className="h-px bg-gray-200 my-1 mx-2" />
        <ContextMenuItem 
          className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer outline-none hover:bg-red-50 focus:bg-red-50 text-red-600"
          onClick={() => {
            removeNode(node.id);
            if (selected) {
              selectNode(null);
              setDetailPane(false);
            }
          }}
        >
          <Trash2 className="w-4 h-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export const ServiceNode = memo(ServiceNodeComponent);
