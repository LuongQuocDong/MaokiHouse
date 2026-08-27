import { PropertyModel } from '../models/Property';
import type { Property } from '../models/Property';
import { createCrudController } from './crudControllerFactory';

export const propertyController = createCrudController<Property>(PropertyModel, {
  notFoundMessage: 'Property not found',
  sanitizeCreate: (body) => ({
    title: String(body.title || '').trim(),
    address: String(body.address || '').trim(),
    status: body.status === 'inactive' ? 'inactive' : 'active',
    imageURLs: Array.isArray(body.imageURLs) ? body.imageURLs : [],
    basePrice: Number(body.basePrice) || 0,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }),
  sanitizeUpdate: (body) => {
    const data: Partial<Property> = { updatedAt: Date.now() };
    if (body.title !== undefined) data.title = String(body.title).trim();
    if (body.address !== undefined) data.address = String(body.address).trim();
    if (body.status !== undefined) data.status = body.status === 'inactive' ? 'inactive' : 'active';
    if (Array.isArray(body.imageURLs)) data.imageURLs = body.imageURLs as string[];
    if (body.basePrice !== undefined) data.basePrice = Number(body.basePrice);
    return data;
  },
});
