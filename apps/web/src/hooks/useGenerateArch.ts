import { useState } from 'react';
import toast from 'react-hot-toast';
import { generateArchitecture } from '../lib/api';

import { useArchStore } from '../store/useArchStore';
import { useUIStore } from '../store/useUIStore';
import type { ArchGraph } from '../lib/types';

export function useGenerateArch() {
  const [error, setError] = useState<string | null>(null);
  const setGraph = useArchStore((s) => s.setGraph);
  const setLoading = useUIStore((s) => s.setLoading);
  const setDetailPane = useUIStore((s) => s.setDetailPane);

  async function generate(prompt: string, existingIds?: string[]) {
    setLoading(true);
    setError(null);
    try {
      const graph: ArchGraph = await generateArchitecture(prompt, existingIds);
      setGraph(graph);
      setDetailPane(true);
      toast.success(`${graph.project_name} — ${graph.nodes.length} nodes generated`);
    } catch (e: any) {
      const msg = e?.response?.data?.detail ?? 'Generation failed';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return { generate, error };
}
