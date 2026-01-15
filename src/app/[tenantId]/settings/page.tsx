'use client';

import { useAuth } from '@/hooks/useAuth';

export default function SettingsPage() {
  const { user, tenant } = useAuth();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className="bg-black border rounded p-6">
        <h3 className="text-lg font-semibold mb-4">Organization Settings</h3>
        <div className="space-y-3">
          <div>
            <span className="text-gray-600">Organization:</span>{' '}
            <strong>{tenant?.name}</strong>
          </div>
          <div>
            <span className="text-gray-600">Tenant ID:</span>{' '}
            <strong>{tenant?.id}</strong>
          </div>
          <div>
            <span className="text-gray-600">Your Role:</span>{' '}
            <strong>{user?.role}</strong>
          </div>
        </div>
        <p className="mt-6 text-sm text-gray-500">
          This page is only accessible to Admins.
        </p>
      </div>
    </div>
  );
}