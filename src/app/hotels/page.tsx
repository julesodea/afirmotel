'use client';

import { useState, useMemo } from 'react';
import { useHotels } from '@/hooks/use-hotels';
import { HotelGrid } from '@/components/hotels/HotelGrid';
import { EmptyState } from '@/components/ui/EmptyState';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { IconHotel } from '@/components/icons/IconHotel';
import { Input } from '@/components/forms/Input';

export default function HotelsPage() {
  const { hotels, isLoading } = useHotels();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHotels = useMemo(() => {
    if (!searchTerm.trim()) {
      return hotels;
    }

    const lowerSearch = searchTerm.toLowerCase();
    return hotels.filter((hotel) => {
      return (
        hotel.name.toLowerCase().includes(lowerSearch) ||
        hotel.city.toLowerCase().includes(lowerSearch) ||
        hotel.country.toLowerCase().includes(lowerSearch)
      );
    });
  }, [hotels, searchTerm]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <p className="text-gray-600">Loading hotels...</p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs icon={IconHotel} pageName="Hotels" />

      <div className="space-y-1 mb-10 mt-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Hotels</h1>
        <p className="text-gray-500 text-base">Browse and select a hotel to make a booking</p>
      </div>

      <div className="mb-6 max-w-md">
        <Input
          type="text"
          placeholder="Search by name, city, or country..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {hotels.length === 0 ? (
        <EmptyState
          title="No hotels available"
          description="There are currently no hotels to display."
        />
      ) : filteredHotels.length === 0 ? (
        <EmptyState
          title="No hotels found"
          description={`No hotels match "${searchTerm}". Try a different search term.`}
        />
      ) : (
        <HotelGrid hotels={filteredHotels} />
      )}
    </div>
  );
}
