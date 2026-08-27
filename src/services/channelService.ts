import { apiFetch } from './api';
import type { ChannelConnection, ChannelPlatform } from '../types';

export const channelService = {
  list: (idToken: string) => apiFetch<ChannelConnection[]>('/channels', { idToken }),

  connect: (idToken: string, platform: ChannelPlatform) =>
    apiFetch<ChannelConnection>(`/channels/${platform}/connect`, { method: 'POST', idToken }),

  disconnect: (idToken: string, platform: ChannelPlatform) =>
    apiFetch<ChannelConnection>(`/channels/${platform}/disconnect`, { method: 'POST', idToken }),
};
