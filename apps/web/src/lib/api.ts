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

export async function generateBoilerplate(
  graphData: ArchGraph,
  pngData: string | null
): Promise<{ generation_id: string; gap_report: string; success_ratio: string }> {
  const { data } = await client.post('/generate-boilerplate', {
    graph_data: graphData,
    png_data: pngData,
  });
  return data;
}

export async function pushBoilerplate(
  generationId: string,
  repoName: string,
  branchName: string
): Promise<{ status: string; message: string; repo_url: string }> {
  const { data } = await client.post('/push-boilerplate', {
    generation_id: generationId,
    repo_name: repoName,
    branch_name: branchName,
  });
  return data;
}

export async function getUserRepos(): Promise<any[]> {
  const { data } = await client.get('/github/user-repos');
  return data.repos;
}

export async function getBranches(repoName: string): Promise<any[]> {
  const { data } = await client.get(`/github/branches?repo=${repoName}`);
  return data.branches;
}

export async function createBranch(repoName: string, branchName: string): Promise<any> {
  const { data } = await client.post('/github/create-branch', {
    repo_name: repoName,
    branch_name: branchName,
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
