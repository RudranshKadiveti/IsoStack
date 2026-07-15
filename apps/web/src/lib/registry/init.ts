import { NodeRegistry } from './NodeRegistry';
import { CATEGORIES } from './packs/categories';
import { DATABASE_NODES } from './packs/database-pack';
import { AUTH_NODES } from './packs/auth-pack';
import { NETWORKING_NODES } from './packs/networking-pack';
import { MESSAGING_NODES } from './packs/messaging-pack';
import { CONTAINERS_NODES } from './packs/containers-pack';
import { DEVOPS_NODES } from './packs/devops-pack';
import { AI_NODES } from './packs/ai-pack';
import { MONITORING_NODES } from './packs/monitoring-pack';
import { CLOUD_NODES } from './packs/cloud-pack';
import { EXTERNAL_APIS_NODES } from './packs/external_apis-pack';
import { USERS_NODES } from './packs/users-pack';
import { PROTOCOLS_NODES } from './packs/protocols-pack';
import { COMPUTE_NODES } from './packs/compute-pack';
import { FRONTEND_NODES } from './packs/frontend-pack';
import { MOBILE_NODES } from './packs/mobile-pack';
import { STORAGE_NODES } from './packs/storage-pack';
import { CACHE_NODES } from './packs/cache-pack';
import { SECURITY_NODES } from './packs/security-pack';
import { ANALYTICS_NODES } from './packs/analytics-pack';
import { EDGE_NODES } from './packs/edge-pack';
import { UTILITIES_NODES } from './packs/utilities-pack';

// Initialize categories
NodeRegistry.registerCategories(CATEGORIES);

// Initialize all packs
NodeRegistry.registerPack(DATABASE_NODES);
NodeRegistry.registerPack(AUTH_NODES);
NodeRegistry.registerPack(NETWORKING_NODES);
NodeRegistry.registerPack(MESSAGING_NODES);
NodeRegistry.registerPack(CONTAINERS_NODES);
NodeRegistry.registerPack(DEVOPS_NODES);
NodeRegistry.registerPack(AI_NODES);
NodeRegistry.registerPack(MONITORING_NODES);
NodeRegistry.registerPack(CLOUD_NODES);
NodeRegistry.registerPack(EXTERNAL_APIS_NODES);
NodeRegistry.registerPack(USERS_NODES);
NodeRegistry.registerPack(PROTOCOLS_NODES);
NodeRegistry.registerPack(COMPUTE_NODES);
NodeRegistry.registerPack(FRONTEND_NODES);
NodeRegistry.registerPack(MOBILE_NODES);
NodeRegistry.registerPack(STORAGE_NODES);
NodeRegistry.registerPack(CACHE_NODES);
NodeRegistry.registerPack(SECURITY_NODES);
NodeRegistry.registerPack(ANALYTICS_NODES);
NodeRegistry.registerPack(EDGE_NODES);
NodeRegistry.registerPack(UTILITIES_NODES);
