import { writeFileSync } from 'fs';
import { join } from 'path';

const TEMPLATES: Record<string, (node: any) => Record<string, string>> = {
  Compute: (n) => ({
    'Dockerfile': `FROM node:20-alpine\nWORKDIR /app\nCOPY . .\nRUN npm install\nEXPOSE 3000\nCMD ["node", "index.js"]\n`,
    'index.js': `// ${n.label}\n// Technology: ${n.technology}\n// ${n.description}\n\nconst http = require('http');\nconst server = http.createServer((req, res) => res.end('${n.label} OK'));\nserver.listen(3000);\n`,
    'package.json': JSON.stringify({ name: n.id, version: '1.0.0', description: n.description }, null, 2),
    'README.md': `# ${n.label}\n\n${n.description}\n\n## Responsibilities\n${n.responsibilities.map((r: string) => `- ${r}`).join('\n')}\n`,
  }),
  Database: (n) => ({
    'init.sql': `-- ${n.label} initialization\n-- Technology: ${n.technology}\n\nCREATE DATABASE IF NOT EXISTS ${n.id};\n`,
    '.env.example': `DB_HOST=localhost\nDB_PORT=5432\nDB_NAME=${n.id}\nDB_USER=postgres\nDB_PASSWORD=change_me\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  Cache: (n) => ({
    'redis.conf': `# ${n.label}\nmaxmemory 256mb\nmaxmemory-policy allkeys-lru\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  Queue: (n) => ({
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: confluentinc/cp-kafka:7.6.0\n    environment:\n      KAFKA_BROKER_ID: 1\n      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181\n`,
    'topics.sh': `#!/bin/bash\n# Create topics for ${n.label}\nkafka-topics.sh --create --topic ${n.id}-events --partitions 3 --replication-factor 1\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  Gateway: (n) => ({
    'kong.yml': `_format_version: "3.0"\nservices: []\nroutes: []\n# ${n.label} — ${n.technology}\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  Storage: (n) => ({
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: minio/minio\n    command: server /data\n    environment:\n      MINIO_ROOT_USER: admin\n      MINIO_ROOT_PASSWORD: change_me\n`,
    '.env.example': `S3_ENDPOINT=http://localhost:9000\nS3_BUCKET=${n.id}\nS3_ACCESS_KEY=admin\nS3_SECRET_KEY=change_me\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
};

const DEFAULT = (n: any) => ({
  'README.md': `# ${n.label}\n\nType: ${n.type}\nTechnology: ${n.technology}\n\n${n.description}\n\n## Responsibilities\n${n.responsibilities.map((r: string) => `- ${r}`).join('\n')}\n`,
});

export function generateBoilerplate(graph: any, base: string) {
  for (const node of graph.nodes) {
    const files = (TEMPLATES[node.type] ?? DEFAULT)(node);
    for (const [filename, content] of Object.entries(files)) {
      const path = require('path').join(base, node.id, filename);
      require('fs').writeFileSync(path, content);
    }
  }
}
