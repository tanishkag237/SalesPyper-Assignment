import React from 'react';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  type = 'button' 
}) => (
  <button
    type={type}
    onClick={onClick}
    className={`px-4 py-2 rounded font-medium ${
      variant === 'primary' 
        ? 'bg-blue-600 text-white hover:bg-blue-700' 
        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
    }`}
  >
    {children}
  </button>
);