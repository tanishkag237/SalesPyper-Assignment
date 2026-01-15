'use client';

import { useTenantData } from '@/hooks/useTenant';
import { CallLogsTable } from '@/components/modules/CallLogsTable';

export default function CallLogsPage() {
  const { callLogs } = useTenantData();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Call Logs</h2>
      <CallLogsTable callLogs={callLogs} />
    </div>
  );
}