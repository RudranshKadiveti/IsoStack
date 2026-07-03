import { writeFileSync } from 'fs';
import { join } from 'path';

export function generateIndex(graph: any, base: string) {
  // Root README
  const readme = [
    `# ${graph.project_name}`,
    `\n${graph.description}`,
    `\n## Architecture\n`,
    ...graph.nodes.map((n: any) => `- **${n.label}** (${n.technology}): ${n.description}`),
    `\n## Services\n`,
    ...graph.nodes.map((n: any) => `- \`${n.id}/\``),
    `\n## Getting Started\n\`\`\`bash\ndocker-compose up\n\`\`\``,
  ].join('\n');
  writeFileSync(join(base, 'README.md'), readme);

  // Root docker-compose
  const services = graph.nodes
    .filter((n: any) => ['Compute','Database','Cache','Queue','Storage'].includes(n.type))
    .map((n: any) => `  ${n.id}:\n    build: ./${n.id}\n    # ${n.technology}`)
    .join('\n');
  writeFileSync(join(base, 'docker-compose.yml'), `version: '3.8'\nservices:\n${services}\n`);
}
