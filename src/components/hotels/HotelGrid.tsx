import React from 'react';
import { HotelCard } from './HotelCard';
import type { Hotel } from '@/types/hotel';

interface HotelGridProps {
  hotels: Hotel[];
}

export function HotelGrid({ hotels }: HotelGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {hotels.map((hotel) => (
        <HotelCard key={hotel.id} hotel={hotel} />
      ))}
    </div>
  );
}
