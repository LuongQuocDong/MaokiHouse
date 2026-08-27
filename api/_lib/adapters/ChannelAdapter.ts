import type { Booking } from '../models/Booking';

/**
 * Seam for real OTA (Airbnb/Booking.com/Agoda) integrations. Each platform's
 * partner-API client should implement this interface. Until partner API
 * approval is in place, `MockChannelAdapter` stands in for all platforms.
 */
export interface ChannelAdapter {
  platform: string;
  connect(hostId: string): Promise<void>;
  fetchBookings(hostId: string): Promise<Booking[]>;
  pushAvailability(hostId: string, propertyId: string): Promise<void>;
}
