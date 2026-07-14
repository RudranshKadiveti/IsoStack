import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';
import { useSimulationStore } from '../../store/useSimulationStore';
import type { ArchNode } from '../../lib/types';
import { SERVICE_CATALOG } from '../../lib/services.catalog';

interface ServiceNodeProps {
  data: { node: ArchNode };
  selected: boolean;
}

function ServiceNodeComponent({ data, selected }: ServiceNodeProps) {
  const { node } = data;
  
  // Find the service definition
  const serviceDef = SERVICE_CATALOG.find(s => s.type === node.serviceType);
  const variantDef = serviceDef?.variants.find(v => v.id === node.variantId);

  const color = serviceDef?.accentColor || '#3B82F6';
  const Icon = serviceDef?.icon;
  
  const selectNode = useArchStore(s => s.selectNode);
  const setDetailPane = useUIStore(s => s.setDetailPane);
  const activeNodeId = useSimulationStore(s => s.activeNodeId);
  const isSimulatingActive = activeNodeId === node.id;

  const handleClick = () => {
    selectNode(node.id);
    setDetailPane(true);
  };

  return (
    <div 
      className={`group relative flex items-stretch bg-white rounded-xl border transition-all duration-200 cursor-pointer w-[240px] ${
        isSimulatingActive 
          ? 'shadow-lg scale-105 z-50 ring-2 ring-offset-2 ring-blue-500 border-blue-500' 
          : selected ? 'shadow-md border-gray-400 ring-1 ring-gray-400' : 'shadow-sm border-gray-200 hover:shadow-md hover:border-gray-300'
      }`}
      onClick={handleClick}
    >
      {/* Target Handle (Left) */}
      <Handle 
        type="target" 
        position={Position.Left} 
        className="w-2 h-6 !bg-gray-100 !border-2 !border-gray-300 rounded-full" 
        style={{ left: -5, zIndex: 10 }}
      />
      
      {/* Source Handle (Right) */}
      <Handle 
        type="source" 
        position={Position.Right} 
        className="w-2 h-6 !bg-gray-100 !border-2 !border-gray-300 rounded-full" 
        style={{ right: -5, zIndex: 10 }}
      />

      {/* Left Icon Area */}
      <div 
        className="flex items-center justify-center w-14 shrink-0 rounded-l-xl border-r border-gray-100 relative overflow-hidden"
        style={{ backgroundColor: `color-mix(in oklch, ${color} 10%, white)` }}
      >
        {/* Subtle accent strip on the very left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: color }} />
        <div 
          className="w-8 h-8 rounded-lg flex items-center justify-center text-xl bg-white shadow-sm"
          style={{ color }}
        >
          {Icon ? <Icon className="w-5 h-5" /> : <span>?</span>}
        </div>
      </div>

      {/* Right Content Area */}
      <div className="flex flex-col py-3 px-3 overflow-hidden flex-1 justify-center bg-white rounded-r-xl">
        <span className="text-gray-900 text-sm font-semibold truncate leading-tight tracking-tight">
          {node.label}
        </span>
        <span className="text-gray-500 text-[11px] truncate mt-0.5 tracking-wide">
          {variantDef ? variantDef.label : (serviceDef?.label || node.serviceType)}
        </span>
      </div>
    </div>
  );
}

export const ServiceNode = memo(ServiceNodeComponent);
