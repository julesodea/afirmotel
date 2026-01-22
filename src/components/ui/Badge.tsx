import React from 'react';

type BadgeVariant = 'pending' | 'confirmed' | 'cancelled';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

const variantStyles: Record<BadgeVariant, string> = {
  pending: 'bg-orange-100 text-orange-700 border-orange-200',
  confirmed: 'bg-green-100 text-green-700 border-green-200',
  cancelled: 'bg-red-100 text-red-700 border-red-200',
};

export function Badge({ variant, children }: BadgeProps) {
  return (
    <span
      className={`${variantStyles[variant]} px-3 py-1 rounded-2xl text-xs font-semibold uppercase inline-block`}
    >
      {children}
    </span>
  );
}
