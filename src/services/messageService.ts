import { apiFetch } from './api';
import type { MessageThread } from '../types';

export const messageService = {
  list: (idToken: string) => apiFetch<MessageThread[]>('/messages', { idToken }),

  get: (idToken: string, id: string) => apiFetch<MessageThread>(`/messages/${id}`, { idToken }),

  create: (idToken: string, data: Partial<MessageThread>) =>
    apiFetch<MessageThread>('/messages', { method: 'POST', idToken, body: data }),

  update: (idToken: string, id: string, data: Partial<MessageThread>) =>
    apiFetch<MessageThread>(`/messages/${id}`, { method: 'PUT', idToken, body: data }),

  remove: (idToken: string, id: string) =>
    apiFetch<void>(`/messages/${id}`, { method: 'DELETE', idToken }),

  appendMessage: (idToken: string, id: string, text: string) =>
    apiFetch<MessageThread>(`/messages/${id}/messages`, { method: 'POST', idToken, body: { text } }),
};
