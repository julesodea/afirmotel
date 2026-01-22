import React from 'react';
import { Card } from '@/components/ui/Card';
import type { Booking } from '@/types/booking';

interface BookingStatsProps {
  bookings: Booking[];
}

export function BookingStats({ bookings }: BookingStatsProps) {
  const totalBookings = bookings.length;
  const confirmedBookings = bookings.filter((b) => b.status === 'confirmed').length;
  const pendingBookings = bookings.filter((b) => b.status === 'pending').length;
  const cancelledBookings = bookings.filter((b) => b.status === 'cancelled').length;
  const totalRevenue = bookings
    .filter((b) => b.status !== 'cancelled')
    .reduce((sum, b) => sum + b.totalPrice, 0);

  const stats = [
    {
      label: 'Total Bookings',
      value: totalBookings,
    },
    {
      label: 'Confirmed',
      value: confirmedBookings,
    },
    {
      label: 'Pending',
      value: pendingBookings,
    },
    {
      label: 'Cancelled',
      value: cancelledBookings,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
      {stats.map((stat) => (
        <Card key={stat.label} className="p-8">
          <div className="text-center">
            <p className="text-sm font-medium text-gray-500 mb-2">{stat.label}</p>
            <p className="text-3xl font-bold tracking-tight text-gray-900">{stat.value}</p>
          </div>
        </Card>
      ))}
      <Card className="p-8">
        <div className="text-center">
          <p className="text-sm font-medium text-gray-500 mb-2">Total Revenue</p>
          <p className="text-3xl font-bold tracking-tight text-gray-900">${totalRevenue.toLocaleString()}</p>
        </div>
      </Card>
    </div>
  );
}
