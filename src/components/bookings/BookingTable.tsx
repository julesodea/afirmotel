'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import type { Booking } from '@/types/booking';
import { formatDateRange } from '@/lib/date-utils';

interface BookingTableProps {
  bookings: Booking[];
}

export function BookingTable({ bookings }: BookingTableProps) {
  const router = useRouter();

  const handleRowClick = (bookingId: string) => {
    router.push(`/bookings/${bookingId}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Guest Name</TableHead>
          <TableHead>Hotel</TableHead>
          <TableHead>Room Type</TableHead>
          <TableHead>Dates</TableHead>
          <TableHead>Nights</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Total Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {bookings.map((booking) => (
          <TableRow key={booking.id} onClick={() => handleRowClick(booking.id)}>
            <TableCell className="font-medium">{booking.guestName}</TableCell>
            <TableCell>{booking.hotelName}</TableCell>
            <TableCell className="capitalize">{booking.roomType}</TableCell>
            <TableCell className="text-sm">
              {formatDateRange(booking.checkInDate, booking.checkOutDate)}
            </TableCell>
            <TableCell className="text-sm">
              {booking.numberOfNights} {booking.numberOfNights === 1 ? 'night' : 'nights'}
            </TableCell>
            <TableCell>
              <Badge variant={booking.status}>{booking.status}</Badge>
            </TableCell>
            <TableCell className="text-right font-semibold">
              ${booking.totalPrice.toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
