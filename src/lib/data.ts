import { User, Tenant, Lead, CallLog } from '@/types';

export const TENANTS: Tenant[] = [
  { id: 'org-a', name: 'Organization A' },
  { id: 'org-b', name: 'Organization B' }
];

export const USERS: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@orga.com', password: 'admin123', role: 'Admin', tenantId: 'org-a' },
  { id: '2', name: 'Bob Smith', email: 'bob@orga.com', password: 'agent123', role: 'Agent', tenantId: 'org-a' },
  { id: '3', name: 'Carol White', email: 'carol@orgb.com', password: 'admin123', role: 'Admin', tenantId: 'org-b' },
  { id: '4', name: 'David Brown', email: 'david@orgb.com', password: 'agent123', role: 'Agent', tenantId: 'org-b' }
];

export const LEADS: Lead[] = [
  { id: '1', name: 'John Doe', phone: '+1234567890', status: 'New', tenantId: 'org-a' },
  { id: '2', name: 'Jane Smith', phone: '+1234567891', status: 'Contacted', tenantId: 'org-a' },
  { id: '3', name: 'Bob Johnson', phone: '+1234567892', status: 'Qualified', tenantId: 'org-a' },
  { id: '4', name: 'Alice Brown', phone: '+1234567893', status: 'New', tenantId: 'org-b' },
  { id: '5', name: 'Charlie Wilson', phone: '+1234567894', status: 'Closed', tenantId: 'org-b' }
];

export const CALL_LOGS: CallLog[] = [
  { id: '1', leadName: 'John Doe', date: '2024-01-15T10:30:00', duration: 180, outcome: 'Answered', tenantId: 'org-a' },
  { id: '2', leadName: 'Jane Smith', date: '2024-01-15T14:20:00', duration: 0, outcome: 'No Answer', tenantId: 'org-a' },
  { id: '3', leadName: 'Bob Johnson', date: '2024-01-16T09:15:00', duration: 240, outcome: 'Answered', tenantId: 'org-a' },
  { id: '4', leadName: 'Alice Brown', date: '2024-01-16T11:00:00', duration: 120, outcome: 'Voicemail', tenantId: 'org-b' },
  { id: '5', leadName: 'Charlie Wilson', date: '2024-01-16T15:45:00', duration: 300, outcome: 'Answered', tenantId: 'org-b' }
];