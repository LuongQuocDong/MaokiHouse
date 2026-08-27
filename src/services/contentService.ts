import { apiFetch } from './api';
import type { AboutUsContent, WelcomeContent, ContactContent } from '../types';

export type ContentKey = 'about-us' | 'welcome' | 'contact';

export const contentService = {
  get: <T = unknown>(key: ContentKey) => apiFetch<T | null>(`/content/${key}`),

  getAboutUs: () => contentService.get<AboutUsContent>('about-us'),
  getWelcome: () => contentService.get<WelcomeContent>('welcome'),
  getContact: () => contentService.get<ContactContent>('contact'),

  put: <T = unknown>(idToken: string, key: ContentKey, value: T) =>
    apiFetch<T>(`/content/${key}`, { method: 'PUT', idToken, body: value }),
};
