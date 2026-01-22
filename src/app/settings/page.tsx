import React from 'react';
import { Card } from '@/components/ui/Card';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IconSettings } from '@/components/icons/IconSettings';

export default function SettingsPage() {
  return (
    <div>
      <Breadcrumbs icon={IconSettings} pageName="Settings" />

      <div className="space-y-1 mb-10 mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Settings</h1>
        <p className="text-gray-500 text-base">Manage your application settings</p>
      </div>

      <Card className="p-8">
        <div className="text-center py-16">
          <p className="text-lg text-gray-700 mb-3">Settings Page</p>
          <p className="text-sm text-gray-500">
            Settings functionality coming soon. This is a placeholder page.
          </p>
        </div>
      </Card>
    </div>
  );
}
