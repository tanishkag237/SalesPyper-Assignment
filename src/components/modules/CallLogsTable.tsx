'use client';

import React from 'react';
import { CallLog } from '@/types';
import { Table } from '@/components/ui/Table';

interface CallLogsTableProps {
  callLogs: CallLog[];
}

export const CallLogsTable: React.FC<CallLogsTableProps> = ({ callLogs }) => {
  if (callLogs.length === 0) {
    return <div className="text-center py-8 text-gray-500">No call logs found</div>;
  }

  return (
    <Table headers={['Lead Name', 'Date/Time', 'Duration', 'Outcome']}>
      {callLogs.map(log => (
        <tr key={log.id} className="border-b bg-black hover:bg-gray-50">
          <td className="px-4 py-2">{log.leadName}</td>
          <td className="px-4 py-2">{new Date(log.date).toLocaleString()}</td>
          <td className="px-4 py-2">{log.duration}s</td>
          <td className="px-4 py-2">
            <span className={`px-2 py-1 rounded text-sm ${
              log.outcome === 'Answered' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {log.outcome}
            </span>
          </td>
        </tr>
      ))}
    </Table>
  );
};