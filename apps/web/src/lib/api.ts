import axios from 'axios';
import type { ArchGraph } from './types';
import { useAuthStore } from '../store/useAuthStore';
import { supabase } from './supabase';

const client = axios.create({ baseURL: '/api' });

client.interceptors.request.use(async (config) => {
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (session?.access_token) {
    config.headers.Authorization = `Bearer ${session.access_token}`;
  } else {
    // If no session is returned but we have a user in state, the refresh token expired
    const authStore = useAuthStore.getState();
    if (authStore.user) {
      await authStore.signOut();
      window.location.href = '/login'; // Force redirect
    }
  }
  return config;
});

export async function generateArchitecture(
  prompt: string,
  existingNodeIds?: string[],
  files?: File[] | null
): Promise<ArchGraph> {
  const formData = new FormData();
  formData.append('prompt', prompt);
  if (existingNodeIds && existingNodeIds.length > 0) {
    formData.append('existing_node_ids', JSON.stringify(existingNodeIds));
  }
  if (files && files.length > 0) {
    for (const f of files) {
      formData.append('files', f);
    }
  }

  const { data } = await client.post<ArchGraph>('/generate', formData);
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

export async function chatWithAarkus(
  messages: { role: string; content: string }[],
  contextData?: string
): Promise<{ reply: string }> {
  const { data } = await client.post('/chat', {
    messages,
    context_data: contextData,
  });
  return data;
}
