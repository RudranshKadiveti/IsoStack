import type { ArchGraph } from './types';

export interface PerformanceMetrics {
  latencyScore: number; // 0-100
  throughputLevel: 'Low' | 'Medium' | 'High' | 'Extreme';
  availability: string; // e.g. "99.9%"
  complexityScore: number; // 0-100
  bottlenecks: string[];
}

export function analyzePerformance(graph: ArchGraph | null): PerformanceMetrics {
  if (!graph || (graph.nodes?.length || 0) === 0) {
    return {
      latencyScore: 100,
      throughputLevel: 'Low',
      availability: '99.0%',
      complexityScore: 0,
      bottlenecks: []
    };
  }

  const nodes = graph.nodes || [];
  const edges = graph.edges || [];

  let latencyPenalty = 0;
  let hasCache = false;
  let hasCDN = false;
  let hasReplication = false;

  nodes.forEach(n => {
    if (['redis', 'memcached', 'cloudfront', 'cloudflare'].includes(n.serviceType)) {
      if (['redis', 'memcached'].includes(n.serviceType)) hasCache = true;
      if (['cloudfront', 'cloudflare'].includes(n.serviceType)) hasCDN = true;
    }
    if (n.variantId === 'cluster' || n.variantId === 'global') {
      hasReplication = true;
    }
  });

  // Calculate generic complexity based on node count and edge connections
  const complexityScore = Math.min(100, Math.round((nodes.length * 5) + (edges.length * 3)));

  // Calculate hops penalty
  latencyPenalty = edges.length * 2;
  if (!hasCache && nodes.length > 3) latencyPenalty += 20;
  if (!hasCDN && nodes.length > 3) latencyPenalty += 10;

  const latencyScore = Math.max(0, 100 - latencyPenalty);

  // Throughput calculation
  let throughputLevel: 'Low' | 'Medium' | 'High' | 'Extreme' = 'Low';
  if (nodes.length > 10 || hasReplication) throughputLevel = 'Extreme';
  else if (nodes.length > 5 || hasCache) throughputLevel = 'High';
  else if (nodes.length > 2) throughputLevel = 'Medium';

  // Availability
  let availability = '99.9%';
  if (hasReplication && nodes.length > 3) availability = '99.99%';
  if (nodes.length === 1) availability = '99.0%';

  const bottlenecks = [];
  if (!hasCache && nodes.some(n => n.layer === 'database')) {
    bottlenecks.push('Database reads (No cache layer detected)');
  }
  if (!hasCDN && nodes.some(n => n.layer === 'client' || n.layer === 'infrastructure')) {
    bottlenecks.push('Static assets / Global routing (No CDN detected)');
  }
  if (edges.length > nodes.length * 2) {
    bottlenecks.push('Network overhead (High interconnectivity)');
  }

  return {
    latencyScore,
    throughputLevel,
    availability,
    complexityScore,
    bottlenecks
  };
}
