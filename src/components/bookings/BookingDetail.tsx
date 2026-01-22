'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import type { Booking } from '@/types/booking';
import { formatDateForDisplay, formatDateRange } from '@/lib/date-utils';

interface BookingDetailProps {
  booking: Booking;
  onCancel: (id: string) => void;
  onConfirm?: (id: string) => void;
}

export function BookingDetail({ booking, onCancel, onConfirm }: BookingDetailProps) {
  const router = useRouter();
  const [showCancelConfirm, setShowCancelConfirm] = React.useState(false);

  const handleCancelClick = () => {
    setShowCancelConfirm(true);
  };

  const handleConfirmCancel = () => {
    onCancel(booking.id);
    setShowCancelConfirm(false);
  };

  const handleConfirmBooking = () => {
    if (onConfirm) {
      onConfirm(booking.id);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Details</h1>
          <p className="text-sm text-gray-600">Booking ID: {booking.id}</p>
        </div>
        <Badge variant={booking.status}>{booking.status}</Badge>
      </div>

      <Card className="mb-6 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Guest Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Name</p>
            <p className="font-medium text-gray-900">{booking.guestName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Email</p>
            <p className="font-medium text-gray-900">{booking.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Phone</p>
            <p className="font-medium text-gray-900">{booking.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Number of Guests</p>
            <p className="font-medium text-gray-900">{booking.numberOfGuests}</p>
          </div>
        </div>
      </Card>

      <Card className="mb-6 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Hotel</p>
            <p className="font-medium text-gray-900">{booking.hotelName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Room Type</p>
            <p className="font-medium text-gray-900 capitalize">{booking.roomType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Check-in Date</p>
            <p className="font-medium text-gray-900">{formatDateForDisplay(booking.checkInDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Check-out Date</p>
            <p className="font-medium text-gray-900">{formatDateForDisplay(booking.checkOutDate)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Duration</p>
            <p className="font-medium text-gray-900">
              {booking.numberOfNights} {booking.numberOfNights === 1 ? 'night' : 'nights'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Date Range</p>
            <p className="font-medium text-gray-900">
              {formatDateRange(booking.checkInDate, booking.checkOutDate)}
            </p>
          </div>
        </div>

        {booking.specialRequests && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Special Requests</p>
            <p className="text-gray-900">{booking.specialRequests}</p>
          </div>
        )}
      </Card>

      <Card className="mb-6 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Price Breakdown</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-700">Price per Night</span>
            <span className="font-medium text-gray-900">${booking.pricePerNight}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Number of Nights</span>
            <span className="font-medium text-gray-900">{booking.numberOfNights}</span>
          </div>
          <div className="flex justify-between pt-3">
            <span className="text-lg font-semibold text-gray-900">Total Price</span>
            <span className="text-2xl font-bold text-gray-900">
              ${booking.totalPrice.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      <Card className="mb-6 p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Booking Metadata</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1">Created At</p>
            <p className="text-gray-900">{formatDateForDisplay(booking.createdAt)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Last Updated</p>
            <p className="text-gray-900">{formatDateForDisplay(booking.updatedAt)}</p>
          </div>
        </div>
      </Card>

      <div className="flex gap-4">
        <Button variant="secondary" onClick={() => router.push('/bookings')}>
          Back to Bookings
        </Button>
        {booking.status === 'pending' && onConfirm && (
          <Button variant="primary" onClick={handleConfirmBooking}>
            Confirm Booking
          </Button>
        )}
        {booking.status !== 'cancelled' && (
          <Button variant="danger" onClick={handleCancelClick}>
            Cancel Booking
          </Button>
        )}
      </div>

      {showCancelConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="max-w-md p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Cancel Booking?</h3>
            <p className="text-gray-700 mb-6">
              Are you sure you want to cancel this booking? This action cannot be undone.
            </p>
            <div className="flex gap-4">
              <Button variant="danger" onClick={handleConfirmCancel}>
                Yes, Cancel Booking
              </Button>
              <Button variant="secondary" onClick={() => setShowCancelConfirm(false)}>
                No, Keep Booking
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
