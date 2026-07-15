import { Network } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const NETWORKING_NODES: NodeDefinition[] = [
  {
    type: "api_gateway",
    category: "networking",
    label: "API Gateway",
    description: "Component for API Gateway",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["api_gateway", "networking", "api gateway"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }],
    propertiesSchema: [
      { name: 'routes', label: 'Routes', type: 'number', defaultValue: 10 },
      { name: 'authentication', label: 'Authentication', type: 'boolean', defaultValue: true },
      { name: 'rateLimiting', label: 'Rate Limiting', type: 'boolean', defaultValue: true }
    ]
  },
  {
    type: "reverse_proxy",
    category: "networking",
    label: "Reverse Proxy",
    description: "Component for Reverse Proxy",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["reverse_proxy", "networking", "reverse proxy"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "load_balancer",
    category: "networking",
    label: "Load Balancer",
    description: "Component for Load Balancer",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["load_balancer", "networking", "load balancer"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "dns",
    category: "networking",
    label: "DNS",
    description: "Component for DNS",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["dns", "networking", "dns"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "cdn",
    category: "networking",
    label: "CDN",
    description: "Component for CDN",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["cdn", "networking", "cdn"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "service_mesh",
    category: "networking",
    label: "Service Mesh",
    description: "Component for Service Mesh",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["service_mesh", "networking", "service mesh"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "ingress",
    category: "networking",
    label: "Ingress",
    description: "Component for Ingress",
    iconUrl: "/vendor-icons/ingress.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["ingress", "networking", "ingress"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "vpn",
    category: "networking",
    label: "VPN",
    description: "Component for VPN",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["vpn", "networking", "vpn"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "firewall",
    category: "networking",
    label: "Firewall",
    description: "Component for Firewall",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["firewall", "networking", "firewall"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "nat_gateway",
    category: "networking",
    label: "NAT Gateway",
    description: "Component for NAT Gateway",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["nat_gateway", "networking", "nat gateway"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "vpc",
    category: "networking",
    label: "VPC",
    description: "Component for VPC",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["vpc", "networking", "vpc"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "kong",
    category: "networking",
    label: "Kong",
    description: "Component for Kong",
    iconUrl: "/vendor-icons/kong.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["kong", "networking", "kong"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "traefik",
    category: "networking",
    label: "Traefik",
    description: "Component for Traefik",
    iconUrl: "/vendor-icons/traefik.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["traefik", "networking", "traefik"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "envoy",
    category: "networking",
    label: "Envoy",
    description: "Component for Envoy",
    iconUrl: "/vendor-icons/envoy.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["envoy", "networking", "envoy"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "nginx",
    category: "networking",
    label: "Nginx",
    description: "Component for Nginx",
    iconUrl: "/vendor-icons/nginx.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["nginx", "networking", "nginx"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "apache_http",
    category: "networking",
    label: "Apache HTTP",
    description: "Component for Apache HTTP",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["apache_http", "networking", "apache http"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "caddy",
    category: "networking",
    label: "Caddy",
    description: "Component for Caddy",
    iconUrl: "/vendor-icons/caddy.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["caddy", "networking", "caddy"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "haproxy",
    category: "networking",
    label: "HAProxy",
    description: "Component for HAProxy",
    
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["haproxy", "networking", "haproxy"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "consul",
    category: "networking",
    label: "Consul",
    description: "Component for Consul",
    iconUrl: "/vendor-icons/consul.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["consul", "networking", "consul"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "istio",
    category: "networking",
    label: "Istio",
    description: "Component for Istio",
    iconUrl: "/vendor-icons/istio.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["istio", "networking", "istio"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  },
  {
    type: "linkerd",
    category: "networking",
    label: "Linkerd",
    description: "Component for Linkerd",
    iconUrl: "/vendor-icons/linkerd.svg",
    fallbackIcon: Network,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["linkerd", "networking", "linkerd"],
    tags: ["networking"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["networking"] }]
  }
];
