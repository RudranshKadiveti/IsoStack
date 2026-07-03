import axios from 'axios';
import type { ArchGraph } from './types';

const client = axios.create({ baseURL: '/api' });

export async function generateArchitecture(
  prompt: string,
  existingNodeIds?: string[]
): Promise<ArchGraph> {
  const { data } = await client.post<ArchGraph>('/generate', {
    prompt,
    existing_node_ids: existingNodeIds ?? null,
  });
  return data;
}

export async function generateWorkspace(
  graph: ArchGraph,
  targetPath: string
): Promise<{ success: boolean; message: string }> {
  const { data } = await client.post('/workspace', {
    graph,
    target_path: targetPath,
  });
  return data;
}

export async function describeNode(
  nodeType: string,
  label: string,
  projectContext: string
): Promise<{ description: string; responsibilities: string[]; metrics: any }> {
  const { data } = await client.post('/describe-node', {
    node_type: nodeType,
    label,
    project_context: projectContext,
  });
  return data;
}
