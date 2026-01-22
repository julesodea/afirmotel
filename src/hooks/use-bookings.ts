'use client';

import { useBookingStore } from '@/store/booking-store';
import type { Booking } from '@/types/booking';

export function useBookings() {
  const bookings = useBookingStore((state) => state.bookings);
  const hasHydrated = useBookingStore((state) => state._hasHydrated);
  const addBooking = useBookingStore((state) => state.addBooking);
  const updateBooking = useBookingStore((state) => state.updateBooking);
  const deleteBooking = useBookingStore((state) => state.deleteBooking);

  const confirmBooking = (id: string) => {
    updateBooking(id, { status: 'confirmed' });
  };

  return {
    bookings,
    isLoading: !hasHydrated,
    addBooking,
    updateBooking: (params: { id: string; updates: Partial<Booking> }) => updateBooking(params.id, params.updates),
    deleteBooking,
    confirmBooking,
    getBookingById: (id: string) => bookings.find((b) => b.id === id),
  };
}
