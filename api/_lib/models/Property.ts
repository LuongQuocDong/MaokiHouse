import { createHostScopedModel } from './firestoreCrud';

export interface Property {
  id: string;
  hostId: string;
  title: string;
  address: string;
  status: 'active' | 'inactive';
  imageURLs: string[];
  basePrice: number;
  createdAt: number;
  updatedAt: number;
}

export const PropertyModel = createHostScopedModel<Property>('properties');
