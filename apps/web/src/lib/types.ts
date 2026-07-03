export type NodeType =
  | 'Compute' | 'Database' | 'Cache' | 'Queue'
  | 'Storage' | 'Gateway' | 'Auth' | 'CDN' | 'Observer' | 'External';

export type LayerType =
  | 'client' | 'gateway' | 'compute' | 'data'
  | 'cache' | 'queue' | 'storage' | 'observability' | 'auth' | 'external';

export type EdgeType =
  | 'sync_http' | 'async_event' | 'data_stream'
  | 'db_query' | 'cache_read' | 'auth_check';

export interface GridHint {
  col: number; // 0–7
  row: number; // 0–7
}

export interface NodeMetrics {
  expected_rps: string | null;
  data_size: string | null;
  sla: string | null;
}

export interface ArchNode {
  id: string;                    // snake_case
  label: string;
  serviceType: string;
  variantId: string;
  layer: LayerType;
  tags: string[];
  description: string;
  responsibilities: string[];
  metrics: NodeMetrics;
  grid_hint: GridHint;
  // Runtime-only (added by frontend, not in AI JSON):
  position?: { x: number; y: number }; // resolved 2D coords
}

export interface ArchEdge {
  id: string;                    // format: "source_id__target_id"
  source: string;                // node id
  target: string;                // node id
  type: EdgeType;
  label: string;
  bidirectional: boolean;
}

export interface UtilityItem {
  item: string;
  description: string;           // one-line explanation of what was checked
  status: 'required' | 'recommended' | 'optional';
  met: boolean;                  // AI-evaluated: does the architecture satisfy this?
  checked?: boolean;             // frontend-only user toggle
}

export interface AlternativeArch {
  name: string;
  tradeoff: string;
}

export interface ArchGraph {
  project_name: string;
  description: string;
  nodes: ArchNode[];
  edges: ArchEdge[];
  utilities_checklist: UtilityItem[];
  alternative_architectures: AlternativeArch[];
}
