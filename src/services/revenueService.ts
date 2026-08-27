import { apiFetch } from './api';
import type { RevenueEntry } from '../types';

export const revenueService = {
  list: (idToken: string) => apiFetch<RevenueEntry[]>('/revenue', { idToken }),

  get: (idToken: string, id: string) => apiFetch<RevenueEntry>(`/revenue/${id}`, { idToken }),

  create: (idToken: string, data: Partial<RevenueEntry>) =>
    apiFetch<RevenueEntry>('/revenue', { method: 'POST', idToken, body: data }),

  update: (idToken: string, id: string, data: Partial<RevenueEntry>) =>
    apiFetch<RevenueEntry>(`/revenue/${id}`, { method: 'PUT', idToken, body: data }),

  remove: (idToken: string, id: string) =>
    apiFetch<void>(`/revenue/${id}`, { method: 'DELETE', idToken }),
};
