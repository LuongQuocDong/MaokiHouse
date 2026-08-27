import { apiFetch } from './api';
import type { Homestay } from '../types';

export const homestayService = {
  list: () => apiFetch<Homestay[]>('/homestays'),

  get: (id: string) => apiFetch<Homestay>(`/homestays/${id}`),

  create: (idToken: string, data: Partial<Homestay> & { imageURLs: string[]; mainImageURL: string }) =>
    apiFetch<Homestay>('/homestays', { method: 'POST', idToken, body: data }),

  update: (idToken: string, id: string, data: Partial<Homestay>) =>
    apiFetch<Homestay>(`/homestays/${id}`, { method: 'PUT', idToken, body: data }),

  remove: (idToken: string, id: string) =>
    apiFetch<void>(`/homestays/${id}`, { method: 'DELETE', idToken }),
};
