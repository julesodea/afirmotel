'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { useBookings } from '@/hooks/use-bookings';
import { BookingDetail } from '@/components/bookings/BookingDetail';

export default function BookingDetailPage() {
  const params = useParams();
  const { bookings, confirmBooking, updateBooking } = useBookings();

  const bookingId = params.id as string;
  const booking = bookings.find((b) => b.id === bookingId);

  const handleCancel = (id: string) => {
    updateBooking({ id, updates: { status: 'cancelled' } });
  };

  const handleConfirm = (id: string) => {
    confirmBooking(id);
  };

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <h1 className="text-2xl font-bold text-gray-900 mb-3">Booking Not Found</h1>
        <p className="text-gray-600 mb-8">
          The booking you're looking for doesn't exist or has been removed.
        </p>
        <a
          href="/bookings"
          className="text-gray-600 font-medium hover:text-gray-900"
        >
          Back to Bookings
        </a>
      </div>
    );
  }

  return <BookingDetail booking={booking} onCancel={handleCancel} onConfirm={handleConfirm} />;
}
