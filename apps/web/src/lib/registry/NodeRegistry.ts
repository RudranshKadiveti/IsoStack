import type { NodeDefinition, CategoryDefinition } from './types';

class NodeRegistryClass {
  private nodes: Map<string, NodeDefinition> = new Map();
  private categories: Map<string, CategoryDefinition> = new Map();

  /**
   * Register a new node definition
   */
  public registerNode(node: NodeDefinition) {
    this.nodes.set(node.type, node);
  }

  /**
   * Register multiple node definitions (a pack)
   */
  public registerPack(nodes: NodeDefinition[]) {
    nodes.forEach(node => this.registerNode(node));
  }

  /**
   * Register a new category
   */
  public registerCategory(category: CategoryDefinition) {
    this.categories.set(category.id, category);
  }

  /**
   * Register multiple categories
   */
  public registerCategories(categories: CategoryDefinition[]) {
    categories.forEach(cat => this.registerCategory(cat));
  }

  /**
   * Get a node by its type ID
   */
  public getNode(type: string): NodeDefinition | undefined {
    return this.nodes.get(type);
  }

  /**
   * Get all registered nodes
   */
  public getAllNodes(): NodeDefinition[] {
    return Array.from(this.nodes.values());
  }

  /**
   * Get nodes filtered by category
   */
  public getNodesByCategory(categoryId: string): NodeDefinition[] {
    return this.getAllNodes().filter(node => node.category === categoryId);
  }

  /**
   * Get all categories sorted by their order
   */
  public getAllCategories(): CategoryDefinition[] {
    return Array.from(this.categories.values()).sort((a, b) => a.order - b.order);
  }
  
  /**
   * Search nodes across multiple fields
   */
  public searchNodes(query: string): NodeDefinition[] {
    const term = query.toLowerCase().trim();
    if (!term) return this.getAllNodes();

    return this.getAllNodes().filter(node => {
      // Check basic fields
      if (
        node.label.toLowerCase().includes(term) ||
        node.description.toLowerCase().includes(term) ||
        node.type.toLowerCase().includes(term) ||
        node.vendor?.toLowerCase().includes(term) ||
        node.category.toLowerCase().includes(term)
      ) {
        return true;
      }

      // Check arrays
      if (node.keywords?.some(k => k.toLowerCase().includes(term))) return true;
      if (node.tags?.some(t => t.toLowerCase().includes(term))) return true;
      if (node.aliases?.some(a => a.toLowerCase().includes(term))) return true;

      return false;
    });
  }
}

// Export singleton
export const NodeRegistry = new NodeRegistryClass();
