import { HardDrive } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const STORAGE_NODES: NodeDefinition[] = [
  {
    type: "amazon_s3",
    category: "storage",
    label: "Amazon S3",
    description: "Component for Amazon S3",
    iconUrl: "/vendor-icons/amazon_s3.svg",
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["amazon_s3", "storage", "amazon s3"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "google_cloud_storage",
    category: "storage",
    label: "Google Cloud Storage",
    description: "Component for Google Cloud Storage",
    iconUrl: "/vendor-icons/google_cloud_storage.svg",
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["google_cloud_storage", "storage", "google cloud storage"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "azure_blob_storage",
    category: "storage",
    label: "Azure Blob Storage",
    description: "Component for Azure Blob Storage",
    
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["azure_blob_storage", "storage", "azure blob storage"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "minio",
    category: "storage",
    label: "MinIO",
    description: "Component for MinIO",
    iconUrl: "/vendor-icons/minio.svg",
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["minio", "storage", "minio"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "backblaze_b2",
    category: "storage",
    label: "Backblaze B2",
    description: "Component for Backblaze B2",
    iconUrl: "/vendor-icons/backblaze_b2.svg",
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["backblaze_b2", "storage", "backblaze b2"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "ebs",
    category: "storage",
    label: "EBS",
    description: "Component for EBS",
    
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["ebs", "storage", "ebs"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "efs",
    category: "storage",
    label: "EFS",
    description: "Component for EFS",
    
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["efs", "storage", "efs"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "cloudinary",
    category: "storage",
    label: "Cloudinary",
    description: "Component for Cloudinary",
    iconUrl: "/vendor-icons/cloudinary.svg",
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["cloudinary", "storage", "cloudinary"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "supabase_storage",
    category: "storage",
    label: "Supabase Storage",
    description: "Component for Supabase Storage",
    
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["supabase_storage", "storage", "supabase storage"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  },
  {
    type: "linode_object_storage",
    category: "storage",
    label: "Linode Object Storage",
    description: "Component for Linode Object Storage",
    
    fallbackIcon: HardDrive,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["linode_object_storage", "storage", "linode object storage"],
    tags: ["storage"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["storage"] }]
  }
];
