import { Role } from '@/types';

export const canEdit = (role: Role): boolean => role === 'Admin';
export const canAccessSettings = (role: Role): boolean => role === 'Admin';