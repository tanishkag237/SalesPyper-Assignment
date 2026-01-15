import React from 'react';

interface InputProps {
  type: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({ 
  type, 
  placeholder, 
  value, 
  onChange, 
  required 
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    required={required}
    className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
);