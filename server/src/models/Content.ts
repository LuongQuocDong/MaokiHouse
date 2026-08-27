import { db } from '../config/firebase';

export type ContentKey = 'about-us' | 'welcome' | 'contact';

const PATHS: Record<ContentKey, string> = {
  'about-us': 'content/about-us',
  welcome: 'welcome/default',
  contact: 'contact/default',
};

export const isContentKey = (key: string): key is ContentKey =>
  Object.prototype.hasOwnProperty.call(PATHS, key);

export const ContentModel = {
  async get<T = unknown>(key: ContentKey): Promise<T | null> {
    const snapshot = await db.ref(PATHS[key]).once('value');
    if (!snapshot.exists()) return null;
    return snapshot.val() as T;
  },

  async set<T = unknown>(key: ContentKey, value: T): Promise<void> {
    await db.ref(PATHS[key]).set(value);
  },
};
