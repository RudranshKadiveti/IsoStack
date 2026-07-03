from enum import Enum
from typing import Optional
from pydantic import BaseModel, field_validator



class LayerType(str, Enum):
    client = "client"; gateway = "gateway"; compute = "compute"
    data = "data"; cache = "cache"; queue = "queue"
    storage = "storage"; observability = "observability"
    auth = "auth"; external = "external"

class EdgeType(str, Enum):
    sync_http = "sync_http"; async_event = "async_event"
    data_stream = "data_stream"; db_query = "db_query"
    cache_read = "cache_read"; auth_check = "auth_check"

class GridHint(BaseModel):
    col: int; row: int
    @field_validator('col', 'row')
    @classmethod
    def in_range(cls, v):
        assert 0 <= v, "grid_hint col/row must be >= 0"
        return v

class NodeMetrics(BaseModel):
    expected_rps: Optional[str] = None
    data_size: Optional[str] = None
    sla: Optional[str] = None

class ArchNode(BaseModel):
    id: str; label: str; serviceType: str; variantId: str; layer: LayerType
    tags: list[str]; description: str
    plan_alignment: Optional[str] = None
    responsibilities: list[str]; metrics: NodeMetrics; grid_hint: GridHint

class ArchEdge(BaseModel):
    id: str; source: str; target: str
    type: EdgeType; label: str; bidirectional: bool

class UtilityItem(BaseModel):
    item: str
    description: str  # one-line explanation of what was checked
    status: str  # "required" | "recommended" | "optional"
    met: bool    # AI evaluates if the architecture actually satisfies this

class AlternativeArch(BaseModel):
    name: str; tradeoff: str

class ArchGraph(BaseModel):
    project_name: str; description: str
    overall_workflow: Optional[str] = None
    nodes: list[ArchNode]; edges: list[ArchEdge]
    utilities_checklist: list[UtilityItem]
    alternative_architectures: list[AlternativeArch]

    @field_validator('nodes')
    @classmethod
    def min_nodes(cls, v):
        assert len(v) >= 5, "Must have at least 5 nodes"
        ids = [n.id for n in v]
        assert len(ids) == len(set(ids)), "Duplicate node IDs"
        return v
