import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const TEMPLATES: Record<string, (node: any) => Record<string, string>> = {
  // BACKEND
  fastapi: (n) => ({
    'main.py': `from fastapi import FastAPI\n\napp = FastAPI(title="${n.label}")\n\n@app.get("/")\ndef read_root():\n    return {"message": "Hello from ${n.label}"}\n`,
    'requirements.txt': `fastapi\nuvicorn\npydantic\n`,
    'Dockerfile': `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install --no-cache-dir -r requirements.txt\nCOPY . .\nCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n\n## Responsibilities\n${n.responsibilities?.map((r: string) => `- ${r}`).join('\n')}\n`,
  }),
  django: (n) => ({
    'requirements.txt': `django\ndjangorestframework\n`,
    'Dockerfile': `FROM python:3.11-slim\nWORKDIR /app\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\nCOPY . .\nCMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n\n## Responsibilities\n${n.responsibilities?.map((r: string) => `- ${r}`).join('\n')}\n`,
  }),
  nodejs: (n) => ({
    'package.json': JSON.stringify({ name: n.id, version: '1.0.0', type: 'module', dependencies: { express: '^4.18.2' } }, null, 2),
    'index.js': `import express from 'express';\nconst app = express();\n\napp.get('/', (req, res) => res.send('Hello from ${n.label}'));\n\napp.listen(3000, () => console.log('Server running on port 3000'));\n`,
    'Dockerfile': `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json .\nRUN npm install\nCOPY . .\nEXPOSE 3000\nCMD ["node", "index.js"]\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  
  // FRONTEND
  react: (n) => ({
    'package.json': JSON.stringify({ name: n.id, version: '1.0.0', scripts: { dev: 'vite' }, dependencies: { react: '^18.2.0', 'react-dom': '^18.2.0' }, devDependencies: { vite: '^5.0.0', '@vitejs/plugin-react': '^4.0.0' } }, null, 2),
    'index.html': `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>${n.label}</title></head><body><div id="root"></div><script type="module" src="/src/main.jsx"></script></body></html>`,
    'src/main.jsx': `import React from 'react';\nimport ReactDOM from 'react-dom/client';\nimport App from './App.jsx';\n\nReactDOM.createRoot(document.getElementById('root')).render(\n  <React.StrictMode><App /></React.StrictMode>\n);\n`,
    'src/App.jsx': `export default function App() {\n  return (\n    <div>\n      <h1>${n.label}</h1>\n      <p>${n.description}</p>\n    </div>\n  );\n}\n`,
    'vite.config.js': `import { defineConfig } from 'vite';\nimport react from '@vitejs/plugin-react';\n\nexport default defineConfig({ plugins: [react()] });\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  nextjs: (n) => ({
    'package.json': JSON.stringify({ name: n.id, version: '1.0.0', scripts: { dev: 'next dev' }, dependencies: { next: '^14.0.0', react: '^18.2.0', 'react-dom': '^18.2.0' } }, null, 2),
    'app/layout.tsx': `export default function RootLayout({ children }: { children: React.ReactNode }) {\n  return (<html lang="en"><body>{children}</body></html>);\n}\n`,
    'app/page.tsx': `export default function Page() {\n  return (\n    <main>\n      <h1>${n.label}</h1>\n      <p>${n.description}</p>\n    </main>\n  );\n}\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),

  // DATABASES
  postgresql: (n) => ({
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: postgres:15-alpine\n    environment:\n      POSTGRES_USER: admin\n      POSTGRES_PASSWORD: change_me\n      POSTGRES_DB: ${n.id}_db\n    ports:\n      - "5432:5432"\n`,
    'init.sql': `-- ${n.label} initialization\nCREATE TABLE IF NOT EXISTS example (\n  id SERIAL PRIMARY KEY,\n  name VARCHAR(255) NOT NULL\n);\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  mongodb: (n) => ({
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: mongo:6\n    environment:\n      MONGO_INITDB_ROOT_USERNAME: admin\n      MONGO_INITDB_ROOT_PASSWORD: change_me\n    ports:\n      - "27017:27017"\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),

  // CACHE & QUEUE
  redis: (n) => ({
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: redis:7-alpine\n    ports:\n      - "6379:6379"\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
  rabbitmq: (n) => ({
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: rabbitmq:3-management-alpine\n    ports:\n      - "5672:5672"\n      - "15672:15672"\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),

  // API GATEWAY
  api_gateway: (n) => ({
    'kong.yml': `_format_version: "3.0"\nservices: []\nroutes: []\n`,
    'docker-compose.yml': `version: '3.8'\nservices:\n  ${n.id}:\n    image: kong:3-alpine\n    environment:\n      KONG_DATABASE: "off"\n      KONG_DECLARATIVE_CONFIG: /kong/declarative/kong.yml\n    volumes:\n      - ./kong.yml:/kong/declarative/kong.yml\n    ports:\n      - "8000:8000"\n`,
    'README.md': `# ${n.label}\n\n${n.description}\n`,
  }),
};

const DEFAULT = (n: any) => ({
  'README.md': `# ${n.label}\n\nService Type: ${n.serviceType}\nLayer: ${n.layer}\n\n${n.description}\n\n## Responsibilities\n${n.responsibilities?.map((r: string) => `- ${r}`).join('\n')}\n`,
});

export function generateBoilerplate(graph: any, base: string) {
  for (const node of graph.nodes) {
    const files = (TEMPLATES[node.serviceType] ?? DEFAULT)(node);
    for (const [filename, content] of Object.entries(files)) {
      const path = join(base, node.id, filename);
      const dir = join(path, '..');
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      writeFileSync(path, content as string);
    }
  }
}
