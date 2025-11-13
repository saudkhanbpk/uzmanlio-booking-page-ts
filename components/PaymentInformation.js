"use client";

import React from 'react';
import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useBookingContext } from '@/components/context/BookingContext';
import { formatCardNumber, formatExpiryDate } from '@/components/utils/helpers';

export const PaymentInformation = () => {
  const { bookingState, updateBookingState, validationErrors } = useBookingContext();

  const handlePaymentChange = (field, value) => {
    let formattedValue = value;

    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'cardExpiry') {
      formattedValue = formatExpiryDate(value);
    } else if (field === 'cardCvv') {
      formattedValue = value.replace(/\D/g, '');
    } else if (field === 'cardHolderName') {
      formattedValue = value.toUpperCase();
    }

    updateBookingState({
      paymentInfo: {
        ...bookingState.paymentInfo,
        [field]: formattedValue
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-violet-500" />
          Ödeme Bilgileri
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="cardNumber">Kart Numarası *</Label>
          <Input
            id="cardNumber"
            name="cardNumber"
            value={bookingState.paymentInfo.cardNumber}
            onChange={(e) => handlePaymentChange('cardNumber', e.target.value)}
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            className={validationErrors.cardNumber ? "border-red-500" : ""}
            required
          />
          {validationErrors.cardNumber && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.cardNumber}</p>
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <Label htmlFor="cardExpiry">Son Kullanma Tarihi *</Label>
            <Input
              id="cardExpiry"
              name="cardExpiry"
              value={bookingState.paymentInfo.cardExpiry}
              onChange={(e) => handlePaymentChange('cardExpiry', e.target.value)}
              placeholder="MM/YY"
              maxLength={5}
              className={validationErrors.cardExpiry ? "border-red-500" : ""}
              required
            />
            {validationErrors.cardExpiry && (
              <p className="text-sm text-red-500 mt-1">{validationErrors.cardExpiry}</p>
            )}
          </div>
          <div>
            <Label htmlFor="cardCvv">CVV *</Label>
            <Input
              id="cardCvv"
              name="cardCvv"
              type="password"
              value={bookingState.paymentInfo.cardCvv}
              onChange={(e) => handlePaymentChange('cardCvv', e.target.value)}
              placeholder="123"
              maxLength={4}
              className={validationErrors.cardCvv ? "border-red-500" : ""}
              required
            />
            {validationErrors.cardCvv && (
              <p className="text-sm text-red-500 mt-1">{validationErrors.cardCvv}</p>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="cardHolderName">Kart Üzerindeki İsim *</Label>
          <Input
            id="cardHolderName"
            name="cardHolderName"
            value={bookingState.paymentInfo.cardHolderName}
            onChange={(e) => handlePaymentChange('cardHolderName', e.target.value)}
            placeholder="KARTTA YAZAN İSİM"
            className={validationErrors.cardHolderName ? "border-red-500" : ""}
            required
          />
          {validationErrors.cardHolderName && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.cardHolderName}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
