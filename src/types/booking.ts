export interface Booking {
  id: string;
  guestName: string;
  email: string;
  phone: string;
  hotelId: string;
  hotelName: string;
  roomType: 'single' | 'double' | 'suite' | 'deluxe';
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  numberOfNights: number;
  pricePerNight: number;
  totalPrice: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}
