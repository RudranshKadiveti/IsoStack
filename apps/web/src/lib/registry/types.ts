import type { LucideIcon } from 'lucide-react';

export type NodeShape = 'rectangle' | 'cylinder' | 'hexagon' | 'pill' | 'diamond' | 'cloud' | 'circle';

export interface PropertyField {
  name: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'boolean';
  options?: { label: string; value: string }[];
  defaultValue?: any;
}

export interface ServiceVariant {
  id: string;
  label: string;
  description: string;
  tags: string[];
  propertiesSchema?: PropertyField[];
}

export interface NodeDefinition {
  // Core Identifiers
  type: string;             // e.g. "postgresql"
  category: string;         // e.g. "database"
  vendor?: string;          // e.g. "PostgreSQL Global Development Group"
  
  // Display
  label: string;            // e.g. "PostgreSQL"
  description: string;      // e.g. "Advanced relational DB"
  
  // Iconography
  iconUrl?: string;         // e.g. "/vendor-icons/postgresql.svg"
  fallbackIcon: LucideIcon; // e.g. Database
  accentColor: string;      // e.g. "oklch(0.6 0.12 250)"
  shape: NodeShape;         // e.g. "cylinder"
  
  // Search
  keywords: string[];       // e.g. ["sql", "rdbms", "relational", "postgres"]
  tags: string[];           // e.g. ["database", "sql"]
  aliases?: string[];       // e.g. ["pg", "psql"]
  
  // Configuration
  defaultVariant: string;
  variants: ServiceVariant[];
  propertiesSchema?: PropertyField[]; // Base properties applicable to all variants
  
  // Connection Rules
  supportedConnections?: string[]; // Types of allowed incoming connections
}

export interface CategoryDefinition {
  id: string;
  label: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: LucideIcon;
  order: number;
}
