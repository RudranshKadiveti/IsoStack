import { Sparkles } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const AI_NODES: NodeDefinition[] = [
  {
    type: "openai",
    category: "ai",
    label: "OpenAI",
    description: "Component for OpenAI",
    iconUrl: "/vendor-icons/openai.svg",
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["openai", "ai", "openai"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "anthropic",
    category: "ai",
    label: "Anthropic",
    description: "Component for Anthropic",
    iconUrl: "/vendor-icons/anthropic.svg",
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["anthropic", "ai", "anthropic"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "gemini",
    category: "ai",
    label: "Gemini",
    description: "Component for Gemini",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["gemini", "ai", "gemini"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "groq",
    category: "ai",
    label: "Groq",
    description: "Component for Groq",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["groq", "ai", "groq"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "deepseek",
    category: "ai",
    label: "DeepSeek",
    description: "Component for DeepSeek",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["deepseek", "ai", "deepseek"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "mistral",
    category: "ai",
    label: "Mistral",
    description: "Component for Mistral",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["mistral", "ai", "mistral"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "ollama",
    category: "ai",
    label: "Ollama",
    description: "Component for Ollama",
    iconUrl: "/vendor-icons/ollama.svg",
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["ollama", "ai", "ollama"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "huggingface",
    category: "ai",
    label: "HuggingFace",
    description: "Component for HuggingFace",
    iconUrl: "/vendor-icons/huggingface.svg",
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["huggingface", "ai", "huggingface"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "cohere",
    category: "ai",
    label: "Cohere",
    description: "Component for Cohere",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["cohere", "ai", "cohere"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "openrouter",
    category: "ai",
    label: "OpenRouter",
    description: "Component for OpenRouter",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["openrouter", "ai", "openrouter"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "ai_agent",
    category: "ai",
    label: "AI Agent",
    description: "Component for AI Agent",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["ai_agent", "ai", "ai agent"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "multi_agent",
    category: "ai",
    label: "Multi-Agent",
    description: "Component for Multi-Agent",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["multi_agent", "ai", "multi-agent"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "vector_database",
    category: "ai",
    label: "Vector Database",
    description: "Component for Vector Database",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["vector_database", "ai", "vector database"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "embeddings",
    category: "ai",
    label: "Embeddings",
    description: "Component for Embeddings",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["embeddings", "ai", "embeddings"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "memory",
    category: "ai",
    label: "Memory",
    description: "Component for Memory",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["memory", "ai", "memory"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "prompt",
    category: "ai",
    label: "Prompt",
    description: "Component for Prompt",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["prompt", "ai", "prompt"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "guardrails",
    category: "ai",
    label: "Guardrails",
    description: "Component for Guardrails",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["guardrails", "ai", "guardrails"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "rag",
    category: "ai",
    label: "RAG",
    description: "Component for RAG",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["rag", "ai", "rag"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "mcp_server",
    category: "ai",
    label: "MCP Server",
    description: "Component for MCP Server",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["mcp_server", "ai", "mcp server"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "mcp_client",
    category: "ai",
    label: "MCP Client",
    description: "Component for MCP Client",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["mcp_client", "ai", "mcp client"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "vertex_ai",
    category: "ai",
    label: "Vertex AI",
    description: "Component for Vertex AI",
    iconUrl: "/vendor-icons/vertex_ai.svg",
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["vertex_ai", "ai", "vertex ai"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "replicate",
    category: "ai",
    label: "Replicate",
    description: "Component for Replicate",
    iconUrl: "/vendor-icons/replicate.svg",
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["replicate", "ai", "replicate"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  },
  {
    type: "together_ai",
    category: "ai",
    label: "Together AI",
    description: "Component for Together AI",
    
    fallbackIcon: Sparkles,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["together_ai", "ai", "together ai"],
    tags: ["ai"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["ai"] }]
  }
];
