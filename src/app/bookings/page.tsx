'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useBookings } from '@/hooks/use-bookings';
import { BookingStats } from '@/components/bookings/BookingStats';
import { BookingTable } from '@/components/bookings/BookingTable';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/Button';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IconList } from '@/components/icons/IconList';

type ViewMode = 'table' | 'calendar';

export default function BookingsPage() {
  const { bookings, isLoading } = useBookings();
  const router = useRouter();
  const [viewMode, setViewMode] = useState<ViewMode>('table');

  return (
    <div>
      <Breadcrumbs icon={IconList} pageName="Bookings" />

      <div className="space-y-1 mb-10 mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Bookings</h1>
        <p className="text-gray-500 text-base">View and manage all your hotel bookings</p>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-96">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-600">Loading bookings...</p>
        </div>
      ) : bookings.length === 0 ? (
        <EmptyState
          title="No bookings yet"
          description="You haven't made any bookings yet. Browse our hotels to get started."
          action={
            <Button onClick={() => router.push('/hotels')}>
              Browse Hotels
            </Button>
          }
        />
      ) : (
        <>
          <BookingStats bookings={bookings} />
          <BookingTable bookings={bookings} />
        </>
      )}
    </div>
  );
}
