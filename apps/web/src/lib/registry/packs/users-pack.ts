import { Users } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const USERS_NODES: NodeDefinition[] = [
  {
    type: "user",
    category: "users",
    label: "User",
    description: "Component for User",
    
    fallbackIcon: Users,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["user", "users", "user"],
    tags: ["users"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["users"] }]
  },
  {
    type: "browser",
    category: "users",
    label: "Browser",
    description: "Component for Browser",
    
    fallbackIcon: Users,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["browser", "users", "browser"],
    tags: ["users"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["users"] }]
  },
  {
    type: "desktop_app",
    category: "users",
    label: "Desktop App",
    description: "Component for Desktop App",
    
    fallbackIcon: Users,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["desktop_app", "users", "desktop app"],
    tags: ["users"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["users"] }]
  },
  {
    type: "mobile_app",
    category: "users",
    label: "Mobile App",
    description: "Component for Mobile App",
    
    fallbackIcon: Users,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["mobile_app", "users", "mobile app"],
    tags: ["users"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["users"] }]
  },
  {
    type: "admin",
    category: "users",
    label: "Admin",
    description: "Component for Admin",
    
    fallbackIcon: Users,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["admin", "users", "admin"],
    tags: ["users"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["users"] }]
  },
  {
    type: "iot_device",
    category: "users",
    label: "IoT Device",
    description: "Component for IoT Device",
    
    fallbackIcon: Users,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["iot_device", "users", "iot device"],
    tags: ["users"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["users"] }]
  },
  {
    type: "third_party_client",
    category: "users",
    label: "Third-Party Client",
    description: "Component for Third-Party Client",
    
    fallbackIcon: Users,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["third_party_client", "users", "third-party client"],
    tags: ["users"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["users"] }]
  }
];
