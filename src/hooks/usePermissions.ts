'use client';

import { useAuth } from './useAuth';

export const usePermissions = () => {
  const { user } = useAuth();
  
  return {
    canEdit: user?.role === 'Admin',
    canAccessSettings: user?.role === 'Admin',
    isAdmin: user?.role === 'Admin',
    isAgent: user?.role === 'Agent'
  };
};