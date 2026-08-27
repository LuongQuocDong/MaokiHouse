import { apiFetch } from './api';
import type { Employee } from '../types';

export const employeeService = {
  list: (idToken: string) => apiFetch<Employee[]>('/employees', { idToken }),

  get: (idToken: string, id: string) => apiFetch<Employee>(`/employees/${id}`, { idToken }),

  create: (idToken: string, data: Partial<Employee>) =>
    apiFetch<Employee>('/employees', { method: 'POST', idToken, body: data }),

  update: (idToken: string, id: string, data: Partial<Employee>) =>
    apiFetch<Employee>(`/employees/${id}`, { method: 'PUT', idToken, body: data }),

  remove: (idToken: string, id: string) =>
    apiFetch<void>(`/employees/${id}`, { method: 'DELETE', idToken }),
};
