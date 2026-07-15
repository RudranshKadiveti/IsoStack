import fs from 'fs';
import path from 'path';
import https from 'https';

// Complete map of our node types to simple-icons slugs
const nameMap = {
  // Backends
  'fastapi': 'fastapi',
  'django': 'django',
  'nodejs': 'nodedotjs',
  'go': 'go',
  'rust_actix': 'rust',
  'spring_boot': 'springboot',
  'dotnet': 'dotnet',
  'ktor': 'kotlin', // use kotlin since ktor may not be available
  'phoenix': 'phoenixframework',
  'grpc_server': 'grpc',

  // Frontends
  'react': 'react',
  'nextjs': 'nextdotjs',
  'vue': 'vuedotjs',
  'nuxt': 'nuxtdotjs',
  'svelte': 'svelte',
  'angular': 'angular',
  'flutter': 'flutter',
  'remix': 'remix',
  'astro': 'astro',
  'qwik': 'qwik',
  'gatsby': 'gatsby',
  'htmx': 'htmx',
  'lit': 'lit',
  'alpine_js': 'alpinedotjs',

  // Databases
  'postgresql': 'postgresql',
  'mysql': 'mysql',
  'mariadb': 'mariadb',
  'mongodb': 'mongodb',
  'dynamodb': 'amazondynamodb',
  'firebase': 'firebase',
  'cassandra': 'apachecassandra',
  'elasticsearch': 'elasticsearch',
  'neo4j': 'neo4j',
  'influxdb': 'influxdb',
  'cockroachdb': 'cockroachlabs', // often closest
  'planetscale': 'planetscale',
  'supabase': 'supabase',
  'couchdb': 'apachecouchdb',
  'rethinkdb': 'rethinkdb',
  'sqlite': 'sqlite',
  'etcd': 'etcd',

  // Caches
  'redis': 'redis',
  'memcached': 'memcached',

  // Messaging
  'rabbitmq': 'rabbitmq',
  'kafka': 'apachekafka',
  'sqs': 'amazonsqs',
  'pubsub_gcp': 'googlepubsub',
  'nats': 'natsdotio',
  'nats_streaming': 'natsdotio',
  'pulsar': 'apachepulsar',
  'mqtt': 'mqtt',

  // More infra/cloud we could add later but exist in our catalog maybe
  'kubernetes': 'kubernetes',
  'docker': 'docker',
  'github_actions': 'githubactions',
  'aws_lambda': 'awslambda',
  'stripe': 'stripe',
  'slack': 'slack',
  
  // Monitoring
  'datadog': 'datadog',
  'prometheus': 'prometheus',
  'grafana': 'grafana'
};

const iconDir = path.join(process.cwd(), 'public', 'vendor-icons');
if (!fs.existsSync(iconDir)) fs.mkdirSync(iconDir, { recursive: true });

async function downloadIcon(name, file) {
  // Try develop branch of simple-icons for newest icons
  const url = `https://unpkg.com/simple-icons@14.4.0/icons/${name}.svg`;
  const dest = path.join(iconDir, `${file}.svg`);
  
  if (fs.existsSync(dest)) {
    return Promise.resolve(); // already downloaded
  }

  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          resolve();
        });
      } else {
        console.warn(`Icon not found: ${name} (for ${file})`);
        resolve(); // Just ignore if not found
      }
    }).on('error', resolve);
  });
}

async function main() {
  for (const [file, simpleName] of Object.entries(nameMap)) {
    await downloadIcon(simpleName, file);
  }
  console.log('Done downloading icons!');
}

main();
