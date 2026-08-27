import { RevenueEntryModel } from '../models/RevenueEntry';
import type { RevenueEntry } from '../models/RevenueEntry';
import { createCrudController } from './crudControllerFactory';

const TYPES = ['booking_payout', 'expense', 'adjustment'];

export const revenueController = createCrudController<RevenueEntry>(RevenueEntryModel, {
  notFoundMessage: 'Revenue entry not found',
  sanitizeCreate: (body) => ({
    propertyId: body.propertyId ? String(body.propertyId).trim() : undefined,
    type: TYPES.includes(String(body.type)) ? (body.type as RevenueEntry['type']) : 'booking_payout',
    amount: Number(body.amount) || 0,
    description: String(body.description || '').trim(),
    date: String(body.date || new Date().toISOString().slice(0, 10)),
  }),
  sanitizeUpdate: (body) => {
    const data: Partial<RevenueEntry> = {};
    if (body.propertyId !== undefined) data.propertyId = String(body.propertyId).trim();
    if (body.type !== undefined && TYPES.includes(String(body.type))) data.type = body.type as RevenueEntry['type'];
    if (body.amount !== undefined) data.amount = Number(body.amount);
    if (body.description !== undefined) data.description = String(body.description).trim();
    if (body.date !== undefined) data.date = String(body.date);
    return data;
  },
});
