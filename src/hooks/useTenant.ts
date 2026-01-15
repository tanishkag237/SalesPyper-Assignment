'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { LEADS, CALL_LOGS } from '@/lib/data';
import { Lead, CallLog, LeadStatus } from '@/types';

export const useTenantData = () => {
  const { tenant } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [callLogs, setCallLogs] = useState<CallLog[]>([]);

  useEffect(() => {
    if (tenant) {
      setLeads(LEADS.filter(l => l.tenantId === tenant.id));
      setCallLogs(CALL_LOGS.filter(c => c.tenantId === tenant.id));
    }
  }, [tenant]);

  const getLeads = (statusFilter?: LeadStatus): Lead[] => {
    if (!statusFilter) return leads;
    return leads.filter(l => l.status === statusFilter);
  };

  const updateLeadStatus = (leadId: string, status: LeadStatus) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, status } : lead
      )
    );
    // Also update the global LEADS array
    const lead = LEADS.find(l => l.id === leadId);
    if (lead) {
      lead.status = status;
    }
  };

  return { leads, callLogs, getLeads, updateLeadStatus };
};