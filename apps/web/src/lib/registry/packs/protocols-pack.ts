import { FileCode2 } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const PROTOCOLS_NODES: NodeDefinition[] = [
  {
    type: "http",
    category: "protocols",
    label: "HTTP",
    description: "Component for HTTP",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["http", "protocols", "http"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "https",
    category: "protocols",
    label: "HTTPS",
    description: "Component for HTTPS",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["https", "protocols", "https"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "websocket",
    category: "protocols",
    label: "WebSocket",
    description: "Component for WebSocket",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["websocket", "protocols", "websocket"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "grpc",
    category: "protocols",
    label: "gRPC",
    description: "Component for gRPC",
    iconUrl: "/vendor-icons/grpc.svg",
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["grpc", "protocols", "grpc"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "tcp",
    category: "protocols",
    label: "TCP",
    description: "Component for TCP",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["tcp", "protocols", "tcp"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "udp",
    category: "protocols",
    label: "UDP",
    description: "Component for UDP",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["udp", "protocols", "udp"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "amqp",
    category: "protocols",
    label: "AMQP",
    description: "Component for AMQP",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["amqp", "protocols", "amqp"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "smtp",
    category: "protocols",
    label: "SMTP",
    description: "Component for SMTP",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["smtp", "protocols", "smtp"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "ftp",
    category: "protocols",
    label: "FTP",
    description: "Component for FTP",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["ftp", "protocols", "ftp"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "ssh",
    category: "protocols",
    label: "SSH",
    description: "Component for SSH",
    iconUrl: "/vendor-icons/ssh.svg",
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["ssh", "protocols", "ssh"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  },
  {
    type: "tls",
    category: "protocols",
    label: "TLS",
    description: "Component for TLS",
    
    fallbackIcon: FileCode2,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["tls", "protocols", "tls"],
    tags: ["protocols"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["protocols"] }]
  }
];
