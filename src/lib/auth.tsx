'use client';

import React, { createContext, useState, ReactNode } from 'react';
import { User, Tenant } from '@/types';
import { USERS, TENANTS } from './data';

interface AuthContextType {
  user: User | null;
  tenant: Tenant | null;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [tenant, setTenant] = useState<Tenant | null>(null);

  const login = (email: string, password: string): boolean => {
    const foundUser = USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      setTenant(TENANTS.find(t => t.id === foundUser.tenantId) || null);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setTenant(null);
  };

  return (
    <AuthContext.Provider value={{ user, tenant, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};