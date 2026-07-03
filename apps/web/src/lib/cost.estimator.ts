import type { ArchGraph, ArchNode } from './types';

export interface CostEstimate {
  totalMonthly: number; // Base AWS
  awsMonthly: number;
  gcpMonthly: number;
  azureMonthly: number;
  breakdown: { nodeId: string; label: string; cost: number; description: string }[];
}

export function estimateCost(graph: ArchGraph | null): CostEstimate {
  if (!graph) return { totalMonthly: 0, awsMonthly: 0, gcpMonthly: 0, azureMonthly: 0, breakdown: [] };

  let totalMonthly = 0;
  const breakdown: CostEstimate['breakdown'] = [];

  (graph.nodes || []).forEach(node => {
    let cost = 0;
    let description = 'Free tier / Open source';

    // Very basic heuristic pricing model for portfolio demonstration
    const t = node.serviceType;
    const v = node.variantId;

    if (['postgresql', 'mysql', 'mongodb', 'mariadb', 'elasticsearch'].includes(t)) {
      if (v === 'cluster' || v === 'atlas') { cost = 300; description = 'Managed HA Cluster ($300/mo)'; }
      else if (v === 'provisioned') { cost = 150; description = 'Provisioned Instance ($150/mo)'; }
      else { cost = 45; description = 'Standard Cloud SQL ($45/mo)'; }
    } else if (['redis', 'memcached'].includes(t)) {
      if (v === 'cluster') { cost = 120; description = 'Managed Cache Cluster ($120/mo)'; }
      else { cost = 30; description = 'Standard Cache Node ($30/mo)'; }
    } else if (['aws_lambda', 'gcp_functions', 'azure_functions'].includes(t)) {
      cost = 10; description = 'Pay-per-execution (~$10/mo estimated)';
    } else if (['kubernetes', 'eks', 'gke'].includes(t)) {
      cost = 150; description = 'Managed K8s Control Plane + Nodes ($150/mo)';
    } else if (['api_gateway', 'kong', 'traefik'].includes(t)) {
      if (v === 'aws' || t === 'api_gateway') { cost = 15; description = 'Managed API Gateway ($15/mo)'; }
      else { cost = 20; description = 'Hosted Gateway VM ($20/mo)'; }
    } else if (['fastapi', 'django', 'nodejs', 'go', 'spring_boot', 'react', 'nextjs'].includes(t)) {
      cost = 20; description = 'App Runner / Container Hosting ($20/mo)';
    } else if (['kafka', 'rabbitmq'].includes(t)) {
      if (v === 'cloud') { cost = 250; description = 'Managed Event Stream ($250/mo)'; }
      else { cost = 40; description = 'Self-hosted VM ($40/mo)'; }
    } else if (t === 'cloudflare' || t === 'aws_cloudfront') {
      cost = 20; description = 'Pro Plan / Transfer Fees ($20/mo)';
    } else if (['s3', 'gcs', 'minio'].includes(t)) {
      cost = 10; description = 'Object Storage Base Storage + Transfer ($10/mo)';
    } else if (['openai_api', 'claude_api'].includes(t)) {
      cost = 50; description = 'API Token Usage Estimate ($50/mo)';
    } else if (['datadog', 'newrelic'].includes(t)) {
      cost = 100; description = 'SaaS Observability Platform ($100/mo)';
    } else {
      cost = 5; description = 'Basic Hosting / Usage ($5/mo)';
    }

    totalMonthly += cost;
    breakdown.push({ nodeId: node.id, label: node.label, cost, description });
  });

  // Calculate generic multi-cloud variations
  // Let's pretend GCP is 5% cheaper overall, Azure is 2% more expensive
  const gcpMonthly = Math.floor(totalMonthly * 0.95);
  const azureMonthly = Math.floor(totalMonthly * 1.02);
  const awsMonthly = totalMonthly;

  return { totalMonthly, awsMonthly, gcpMonthly, azureMonthly, breakdown };
}
