"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBookingContext } from '@/components/context/BookingContext';

export const ClientInformation = () => {
  const { bookingState, updateBookingState, validationErrors } = useBookingContext();

  const handleInputChange = (field, value) => {
    updateBookingState({
      clientInfo: {
        ...bookingState.clientInfo,
        [field]: value
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bilgileriniz</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="firstName">Ad *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={bookingState.clientInfo.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="Adınızı girin"
              className={validationErrors.firstName ? "border-red-500" : ""}
              required
            />
            {validationErrors.firstName && (
              <p className="text-sm text-red-500 mt-1">{validationErrors.firstName}</p>
            )}
          </div>
          <div>
            <Label htmlFor="lastName">Soyad *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={bookingState.clientInfo.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Soyadınızı girin"
              className={validationErrors.lastName ? "border-red-500" : ""}
              required
            />
            {validationErrors.lastName && (
              <p className="text-sm text-red-500 mt-1">{validationErrors.lastName}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="email">E-posta *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={bookingState.clientInfo.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            placeholder="E-posta adresinizi girin"
            className={validationErrors.email ? "border-red-500" : ""}
            required
          />
          {validationErrors.email && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.email}</p>
          )}
        </div>
        <div>
          <Label htmlFor="phone">Telefon Numarası *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={bookingState.clientInfo.phone}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            placeholder="Telefon numaranızı girin"
            className={validationErrors.phone ? "border-red-500" : ""}
            required
          />
          {validationErrors.phone && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.phone}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
