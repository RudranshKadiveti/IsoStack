import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { useArchStore } from '../../store/useArchStore';
import { useUIStore } from '../../store/useUIStore';
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

  const handleClick = () => {
    selectNode(node.id);
    setDetailPane(true);
  };

  return (
    <div 
      className={`group relative flex items-center p-[6px] gap-3 rounded-lg border min-w-[200px] shadow-sm transition-all duration-300 cursor-pointer ${
        selected ? 'shadow-[0_0_20px_rgba(var(--tw-shadow-color),0.4)]' : 'hover:shadow-lg'
      }`}
      style={{
        backgroundColor: `color-mix(in oklch, ${color} ${selected ? '15%' : '8%'}, transparent)`,
        borderColor: `color-mix(in oklch, ${color} ${selected ? '100%' : '20%'}, transparent)`,
        '--tw-shadow-color': selected ? color : 'transparent'
      } as React.CSSProperties}
      onClick={handleClick}
    >
      <Handle type="target" position={Position.Left} style={{ background: '#475569', border: 'none' }} />
      <Handle type="source" position={Position.Right} style={{ background: '#475569', border: 'none' }} />

      {/* Icon Square */}
      <div 
        className="w-10 h-10 rounded shadow-inner flex items-center justify-center text-xl flex-shrink-0 relative overflow-hidden"
        style={{ backgroundColor: `color-mix(in oklch, ${color} 15%, transparent)`, border: `1px solid color-mix(in oklch, ${color} 40%, transparent)`, color }}
      >
        {Icon ? <Icon className="w-5 h-5 relative z-10" /> : <span className="relative z-10">?</span>}
      </div>

      {/* Label and Tech */}
      <div className="flex flex-col overflow-hidden">
        <span className="text-[#F1F5F9] text-sm font-semibold truncate leading-tight tracking-tight">
          {node.label}
        </span>
        <span className="text-[10px] font-mono truncate mt-0.5 tracking-wide" style={{ color: color }}>
          {variantDef ? variantDef.label : node.serviceType}
        </span>
      </div>
      
      {/* Type badge on hover */}
      <div className="absolute -top-2.5 -right-2.5 border rounded px-1.5 py-0.5 text-[8px] font-mono tracking-wider opacity-0 group-hover:opacity-100 transition-opacity bg-[#0B0F1A]" style={{ color, borderColor: `color-mix(in oklch, ${color} 30%, transparent)` }}>
        {(serviceDef?.label || node.serviceType).toUpperCase()}
      </div>
    </div>
  );
}

export const ServiceNode = memo(ServiceNodeComponent);
