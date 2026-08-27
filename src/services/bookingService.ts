import { apiFetch } from './api';
import type { Booking } from '../types';

export const bookingService = {
  list: (idToken: string) => apiFetch<Booking[]>('/bookings', { idToken }),

  get: (idToken: string, id: string) => apiFetch<Booking>(`/bookings/${id}`, { idToken }),

  create: (idToken: string, data: Partial<Booking>) =>
    apiFetch<Booking>('/bookings', { method: 'POST', idToken, body: data }),

  update: (idToken: string, id: string, data: Partial<Booking>) =>
    apiFetch<Booking>(`/bookings/${id}`, { method: 'PUT', idToken, body: data }),

  remove: (idToken: string, id: string) =>
    apiFetch<void>(`/bookings/${id}`, { method: 'DELETE', idToken }),
};
