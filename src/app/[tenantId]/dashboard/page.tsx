'use client';

import { useTenantData } from '@/hooks/useTenant';

export default function DashboardPage() {
  const { leads, callLogs } = useTenantData();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-blue-800 p-6 rounded">
          <h3 className="text-lg font-semibold">Total Leads</h3>
          <p className="text-3xl font-bold">{leads.length}</p>
        </div>
        <div className="bg-green-800 p-6 rounded">
          <h3 className="text-lg font-semibold">Total Calls</h3>
          <p className="text-3xl font-bold">{callLogs.length}</p>
        </div>
        <div className="bg-purple-800 p-6 rounded">
          <h3 className="text-lg font-semibold">Qualified Leads</h3>
          <p className="text-3xl font-bold">
            {leads.filter(l => l.status === 'Qualified').length}
          </p>
        </div>
      </div>
    </div>
  );
}