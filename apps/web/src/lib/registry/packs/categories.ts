import { 
  Server, Monitor, Smartphone, Database, HardDrive, Zap, Network, Shield, 
  Lock, MessageSquare, Cloud, Box, Workflow, Sparkles, Activity, BarChart, 
  Globe, Plug, Users, FileCode2, Wrench, Settings
} from 'lucide-react';
import type { CategoryDefinition } from '../types';

// Oklch color scale for visual hierarchy
const COLORS = {
  blue: { color: "oklch(0.6 0.15 250)", bgColor: "bg-blue-500/20", borderColor: "border-blue-500/30" },
  indigo: { color: "oklch(0.55 0.2 260)", bgColor: "bg-indigo-500/20", borderColor: "border-indigo-500/30" },
  cyan: { color: "oklch(0.6 0.15 210)", bgColor: "bg-cyan-500/20", borderColor: "border-cyan-500/30" },
  teal: { color: "oklch(0.6 0.15 170)", bgColor: "bg-teal-500/20", borderColor: "border-teal-500/30" },
  emerald: { color: "oklch(0.6 0.15 140)", bgColor: "bg-emerald-500/20", borderColor: "border-emerald-500/30" },
  green: { color: "oklch(0.65 0.15 130)", bgColor: "bg-green-500/20", borderColor: "border-green-500/30" },
  orange: { color: "oklch(0.65 0.18 45)", bgColor: "bg-orange-500/20", borderColor: "border-orange-500/30" },
  amber: { color: "oklch(0.7 0.18 60)", bgColor: "bg-amber-500/20", borderColor: "border-amber-500/30" },
  red: { color: "oklch(0.6 0.2 25)", bgColor: "bg-red-500/20", borderColor: "border-red-500/30" },
  rose: { color: "oklch(0.6 0.2 10)", bgColor: "bg-rose-500/20", borderColor: "border-rose-500/30" },
  purple: { color: "oklch(0.55 0.2 300)", bgColor: "bg-purple-500/20", borderColor: "border-purple-500/30" },
  fuchsia: { color: "oklch(0.55 0.2 330)", bgColor: "bg-fuchsia-500/20", borderColor: "border-fuchsia-500/30" },
  slate: { color: "oklch(0.5 0.05 250)", bgColor: "bg-slate-500/20", borderColor: "border-slate-500/30" },
};

export const CATEGORIES: CategoryDefinition[] = [
  { id: "compute",          label: "Compute / Backend",           ...COLORS.indigo,  icon: Server,        order: 10 },
  { id: "frontend",         label: "Frontend",                    ...COLORS.cyan,    icon: Monitor,       order: 20 },
  { id: "mobile",           label: "Mobile",                      ...COLORS.blue,    icon: Smartphone,    order: 30 },
  { id: "database",         label: "Databases",                   ...COLORS.teal,    icon: Database,      order: 40 },
  { id: "storage",          label: "Storage",                     ...COLORS.emerald, icon: HardDrive,     order: 50 },
  { id: "cache",            label: "Cache",                       ...COLORS.amber,   icon: Zap,           order: 60 },
  { id: "networking",       label: "Networking",                  ...COLORS.blue,    icon: Network,       order: 70 },
  { id: "auth",             label: "Authentication & Identity",   ...COLORS.rose,    icon: Lock,          order: 80 },
  { id: "security",         label: "Security",                    ...COLORS.red,     icon: Shield,        order: 90 },
  { id: "messaging",        label: "Messaging & Streaming",       ...COLORS.orange,  icon: MessageSquare, order: 100 },
  { id: "cloud",            label: "Cloud Providers",             ...COLORS.blue,    icon: Cloud,         order: 110 },
  { id: "containers",       label: "Containers & Orchestration",  ...COLORS.purple,  icon: Box,           order: 120 },
  { id: "devops",           label: "DevOps & CI/CD",              ...COLORS.fuchsia, icon: Workflow,      order: 130 },
  { id: "ai",               label: "AI & Agents",                 ...COLORS.purple,  icon: Sparkles,      order: 140 },
  { id: "monitoring",       label: "Monitoring & Observability",  ...COLORS.amber,   icon: Activity,      order: 150 },
  { id: "analytics",        label: "Analytics & Data",            ...COLORS.green,   icon: BarChart,      order: 160 },
  { id: "edge",             label: "Edge & CDN",                  ...COLORS.cyan,    icon: Globe,         order: 170 },
  { id: "external_apis",    label: "External APIs & SaaS",        ...COLORS.emerald, icon: Plug,          order: 180 },
  { id: "users",            label: "Users & Clients",             ...COLORS.slate,   icon: Users,         order: 190 },
  { id: "protocols",        label: "Protocols",                   ...COLORS.slate,   icon: FileCode2,     order: 200 },
  { id: "utilities",        label: "Utilities",                   ...COLORS.slate,   icon: Wrench,        order: 210 },
  { id: "custom",           label: "Custom Components",           ...COLORS.slate,   icon: Settings,      order: 220 },
];
