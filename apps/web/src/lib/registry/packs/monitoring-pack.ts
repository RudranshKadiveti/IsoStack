import { Activity } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const MONITORING_NODES: NodeDefinition[] = [
  {
    type: "grafana",
    category: "monitoring",
    label: "Grafana",
    description: "Component for Grafana",
    iconUrl: "/vendor-icons/grafana.svg",
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["grafana", "monitoring", "grafana"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "prometheus",
    category: "monitoring",
    label: "Prometheus",
    description: "Component for Prometheus",
    iconUrl: "/vendor-icons/prometheus.svg",
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["prometheus", "monitoring", "prometheus"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "loki",
    category: "monitoring",
    label: "Loki",
    description: "Component for Loki",
    
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["loki", "monitoring", "loki"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "tempo",
    category: "monitoring",
    label: "Tempo",
    description: "Component for Tempo",
    
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["tempo", "monitoring", "tempo"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "jaeger",
    category: "monitoring",
    label: "Jaeger",
    description: "Component for Jaeger",
    iconUrl: "/vendor-icons/jaeger.svg",
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["jaeger", "monitoring", "jaeger"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "datadog",
    category: "monitoring",
    label: "Datadog",
    description: "Component for Datadog",
    iconUrl: "/vendor-icons/datadog.svg",
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["datadog", "monitoring", "datadog"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "new_relic",
    category: "monitoring",
    label: "New Relic",
    description: "Component for New Relic",
    iconUrl: "/vendor-icons/new_relic.svg",
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["new_relic", "monitoring", "new relic"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "elk_stack",
    category: "monitoring",
    label: "ELK Stack",
    description: "Component for ELK Stack",
    
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["elk_stack", "monitoring", "elk stack"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "opentelemetry",
    category: "monitoring",
    label: "OpenTelemetry",
    description: "Component for OpenTelemetry",
    iconUrl: "/vendor-icons/opentelemetry.svg",
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["opentelemetry", "monitoring", "opentelemetry"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "cloudwatch",
    category: "monitoring",
    label: "CloudWatch",
    description: "Component for CloudWatch",
    
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["cloudwatch", "monitoring", "cloudwatch"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "splunk",
    category: "monitoring",
    label: "Splunk",
    description: "Component for Splunk",
    iconUrl: "/vendor-icons/splunk.svg",
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["splunk", "monitoring", "splunk"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  },
  {
    type: "honeycomb",
    category: "monitoring",
    label: "Honeycomb",
    description: "Component for Honeycomb",
    
    fallbackIcon: Activity,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["honeycomb", "monitoring", "honeycomb"],
    tags: ["monitoring"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["monitoring"] }]
  }
];
