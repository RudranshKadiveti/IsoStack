import { Smartphone } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const MOBILE_NODES: NodeDefinition[] = [
  {
    type: "flutter",
    category: "mobile",
    label: "Flutter",
    description: "Component for Flutter",
    iconUrl: "/vendor-icons/flutter.svg",
    fallbackIcon: Smartphone,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["flutter", "mobile", "flutter"],
    tags: ["mobile"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["mobile"] }]
  },
  {
    type: "react_native",
    category: "mobile",
    label: "React Native",
    description: "Component for React Native",
    iconUrl: "/vendor-icons/react_native.svg",
    fallbackIcon: Smartphone,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["react_native", "mobile", "react native"],
    tags: ["mobile"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["mobile"] }]
  },
  {
    type: "swift",
    category: "mobile",
    label: "Swift",
    description: "Component for Swift",
    iconUrl: "/vendor-icons/swift.svg",
    fallbackIcon: Smartphone,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["swift", "mobile", "swift"],
    tags: ["mobile"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["mobile"] }]
  },
  {
    type: "kotlin_mobile",
    category: "mobile",
    label: "Kotlin Mobile",
    description: "Component for Kotlin Mobile",
    
    fallbackIcon: Smartphone,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["kotlin_mobile", "mobile", "kotlin mobile"],
    tags: ["mobile"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["mobile"] }]
  },
  {
    type: "expo",
    category: "mobile",
    label: "Expo",
    description: "Component for Expo",
    iconUrl: "/vendor-icons/expo.svg",
    fallbackIcon: Smartphone,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["expo", "mobile", "expo"],
    tags: ["mobile"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["mobile"] }]
  },
  {
    type: "ionic",
    category: "mobile",
    label: "Ionic",
    description: "Component for Ionic",
    iconUrl: "/vendor-icons/ionic.svg",
    fallbackIcon: Smartphone,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["ionic", "mobile", "ionic"],
    tags: ["mobile"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["mobile"] }]
  }
];
