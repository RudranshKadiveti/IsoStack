import { Zap } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const CACHE_NODES: NodeDefinition[] = [
  {
    type: "redis_cache",
    category: "cache",
    label: "Redis Cache",
    description: "Component for Redis Cache",
    
    fallbackIcon: Zap,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["redis_cache", "cache", "redis cache"],
    tags: ["cache"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["cache"] }],
    propertiesSchema: [
      { name: 'persistence', label: 'Persistence', type: 'boolean', defaultValue: true },
      { name: 'clusterMode', label: 'Cluster Mode', type: 'boolean', defaultValue: false },
      { name: 'memoryLimit', label: 'Memory Limit (MB)', type: 'number', defaultValue: 256 }
    ]
  },
  {
    type: "memcached",
    category: "cache",
    label: "Memcached",
    description: "Component for Memcached",
    iconUrl: "/vendor-icons/memcached.svg",
    fallbackIcon: Zap,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["memcached", "cache", "memcached"],
    tags: ["cache"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["cache"] }]
  },
  {
    type: "varnish",
    category: "cache",
    label: "Varnish",
    description: "Component for Varnish",
    
    fallbackIcon: Zap,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["varnish", "cache", "varnish"],
    tags: ["cache"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["cache"] }]
  },
  {
    type: "hazelcast",
    category: "cache",
    label: "Hazelcast",
    description: "Component for Hazelcast",
    
    fallbackIcon: Zap,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["hazelcast", "cache", "hazelcast"],
    tags: ["cache"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["cache"] }]
  },
  {
    type: "cdn_edge_cache",
    category: "cache",
    label: "CDN Edge Cache",
    description: "Component for CDN Edge Cache",
    
    fallbackIcon: Zap,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["cdn_edge_cache", "cache", "cdn edge cache"],
    tags: ["cache"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["cache"] }]
  }
];
