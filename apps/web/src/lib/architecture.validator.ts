import type { ArchNode, ArchEdge } from './types';

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationRule {
  id: string;
  severity: ValidationSeverity;
  message: string;
  nodeIds: string[];
}

export function validateGraph(nodes: ArchNode[], edges: ArchEdge[]): ValidationRule[] {
  const issues: ValidationRule[] = [];

  // 1. Disconnected Nodes
  const connectedNodeIds = new Set<string>();
  edges.forEach((e) => {
    connectedNodeIds.add(e.source);
    connectedNodeIds.add(e.target);
  });

  nodes.forEach((node) => {
    if (!connectedNodeIds.has(node.id)) {
      issues.push({
        id: `disconnected-${node.id}`,
        severity: 'warning',
        message: `${node.label} is disconnected.`,
        nodeIds: [node.id],
      });
    }
  });

  // 2. Public Database Risk
  // If a database is connected to a frontend/mobile client directly
  const dbNodes = nodes.filter(n => ['postgresql', 'mysql', 'mongodb', 'redis', 'cassandra'].includes(n.serviceType));
  const clientNodes = nodes.filter(n => ['react', 'nextjs', 'ios', 'android', 'browser'].includes(n.serviceType));
  
  dbNodes.forEach((db) => {
    clientNodes.forEach((client) => {
      const isConnected = edges.some(e => 
        (e.source === client.id && e.target === db.id) || 
        (e.source === db.id && e.target === client.id)
      );
      if (isConnected) {
        issues.push({
          id: `public-db-${db.id}-${client.id}`,
          severity: 'error',
          message: `Security Risk: ${client.label} connects directly to ${db.label}. Add an API layer.`,
          nodeIds: [db.id, client.id],
        });
      }
    });
  });

  // 3. Missing Cache (Heavy DB usage without caching)
  const hasCache = nodes.some(n => ['redis', 'memcached'].includes(n.serviceType));
  if (dbNodes.length >= 2 && !hasCache) {
    issues.push({
      id: 'missing-cache',
      severity: 'info',
      message: 'Consider adding a caching layer (e.g., Redis) to reduce load on multiple databases.',
      nodeIds: dbNodes.map(n => n.id),
    });
  }

  // 4. Circular Dependency Check
  const adjList = new Map<string, string[]>();
  nodes.forEach(n => adjList.set(n.id, []));
  edges.forEach(e => {
    if (adjList.has(e.source)) {
      adjList.get(e.source)!.push(e.target);
    }
  });

  const visited = new Set<string>();
  const recursionStack = new Set<string>();
  
  const detectCycle = (nodeId: string, path: string[]) => {
    visited.add(nodeId);
    recursionStack.add(nodeId);
    
    const neighbors = adjList.get(nodeId) || [];
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        detectCycle(neighbor, [...path, neighbor]);
      } else if (recursionStack.has(neighbor)) {
        // Cycle detected
        issues.push({
          id: `cycle-${nodeId}-${neighbor}`,
          severity: 'error',
          message: `Circular dependency detected involving ${nodes.find(n => n.id === nodeId)?.label}.`,
          nodeIds: [...path, neighbor],
        });
      }
    }
    recursionStack.delete(nodeId);
  };

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      detectCycle(node.id, [node.id]);
    }
  }

  return issues;
}
