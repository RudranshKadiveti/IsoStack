import { writeFileSync, readFileSync } from 'fs';
import { join } from 'path';

interface ArchGraph {
  project_name: string;
  description: string;
  nodes: any[];
  edges: any[];
  utilities_checklist: any[];
  alternative_architectures: any[];
}

const graphFile = process.argv[2];
const graph: ArchGraph = JSON.parse(readFileSync(graphFile, 'utf-8'));
const targetPath: string = process.argv[3];

import { generateDirectories } from './generators/directoryGen';
import { generateBoilerplate } from './generators/boilerplateGen';
import { generateIndex } from './generators/indexGen';

generateDirectories(graph, targetPath);
generateBoilerplate(graph, targetPath);
generateIndex(graph, targetPath);

console.log(`IsoStack: wrote workspace to ${targetPath}`);
