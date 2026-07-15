import { Shield } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const SECURITY_NODES: NodeDefinition[] = [
  {
    type: "vault",
    category: "security",
    label: "Vault",
    description: "Component for Vault",
    iconUrl: "/vendor-icons/vault.svg",
    fallbackIcon: Shield,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["vault", "security", "vault"],
    tags: ["security"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["security"] }]
  },
  {
    type: "kms",
    category: "security",
    label: "KMS",
    description: "Component for KMS",
    
    fallbackIcon: Shield,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["kms", "security", "kms"],
    tags: ["security"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["security"] }]
  },
  {
    type: "waf",
    category: "security",
    label: "WAF",
    description: "Component for WAF",
    
    fallbackIcon: Shield,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["waf", "security", "waf"],
    tags: ["security"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["security"] }]
  },
  {
    type: "certbot",
    category: "security",
    label: "Certbot",
    description: "Component for Certbot",
    
    fallbackIcon: Shield,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["certbot", "security", "certbot"],
    tags: ["security"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["security"] }]
  },
  {
    type: "lets_encrypt",
    category: "security",
    label: "Lets Encrypt",
    description: "Component for Lets Encrypt",
    iconUrl: "/vendor-icons/lets_encrypt.svg",
    fallbackIcon: Shield,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["lets_encrypt", "security", "lets encrypt"],
    tags: ["security"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["security"] }]
  },
  {
    type: "snyk",
    category: "security",
    label: "Snyk",
    description: "Component for Snyk",
    iconUrl: "/vendor-icons/snyk.svg",
    fallbackIcon: Shield,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["snyk", "security", "snyk"],
    tags: ["security"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["security"] }]
  },
  {
    type: "sonarqube",
    category: "security",
    label: "SonarQube",
    description: "Component for SonarQube",
    iconUrl: "/vendor-icons/sonarqube.svg",
    fallbackIcon: Shield,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["sonarqube", "security", "sonarqube"],
    tags: ["security"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["security"] }]
  },
  {
    type: "trivy",
    category: "security",
    label: "Trivy",
    description: "Component for Trivy",
    iconUrl: "/vendor-icons/trivy.svg",
    fallbackIcon: Shield,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["trivy", "security", "trivy"],
    tags: ["security"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["security"] }]
  }
];
