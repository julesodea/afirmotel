import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-[var(--color-button-primary)] hover:bg-[var(--color-button-primary-hover)] text-white',
  secondary: 'bg-[var(--color-button-secondary)] hover:bg-[var(--color-button-secondary-hover)] text-gray-700',
  danger: 'bg-[var(--color-button-danger)] hover:bg-[var(--color-button-danger-hover)] text-white',
};

export function Button({
  variant = 'primary',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors';
  const disabledStyles = disabled ? 'opacity-60 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${disabledStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
