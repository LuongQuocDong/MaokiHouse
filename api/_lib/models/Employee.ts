import { createHostScopedModel } from './firestoreCrud';

export interface Employee {
  id: string;
  hostId: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

export const EmployeeModel = createHostScopedModel<Employee>('employees');
