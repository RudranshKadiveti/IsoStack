import { Lock } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const AUTH_NODES: NodeDefinition[] = [
  {
    type: "jwt",
    category: "auth",
    label: "JWT",
    description: "Component for JWT",
    iconUrl: "/vendor-icons/jwt.svg",
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["jwt", "auth", "jwt"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "oauth2",
    category: "auth",
    label: "OAuth2",
    description: "Component for OAuth2",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["oauth2", "auth", "oauth2"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "openid_connect",
    category: "auth",
    label: "OpenID Connect",
    description: "Component for OpenID Connect",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["openid_connect", "auth", "openid connect"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "saml",
    category: "auth",
    label: "SAML",
    description: "Component for SAML",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["saml", "auth", "saml"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "ldap",
    category: "auth",
    label: "LDAP",
    description: "Component for LDAP",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["ldap", "auth", "ldap"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "identity_provider",
    category: "auth",
    label: "Identity Provider",
    description: "Component for Identity Provider",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["identity_provider", "auth", "identity provider"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "auth_service",
    category: "auth",
    label: "Auth Service",
    description: "Component for Auth Service",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["auth_service", "auth", "auth service"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "session_store",
    category: "auth",
    label: "Session Store",
    description: "Component for Session Store",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["session_store", "auth", "session store"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "rbac",
    category: "auth",
    label: "RBAC",
    description: "Component for RBAC",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["rbac", "auth", "rbac"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "abac",
    category: "auth",
    label: "ABAC",
    description: "Component for ABAC",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["abac", "auth", "abac"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "mfa",
    category: "auth",
    label: "MFA",
    description: "Component for MFA",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["mfa", "auth", "mfa"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "api_keys",
    category: "auth",
    label: "API Keys",
    description: "Component for API Keys",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["api_keys", "auth", "api keys"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "aws_cognito",
    category: "auth",
    label: "AWS Cognito",
    description: "Component for AWS Cognito",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["aws_cognito", "auth", "aws cognito"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "clerk",
    category: "auth",
    label: "Clerk",
    description: "Component for Clerk",
    iconUrl: "/vendor-icons/clerk.svg",
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["clerk", "auth", "clerk"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "auth0",
    category: "auth",
    label: "Auth0",
    description: "Component for Auth0",
    iconUrl: "/vendor-icons/auth0.svg",
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["auth0", "auth", "auth0"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "firebase_auth",
    category: "auth",
    label: "Firebase Auth",
    description: "Component for Firebase Auth",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["firebase_auth", "auth", "firebase auth"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "supabase_auth",
    category: "auth",
    label: "Supabase Auth",
    description: "Component for Supabase Auth",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["supabase_auth", "auth", "supabase auth"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "keycloak",
    category: "auth",
    label: "Keycloak",
    description: "Component for Keycloak",
    iconUrl: "/vendor-icons/keycloak.svg",
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["keycloak", "auth", "keycloak"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  },
  {
    type: "oauth2_server",
    category: "auth",
    label: "OAuth2 Server",
    description: "Component for OAuth2 Server",
    
    fallbackIcon: Lock,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["oauth2_server", "auth", "oauth2 server"],
    tags: ["auth"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["auth"] }]
  }
];
