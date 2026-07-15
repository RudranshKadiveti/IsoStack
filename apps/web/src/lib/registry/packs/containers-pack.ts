import { Box } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const CONTAINERS_NODES: NodeDefinition[] = [
  {
    type: "docker",
    category: "containers",
    label: "Docker",
    description: "Component for Docker",
    iconUrl: "/vendor-icons/docker.svg",
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["docker", "containers", "docker"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "docker_swarm",
    category: "containers",
    label: "Docker Swarm",
    description: "Component for Docker Swarm",
    
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["docker_swarm", "containers", "docker swarm"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "docker_compose",
    category: "containers",
    label: "Docker Compose",
    description: "Component for Docker Compose",
    
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["docker_compose", "containers", "docker compose"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "kubernetes",
    category: "containers",
    label: "Kubernetes",
    description: "Component for Kubernetes",
    iconUrl: "/vendor-icons/kubernetes.svg",
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["kubernetes", "containers", "kubernetes"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "helm",
    category: "containers",
    label: "Helm",
    description: "Component for Helm",
    iconUrl: "/vendor-icons/helm.svg",
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["helm", "containers", "helm"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "istio",
    category: "containers",
    label: "Istio",
    description: "Component for Istio",
    iconUrl: "/vendor-icons/istio.svg",
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["istio", "containers", "istio"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "argocd",
    category: "containers",
    label: "ArgoCD",
    description: "Component for ArgoCD",
    iconUrl: "/vendor-icons/argocd.svg",
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["argocd", "containers", "argocd"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "fluxcd",
    category: "containers",
    label: "FluxCD",
    description: "Component for FluxCD",
    iconUrl: "/vendor-icons/fluxcd.svg",
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["fluxcd", "containers", "fluxcd"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "keda",
    category: "containers",
    label: "KEDA",
    description: "Component for KEDA",
    
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["keda", "containers", "keda"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  },
  {
    type: "nomad",
    category: "containers",
    label: "Nomad",
    description: "Component for Nomad",
    iconUrl: "/vendor-icons/nomad.svg",
    fallbackIcon: Box,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["nomad", "containers", "nomad"],
    tags: ["containers"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["containers"] }]
  }
];
