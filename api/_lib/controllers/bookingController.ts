import { BookingModel } from '../models/Booking';
import type { Booking } from '../models/Booking';
import { createCrudController } from './crudControllerFactory';

const SOURCES = ['airbnb', 'booking', 'agoda', 'direct'];
const STATUSES = ['confirmed', 'pending', 'cancelled'];

export const bookingController = createCrudController<Booking>(BookingModel, {
  notFoundMessage: 'Booking not found',
  sanitizeCreate: (body) => ({
    propertyId: String(body.propertyId || '').trim(),
    guestName: String(body.guestName || '').trim(),
    source: SOURCES.includes(String(body.source)) ? (body.source as Booking['source']) : 'direct',
    checkIn: String(body.checkIn || ''),
    checkOut: String(body.checkOut || ''),
    status: STATUSES.includes(String(body.status)) ? (body.status as Booking['status']) : 'pending',
    payoutAmount: Number(body.payoutAmount) || 0,
    createdAt: Date.now(),
  }),
  sanitizeUpdate: (body) => {
    const data: Partial<Booking> = {};
    if (body.propertyId !== undefined) data.propertyId = String(body.propertyId).trim();
    if (body.guestName !== undefined) data.guestName = String(body.guestName).trim();
    if (body.source !== undefined && SOURCES.includes(String(body.source))) data.source = body.source as Booking['source'];
    if (body.checkIn !== undefined) data.checkIn = String(body.checkIn);
    if (body.checkOut !== undefined) data.checkOut = String(body.checkOut);
    if (body.status !== undefined && STATUSES.includes(String(body.status))) data.status = body.status as Booking['status'];
    if (body.payoutAmount !== undefined) data.payoutAmount = Number(body.payoutAmount);
    return data;
  },
});
