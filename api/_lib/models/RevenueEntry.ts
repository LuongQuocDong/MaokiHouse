import { createHostScopedModel } from './firestoreCrud';

export type RevenueEntryType = 'booking_payout' | 'expense' | 'adjustment';

export interface RevenueEntry {
  id: string;
  hostId: string;
  propertyId?: string;
  type: RevenueEntryType;
  amount: number;
  description: string;
  date: string; // ISO date string
}

export const RevenueEntryModel = createHostScopedModel<RevenueEntry>('revenueEntries');
