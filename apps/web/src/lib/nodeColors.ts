import type { NodeType } from './types';

export const NODE_COLORS: Record<NodeType, string> = {
  Compute:  '#F97316', // orange
  Database: '#3B82F6', // blue
  Cache:    '#F59E0B', // amber
  Queue:    '#A855F7', // purple
  Storage:  '#10B981', // emerald
  Gateway:  '#EF4444', // red
  Auth:     '#EC4899', // pink
  CDN:      '#06B6D4', // cyan
  Observer: '#84CC16', // lime
  External: '#6B7280', // gray
};

export const NODE_ICONS: Record<NodeType, string> = {
  Compute:  '⚡',
  Database: '🗄',
  Cache:    '⚡',
  Queue:    '📨',
  Storage:  '📦',
  Gateway:  '🌐',
  Auth:     '🔐',
  CDN:      '🌍',
  Observer: '📊',
  External: '🔗',
};

export const EDGE_COLORS: Record<string, string> = {
  sync_http:    '#60A5FA',
  async_event:  '#FB923C',
  data_stream:  '#34D399',
  db_query:     '#A3E635',
  cache_read:   '#FCD34D',
  auth_check:   '#F472B6',
};
