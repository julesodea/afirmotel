export const ROOM_TYPES = ['single', 'double', 'suite', 'deluxe'] as const;

export const ROOM_PRICES = {
  single: 100,
  double: 150,
  suite: 300,
  deluxe: 450,
} as const;

export const BOOKING_STATUS = ['pending', 'confirmed', 'cancelled'] as const;

export const HOTEL_AMENITIES = [
  'WiFi',
  'Pool',
  'Gym',
  'Spa',
  'Restaurant',
  'Bar',
  'Parking',
  'Pet Friendly',
] as const;
