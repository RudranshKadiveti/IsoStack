import { writeFileSync } from 'fs';
import { join } from 'path';

export function generateIndex(graph: any, base: string) {
  // 1. Root README
  const readme = [
    `# ${graph.project_name}`,
    `\n${graph.description}`,
    `\n## Architecture\n`,
    ...graph.nodes.map((n: any) => `- **${n.label}** (${n.serviceType}): ${n.description}`),
    `\n## Services\n`,
    ...graph.nodes.map((n: any) => `- \`${n.id}/\``),
  ].join('\n');
  writeFileSync(join(base, 'README.md'), readme);

  // 2. architecture.md
  const archMd = [
    `# Architecture: ${graph.project_name}`,
    `\n${graph.description}`,
    `\n## Nodes`,
    ...graph.nodes.map((n: any) => `### ${n.label}\n- **ID**: \`${n.id}\`\n- **Type**: ${n.serviceType}\n- **Layer**: ${n.layer}\n- **Description**: ${n.description}\n- **Responsibilities**:\n${n.responsibilities?.map((r: string) => `  - ${r}`).join('\n')}\n`),
    `\n## Edges (Communication)`,
    ...(graph.edges || []).map((e: any) => `- **${e.source}** -> **${e.target}** (${e.type}): ${e.label}`),
  ].join('\n');
  writeFileSync(join(base, 'architecture.md'), archMd);

  // 3. phase-wise-planning.md
  const phaseMd = [
    `# Phase-Wise Planning`,
    `\n## Phase 1: Foundation (Data & Infrastructure)`,
    `*Set up databases, caches, queues, and other stateful services.*`,
    ...graph.nodes.filter((n: any) => ['data', 'cache', 'queue', 'storage'].includes(n.layer)).map((n: any) => `- [ ] Provision **${n.label}** (\`${n.serviceType}\`)`),
    `\n## Phase 2: Core Logic (Backend & Compute)`,
    `*Implement the core APIs and microservices.*`,
    ...graph.nodes.filter((n: any) => ['compute', 'auth', 'observability'].includes(n.layer)).map((n: any) => `- [ ] Build **${n.label}** (\`${n.serviceType}\`)`),
    `\n## Phase 3: Edge & Client (Frontend & Gateways)`,
    `*Build user interfaces and expose services via gateways.*`,
    ...graph.nodes.filter((n: any) => ['client', 'gateway', 'external'].includes(n.layer)).map((n: any) => `- [ ] Develop **${n.label}** (\`${n.serviceType}\`)`),
  ].join('\n');
  writeFileSync(join(base, 'phase-wise-planning.md'), phaseMd);

  // 4. agent-briefing-guide.md
  const agentMd = [
    `# AI Agent Briefing Guide`,
    `\n*Copy and paste the sections below to your AI assistant (e.g. Cline, Cursor) to build out the workspace.*`,
    `\n## Global Context`,
    `We are building a system called **${graph.project_name}**.`,
    `Context: ${graph.description}`,
    `\n## Tasks`,
    ...graph.nodes.map((n: any) => `### Task: Build ${n.label}\n**Prompt:**\n> You are an expert developer. Please implement the service in the \`${n.id}/\` directory. It is a ${n.serviceType} application. Its main responsibilities are: ${n.responsibilities?.join(', ')}. Please write the necessary code, keeping in mind it needs to communicate with other services.\n`),
  ].join('\n');
  writeFileSync(join(base, 'agent-briefing-guide.md'), agentMd);
}
