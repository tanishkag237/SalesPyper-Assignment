'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export const Header: React.FC = () => {
  const { user, tenant, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="bg-slate-900 border-b px-6 py-4 flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold">{tenant?.name}</h1>
        <p className="text-sm text-gray-600">{user?.name} ({user?.role})</p>
      </div>
      <Button onClick={handleLogout} variant="secondary">Logout</Button>
    </div>
  );
};