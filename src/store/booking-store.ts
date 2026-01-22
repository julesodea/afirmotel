import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Booking } from '@/types/booking';
import { ROOM_PRICES } from '@/lib/constants';

interface BookingStore {
  bookings: Booking[];
  _hasHydrated: boolean;
  setHasHydrated: (state: boolean) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt' | 'numberOfNights' | 'totalPrice'>) => void;
  updateBooking: (id: string, updates: Partial<Booking>) => void;
  deleteBooking: (id: string) => void;
  getBookingById: (id: string) => Booking | undefined;
}

const calculateNumberOfNights = (checkIn: string, checkOut: string): number => {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const diffTime = Math.abs(checkOutDate.getTime() - checkInDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

const SAMPLE_BOOKINGS: Booking[] = [
];

export const useBookingStore = create<BookingStore>()(
  persist(
    (set, get) => ({
      bookings: SAMPLE_BOOKINGS,
      _hasHydrated: false,

      setHasHydrated: (state) => {
        set({ _hasHydrated: state });
      },

      addBooking: (booking) => {
        const numberOfNights = calculateNumberOfNights(booking.checkInDate, booking.checkOutDate);
        const pricePerNight = booking.pricePerNight || ROOM_PRICES[booking.roomType];
        const totalPrice = numberOfNights * pricePerNight;

        const newBooking: Booking = {
          ...booking,
          id: crypto.randomUUID(),
          numberOfNights,
          pricePerNight,
          totalPrice,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        set((state) => ({
          bookings: [...state.bookings, newBooking],
        }));
      },

      updateBooking: (id, updates) => {
        set((state) => ({
          bookings: state.bookings.map((booking) => {
            if (booking.id !== id) return booking;

            const updated = { ...booking, ...updates };

            // Recalculate if dates or room type changed
            if (updates.checkInDate || updates.checkOutDate) {
              updated.numberOfNights = calculateNumberOfNights(
                updated.checkInDate,
                updated.checkOutDate
              );
            }

            if (updates.roomType || updates.checkInDate || updates.checkOutDate) {
              updated.pricePerNight = ROOM_PRICES[updated.roomType];
              updated.totalPrice = updated.numberOfNights * updated.pricePerNight;
            }

            updated.updatedAt = new Date().toISOString();

            return updated;
          }),
        }));
      },

      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((booking) => booking.id !== id),
        }));
      },

      getBookingById: (id) => {
        return get().bookings.find((booking) => booking.id === id);
      },
    }),
    {
      name: 'booking-storage', // unique name for localStorage key
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);
