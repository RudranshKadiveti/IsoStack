import fs from 'fs';
import path from 'path';

const catalog = {
  database: {
    icon: 'Database',
    items: ['PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'MongoDB', 'Redis', 'Cassandra', 'CockroachDB', 'DynamoDB', 'Neo4j', 'Elasticsearch', 'OpenSearch', 'TimescaleDB', 'InfluxDB', 'PlanetScale', 'Supabase', 'CouchDB', 'RethinkDB', 'etcd']
  },
  auth: {
    icon: 'Lock',
    items: ['JWT', 'OAuth2', 'OpenID Connect', 'SAML', 'LDAP', 'Identity Provider', 'Auth Service', 'Session Store', 'RBAC', 'ABAC', 'MFA', 'API Keys', 'AWS Cognito', 'Clerk', 'Auth0', 'Firebase Auth', 'Supabase Auth', 'Keycloak', 'OAuth2 Server']
  },
  networking: {
    icon: 'Network',
    items: ['API Gateway', 'Reverse Proxy', 'Load Balancer', 'DNS', 'CDN', 'Service Mesh', 'Ingress', 'VPN', 'Firewall', 'NAT Gateway', 'VPC', 'Kong', 'Traefik', 'Envoy', 'Nginx', 'Apache HTTP', 'Caddy', 'HAProxy', 'Consul', 'Istio', 'Linkerd']
  },
  messaging: {
    icon: 'MessageSquare',
    items: ['Kafka', 'RabbitMQ', 'ActiveMQ', 'Pulsar', 'NATS', 'JetStream', 'MQTT Broker', 'ZeroMQ', 'Amazon SQS', 'Amazon SNS', 'Google Pub/Sub', 'Azure Service Bus', 'EventBridge', 'Celery', 'RQ', 'Temporal', 'Airflow', 'Firebase Cloud Messaging']
  },
  containers: {
    icon: 'Box',
    items: ['Docker', 'Docker Swarm', 'Docker Compose', 'Kubernetes', 'Helm', 'Istio', 'ArgoCD', 'FluxCD', 'KEDA', 'Nomad']
  },
  devops: {
    icon: 'Workflow',
    items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform', 'Pulumi', 'CircleCI', 'Travis CI', 'Azure DevOps', 'Ansible']
  },
  ai: {
    icon: 'Sparkles',
    items: ['OpenAI', 'Anthropic', 'Gemini', 'Groq', 'DeepSeek', 'Mistral', 'Ollama', 'HuggingFace', 'Cohere', 'OpenRouter', 'AI Agent', 'Multi-Agent', 'Vector Database', 'Embeddings', 'Memory', 'Prompt', 'Guardrails', 'RAG', 'MCP Server', 'MCP Client', 'Vertex AI', 'Replicate', 'Together AI']
  },
  monitoring: {
    icon: 'Activity',
    items: ['Grafana', 'Prometheus', 'Loki', 'Tempo', 'Jaeger', 'Datadog', 'New Relic', 'ELK Stack', 'OpenTelemetry', 'CloudWatch', 'Splunk', 'Honeycomb']
  },
  cloud: {
    icon: 'Cloud',
    items: ['AWS', 'Azure', 'Google Cloud', 'Cloudflare', 'Vercel', 'Railway', 'Render', 'Netlify', 'DigitalOcean', 'Fly.io']
  },
  external_apis: {
    icon: 'Plug',
    items: ['GitHub', 'GitLab', 'Slack', 'Discord', 'Gmail', 'Outlook', 'Stripe', 'Razorpay', 'Twilio', 'Notion', 'Jira', 'Shopify', 'SendGrid', 'Firebase', 'Supabase']
  },
  users: {
    icon: 'Users',
    items: ['User', 'Browser', 'Desktop App', 'Mobile App', 'Admin', 'IoT Device', 'Third-Party Client']
  },
  protocols: {
    icon: 'FileCode2',
    items: ['HTTP', 'HTTPS', 'WebSocket', 'gRPC', 'TCP', 'UDP', 'AMQP', 'SMTP', 'FTP', 'SSH', 'TLS']
  },
  compute: {
    icon: 'Server',
    items: ['Node.js', 'Node.js Express', 'Python', 'Go', 'Go (Gin)', 'Rust', 'Rust Actix', 'Java', 'Kotlin', 'PHP', 'C#', '.NET Core', 'Ruby', 'FastAPI', 'Django', 'Spring Boot', 'Ktor', 'Phoenix', 'ASP.NET', 'gRPC Server', 'AWS Lambda', 'Cloud Functions', 'Azure Functions']
  },
  frontend: {
    icon: 'Monitor',
    items: ['React', 'Next.js', 'Vue', 'Nuxt', 'Svelte', 'Angular', 'Astro', 'Qwik', 'Gatsby', 'HTMX', 'Lit', 'Alpine.js', 'TailwindCSS', 'Redux', 'Zustand', 'Remix']
  },
  mobile: {
    icon: 'Smartphone',
    items: ['Flutter', 'React Native', 'Swift', 'Kotlin Mobile', 'Expo', 'Ionic']
  },
  storage: {
    icon: 'HardDrive',
    items: ['Amazon S3', 'Google Cloud Storage', 'Azure Blob Storage', 'MinIO', 'Backblaze B2', 'EBS', 'EFS', 'Cloudinary', 'Supabase Storage', 'Linode Object Storage']
  },
  cache: {
    icon: 'Zap',
    items: ['Redis Cache', 'Memcached', 'Varnish', 'Hazelcast', 'CDN Edge Cache']
  },
  security: {
    icon: 'Shield',
    items: ['Vault', 'KMS', 'WAF', 'Certbot', 'Lets Encrypt', 'Snyk', 'SonarQube', 'Trivy']
  },
  analytics: {
    icon: 'BarChart',
    items: ['Snowflake', 'BigQuery', 'Redshift', 'ClickHouse', 'Databricks', 'Apache Spark', 'Hadoop', 'PostHog', 'Mixpanel', 'Google Analytics', 'Segment']
  },
  edge: {
    icon: 'Globe',
    items: ['Cloudflare Workers', 'Vercel Edge', 'Deno Deploy', 'Fastly', 'Akamai', 'AWS Lambda@Edge']
  },
  utilities: {
    icon: 'Wrench',
    items: ['Cron Job', 'Scheduler', 'Search Engine', 'Algolia', 'Meilisearch', 'PDF Generator', 'Image Processor', 'Video Transcoder', 'Email Sender', 'Notification Service']
  }
};

const packDir = path.join(process.cwd(), 'src', 'lib', 'registry', 'packs');

for (const [category, data] of Object.entries(catalog)) {
  const { icon, items } = data;
  const nodes = items.map(item => {
    const type = item.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
    return `
  {
    type: "${type}",
    category: "${category}",
    label: "${item}",
    description: "Component for ${item}",
    iconUrl: "/vendor-icons/${type}.svg",
    fallbackIcon: ${icon},
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["${type}", "${category}", "${item.toLowerCase()}"],
    tags: ["${category}"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["${category}"] }]
  }`;
  }).join(',');

  const fileContent = `import { ${icon} } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const ${category.toUpperCase()}_NODES: NodeDefinition[] = [${nodes}
];
`;
  
  fs.writeFileSync(path.join(packDir, `${category}-pack.ts`), fileContent);
  console.log(`Generated ${category}-pack.ts`);
}

// Generate init.ts
const imports = Object.keys(catalog).map(cat => `import { ${cat.toUpperCase()}_NODES } from './packs/${cat}-pack';`).join('\n');
const registers = Object.keys(catalog).map(cat => `NodeRegistry.registerPack(${cat.toUpperCase()}_NODES);`).join('\n');

const initContent = `import { NodeRegistry } from './NodeRegistry';
import { CATEGORIES } from './packs/categories';
${imports}

// Initialize categories
NodeRegistry.registerCategories(CATEGORIES);

// Initialize all packs
${registers}
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'lib', 'registry', 'init.ts'), initContent);
console.log('Generated init.ts');
