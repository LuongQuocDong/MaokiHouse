import { EmployeeModel } from '../models/Employee';
import type { Employee } from '../models/Employee';
import { createCrudController } from './crudControllerFactory';

export const employeeController = createCrudController<Employee>(EmployeeModel, {
  notFoundMessage: 'Employee not found',
  sanitizeCreate: (body) => ({
    name: String(body.name || '').trim(),
    role: String(body.role || '').trim(),
    email: String(body.email || '').trim(),
    phone: String(body.phone || '').trim(),
    status: body.status === 'inactive' ? 'inactive' : 'active',
  }),
  sanitizeUpdate: (body) => {
    const data: Partial<Employee> = {};
    if (body.name !== undefined) data.name = String(body.name).trim();
    if (body.role !== undefined) data.role = String(body.role).trim();
    if (body.email !== undefined) data.email = String(body.email).trim();
    if (body.phone !== undefined) data.phone = String(body.phone).trim();
    if (body.status !== undefined) data.status = body.status === 'inactive' ? 'inactive' : 'active';
    return data;
  },
});
