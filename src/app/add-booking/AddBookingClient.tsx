'use client';

import { useSearchParams } from 'next/navigation';
import { BookingForm } from '@/components/bookings/BookingForm';

export function AddBookingClient() {
    const searchParams = useSearchParams();
    const hotelId = searchParams.get('hotelId') || undefined;

    return <BookingForm prefilledHotelId={hotelId} />;
}