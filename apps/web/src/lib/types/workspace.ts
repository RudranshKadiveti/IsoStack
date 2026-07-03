export interface Workspace {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  lastOpened: string;
  autosaveAt: string;
  status: 'Draft' | 'Completed' | 'Review Required';
  healthScore: number;
  estimatedCost: number; 
  cloudProvider: 'AWS' | 'GCP' | 'Azure';
  serviceCount: number;
  thumbnail?: string;
  favorite: boolean;
  architectureVersion: string;
  graph?: any; // The full architecture graph payload
}
