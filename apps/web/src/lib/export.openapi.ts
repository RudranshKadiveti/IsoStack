import type { ArchGraph, ArchNode } from './types';

export function generateOpenAPI(graph: ArchGraph | null): string {
  if (!graph || (graph.nodes?.length || 0) === 0) return '';

  const nodes = graph.nodes || [];
  const computeNodes = nodes.filter(n => n.layer === 'compute' || n.layer === 'infrastructure');
  if (computeNodes.length === 0) return '# No compute or gateway nodes found to generate API specs.';

  let yaml = `openapi: 3.0.0
info:
  title: ${graph.project_name} API
  description: Auto-generated OpenAPI specification for ${graph.project_name}
  version: 1.0.0
paths:
`;

  computeNodes.forEach(node => {
    const route = `/${node.label.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
    yaml += `  ${route}:
    get:
      summary: Retrieve data from ${node.label}
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  status:
                    type: string
                    example: "success"
                  data:
                    type: string
                    example: "Data from ${node.label}"
    post:
      summary: Send data to ${node.label}
      responses:
        '201':
          description: Created
`;
  });

  return yaml;
}
