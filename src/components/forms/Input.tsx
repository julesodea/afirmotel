import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export function Input({ error, className = '', ...props }: InputProps) {
  const baseStyles = 'w-full rounded-2xl px-4 py-2.5 border border-gray-200 focus:outline-none focus:ring-2 transition-all duration-200';
  const errorStyles = error
    ? 'focus:ring-red-400'
    : 'focus:ring-gray-200';
  const disabledStyles = props.disabled ? 'bg-gray-50 cursor-not-allowed opacity-60' : 'bg-white';

  return (
    <input
      className={`${baseStyles} ${errorStyles} ${disabledStyles} ${className}`}
      {...props}
    />
  );
}
