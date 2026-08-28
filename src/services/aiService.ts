import { apiFetch } from './api';

export interface AIChatMessage {
  role: 'user' | 'model';
  text: string;
}

export const aiService = {
  chat: (idToken: string, history: AIChatMessage[]) =>
    apiFetch<{ reply: string }>('/ai/chat', { method: 'POST', idToken, body: { history } }),
};
