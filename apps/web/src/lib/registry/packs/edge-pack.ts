import { Globe } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const EDGE_NODES: NodeDefinition[] = [
  {
    type: "cloudflare_workers",
    category: "edge",
    label: "Cloudflare Workers",
    description: "Component for Cloudflare Workers",
    iconUrl: "/vendor-icons/cloudflare_workers.svg",
    fallbackIcon: Globe,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["cloudflare_workers", "edge", "cloudflare workers"],
    tags: ["edge"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["edge"] }]
  },
  {
    type: "vercel_edge",
    category: "edge",
    label: "Vercel Edge",
    description: "Component for Vercel Edge",
    
    fallbackIcon: Globe,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["vercel_edge", "edge", "vercel edge"],
    tags: ["edge"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["edge"] }]
  },
  {
    type: "deno_deploy",
    category: "edge",
    label: "Deno Deploy",
    description: "Component for Deno Deploy",
    
    fallbackIcon: Globe,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["deno_deploy", "edge", "deno deploy"],
    tags: ["edge"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["edge"] }]
  },
  {
    type: "fastly",
    category: "edge",
    label: "Fastly",
    description: "Component for Fastly",
    iconUrl: "/vendor-icons/fastly.svg",
    fallbackIcon: Globe,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["fastly", "edge", "fastly"],
    tags: ["edge"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["edge"] }]
  },
  {
    type: "akamai",
    category: "edge",
    label: "Akamai",
    description: "Component for Akamai",
    iconUrl: "/vendor-icons/akamai.svg",
    fallbackIcon: Globe,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["akamai", "edge", "akamai"],
    tags: ["edge"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["edge"] }]
  },
  {
    type: "aws_lambda_edge",
    category: "edge",
    label: "AWS Lambda@Edge",
    description: "Component for AWS Lambda@Edge",
    
    fallbackIcon: Globe,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["aws_lambda_edge", "edge", "aws lambda@edge"],
    tags: ["edge"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["edge"] }]
  }
];
