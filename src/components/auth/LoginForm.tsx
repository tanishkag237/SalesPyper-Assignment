'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export const LoginForm: React.FC = () => {
  const { login, tenant } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) {
      // Wait for tenant to be set, then redirect
      setTimeout(() => {
        if (tenant) {
          router.push(`/${tenant.id}/dashboard`);
        }
      }, 0);
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-black p-8 rounded-lg shadow-md w-96">
      <h1 className="text-2xl text-white font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={setEmail}
            required
          />
        </div>
        <div>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={setPassword}
            required
          />
        </div>
        {error && (
          <div className="text-red-600 text-sm">{error}</div>
        )}
        <Button type="submit" variant="primary" >Login</Button>
      </form>

      <div className="mt-8 pt-6 border-t">
        <p className="text-sm text-gray-200 mb-3">Demo Credentials:</p>
        <div className="space-y-2 bg-gray-700 text-xs">
          <div className=" p-2 rounded">
            <strong>Org A Admin:</strong> alice@orga.com / admin123
          </div>
          <div className=" p-2 rounded">
            <strong>Org A Agent:</strong> bob@orga.com / agent123
          </div>
          <div className=" p-2 rounded">
            <strong>Org B Admin:</strong> carol@orgb.com / admin123
          </div>
          <div className=" p-2 rounded">
            <strong>Org B Agent:</strong> david@orgb.com / agent123
          </div>
        </div>
      </div>
    </div>
  );
};