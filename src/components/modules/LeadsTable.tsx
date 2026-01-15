'use client';

import React from 'react';
import { Lead, LeadStatus } from '@/types';
import { Table } from '@/components/ui/Table';
import { Select } from '@/components/ui/Select';
import { usePermissions } from '@/hooks/usePermissions';

interface LeadsTableProps {
  leads: Lead[];
  onStatusChange: (id: string, status: LeadStatus) => void;
}

export const LeadsTable: React.FC<LeadsTableProps> = ({ leads, onStatusChange }) => {
  const { canEdit } = usePermissions();

  if (leads.length === 0) {
    return <div className="text-center py-8 text-gray-500">No leads found</div>;
  }

  return (
    <Table  headers={['Name', 'Phone', 'Status']} >
      {leads.map(lead => (
        <tr key={lead.id} className="border-b hover:bg-gray-500 bg-black">
          <td className="px-4 py-2">{lead.name}</td>
          <td className="px-4 py-2">{lead.phone}</td>
          <td className="px-4 py-2">
            {canEdit ? (
              <Select
                value={lead.status}
                onChange={(status) => onStatusChange(lead.id, status as LeadStatus)}
                options={['New', 'Contacted', 'Qualified', 'Closed']}
              />
            ) : (
              <span className="px-3 py-1 bg-gray-700 rounded">{lead.status}</span>
            )}
          </td>
        </tr>
      ))}
    </Table>
  );
};