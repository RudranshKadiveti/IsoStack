import { MessageSquare } from 'lucide-react';
import type { NodeDefinition } from '../types';

export const MESSAGING_NODES: NodeDefinition[] = [
  {
    type: "kafka",
    category: "messaging",
    label: "Kafka",
    description: "Component for Kafka",
    iconUrl: "/vendor-icons/kafka.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["kafka", "messaging", "kafka"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "rabbitmq",
    category: "messaging",
    label: "RabbitMQ",
    description: "Component for RabbitMQ",
    iconUrl: "/vendor-icons/rabbitmq.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["rabbitmq", "messaging", "rabbitmq"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "activemq",
    category: "messaging",
    label: "ActiveMQ",
    description: "Component for ActiveMQ",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["activemq", "messaging", "activemq"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "pulsar",
    category: "messaging",
    label: "Pulsar",
    description: "Component for Pulsar",
    iconUrl: "/vendor-icons/pulsar.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["pulsar", "messaging", "pulsar"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "nats",
    category: "messaging",
    label: "NATS",
    description: "Component for NATS",
    iconUrl: "/vendor-icons/nats.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["nats", "messaging", "nats"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "jetstream",
    category: "messaging",
    label: "JetStream",
    description: "Component for JetStream",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["jetstream", "messaging", "jetstream"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "mqtt_broker",
    category: "messaging",
    label: "MQTT Broker",
    description: "Component for MQTT Broker",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["mqtt_broker", "messaging", "mqtt broker"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "zeromq",
    category: "messaging",
    label: "ZeroMQ",
    description: "Component for ZeroMQ",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["zeromq", "messaging", "zeromq"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "amazon_sqs",
    category: "messaging",
    label: "Amazon SQS",
    description: "Component for Amazon SQS",
    iconUrl: "/vendor-icons/amazon_sqs.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["amazon_sqs", "messaging", "amazon sqs"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "amazon_sns",
    category: "messaging",
    label: "Amazon SNS",
    description: "Component for Amazon SNS",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["amazon_sns", "messaging", "amazon sns"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "google_pub_sub",
    category: "messaging",
    label: "Google Pub/Sub",
    description: "Component for Google Pub/Sub",
    iconUrl: "/vendor-icons/google_pub_sub.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["google_pub_sub", "messaging", "google pub/sub"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "azure_service_bus",
    category: "messaging",
    label: "Azure Service Bus",
    description: "Component for Azure Service Bus",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["azure_service_bus", "messaging", "azure service bus"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "eventbridge",
    category: "messaging",
    label: "EventBridge",
    description: "Component for EventBridge",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["eventbridge", "messaging", "eventbridge"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "celery",
    category: "messaging",
    label: "Celery",
    description: "Component for Celery",
    iconUrl: "/vendor-icons/celery.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["celery", "messaging", "celery"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "rq",
    category: "messaging",
    label: "RQ",
    description: "Component for RQ",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["rq", "messaging", "rq"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "temporal",
    category: "messaging",
    label: "Temporal",
    description: "Component for Temporal",
    iconUrl: "/vendor-icons/temporal.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["temporal", "messaging", "temporal"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "airflow",
    category: "messaging",
    label: "Airflow",
    description: "Component for Airflow",
    iconUrl: "/vendor-icons/airflow.svg",
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["airflow", "messaging", "airflow"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  },
  {
    type: "firebase_cloud_messaging",
    category: "messaging",
    label: "Firebase Cloud Messaging",
    description: "Component for Firebase Cloud Messaging",
    
    fallbackIcon: MessageSquare,
    accentColor: "oklch(0.6 0.15 250)",
    shape: "rectangle",
    keywords: ["firebase_cloud_messaging", "messaging", "firebase cloud messaging"],
    tags: ["messaging"],
    defaultVariant: "standard",
    variants: [{ id: "standard", label: "Standard", description: "Default variant", tags: ["messaging"] }]
  }
];
