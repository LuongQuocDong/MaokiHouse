import { createHostScopedModel } from './firestoreCrud';

export type ChannelPlatform = 'airbnb' | 'booking' | 'agoda';

export interface ChannelConnection {
  id: string; // platform is used as the doc id
  hostId: string;
  platform: ChannelPlatform;
  status: 'connected' | 'disconnected';
  connectedAt: number | null;
}

export const ChannelConnectionModel = createHostScopedModel<ChannelConnection>('channelConnections');
