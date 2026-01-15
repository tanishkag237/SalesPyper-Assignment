export type Role = 'Admin' | 'Agent';
export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Closed';
export type CallOutcome = 'Answered' | 'No Answer' | 'Voicemail' | 'Busy';

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  tenantId: string;
}

export interface Tenant {
  id: string;
  name: string;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  status: LeadStatus;
  tenantId: string;
}

export interface CallLog {
  id: string;
  leadName: string;
  date: string;
  duration: number;
  outcome: CallOutcome;
  tenantId: string;
}

