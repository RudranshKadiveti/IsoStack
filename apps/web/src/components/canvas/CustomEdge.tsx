import { BaseEdge, EdgeLabelRenderer, getBezierPath, type EdgeProps } from '@xyflow/react';
import { useArchStore } from '../../store/useArchStore';
import { useSimulationStore } from '../../store/useSimulationStore';
import { X } from 'lucide-react';

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  selected,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const removeEdge = useArchStore((s) => s.removeEdge);
  const activeEdgeId = useSimulationStore((s) => s.activeEdgeId);
  const isSimulatingActive = activeEdgeId === id;

  return (
    <>
      <BaseEdge 
        path={edgePath} 
        style={{ 
          strokeWidth: 20, 
          stroke: 'transparent', 
          cursor: 'pointer' 
        }}
        className="peer"
      />
      <BaseEdge 
        path={edgePath} 
        markerEnd={markerEnd} 
        style={{ 
          ...style, 
          strokeWidth: isSimulatingActive ? 4 : selected ? 3 : 2, 
          opacity: isSimulatingActive ? 1 : selected ? 1 : 0.7,
          stroke: isSimulatingActive ? '#10B981' : selected ? '#3B82F6' : style.stroke || '#9CA3AF',
          filter: isSimulatingActive ? 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.8))' : selected ? 'drop-shadow(0 0 5px rgba(59, 130, 246, 0.5))' : 'none'
        }}
        className="transition-all duration-200 peer-hover:stroke-[3px] peer-hover:opacity-100 peer-hover:stroke-blue-400"
      />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
            // Display the button when edge is selected, or use CSS group hover if we added classes
            opacity: selected ? 1 : 0, 
            transition: 'opacity 0.2s',
            zIndex: 1000,
          }}
          className="nodrag nopan group"
        >
          <button
            className="w-6 h-6 flex items-center justify-center bg-[#EF4444] hover:bg-[#DC2626] text-white rounded-full shadow-lg border-2 border-[#F9FAFB] transition-transform hover:scale-110 active:scale-95 cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              removeEdge(id);
            }}
            title="Remove Connection"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
