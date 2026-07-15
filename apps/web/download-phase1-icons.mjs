import fs from 'fs';
import path from 'path';
import https from 'https';

const catalog = {
  database: { items: ['PostgreSQL', 'MySQL', 'MariaDB', 'SQLite', 'MongoDB', 'Redis', 'Cassandra', 'CockroachDB', 'DynamoDB', 'Neo4j', 'Elasticsearch', 'OpenSearch', 'TimescaleDB', 'InfluxDB', 'PlanetScale', 'Supabase', 'CouchDB', 'RethinkDB', 'etcd'] },
  auth: { items: ['JWT', 'OAuth2', 'OpenID Connect', 'SAML', 'LDAP', 'Identity Provider', 'Auth Service', 'Session Store', 'RBAC', 'ABAC', 'MFA', 'API Keys', 'AWS Cognito', 'Clerk', 'Auth0', 'Firebase Auth', 'Supabase Auth', 'Keycloak', 'OAuth2 Server'] },
  networking: { items: ['API Gateway', 'Reverse Proxy', 'Load Balancer', 'DNS', 'CDN', 'Service Mesh', 'Ingress', 'VPN', 'Firewall', 'NAT Gateway', 'VPC', 'Kong', 'Traefik', 'Envoy', 'Nginx', 'Apache HTTP', 'Caddy', 'HAProxy', 'Consul', 'Istio', 'Linkerd'] },
  messaging: { items: ['Kafka', 'RabbitMQ', 'ActiveMQ', 'Pulsar', 'NATS', 'JetStream', 'MQTT Broker', 'ZeroMQ', 'Amazon SQS', 'Amazon SNS', 'Google Pub/Sub', 'Azure Service Bus', 'EventBridge', 'Celery', 'RQ', 'Temporal', 'Airflow', 'Firebase Cloud Messaging'] },
  containers: { items: ['Docker', 'Docker Swarm', 'Docker Compose', 'Kubernetes', 'Helm', 'Istio', 'ArgoCD', 'FluxCD', 'KEDA', 'Nomad'] },
  devops: { items: ['GitHub Actions', 'GitLab CI', 'Jenkins', 'Terraform', 'Pulumi', 'CircleCI', 'Travis CI', 'Azure DevOps', 'Ansible'] },
  ai: { items: ['OpenAI', 'Anthropic', 'Gemini', 'Groq', 'DeepSeek', 'Mistral', 'Ollama', 'HuggingFace', 'Cohere', 'OpenRouter', 'AI Agent', 'Multi-Agent', 'Vector Database', 'Embeddings', 'Memory', 'Prompt', 'Guardrails', 'RAG', 'MCP Server', 'MCP Client', 'Vertex AI', 'Replicate', 'Together AI'] },
  monitoring: { items: ['Grafana', 'Prometheus', 'Loki', 'Tempo', 'Jaeger', 'Datadog', 'New Relic', 'ELK Stack', 'OpenTelemetry', 'CloudWatch', 'Splunk', 'Honeycomb'] },
  cloud: { items: ['AWS', 'Azure', 'Google Cloud', 'Cloudflare', 'Vercel', 'Railway', 'Render', 'Netlify', 'DigitalOcean', 'Fly.io'] },
  external_apis: { items: ['GitHub', 'GitLab', 'Slack', 'Discord', 'Gmail', 'Outlook', 'Stripe', 'Razorpay', 'Twilio', 'Notion', 'Jira', 'Shopify', 'SendGrid', 'Firebase', 'Supabase'] },
  users: { items: ['User', 'Browser', 'Desktop App', 'Mobile App', 'Admin', 'IoT Device', 'Third-Party Client'] },
  protocols: { items: ['HTTP', 'HTTPS', 'WebSocket', 'gRPC', 'TCP', 'UDP', 'AMQP', 'SMTP', 'FTP', 'SSH', 'TLS'] },
  compute: { items: ['Node.js', 'Node.js Express', 'Python', 'Go', 'Go (Gin)', 'Rust', 'Rust Actix', 'Java', 'Kotlin', 'PHP', 'C#', '.NET Core', 'Ruby', 'FastAPI', 'Django', 'Spring Boot', 'Ktor', 'Phoenix', 'ASP.NET', 'gRPC Server', 'AWS Lambda', 'Cloud Functions', 'Azure Functions'] },
  frontend: { items: ['React', 'Next.js', 'Vue', 'Nuxt', 'Svelte', 'Angular', 'Astro', 'Qwik', 'Gatsby', 'HTMX', 'Lit', 'Alpine.js', 'TailwindCSS', 'Redux', 'Zustand', 'Remix'] },
  mobile: { items: ['Flutter', 'React Native', 'Swift', 'Kotlin Mobile', 'Expo', 'Ionic'] },
  storage: { items: ['Amazon S3', 'Google Cloud Storage', 'Azure Blob Storage', 'MinIO', 'Backblaze B2', 'EBS', 'EFS', 'Cloudinary', 'Supabase Storage', 'Linode Object Storage'] },
  cache: { items: ['Redis Cache', 'Memcached', 'Varnish', 'Hazelcast', 'CDN Edge Cache'] },
  security: { items: ['Vault', 'KMS', 'WAF', 'Certbot', 'Lets Encrypt', 'Snyk', 'SonarQube', 'Trivy'] },
  analytics: { items: ['Snowflake', 'BigQuery', 'Redshift', 'ClickHouse', 'Databricks', 'Apache Spark', 'Hadoop', 'PostHog', 'Mixpanel', 'Google Analytics', 'Segment'] },
  edge: { items: ['Cloudflare Workers', 'Vercel Edge', 'Deno Deploy', 'Fastly', 'Akamai', 'AWS Lambda@Edge'] },
  utilities: { items: ['Cron Job', 'Scheduler', 'Search Engine', 'Algolia', 'Meilisearch', 'PDF Generator', 'Image Processor', 'Video Transcoder', 'Email Sender', 'Notification Service'] }
};

const deviconMap = {
  'postgresql': 'postgresql', 'mysql': 'mysql', 'mongodb': 'mongodb', 'redis': 'redis', 'elasticsearch': 'elasticsearch', 
  'docker': 'docker', 'kubernetes': 'kubernetes', 'github': 'github', 'gitlab': 'gitlab', 'grafana': 'grafana', 'prometheus': 'prometheus', 
  'terraform': 'terraform', 'jenkins': 'jenkins', 'aws': 'amazonwebservices', 'azure': 'azure', 'googlecloud': 'googlecloud', 'cloudflare': 'cloudflare', 
  'firebase': 'firebase', 'supabase': 'supabase', 'nodejs': 'nodejs', 'python': 'python', 'go': 'go', 'rust': 'rust', 'java': 'java', 'kotlin': 'kotlin', 
  'php': 'php', 'c#': 'csharp', 'ruby': 'ruby', 'react': 'react', 'vue': 'vuejs', 'angular': 'angularjs', 'svelte': 'svelte', 'tailwindcss': 'tailwindcss', 
  'redux': 'redux', 'flutter': 'flutter', 'swift': 'swift', 'ionic': 'ionic', 'nginx': 'nginx', 'apache': 'apache', 'vault': 'vault',
  'aws_lambda': 'amazonwebservices', 'amazon_s3': 'amazonwebservices', 'dynamodb': 'amazonwebservices', 'rabbitmq': 'rabbitmq', 'kafka': 'apachekafka',
  'digitalocean': 'digitalocean', 'vercel': 'vercel', 'netlify': 'netlify', 'stripe': 'stripe', 'discord': 'discord', 'slack': 'slack', 'notion': 'notion', 'jira': 'jira'
};

const simpleIconsMap = {
  'opensearch': 'opensearch', 'timescaledb': 'timescaledb', 'influxdb': 'influxdb', 'cockroachdb': 'cockroachlabs', 'jwt': 'jsonwebtokens',
  'oauth2': 'oauth', 'auth0': 'auth0', 'clerk': 'clerk', 'pulumi': 'pulumi', 'circleci': 'circleci', 'ansible': 'ansible',
  'openai': 'openai', 'anthropic': 'anthropic', 'mistral': 'mistral', 'huggingface': 'huggingface', 'datadog': 'datadog', 'newrelic': 'newrelic',
  'splunk': 'splunk', 'railway': 'railway', 'render': 'render', 'flyio': 'flydotio', 'razorpay': 'razorpay', 'twilio': 'twilio',
  'shopify': 'shopify', 'sendgrid': 'twilio', 'fastapi': 'fastapi', 'django': 'django', 'springboot': 'springboot', 'nextjs': 'nextdotjs',
  'nuxtjs': 'nuxtdotjs', 'astro': 'astro', 'qwik': 'qwik', 'gatsby': 'gatsby', 'htmx': 'htmx', 'lit': 'lit', 'alpinejs': 'alpinedotjs',
  'reactnative': 'react', 'expo': 'expo', 'minio': 'minio', 'backblazeb2': 'backblaze', 'cloudinary': 'cloudinary', 'memcached': 'memcached',
  'varnish': 'varnish', 'hazelcast': 'hazelcast', 'certbot': 'certbot', 'letsencrypt': 'letsencrypt', 'snyk': 'snyk', 'sonarqube': 'sonarqube',
  'trivy': 'trivy', 'snowflake': 'snowflake', 'databricks': 'databricks', 'apachespark': 'apachespark', 'hadoop': 'apachehadoop', 'posthog': 'posthog',
  'mixpanel': 'mixpanel', 'googleanalytics': 'googleanalytics', 'segment': 'segment', 'fastly': 'fastly', 'akamai': 'akamai', 'gcp': 'googlecloud', 'azure_devops': 'azuredevops', 'helm': 'helm', 'istio': 'istio', 'argocd': 'argocd', 'fluxcd': 'flux', 'nomad': 'hashicorp'
};

const iconDir = path.join(process.cwd(), 'public', 'vendor-icons');
if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });

function downloadUrl(url, dest) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (data.trim().startsWith('<svg')) {
            fs.writeFileSync(dest, data);
            resolve(true);
          } else resolve(false);
        });
      } else resolve(false);
    }).on('error', () => resolve(false));
  });
}

async function downloadIcon(type, item) {
  const dest = path.join(iconDir, `${type}.svg`);
  if (fs.existsSync(dest)) return true; // Already exists

  const pureAlpha = type.replace(/[^a-z0-9]/g, '');
  
  // Potential mappings
  let deviconNames = [type, pureAlpha];
  if (deviconMap[type]) deviconNames.push(deviconMap[type]);
  if (deviconMap[pureAlpha]) deviconNames.push(deviconMap[pureAlpha]);

  let simpleNames = [type, pureAlpha];
  if (simpleIconsMap[type]) simpleNames.push(simpleIconsMap[type]);
  if (simpleIconsMap[pureAlpha]) simpleNames.push(simpleIconsMap[pureAlpha]);

  for (const name of [...new Set(deviconNames)]) {
    const urls = [
      `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`,
      `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-plain.svg`
    ];
    for (const url of urls) {
      if (await downloadUrl(url, dest)) return true;
    }
  }

  for (const name of [...new Set(simpleNames)]) {
    const url = `https://unpkg.com/simple-icons@14.4.0/icons/${name}.svg`;
    if (await downloadUrl(url, dest)) return true;
  }
  
  return false;
}

async function main() {
  for (const data of Object.values(catalog)) {
    for (const item of data.items) {
      const type = item.toLowerCase().replace(/[^a-z0-9]/g, '_').replace(/_+/g, '_').replace(/_$/, '');
      if (await downloadIcon(type, item)) {
        console.log(`[SUCCESS] ${type}`);
      } else {
        console.log(`[FAILED] ${type}`);
      }
    }
  }
  
  // Now run the verification script to remove broken iconUrls
  const packs = fs.readdirSync(path.join(process.cwd(), 'src', 'lib', 'registry', 'packs')).filter(p => p.endsWith('-pack.ts'));
  let missingCount = 0;
  for (const pack of packs) {
    const p = path.join(process.cwd(), 'src', 'lib', 'registry', 'packs', pack);
    let content = fs.readFileSync(p, 'utf-8');
    const regex = /iconUrl:\s*['"]\/vendor-icons\/([^'"]+\.svg)['"],/g;
    const newContent = content.replace(regex, (match, filename) => {
      if (!fs.existsSync(path.join(iconDir, filename))) {
        missingCount++;
        return ``; // Remove the line entirely
      }
      return match;
    });
    if (content !== newContent) {
      fs.writeFileSync(p, newContent);
    }
  }
  console.log(`Removed ${missingCount} broken iconUrl links.`);
}

main();
