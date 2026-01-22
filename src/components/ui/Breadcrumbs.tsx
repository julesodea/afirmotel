import React from 'react';
import Link from 'next/link';
import { IconDashboard } from '@/components/icons/IconDashboard';

interface BreadcrumbsProps {
  icon?: React.ComponentType<{ className?: string }>;
  pageName: string;
}

export function Breadcrumbs({ icon: Icon, pageName }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-3 text-gray-400 text-sm font-medium">
      <Link
        href="/"
        className="text-gray-500 hover:text-gray-700 transition-colors cursor-pointer"
      >
        <IconDashboard className="w-5 h-5" />
      </Link>
      <span>/</span>
      {Icon && (
        <>
          <Icon className="w-5 h-5 text-gray-500" />
          <span>/</span>
        </>
      )}
      <span className="text-gray-900">{pageName}</span>
    </div>
  );
}
