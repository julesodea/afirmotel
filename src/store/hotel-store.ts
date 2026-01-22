import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Hotel } from '@/types/hotel';

interface HotelStore {
  hotels: Hotel[];
  getHotelById: (id: string) => Hotel | undefined;
  initializeHotels: () => void;
}

const SAMPLE_HOTELS: Hotel[] = [
  {
    id: '1',
    name: 'Auckland Harbour Grand',
    description: 'Luxury waterfront hotel with stunning harbour views and world-class amenities in the heart of Auckland.',
    address: '88 Quay Street',
    city: 'Auckland',
    country: 'New Zealand',
    starRating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    amenities: ['WiFi', 'Pool', 'Gym', 'Spa', 'Restaurant'],
    availableRoomTypes: ['single', 'double', 'suite', 'deluxe'],
    priceRange: { min: 100, max: 450 },
  },
  {
    id: '2',
    name: 'Bay of Islands Resort & Spa',
    description: 'Beachfront paradise with pristine beaches, native bush walks and crystal-clear waters.',
    address: '42 Marsden Road',
    city: 'Paihia',
    country: 'New Zealand',
    starRating: 5,
    imageUrl: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Pet Friendly'],
    availableRoomTypes: ['double', 'suite', 'deluxe'],
    priceRange: { min: 150, max: 450 },
  },
  {
    id: '3',
    name: 'Queenstown Alpine Lodge',
    description: 'Cozy mountain retreat with breathtaking Remarkables views and adventure activities.',
    address: '156 Frankton Road',
    city: 'Queenstown',
    country: 'New Zealand',
    starRating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Parking', 'Gym'],
    availableRoomTypes: ['single', 'double', 'suite'],
    priceRange: { min: 100, max: 300 },
  },
  {
    id: '4',
    name: 'Wellington Boutique Hotel',
    description: 'Modern boutique hotel with artistic flair and personalized service in the cultural capital.',
    address: '68 Courtenay Place',
    city: 'Wellington',
    country: 'New Zealand',
    starRating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    amenities: ['WiFi', 'Bar', 'Restaurant', 'Gym'],
    availableRoomTypes: ['single', 'double', 'suite'],
    priceRange: { min: 100, max: 300 },
  },
  {
    id: '5',
    name: 'Christchurch Budget Inn',
    description: 'Comfortable and affordable accommodation perfect for budget-conscious travelers exploring the Garden City.',
    address: '234 Manchester Street',
    city: 'Christchurch',
    country: 'New Zealand',
    starRating: 3,
    imageUrl: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800',
    amenities: ['WiFi', 'Parking'],
    availableRoomTypes: ['single', 'double'],
    priceRange: { min: 100, max: 150 },
  },
  {
    id: '6',
    name: 'Rotorua Heritage Hotel',
    description: 'Charming historic hotel with geothermal spa and Maori cultural experiences.',
    address: '45 Fenton Street',
    city: 'Rotorua',
    country: 'New Zealand',
    starRating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    amenities: ['WiFi', 'Restaurant', 'Bar', 'Parking'],
    availableRoomTypes: ['single', 'double', 'suite'],
    priceRange: { min: 100, max: 300 },
  },
  {
    id: '7',
    name: 'Lake Wanaka Retreat',
    description: 'Peaceful lakefront property with water activities, mountain views and stunning sunsets.',
    address: '12 Lakeside Road',
    city: 'Wanaka',
    country: 'New Zealand',
    starRating: 4,
    imageUrl: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
    amenities: ['WiFi', 'Pool', 'Restaurant', 'Spa', 'Pet Friendly'],
    availableRoomTypes: ['double', 'suite', 'deluxe'],
    priceRange: { min: 150, max: 450 },
  },
  {
    id: '8',
    name: 'Dunedin Urban Suites',
    description: 'Contemporary all-suite hotel with Scottish charm, full kitchens and spacious living areas.',
    address: '22 The Octagon',
    city: 'Dunedin',
    country: 'New Zealand',
    starRating: 3,
    imageUrl: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800',
    amenities: ['WiFi', 'Gym', 'Parking'],
    availableRoomTypes: ['suite', 'deluxe'],
    priceRange: { min: 300, max: 450 },
  },
];

export const useHotelStore = create<HotelStore>()(
  persist(
    (set, get) => ({
      hotels: SAMPLE_HOTELS,

      getHotelById: (id) => {
        return get().hotels.find((hotel) => hotel.id === id);
      },

      initializeHotels: () => {
        set({ hotels: SAMPLE_HOTELS });
      },
    }),
    {
      name: 'hotel-storage', // unique name for localStorage key
    }
  )
);
