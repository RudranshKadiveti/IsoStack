import { BarChart } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const ANALYTICS_NODES: NodeDefinition[] = [
  {
    type: "snowflake",
    category: "analytics",
    label: "Snowflake",
    description: "Component for Snowflake",
    iconUrl: "/vendor-icons/snowflake.svg",
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["snowflake", "analytics", "snowflake"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "bigquery",
    category: "analytics",
    label: "BigQuery",
    description: "Component for BigQuery",
    
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["bigquery", "analytics", "bigquery"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "redshift",
    category: "analytics",
    label: "Redshift",
    description: "Component for Redshift",
    
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["redshift", "analytics", "redshift"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "clickhouse",
    category: "analytics",
    label: "ClickHouse",
    description: "Component for ClickHouse",
    iconUrl: "/vendor-icons/clickhouse.svg",
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["clickhouse", "analytics", "clickhouse"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "databricks",
    category: "analytics",
    label: "Databricks",
    description: "Component for Databricks",
    iconUrl: "/vendor-icons/databricks.svg",
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["databricks", "analytics", "databricks"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "apache_spark",
    category: "analytics",
    label: "Apache Spark",
    description: "Component for Apache Spark",
    iconUrl: "/vendor-icons/apache_spark.svg",
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["apache_spark", "analytics", "apache spark"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "hadoop",
    category: "analytics",
    label: "Hadoop",
    description: "Component for Hadoop",
    iconUrl: "/vendor-icons/hadoop.svg",
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["hadoop", "analytics", "hadoop"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "posthog",
    category: "analytics",
    label: "PostHog",
    description: "Component for PostHog",
    iconUrl: "/vendor-icons/posthog.svg",
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["posthog", "analytics", "posthog"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "mixpanel",
    category: "analytics",
    label: "Mixpanel",
    description: "Component for Mixpanel",
    iconUrl: "/vendor-icons/mixpanel.svg",
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["mixpanel", "analytics", "mixpanel"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "google_analytics",
    category: "analytics",
    label: "Google Analytics",
    description: "Component for Google Analytics",
    iconUrl: "/vendor-icons/google_analytics.svg",
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["google_analytics", "analytics", "google analytics"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  },
  {
    type: "segment",
    category: "analytics",
    label: "Segment",
    description: "Component for Segment",
    
    fallbackIcon: BarChart,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["segment", "analytics", "segment"],
    tags: ["analytics"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["analytics"] }]
  }
];
