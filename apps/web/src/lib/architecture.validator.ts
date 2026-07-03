import type { ArchGraph, ArchNode } from './types';

export type ValidationSeverity = 'error' | 'warning' | 'info';

export interface ValidationIssue {
  id: string;
  severity: ValidationSeverity;
  title: string;
  description: string;
}

export function validateArchitecture(graph: ArchGraph | null): ValidationIssue[] {
  if (!graph || !graph.nodes || graph.nodes.length === 0) return [];

  const issues: ValidationIssue[] = [];
  const nodes = graph.nodes || [];
  const edges = graph.edges || [];

  // Helpers
  const hasService = (category: string) => nodes.some(n => {
    // Need to look up category, but since we don't import catalog here to avoid circular dependencies
    // or just rely on well-known types
    return ['postgresql','mysql','mongodb','redis','cassandra','dynamodb'].includes(n.serviceType) && category === 'database' ||
           ['redis','memcached'].includes(n.serviceType) && category === 'cache' ||
           ['prometheus','grafana','datadog','loki','jaeger'].includes(n.serviceType) && category === 'monitoring' ||
           ['api_gateway','kong','traefik','nginx'].includes(n.serviceType) && category === 'gateway';
  });

  const getConnectedNodes = (nodeId: string) => {
    const connectedEdges = edges.filter(e => e.source === nodeId || e.target === nodeId);
    const nodeIds = new Set(connectedEdges.map(e => e.source === nodeId ? e.target : e.source));
    return nodes.filter(n => nodeIds.has(n.id));
  };

  // 1. Single Point of Failure (Database with only 1 connection and no replicas)
  const dbs = nodes.filter(n => ['postgresql', 'mysql', 'mongodb', 'mariadb'].includes(n.serviceType));
  dbs.forEach(db => {
    const connected = getConnectedNodes(db.id);
    if (connected.length === 1 && db.variantId === 'standard') {
      issues.push({
        id: `spof_${db.id}`,
        severity: 'error',
        title: 'Single Point of Failure',
        description: `${db.label} is a standard database instance. Consider using a replica set or managed cloud variant for high availability.`
      });
    }
  });

  // 2. Missing Caching Layer
  const hasCache = nodes.some(n => ['redis', 'memcached'].includes(n.serviceType));
  if (dbs.length > 0 && !hasCache && nodes.length > 4) {
    issues.push({
      id: 'missing_cache',
      severity: 'warning',
      title: 'Missing Caching Layer',
      description: 'Your architecture has databases but no caching layer (like Redis). This may lead to performance bottlenecks under high read loads.'
    });
  }

  // 3. No Monitoring
  const hasMonitoring = nodes.some(n => ['prometheus', 'grafana', 'datadog', 'loki', 'newrelic'].includes(n.serviceType));
  if (!hasMonitoring && nodes.length > 5) {
    issues.push({
      id: 'no_monitoring',
      severity: 'warning',
      title: 'No Observability',
      description: 'Production systems should include monitoring or logging services to track performance and errors.'
    });
  }

  // 4. Unprotected Backend
  const hasGateway = nodes.some(n => ['api_gateway', 'kong', 'traefik', 'nginx', 'cloudflare'].includes(n.serviceType));
  const hasCompute = nodes.some(n => ['fastapi', 'django', 'nodejs', 'go', 'spring_boot'].includes(n.serviceType));
  if (hasCompute && !hasGateway && nodes.length > 3) {
    issues.push({
      id: 'unprotected_backend',
      severity: 'warning',
      title: 'Direct Compute Access',
      description: 'Consider placing an API Gateway or Reverse Proxy in front of your compute services for security and rate limiting.'
    });
  }

  // 5. Tech Mismatch: Streaming edges without MQ
  const hasMQ = nodes.some(n => ['kafka', 'rabbitmq', 'sqs', 'pubsub_gcp'].includes(n.serviceType));
  const hasStreamingEdges = edges.some(e => e.type === 'async_event' || e.type === 'data_stream');
  if (hasStreamingEdges && !hasMQ) {
    issues.push({
      id: 'missing_mq',
      severity: 'error',
      title: 'Missing Message Broker',
      description: 'Your architecture uses asynchronous events or data streams, but lacks a message broker (e.g. Kafka, RabbitMQ) to handle them reliably.'
    });
  }

  // 6. Security: No Authentication Service
  const hasAuth = nodes.some(n => ['auth0', 'keycloak', 'oauth2_server'].includes(n.serviceType) || n.layer === 'auth');
  if (hasCompute && !hasAuth && nodes.length > 4) {
    issues.push({
      id: 'missing_auth',
      severity: 'warning',
      title: 'Missing Authentication Layer',
      description: 'Consider adding a dedicated identity provider (e.g., Auth0, Keycloak) to secure your backend services.'
    });
  }

  // 7. Security: Unencrypted secrets / Missing Secrets Manager
  const hasSecretsManager = nodes.some(n => ['vault'].includes(n.serviceType));
  if (dbs.length > 0 && !hasSecretsManager && nodes.length > 6) {
    issues.push({
      id: 'missing_secrets',
      severity: 'info',
      title: 'Missing Secrets Management',
      description: 'For enterprise production, use a secrets manager (like HashiCorp Vault) to inject database credentials securely.'
    });
  }

  // 8. Success info
  if (issues.length === 0 && nodes.length > 3) {
    issues.push({
      id: 'looks_good',
      severity: 'info',
      title: 'Solid Foundation',
      description: 'Your architecture looks well-structured with no obvious critical issues.'
    });
  }

  return issues;
}
