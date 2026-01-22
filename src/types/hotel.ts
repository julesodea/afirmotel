export interface Hotel {
  id: string;
  name: string;
  description: string;
  address: string;
  city: string;
  country: string;
  starRating: 1 | 2 | 3 | 4 | 5;
  imageUrl: string;
  amenities: string[];
  availableRoomTypes: ('single' | 'double' | 'suite' | 'deluxe')[];
  priceRange: {
    min: number;
    max: number;
  };
}
