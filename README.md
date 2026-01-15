# SalesPyper - Multi-Tenant Sales Dashboard

A Next.js-based multi-tenant sales management platform with role-based access control (RBAC), allowing multiple organizations to manage their leads, call logs, and settings in isolated environments.

## 🏗️ Project Structure

```
salespyper/
├── src/
│   ├── app/                          # Next.js 13+ App Router
│   │   ├── page.tsx                  # Login page (root)
│   │   ├── layout.tsx                # Root layout with AuthProvider
│   │   └── [tenantId]/               # Dynamic tenant routing
│   │       ├── layout.tsx            # Tenant layout (Header + Sidebar)
│   │       ├── dashboard/            # Dashboard page
│   │       ├── leads/                # Leads management
│   │       ├── call-logs/            # Call logs view
│   │       └── settings/             # Admin-only settings
│   │
│   ├── components/
│   │   ├── auth/
│   │   │   └── LoginForm.tsx         # Authentication form
│   │   ├── layout/
│   │   │   ├── Header.tsx            # Top header with tenant info
│   │   │   └── Sidebar.tsx           # Navigation sidebar
│   │   ├── modules/
│   │   │   ├── LeadsTable.tsx        # Leads table with status management
│   │   │   └── CallLogsTable.tsx     # Call logs display
│   │   └── ui/                       # Reusable UI components
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Select.tsx
│   │       └── Table.tsx
│   │
│   ├── hooks/
│   │   ├── useAuth.ts                # Authentication hook
│   │   ├── usePermissions.ts         # RBAC permissions hook
│   │   └── useTenant.ts              # Tenant-scoped data hook
│   │
│   ├── lib/
│   │   ├── auth.tsx                  # Auth context and provider
│   │   ├── data.ts                   # Mock data (users, leads, call logs)
│   │   └── rbac.ts                   # Role-based access control utilities
│   │
│   └── types/
│       └── index.ts                  # TypeScript type definitions
│
├── public/                           # Static assets
└── [config files]                    # Next.js, TypeScript, ESLint, etc.
```

## 🏢 Multi-Tenancy Approach

### URL-Based Tenant Isolation
The application uses **dynamic routing** with `[tenantId]` to isolate tenants:

```
/{tenantId}/dashboard       → Organization A's dashboard
/{tenantId}/leads          → Organization A's leads
/{tenantId}/call-logs      → Organization A's call logs
/{tenantId}/settings       → Organization A's settings
```

**Example URLs:**
- `http://localhost:3000/org-a/dashboard` (Organization A)
- `http://localhost:3000/org-b/dashboard` (Organization B)

### Data Isolation
1. **Tenant Context**: On login, the user's `tenantId` is stored in the auth context
2. **Data Filtering**: All queries filter data by `tenantId` to ensure users only access their organization's data
3. **Route Guards**: The `[tenantId]/layout.tsx` wraps all tenant routes with authentication

### Implementation Details

**Authentication Flow:**
```typescript
// 1. User logs in with email/password
// 2. System finds user and associated tenant
// 3. Sets user + tenant in React Context
// 4. Redirects to /{tenantId}/dashboard
```

**Data Access Pattern:**
```typescript
// useTenantData hook filters data by tenant
const { leads, callLogs } = useTenantData();

// In useTenant.ts:
useEffect(() => {
  if (tenant) {
    setLeads(LEADS.filter(l => l.tenantId === tenant.id));
    setCallLogs(CALL_LOGS.filter(c => c.tenantId === tenant.id));
  }
}, [tenant]);
```

## 🔐 Role-Based Access Control (RBAC)

### Roles
- **Admin**: Full access including settings and lead status editing
- **Agent**: View-only access, cannot edit lead status or access settings

### Permission Implementation
```typescript
// usePermissions.ts
export const usePermissions = () => {
  const { user } = useAuth();
  
  return {
    canEdit: user?.role === 'Admin',
    canAccessSettings: user?.role === 'Admin',
    isAdmin: user?.role === 'Admin',
    isAgent: user?.role === 'Agent'
  };
};
```

### Conditional Rendering
```typescript
// In LeadsTable.tsx
{canEdit ? (
  <Select
    value={lead.status}
    onChange={(status) => onStatusChange(lead.id, status)}
    options={['New', 'Contacted', 'Qualified', 'Closed']}
  />
) : (
  <span>{lead.status}</span>
)}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm, yarn, pnpm, or bun package manager

### Installation
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the login page.

### Demo Credentials

**Organization A:**
- Admin: `alice@orga.com` / `admin123`
- Agent: `bob@orga.com` / `agent123`

**Organization B:**
- Admin: `carol@orgb.com` / `admin123`
- Agent: `david@orgb.com` / `agent123`

## ⚡ Optimization Notes

### Performance Optimizations

1. **Client-Side State Management**
   - Used React Context API for auth state to avoid prop drilling
   - Minimal re-renders with proper context separation

2. **Dynamic Route Optimization**
   - Next.js dynamic routing (`[tenantId]`) provides efficient tenant isolation
   - Single layout component shared across all tenant routes

3. **Data Filtering**
   - Client-side filtering with `useTenantData` hook
   - Data cached in state to prevent redundant filtering

4. **Component Architecture**
   - Modular, reusable UI components (`Button`, `Select`, `Table`)
   - Separation of concerns: UI components, business logic hooks, and page components

### Scalability Considerations

**Current Implementation (Demo):**
- In-memory data storage
- Client-side data filtering
- No database persistence

**Production Recommendations:**
1. **Database Integration**: Replace mock data with PostgreSQL/MongoDB
2. **Server-Side Rendering**: Use Next.js Server Components for data fetching
3. **API Routes**: Create `/api` endpoints for CRUD operations
4. **Authentication**: Implement NextAuth.js or similar for secure auth
5. **Middleware**: Add route protection at the middleware level
6. **Database Query Optimization**: 
   - Add indexes on `tenantId` for fast filtering
   - Use database-level tenant isolation
7. **Caching**: Implement Redis for frequently accessed data
8. **State Management**: Consider Zustand or Redux for complex state

### Code Quality

- **TypeScript**: Full type safety across the application
- **Component Patterns**: Client components marked with `'use client'`
- **Hooks**: Custom hooks for reusable logic (`useAuth`, `usePermissions`, `useTenant`)
- **Separation of Concerns**: Clear distinction between UI, logic, and data layers

## 🔧 Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Font**: Inter (via next/font)

## 📝 Future Enhancements

- [ ] Database integration (Prisma + PostgreSQL)
- [ ] Server-side data fetching with Server Components
- [ ] API routes for CRUD operations
- [ ] Real authentication (NextAuth.js)
- [ ] Email notifications
- [ ] Advanced analytics dashboard
- [ ] Export functionality (CSV, PDF)
- [ ] Search and advanced filtering
- [ ] Activity logs and audit trails
- [ ] User management UI for admins

## 📄 License

This project is part of the SalesPyper assignment.
