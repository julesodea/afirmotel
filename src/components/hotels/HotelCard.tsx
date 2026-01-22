'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import type { Hotel } from '@/types/hotel';

interface HotelCardProps {
  hotel: Hotel;
}

export function HotelCard({ hotel }: HotelCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/add-booking?hotelId=${hotel.id}`);
  };

  return (
    <Card interactive onClick={handleClick} className="p-0 overflow-hidden border border-gray-100">
      <div className="relative w-full h-36 overflow-hidden rounded-t-3xl">
        <img
          src={hotel.imageUrl}
          alt={hotel.name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-base font-semibold text-gray-900 mb-1 line-clamp-1">{hotel.name}</h3>
          <p className="text-sm text-gray-600 mb-1">
            {hotel.city}, {hotel.country}
          </p>
        </div>

        <div className="flex items-center gap-1 text-yellow-500 mb-2">
          {Array.from({ length: hotel.starRating }).map((_, i) => (
            <span key={i} className="text-xs">★</span>
          ))}
        </div>

        <div className="flex items-baseline gap-1 mt-3">
          <span className="text-base font-semibold text-gray-900">
            ${hotel.priceRange.min}
          </span>
          <span className="text-sm text-gray-600">night</span>
        </div>
      </div>
    </Card>
  );
}
