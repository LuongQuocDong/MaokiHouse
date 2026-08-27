import { apiFetch } from './api';

export interface VerifyResult {
  uid: string;
  email?: string;
  admin: boolean;
}

export const authService = {
  verify: (idToken: string) =>
    apiFetch<VerifyResult>('/auth/verify', { method: 'POST', idToken }),
};
