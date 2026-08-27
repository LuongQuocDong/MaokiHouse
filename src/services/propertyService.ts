import { apiFetch } from './api';
import type { Property } from '../types';

export const propertyService = {
  list: (idToken: string) => apiFetch<Property[]>('/properties', { idToken }),

  get: (idToken: string, id: string) => apiFetch<Property>(`/properties/${id}`, { idToken }),

  create: (idToken: string, data: Partial<Property>) =>
    apiFetch<Property>('/properties', { method: 'POST', idToken, body: data }),

  update: (idToken: string, id: string, data: Partial<Property>) =>
    apiFetch<Property>(`/properties/${id}`, { method: 'PUT', idToken, body: data }),

  remove: (idToken: string, id: string) =>
    apiFetch<void>(`/properties/${id}`, { method: 'DELETE', idToken }),
};
