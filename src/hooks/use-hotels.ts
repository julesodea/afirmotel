'use client';

import { useHotelStore } from '@/store/hotel-store';

export function useHotels() {
  const hotels = useHotelStore((state) => state.hotels);

  return {
    hotels,
    isLoading: false,
    getHotelById: (id: string) => hotels.find((h) => h.id === id),
  };
}
