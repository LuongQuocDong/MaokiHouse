import { createHostScopedModel } from './firestoreCrud';

export type BookingSource = 'airbnb' | 'booking' | 'agoda' | 'direct';
export type BookingStatus = 'confirmed' | 'pending' | 'cancelled';

export interface Booking {
  id: string;
  hostId: string;
  propertyId: string;
  guestName: string;
  source: BookingSource;
  checkIn: string; // ISO date string
  checkOut: string; // ISO date string
  status: BookingStatus;
  payoutAmount: number;
  createdAt: number;
}

export const BookingModel = createHostScopedModel<Booking>('bookings');
