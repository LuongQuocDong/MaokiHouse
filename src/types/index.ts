export interface Homestay {
  id: string;
  title: string;
  description: string;
  price: number;
  imageURL?: string; // Keep for backward compatibility
  imageURLs: string[]; // Array of image URLs
  mainImageURL: string; // Main image URL (first image)
  airbnbLink: string;
  phone: string;
  timestamp: number;
  updatedAt?: number;
  updatedBy?: string;
}

export interface WelcomeContent {
  id: string;
  content: string;
  title: string;
  subtitle: string;
  updatedAt?: number;
  updatedBy?: string;
}

export interface AboutUsContent {
  id: string;
  mainTitle: string;
  mainDescription: string;
  introText: string;
  ourStory: {
    title: string;
    content: string;
  };
  localExperience: {
    title: string;
    content: string;
  };
  whyChooseUs: {
    title: string;
    benefits: string[];
  };
  updatedAt?: number;
  updatedBy?: string;
}

export interface ContactContent {
  id: string;
  content: string;
  title: string;
  subtitle: string;
  imageURL?: string;
  updatedAt?: number;
  updatedBy?: string;
}

export interface User {
  uid: string;
  email: string;
}

export interface Property {
  id: string;
  hostId: string;
  title: string;
  address: string;
  status: 'active' | 'inactive';
  imageURLs: string[];
  basePrice: number;
  createdAt: number;
  updatedAt: number;
}

export type BookingSource = 'airbnb' | 'booking' | 'agoda' | 'direct';
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  hostId: string;
  propertyId: string;
  guestName: string;
  source: BookingSource;
  checkIn: string;
  checkOut: string;
  status: BookingStatus;
  payoutAmount: number;
  createdAt: number;
}

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

export interface Employee {
  id: string;
  hostId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export type RevenueEntryType = 'booking_payout' | 'expense' | 'adjustment';

export interface RevenueEntry {
  id: string;
  hostId: string;
  propertyId?: string;
  type: RevenueEntryType;
  amount: number;
  description: string;
  date: string;
}

export type ChannelPlatform = 'airbnb' | 'booking' | 'agoda';

export interface ChannelConnection {
  id: string;
  hostId: string;
  platform: ChannelPlatform;
  status: 'connected' | 'disconnected';
  connectedAt: number | null;
}
