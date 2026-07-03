import { mkdirSync } from 'fs';
import { join } from 'path';

export function generateDirectories(graph: any, base: string) {
  mkdirSync(base, { recursive: true });
  for (const node of graph.nodes) {
    mkdirSync(join(base, node.id), { recursive: true });
  }
}
