"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { useBookingContext } from '@/components/context/BookingContext';
import { useBooking } from '@/components/hooks/useBooking';

export const BookingSummary = () => {
  const {
    bookingState,
    updateBookingState,
    submitting,
    applyingCoupon,
    validationErrors,
  } = useBookingContext();

  const {
    handleBooking,
    applyCoupon,
    removeCoupon,
    getSelectedServiceData,
    calculatePricing
  } = useBooking();

  const selectedServiceData = getSelectedServiceData();
  const { subtotal, discount, total } = calculatePricing();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Rezervasyon Özeti</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedServiceData && (
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{selectedServiceData.title}</span>
              <span className="font-medium">{subtotal} TL</span>
            </div>
            {bookingState.serviceType === "bireysel" && bookingState.selectedDate && bookingState.selectedTime && (
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Tarih ve Saat</span>
                <span>
                  {new Date(bookingState.selectedDate).toLocaleDateString("tr-TR")} - {bookingState.selectedTime}
                </span>
              </div>
            )}
            {bookingState.serviceType === "grup" && "date" in selectedServiceData && selectedServiceData.date && (
              <div className="flex justify-between items-center text-sm text-gray-600">
                <span>Tarih ve Saat</span>
                <span>
                  {new Date(selectedServiceData.date).toLocaleDateString("tr-TR")} - {selectedServiceData.time}
                </span>
              </div>
            )}
            {bookingState.serviceType === "paket" && (
              <div className="space-y-2">
                {"sessionsIncluded" in selectedServiceData && (
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <span>Paket İçeriği</span>
                    <span>{selectedServiceData.sessionsIncluded} seans</span>
                  </div>
                )}
                <div className="flex justify-between items-center text-sm text-gray-600">
                  <span>Başlangıç Tarihi</span>
                  <span>{new Date().toLocaleDateString("tr-TR")}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Coupon Code Section */}
        {bookingState.selectedService && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Kupon Kodu</Label>
            {!bookingState.appliedCoupon ? (
              <div className="flex gap-2">
                <Input
                  value={bookingState.couponCode}
                  onChange={(e) => updateBookingState({ couponCode: e.target.value.toUpperCase() })}
                  placeholder="Kupon kodunuzu girin"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={applyCoupon}
                  disabled={!bookingState.couponCode.trim() || applyingCoupon}
                  className="px-4 bg-transparent"
                >
                  {applyingCoupon ? (
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
                  ) : (
                    "Uygula"
                  )}
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-green-700">
                    {bookingState.appliedCoupon.code} uygulandı (
                    {bookingState.appliedCoupon.discountType === 'percentage'
                      ? `%${bookingState.appliedCoupon.discountValue}`
                      : `${bookingState.appliedCoupon.discountValue}₺`}{" "}
                    indirim)
                  </span>
                </div>

                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={removeCoupon}
                  className="text-green-700 hover:text-green-800"
                >
                  Kaldır
                </Button>
              </div>
            )}
          </div>
        )}

        {bookingState.selectedService && <Separator />}

        {selectedServiceData && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>Ara Toplam</span>
              <span>{subtotal} TL</span>
            </div>

            {bookingState.appliedCoupon && (
              <div className="flex justify-between items-center text-green-600">
                <span>İndirim ({bookingState.appliedCoupon.code})</span>
                <span>-{discount} TL</span>
              </div>
            )}

            <Separator />

            <div className="flex justify-between items-center text-lg font-semibold">
              <span>
                {bookingState.appliedCoupon ? "İndirimli Fiyat" : "Toplam"}
              </span>
              <span>{total} TL</span>
            </div>
          </div>
        )}

        {/* Terms and Conditions */}
        <div className="flex items-start space-x-2 pt-4">
          <Checkbox
            id="terms"
            checked={bookingState.termsAccepted}
            onCheckedChange={(checked) => updateBookingState({ termsAccepted: checked })}
            className={validationErrors.terms ? "border-red-500" : ""}
          />
          <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
            <a href="/terms" target="_blank" className="underline">Mesafeli Satış Sözleşmesi</a>,
            <a href="/privacy" target="_blank" className="underline ml-1">Ön Bilgilendirme Formu</a>,
            <a href="/kvkk" target="_blank" className="underline ml-1">KVKK Aydınlatma ve Açık Rıza Metni</a>'ni kabul
            ediyorum
          </Label>
        </div>
        {validationErrors.terms && (
          <p className="text-sm text-red-500">{validationErrors.terms}</p>
        )}

        <Button
          type="submit"
          disabled={submitting || !bookingState.selectedService}
          className="w-full bg-primary hover:bg-primary/90"
          size="lg"
          onClick={handleBooking}
        >
          {submitting ? (
            <>
              <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              İşleniyor...
            </>
          ) : (
            "Rezervasyonu Tamamla"
          )}
        </Button>

        {/* General error message */}
        {Object.keys(validationErrors).length > 0 && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">
              Lütfen tüm zorunlu alanları doldurun ve hataları düzeltin.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
