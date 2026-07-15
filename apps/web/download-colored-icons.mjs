import fs from 'fs';
import path from 'path';
import https from 'https';

const icons = [
  { file: 'fastapi', devicon: 'fastapi', simple: 'fastapi' },
  { file: 'django', devicon: 'django', simple: 'django' },
  { file: 'nodejs', devicon: 'nodejs', simple: 'nodedotjs' },
  { file: 'go', devicon: 'go', simple: 'go' },
  { file: 'rust_actix', devicon: 'rust', simple: 'rust' },
  { file: 'spring_boot', devicon: 'spring', simple: 'springboot' },
  { file: 'dotnet', devicon: 'dotnetcore', simple: 'dotnet' },
  { file: 'ktor', devicon: 'kotlin', simple: 'kotlin' },
  { file: 'phoenix', devicon: 'phoenix', simple: 'phoenixframework' },
  { file: 'grpc_server', devicon: 'grpc', simple: 'grpc' },

  { file: 'react', devicon: 'react', simple: 'react' },
  { file: 'nextjs', devicon: 'nextjs', simple: 'nextdotjs' },
  { file: 'vue', devicon: 'vuejs', simple: 'vuedotjs' },
  { file: 'nuxt', devicon: 'nuxtjs', simple: 'nuxtdotjs' },
  { file: 'svelte', devicon: 'svelte', simple: 'svelte' },
  { file: 'angular', devicon: 'angularjs', simple: 'angular' },
  { file: 'flutter', devicon: 'flutter', simple: 'flutter' },
  { file: 'remix', devicon: 'remix', simple: 'remix' },
  { file: 'astro', devicon: 'astro', simple: 'astro' },
  { file: 'qwik', devicon: 'qwik', simple: 'qwik' },
  { file: 'gatsby', devicon: 'gatsby', simple: 'gatsby' },
  { file: 'htmx', devicon: 'htmx', simple: 'htmx' },
  { file: 'lit', devicon: 'lit', simple: 'lit' },
  { file: 'alpine_js', devicon: 'alpinejs', simple: 'alpinedotjs' },

  { file: 'postgresql', devicon: 'postgresql', simple: 'postgresql' },
  { file: 'mysql', devicon: 'mysql', simple: 'mysql' },
  { file: 'mariadb', devicon: 'mariadb', simple: 'mariadb' },
  { file: 'mongodb', devicon: 'mongodb', simple: 'mongodb' },
  { file: 'dynamodb', devicon: 'amazonwebservices', simple: 'amazondynamodb' },
  { file: 'firebase', devicon: 'firebase', simple: 'firebase' },
  { file: 'cassandra', devicon: 'apachecassandra', simple: 'apachecassandra' },
  { file: 'elasticsearch', devicon: 'elasticsearch', simple: 'elasticsearch' },
  { file: 'neo4j', devicon: 'neo4j', simple: 'neo4j' },
  { file: 'influxdb', devicon: 'influxdb', simple: 'influxdb' },
  { file: 'cockroachdb', devicon: 'cockroachdb', simple: 'cockroachlabs' },
  { file: 'planetscale', devicon: 'planetscale', simple: 'planetscale' },
  { file: 'supabase', devicon: 'supabase', simple: 'supabase' },
  { file: 'couchdb', devicon: 'couchdb', simple: 'apachecouchdb' },
  { file: 'rethinkdb', devicon: 'rethinkdb', simple: 'rethinkdb' },
  { file: 'sqlite', devicon: 'sqlite', simple: 'sqlite' },
  { file: 'etcd', devicon: 'etcd', simple: 'etcd' },

  { file: 'redis', devicon: 'redis', simple: 'redis' },
  { file: 'memcached', devicon: 'memcached', simple: 'memcached' },

  { file: 'rabbitmq', devicon: 'rabbitmq', simple: 'rabbitmq' },
  { file: 'kafka', devicon: 'apachekafka', simple: 'apachekafka' },
  { file: 'sqs', devicon: 'amazonwebservices', simple: 'amazonsqs' },
  { file: 'pubsub_gcp', devicon: 'googlecloud', simple: 'googlepubsub' },
  { file: 'nats', devicon: 'nats', simple: 'natsdotio' },
  { file: 'nats_streaming', devicon: 'nats', simple: 'natsdotio' },
  { file: 'pulsar', devicon: 'pulsar', simple: 'apachepulsar' },
  { file: 'mqtt', devicon: 'mqtt', simple: 'mqtt' },

  { file: 'kubernetes', devicon: 'kubernetes', simple: 'kubernetes' },
  { file: 'docker', devicon: 'docker', simple: 'docker' },
  { file: 'github_actions', devicon: 'github', simple: 'githubactions' },
  { file: 'aws_lambda', devicon: 'amazonwebservices', simple: 'awslambda' },
  { file: 'stripe', devicon: 'stripe', simple: 'stripe' },
  { file: 'slack', devicon: 'slack', simple: 'slack' },
  
  { file: 'datadog', devicon: 'datadog', simple: 'datadog' },
  { file: 'prometheus', devicon: 'prometheus', simple: 'prometheus' },
  { file: 'grafana', devicon: 'grafana', simple: 'grafana' }
];

const iconDir = path.join(process.cwd(), 'public', 'vendor-icons');

function downloadUrl(url, dest) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        // Devicon might return a 200 with an HTML 404 page if not found!
        // We need to check content-type or if it starts with <svg
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (data.trim().startsWith('<svg')) {
            fs.writeFileSync(dest, data);
            resolve(true);
          } else {
            resolve(false);
          }
        });
      } else {
        resolve(false);
      }
    }).on('error', () => resolve(false));
  });
}

async function downloadIcon(entry) {
  const dest = path.join(iconDir, `${entry.file}.svg`);
  
  const urlsToTry = [
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${entry.devicon}/${entry.devicon}-original.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${entry.devicon}/${entry.devicon}-plain.svg`,
    `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${entry.devicon}/${entry.devicon}-original-wordmark.svg`,
    `https://unpkg.com/simple-icons@14.4.0/icons/${entry.simple}.svg`
  ];

  for (const url of urlsToTry) {
    const success = await downloadUrl(url, dest);
    if (success) {
      console.log(`[SUCCESS] ${entry.file}`);
      return;
    }
  }
  
  console.log(`[FAILED] ${entry.file}`);
}

async function main() {
  for (const entry of icons) {
    await downloadIcon(entry);
  }
  console.log('All done!');
}

main();
