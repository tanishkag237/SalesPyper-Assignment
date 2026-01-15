'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { usePermissions } from '@/hooks/usePermissions';
import { useAuth } from '@/hooks/useAuth';

export const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const { canAccessSettings } = usePermissions();

  // Extract tenantId from the current pathname (e.g., /org-a/dashboard -> org-a)
  const tenantId = pathname.split('/')[1] || '';

  const links = [
    { href: `/${tenantId}/dashboard`, label: 'Dashboard' },
    { href: `/${tenantId}/leads`, label: 'Leads' },
    { href: `/${tenantId}/call-logs`, label: 'Call Logs' },
  ];

  if (canAccessSettings) {
    links.push({ href: `/${tenantId}/settings`, label: 'Settings' });
  }

  return (
    <div className="w-64 bg-gray-800 text-white p-4 min-h-screen">
      <h2 className="text-xl font-bold mb-6">Sales Dashboard</h2>
      <nav className="space-y-2">
        {links.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`block px-4 py-2 rounded ${
              pathname === link.href 
                ? 'bg-blue-600' 
                : 'hover:bg-gray-700'
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};