import type { ArchNode, ArchEdge } from './types';

export interface ArchTemplate {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  nodes: ArchNode[];
  edges: ArchEdge[];
}

export const ARCHITECTURE_TEMPLATES: Record<string, ArchTemplate> = {
  monolith: {
    id: 'monolith',
    name: 'Monolithic Architecture',
    description: 'A traditional unified model where all components are interconnected and interdependent. Good for starting out and simple applications.',
    pros: [
      'Simple to develop and deploy initially',
      'Easy to test end-to-end',
      'Simple horizontal scaling (run multiple instances behind load balancer)'
    ],
    cons: [
      'Can become too large and complex over time',
      'Requires deploying entire application for small changes',
      'Tightly coupled components'
    ],
    nodes: [
      { id: 'lb_1', label: 'Load Balancer', serviceType: 'nginx', variantId: 'proxy', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'app_1', label: 'Web Monolith', serviceType: 'django', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'db_1', label: 'Primary DB', serviceType: 'postgresql', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } },
      { id: 'cache_1', label: 'Cache', serviceType: 'redis', variantId: 'standard', layer: 'cache', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 300 }, grid_hint: { col: 3, row: 2 } },
    ],
    edges: [
      { id: 'e1', source: 'lb_1', target: 'app_1', type: 'network', animated: true },
      { id: 'e2', source: 'app_1', target: 'db_1', type: 'network', animated: true },
      { id: 'e3', source: 'app_1', target: 'cache_1', type: 'network', animated: true }
    ]
  },
  microservices: {
    id: 'microservices',
    name: 'Microservices Architecture',
    description: 'An architectural style that structures an application as a collection of services that are highly maintainable and testable, loosely coupled, and independently deployable.',
    pros: [
      'Independent scaling of services',
      'Flexibility in technology stack per service',
      'Easier for large teams to work in parallel'
    ],
    cons: [
      'High operational complexity',
      'Difficult distributed debugging and tracing',
      'Network latency and reliability issues'
    ],
    nodes: [
      { id: 'gw_1', label: 'API Gateway', serviceType: 'kong', variantId: 'standard', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'auth_1', label: 'Auth Service', serviceType: 'go', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 100, y: 300 }, grid_hint: { col: 1, row: 2 } },
      { id: 'user_1', label: 'User Service', serviceType: 'nodejs', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'order_1', label: 'Order Service', serviceType: 'spring_boot', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 300 }, grid_hint: { col: 3, row: 2 } },
      { id: 'db_auth', label: 'Auth DB', serviceType: 'redis', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 100, y: 500 }, grid_hint: { col: 1, row: 3 } },
      { id: 'db_user', label: 'User DB', serviceType: 'postgresql', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } },
      { id: 'db_order', label: 'Order DB', serviceType: 'mongodb', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 500 }, grid_hint: { col: 3, row: 3 } },
      { id: 'mq_1', label: 'Message Bus', serviceType: 'kafka', variantId: 'standard', layer: 'messaging', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 700 }, grid_hint: { col: 2, row: 4 } },
    ],
    edges: [
      { id: 'e1', source: 'gw_1', target: 'auth_1', type: 'network', animated: true },
      { id: 'e2', source: 'gw_1', target: 'user_1', type: 'network', animated: true },
      { id: 'e3', source: 'gw_1', target: 'order_1', type: 'network', animated: true },
      { id: 'e4', source: 'auth_1', target: 'db_auth', type: 'network', animated: true },
      { id: 'e5', source: 'user_1', target: 'db_user', type: 'network', animated: true },
      { id: 'e6', source: 'order_1', target: 'db_order', type: 'network', animated: true },
      { id: 'e7', source: 'user_1', target: 'mq_1', type: 'network', animated: true },
      { id: 'e8', source: 'order_1', target: 'mq_1', type: 'network', animated: true },
    ]
  },
  serverless: {
    id: 'serverless',
    name: 'Serverless Event-Driven',
    description: 'An event-driven architecture where code is executed in stateless, ephemeral containers triggered by events.',
    pros: [
      'Zero server management',
      'Scales automatically to handle sudden traffic spikes',
      'Pay-per-execution pricing model'
    ],
    cons: [
      'Cold start latency',
      'Vendor lock-in (e.g. tightly coupled to AWS)',
      'Complex local testing and debugging'
    ],
    nodes: [
      { id: 'cdn_1', label: 'CDN / Edge', serviceType: 'cloudflare', variantId: 'standard', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'api_1', label: 'API Gateway', serviceType: 'api_gateway', variantId: 'standard', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'func_1', label: 'Lambda Function', serviceType: 'aws_lambda', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } },
      { id: 'db_1', label: 'DynamoDB', serviceType: 'dynamodb', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 700 }, grid_hint: { col: 2, row: 4 } },
      { id: 'queue_1', label: 'SQS Queue', serviceType: 'sqs', variantId: 'standard', layer: 'messaging', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 500 }, grid_hint: { col: 3, row: 3 } },
      { id: 'func_2', label: 'Worker Lambda', serviceType: 'aws_lambda', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 700 }, grid_hint: { col: 3, row: 4 } },
    ],
    edges: [
      { id: 'e1', source: 'cdn_1', target: 'api_1', type: 'network', animated: true },
      { id: 'e2', source: 'api_1', target: 'func_1', type: 'network', animated: true },
      { id: 'e3', source: 'func_1', target: 'db_1', type: 'network', animated: true },
      { id: 'e4', source: 'func_1', target: 'queue_1', type: 'network', animated: true },
      { id: 'e5', source: 'queue_1', target: 'func_2', type: 'network', animated: true },
      { id: 'e6', source: 'func_2', target: 'db_1', type: 'network', animated: true },
    ]
  },
  startup_mvp: {
    id: 'startup_mvp',
    name: 'Startup MVP',
    description: 'A rapid development setup optimized for fast iteration and low initial cost, typically using a modern full-stack framework and managed database.',
    pros: ['Extremely fast time-to-market', 'Low initial hosting costs', 'Simple deployment pipeline'],
    cons: ['May require rewrite when scaling', 'Single region usually', 'Limited high availability'],
    nodes: [
      { id: 'cdn', label: 'Vercel / Edge', serviceType: 'cloudflare', variantId: 'standard', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'web', label: 'Next.js Fullstack', serviceType: 'nextjs', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'db', label: 'Supabase Postgres', serviceType: 'supabase', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } }
    ],
    edges: [
      { id: 'e1', source: 'cdn', target: 'web', type: 'network', animated: true },
      { id: 'e2', source: 'web', target: 'db', type: 'network', animated: true }
    ]
  },
  saas_app: {
    id: 'saas_app',
    name: 'B2B SaaS Application',
    description: 'A robust multi-tenant architecture designed for B2B applications with isolated tenant data, background job processing, and robust authentication.',
    pros: ['Data isolation per tenant', 'Scalable background jobs', 'Enterprise-grade security'],
    cons: ['Higher operational overhead', 'Complex database migrations', 'Expensive at low scale'],
    nodes: [
      { id: 'gw', label: 'API Gateway', serviceType: 'kong', variantId: 'standard', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'auth', label: 'Auth0', serviceType: 'auth0', variantId: 'standard', layer: 'auth', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 100, y: 300 }, grid_hint: { col: 1, row: 2 } },
      { id: 'api', label: 'Core API', serviceType: 'nodejs', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'worker', label: 'Background Worker', serviceType: 'celery', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 300 }, grid_hint: { col: 3, row: 2 } },
      { id: 'db', label: 'Tenant DB (Multi-tenant)', serviceType: 'postgresql', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } },
      { id: 'redis', label: 'Queue / Cache', serviceType: 'redis', variantId: 'standard', layer: 'cache', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 500 }, grid_hint: { col: 3, row: 3 } }
    ],
    edges: [
      { id: 'e1', source: 'gw', target: 'api', type: 'network', animated: true },
      { id: 'e2', source: 'gw', target: 'auth', type: 'network', animated: true },
      { id: 'e3', source: 'api', target: 'db', type: 'network', animated: true },
      { id: 'e4', source: 'api', target: 'redis', type: 'network', animated: true },
      { id: 'e5', source: 'worker', target: 'redis', type: 'network', animated: true },
      { id: 'e6', source: 'worker', target: 'db', type: 'network', animated: true }
    ]
  },
  real_time: {
    id: 'real_time',
    name: 'Real-time App (Chat/Gaming)',
    description: 'Architecture optimized for high-throughput, low-latency WebSocket connections for chat, gaming, or financial ticking applications.',
    pros: ['Ultra-low latency', 'High concurrent connections', 'Event-driven'],
    cons: ['Stateful connections are hard to scale', 'Complex load balancing', 'High bandwidth costs'],
    nodes: [
      { id: 'lb', label: 'WebSocket Load Balancer', serviceType: 'haproxy', variantId: 'standard', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'ws_server', label: 'Socket.IO / Phoenix', serviceType: 'phoenix', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'pubsub', label: 'Redis Pub/Sub', serviceType: 'redis', variantId: 'standard', layer: 'cache', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } },
      { id: 'db', label: 'Cassandra (Messages)', serviceType: 'cassandra', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 700 }, grid_hint: { col: 2, row: 4 } }
    ],
    edges: [
      { id: 'e1', source: 'lb', target: 'ws_server', type: 'network', animated: true },
      { id: 'e2', source: 'ws_server', target: 'pubsub', type: 'network', animated: true },
      { id: 'e3', source: 'ws_server', target: 'db', type: 'network', animated: true }
    ]
  },
  data_pipeline: {
    id: 'data_pipeline',
    name: 'Big Data Pipeline',
    description: 'Batch and stream processing architecture for ingesting, transforming, and analyzing large volumes of data.',
    pros: ['Handles massive scale', 'Separates compute from storage', 'Real-time analytics capability'],
    cons: ['Very complex to manage', 'High infrastructure costs', 'Steep learning curve'],
    nodes: [
      { id: 'ingest', label: 'Ingestion API', serviceType: 'fastapi', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 100, y: 300 }, grid_hint: { col: 1, row: 2 } },
      { id: 'kafka', label: 'Kafka Event Stream', serviceType: 'kafka', variantId: 'standard', layer: 'messaging', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'spark', label: 'Spark Processing', serviceType: 'airflow', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 300 }, grid_hint: { col: 3, row: 2 } },
      { id: 'datalake', label: 'S3 Data Lake', serviceType: 's3', variantId: 'standard', layer: 'storage', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } },
      { id: 'dw', label: 'Data Warehouse', serviceType: 'postgresql', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 500 }, grid_hint: { col: 3, row: 3 } }
    ],
    edges: [
      { id: 'e1', source: 'ingest', target: 'kafka', type: 'network', animated: true },
      { id: 'e2', source: 'kafka', target: 'spark', type: 'network', animated: true },
      { id: 'e3', source: 'kafka', target: 'datalake', type: 'network', animated: true },
      { id: 'e4', source: 'spark', target: 'datalake', type: 'network', animated: true },
      { id: 'e5', source: 'spark', target: 'dw', type: 'network', animated: true }
    ]
  },
  mobile_backend: {
    id: 'mobile_backend',
    name: 'Mobile Backend (BaaS)',
    description: 'Backend optimized for mobile clients, utilizing push notifications, social auth, and offline-sync databases.',
    pros: ['Fast mobile iteration', 'Built-in push & auth', 'Offline-first support'],
    cons: ['Vendor lock-in (Firebase/Supabase)', 'Custom logic can be hard', 'Pricing scales steeply'],
    nodes: [
      { id: 'app', label: 'Flutter App', serviceType: 'flutter', variantId: 'standard', layer: 'client', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'firebase', label: 'Firebase Platform', serviceType: 'firebase', variantId: 'standard', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'fcm', label: 'Cloud Messaging', serviceType: 'fcm', variantId: 'standard', layer: 'messaging', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 300 }, grid_hint: { col: 3, row: 2 } },
      { id: 'funcs', label: 'Cloud Functions', serviceType: 'gcp_functions', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } }
    ],
    edges: [
      { id: 'e1', source: 'app', target: 'firebase', type: 'network', animated: true },
      { id: 'e2', source: 'firebase', target: 'fcm', type: 'network', animated: true },
      { id: 'e3', source: 'app', target: 'funcs', type: 'network', animated: true },
      { id: 'e4', source: 'funcs', target: 'firebase', type: 'network', animated: true }
    ]
  },
  iot_arch: {
    id: 'iot_arch',
    name: 'IoT Telemetry Architecture',
    description: 'Architecture for ingesting, processing, and storing high-frequency sensor data from edge devices.',
    pros: ['Handles high-frequency bursts', 'Cost-effective time-series storage', 'Edge compute capable'],
    cons: ['Requires specialized TSDBs', 'Complex device management', 'Security is challenging'],
    nodes: [
      { id: 'edge', label: 'IoT Devices', serviceType: 'rust_actix', variantId: 'standard', layer: 'external', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'mqtt', label: 'MQTT Broker', serviceType: 'mqtt', variantId: 'standard', layer: 'gateway', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'stream', label: 'Stream Processor', serviceType: 'go', variantId: 'standard', layer: 'compute', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } },
      { id: 'tsdb', label: 'InfluxDB', serviceType: 'influxdb', variantId: 'standard', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 700 }, grid_hint: { col: 2, row: 4 } },
      { id: 'grafana', label: 'Grafana Dashboards', serviceType: 'grafana', variantId: 'standard', layer: 'monitoring', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 700 }, grid_hint: { col: 3, row: 4 } }
    ],
    edges: [
      { id: 'e1', source: 'edge', target: 'mqtt', type: 'network', animated: true },
      { id: 'e2', source: 'mqtt', target: 'stream', type: 'network', animated: true },
      { id: 'e3', source: 'stream', target: 'tsdb', type: 'network', animated: true },
      { id: 'e4', source: 'tsdb', target: 'grafana', type: 'network', animated: true }
    ]
  },
  enterprise_microservices: {
    id: 'enterprise_microservices',
    name: 'Enterprise Microservices',
    description: 'A massive scale architecture featuring service mesh, centralized logging, strict security controls, and multiple specialized data stores.',
    pros: ['Ultimate scalability', 'No single points of failure', 'Extreme resilience'],
    cons: ['Massive overhead', 'Needs dedicated DevOps team', 'Overkill for most'],
    nodes: [
      { id: 'waf', label: 'WAF / Firewall', serviceType: 'cloudflare', variantId: 'standard', layer: 'security', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 100 }, grid_hint: { col: 2, row: 1 } },
      { id: 'k8s', label: 'Kubernetes Cluster', serviceType: 'kubernetes', variantId: 'standard', layer: 'infrastructure', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 300 }, grid_hint: { col: 2, row: 2 } },
      { id: 'mesh', label: 'Istio Service Mesh', serviceType: 'envoy', variantId: 'standard', layer: 'network', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 100, y: 300 }, grid_hint: { col: 1, row: 2 } },
      { id: 'vault', label: 'HashiCorp Vault', serviceType: 'vault', variantId: 'standard', layer: 'security', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 700, y: 300 }, grid_hint: { col: 3, row: 2 } },
      { id: 'db_cluster', label: 'Aurora Global', serviceType: 'postgresql', variantId: 'cluster', layer: 'database', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 500 }, grid_hint: { col: 2, row: 3 } },
      { id: 'kafka', label: 'Kafka Cluster', serviceType: 'kafka', variantId: 'cluster', layer: 'messaging', tags: [], description: '', responsibilities: [], metrics: { expected_rps: null, data_size: null, sla: null }, position: { x: 400, y: 700 }, grid_hint: { col: 2, row: 4 } }
    ],
    edges: [
      { id: 'e1', source: 'waf', target: 'k8s', type: 'network', animated: true },
      { id: 'e2', source: 'k8s', target: 'mesh', type: 'network', animated: true },
      { id: 'e3', source: 'k8s', target: 'vault', type: 'network', animated: true },
      { id: 'e4', source: 'k8s', target: 'db_cluster', type: 'network', animated: true },
      { id: 'e5', source: 'k8s', target: 'kafka', type: 'network', animated: true }
    ]
  }
};
