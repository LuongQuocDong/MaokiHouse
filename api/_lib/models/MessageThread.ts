import { createHostScopedModel } from './firestoreCrud';

export type MessagePlatform = 'airbnb' | 'booking' | 'agoda' | 'direct';

export interface Message {
  sender: 'guest' | 'host';
  text: string;
  timestamp: number;
}

export interface MessageThread {
  id: string;
  hostId: string;
  guestName: string;
  platform: MessagePlatform;
  messages: Message[];
  lastMessageAt: number;
}

export const MessageThreadModel = createHostScopedModel<MessageThread>('messageThreads');
