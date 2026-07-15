import { Wrench } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const UTILITIES_NODES: NodeDefinition[] = [
  {
    type: "cron_job",
    category: "utilities",
    label: "Cron Job",
    description: "Component for Cron Job",
    
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["cron_job", "utilities", "cron job"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "scheduler",
    category: "utilities",
    label: "Scheduler",
    description: "Component for Scheduler",
    
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["scheduler", "utilities", "scheduler"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "search_engine",
    category: "utilities",
    label: "Search Engine",
    description: "Component for Search Engine",
    
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["search_engine", "utilities", "search engine"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "algolia",
    category: "utilities",
    label: "Algolia",
    description: "Component for Algolia",
    iconUrl: "/vendor-icons/algolia.svg",
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["algolia", "utilities", "algolia"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "meilisearch",
    category: "utilities",
    label: "Meilisearch",
    description: "Component for Meilisearch",
    iconUrl: "/vendor-icons/meilisearch.svg",
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["meilisearch", "utilities", "meilisearch"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "pdf_generator",
    category: "utilities",
    label: "PDF Generator",
    description: "Component for PDF Generator",
    
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["pdf_generator", "utilities", "pdf generator"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "image_processor",
    category: "utilities",
    label: "Image Processor",
    description: "Component for Image Processor",
    
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["image_processor", "utilities", "image processor"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "video_transcoder",
    category: "utilities",
    label: "Video Transcoder",
    description: "Component for Video Transcoder",
    
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["video_transcoder", "utilities", "video transcoder"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "email_sender",
    category: "utilities",
    label: "Email Sender",
    description: "Component for Email Sender",
    
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["email_sender", "utilities", "email sender"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  },
  {
    type: "notification_service",
    category: "utilities",
    label: "Notification Service",
    description: "Component for Notification Service",
    
    fallbackIcon: Wrench,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["notification_service", "utilities", "notification service"],
    tags: ["utilities"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["utilities"] }]
  }
];
