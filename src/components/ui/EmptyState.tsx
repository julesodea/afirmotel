import React from 'react';
import { IconInbox } from '@/components/icons/IconInbox';

interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
        <IconInbox className="w-10 h-10 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
      {description && (
        <p className="text-base text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      )}
      {action && <div className="mt-8">{action}</div>}
    </div>
  );
}
