import fs from 'fs';
import path from 'path';
import https from 'https';

const missing = [
  'rethinkdb', 'zeromq', 'celery', 'rq', 'temporal', 'airflow', 'gcp_functions', 'azure_functions', 
  'api_gateway', 'kong', 'traefik', 'algolia', 'meilisearch', 'cloudflare', 'aws_cloudfront', 's3', 
  'gcs', 'minio', 'supabase_storage', 'backblaze', 'linode_storage', 'auth0', 'keycloak', 'oauth2_server', 
  'razorpay', 'sendgrid', 'twilio', 'fcm', 'vault', 'consul', 'istio', 'linkerd', 'envoy', 'nginx', 
  'apache', 'caddy', 'haproxy', 'gitlab_ci', 'jenkins', 'circleci', 'travis_ci', 'elk', 'jaeger', 
  'tempo', 'loki', 'honeycomb', 'newrelic', 'openai_api', 'huggingface', 'vertex_ai', 'claude_api', 
  'google_ai', 'cohere_api', 'replicate', 'together_ai'
];

const nameMap = {
  'rethinkdb': ['rethinkdb'],
  'zeromq': ['zeromq'],
  'celery': ['celery'],
  'temporal': ['temporal'],
  'airflow': ['apacheairflow'],
  'kong': ['kong'],
  'traefik': ['traefikproxy'],
  'algolia': ['algolia'],
  'meilisearch': ['meilisearch'],
  'cloudflare': ['cloudflare'],
  's3': ['amazons3'],
  'minio': ['minio'],
  'backblaze': ['backblaze'],
  'auth0': ['auth0'],
  'keycloak': ['keycloak'],
  'razorpay': ['razorpay'],
  'sendgrid': ['twilio'],
  'twilio': ['twilio'],
  'vault': ['vault'],
  'consul': ['consul'],
  'istio': ['istio'],
  'envoy': ['envoyproxy'],
  'nginx': ['nginx'],
  'apache': ['apache'],
  'caddy': ['caddy'],
  'haproxy': ['haproxy'],
  'gitlab_ci': ['gitlab'],
  'jenkins': ['jenkins'],
  'circleci': ['circleci'],
  'travis_ci': ['travisci'],
  'elk': ['elasticstack'],
  'jaeger': ['jaegertracing'],
  'newrelic': ['newrelic'],
  'openai_api': ['openai'],
  'huggingface': ['huggingface'],
  'vertex_ai': ['googlecloud'],
  'google_ai': ['google'],
  'replicate': ['replicate']
};

const iconDir = path.join(process.cwd(), 'public', 'vendor-icons');

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

async function downloadIcon(file) {
  const dest = path.join(iconDir, `${file}.svg`);
  
  // Try raw file name and mapped names
  const namesToTry = [file, file.replace('_', ''), ...(nameMap[file] || [])];
  
  for (const name of namesToTry) {
    const urls = [
      `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-original.svg`,
      `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${name}/${name}-plain.svg`,
      `https://unpkg.com/simple-icons@14.4.0/icons/${name}.svg`
    ];
    for (const url of urls) {
      if (await downloadUrl(url, dest)) return true;
    }
  }
  return false;
}

async function main() {
  for (const file of missing) {
    if (await downloadIcon(file)) {
      console.log(`[SUCCESS] ${file}`);
    } else {
      console.log(`[FAILED] ${file}`);
    }
  }
}

main();
