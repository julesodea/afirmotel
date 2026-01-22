import { Suspense } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IconPlus } from '@/components/icons/IconPlus';
import { AddBookingClient } from './AddBookingClient';

export default function AddBookingPage() {
  return (
    <div>
      <Breadcrumbs icon={IconPlus} pageName="Add Booking" />

      <div className="space-y-1 mb-10 mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Add New Booking
        </h1>
        <p className="text-gray-500 text-base">
          Fill in the details below to create a new booking
        </p>
      </div>

      <div className="max-w-5xl">
        <Suspense fallback={null}>
          <AddBookingClient />
        </Suspense>
      </div>
    </div>
  );
}