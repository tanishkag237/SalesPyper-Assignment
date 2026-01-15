'use client';

import { useState } from 'react';
import { useTenantData } from '@/hooks/useTenant';
import { LeadsTable } from '@/components/modules/LeadsTable';
import { Select } from '@/components/ui/Select';
import { LeadStatus } from '@/types';

export default function LeadsPage() {
  const { getLeads, updateLeadStatus } = useTenantData();
  const [statusFilter, setStatusFilter] = useState<LeadStatus | 'All'>('All');

  const leads = statusFilter === 'All' ? getLeads() : getLeads(statusFilter);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Leads</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-200">Filter by status:</span>
          <Select
            value={statusFilter}
            onChange={(val) => setStatusFilter(val as LeadStatus | 'All')}
            options={['All', 'New', 'Contacted', 'Qualified', 'Closed']}
          />
        </div>
      </div>
      <LeadsTable leads={leads} onStatusChange={updateLeadStatus} />
    </div>
  );
}