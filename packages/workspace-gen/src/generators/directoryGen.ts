import { mkdirSync } from 'fs';
import { join } from 'path';
import { getFolderPath } from './utils';

export function generateDirectories(graph: any, base: string) {
  mkdirSync(base, { recursive: true });
  for (const node of graph.nodes) {
    mkdirSync(join(base, getFolderPath(node)), { recursive: true });
  }
}
