import React from 'react';

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  disabled?: boolean;
}

export const Select: React.FC<SelectProps> = ({ 
  value, 
  onChange, 
  options, 
  disabled 
}) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    disabled={disabled}
    className="px-3 py-1 border rounded disabled:bg-gray-100 disabled:cursor-not-allowed"
  >
    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
  </select>
);