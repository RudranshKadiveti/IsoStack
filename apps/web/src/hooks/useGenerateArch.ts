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

  async function generate(prompt: string, existingIds?: string[], files?: File[] | null) {
    setLoading(true);
    setError(null);
    try {
      const graph: ArchGraph = await generateArchitecture(prompt, existingIds, files);
      setGraph(graph);
      setDetailPane(true);
      toast.success(`${graph.project_name} — ${graph.nodes.length} nodes generated`);
    } catch (e: any) {
      let msg = 'Generation failed';
      try {
        if (e?.response?.data?.detail) {
          const detail = e.response.data.detail;
          if (typeof detail === 'string') {
            msg = detail.substring(0, 200);
          } else if (Array.isArray(detail)) {
            msg = detail.map((d: any) => d.msg).join(', ').substring(0, 200);
          } else {
            msg = JSON.stringify(detail).substring(0, 200);
          }
        } else if (typeof e?.response?.data === 'string') {
          msg = e.response.data.substring(0, 200);
        } else if (e?.message) {
          msg = e.message.substring(0, 200);
        }
      } catch (err) {
        msg = 'An unknown error occurred during generation';
      }
      
      // Ensure msg is never massive enough to freeze React DevTools or the DOM
      if (msg.length > 250) msg = msg.substring(0, 250) + '...';
      
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  }

  return { generate, error };
}
