'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHotels } from '@/hooks/use-hotels';
import { useBookings } from '@/hooks/use-bookings';
import { FormField } from '@/components/forms/FormField';
import { Input } from '@/components/forms/Input';
import { Select } from '@/components/forms/Select';
import { TextArea } from '@/components/forms/TextArea';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ROOM_TYPES, ROOM_PRICES } from '@/lib/constants';
import { calculateNumberOfNights, getTodayDate, getTomorrowDate } from '@/lib/date-utils';

interface BookingFormProps {
  prefilledHotelId?: string;
}

export function BookingForm({ prefilledHotelId }: BookingFormProps) {
  const router = useRouter();
  const { hotels } = useHotels();
  const { addBooking } = useBookings();

  const [formData, setFormData] = useState({
    guestName: '',
    email: '',
    phone: '',
    hotelId: prefilledHotelId || '',
    roomType: 'double' as const,
    checkInDate: getTodayDate(),
    checkOutDate: getTomorrowDate(),
    numberOfGuests: 1,
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (prefilledHotelId && !formData.hotelId) {
      setFormData((prev) => ({ ...prev, hotelId: prefilledHotelId }));
    }
  }, [prefilledHotelId, formData.hotelId]);

  const selectedHotel = hotels.find((h) => h.id === formData.hotelId);
  const numberOfNights = calculateNumberOfNights(formData.checkInDate, formData.checkOutDate);
  const pricePerNight = ROOM_PRICES[formData.roomType];
  const totalPrice = numberOfNights * pricePerNight;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'numberOfGuests' ? parseInt(value) || 1 : value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.guestName.trim()) {
      newErrors.guestName = 'Guest name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.hotelId) {
      newErrors.hotelId = 'Please select a hotel';
    }

    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) {
      newErrors.checkInDate = 'Check-in date must be today or in the future';
    }

    if (checkOutDate <= checkInDate) {
      newErrors.checkOutDate = 'Check-out date must be after check-in date';
    }

    if (formData.numberOfGuests < 1) {
      newErrors.numberOfGuests = 'At least 1 guest is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    // Check all required fields are filled
    if (!formData.guestName.trim()) return false;
    if (!formData.email.trim()) return false;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) return false;
    if (!formData.phone.trim()) return false;
    if (!formData.hotelId) return false;
    if (formData.numberOfGuests < 1) return false;

    // Check dates are valid
    const checkInDate = new Date(formData.checkInDate);
    const checkOutDate = new Date(formData.checkOutDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (checkInDate < today) return false;
    if (checkOutDate <= checkInDate) return false;

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    addBooking({
      guestName: formData.guestName,
      email: formData.email,
      phone: formData.phone,
      hotelId: formData.hotelId,
      hotelName: selectedHotel?.name || '',
      roomType: formData.roomType,
      checkInDate: formData.checkInDate,
      checkOutDate: formData.checkOutDate,
      numberOfGuests: formData.numberOfGuests,
      pricePerNight,
      specialRequests: formData.specialRequests,
      status: 'pending',
    });

    router.push('/bookings');
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Guest Information</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Guest Name" htmlFor="guestName" required error={errors.guestName}>
              <Input
                id="guestName"
                name="guestName"
                value={formData.guestName}
                onChange={handleChange}
                error={errors.guestName}
                placeholder="John Doe"
              />
            </FormField>

            <FormField label="Email" htmlFor="email" required error={errors.email}>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                placeholder="john@example.com"
              />
            </FormField>
          </div>

          <FormField label="Phone Number" htmlFor="phone" required error={errors.phone}>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+012-345-6789"
            />
          </FormField>

          <h2 className="text-xl font-semibold text-gray-900 mb-6 mt-8">Booking Details</h2>

          <FormField label="Hotel" htmlFor="hotelId" required error={errors.hotelId}>
            <Select
              id="hotelId"
              name="hotelId"
              value={formData.hotelId}
              onChange={handleChange}
              error={errors.hotelId}
            >
              <option value="">Select a hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel.id} value={hotel.id}>
                  {hotel.name} - {hotel.city}, {hotel.country}
                </option>
              ))}
            </Select>
          </FormField>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Room Type" htmlFor="roomType" required>
              <Select
                id="roomType"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
              >
                {ROOM_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)} - ${ROOM_PRICES[type]}/night
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label="Number of Guests" htmlFor="numberOfGuests" required error={errors.numberOfGuests}>
              <Input
                id="numberOfGuests"
                name="numberOfGuests"
                type="number"
                min="1"
                value={formData.numberOfGuests}
                onChange={handleChange}
                error={errors.numberOfGuests}
              />
            </FormField>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField label="Check-in Date" htmlFor="checkInDate" required error={errors.checkInDate}>
              <Input
                id="checkInDate"
                name="checkInDate"
                type="date"
                value={formData.checkInDate}
                onChange={handleChange}
                error={errors.checkInDate}
              />
            </FormField>

            <FormField label="Check-out Date" htmlFor="checkOutDate" required error={errors.checkOutDate}>
              <Input
                id="checkOutDate"
                name="checkOutDate"
                type="date"
                value={formData.checkOutDate}
                onChange={handleChange}
                error={errors.checkOutDate}
              />
            </FormField>
          </div>

          <FormField label="Special Requests" htmlFor="specialRequests">
            <TextArea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleChange}
              rows={3}
              placeholder="Any special requests or requirements..."
            />
          </FormField>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" variant="primary" disabled={!isFormValid()}>
            Create Booking
          </Button>
          <Button type="button" variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Price Summary</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Room Type:</span>
                <span className="font-medium text-gray-900">
                  {formData.roomType.charAt(0).toUpperCase() + formData.roomType.slice(1)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Price per Night:</span>
                <span className="font-medium text-gray-900">${pricePerNight}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Number of Nights:</span>
                <span className="font-medium text-gray-900">{numberOfNights}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-gray-300">
                <span className="font-semibold text-gray-900">Total Price:</span>
                <span className="text-xl font-bold text-gray-900">${totalPrice.toLocaleString()}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
