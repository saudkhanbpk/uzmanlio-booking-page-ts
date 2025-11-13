"use client"

import React from 'react'
import { MapPin } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { useBookingContext } from '@/components/context/BookingContext'

export const ServiceDetailsDialog = () => {
  const {
    serviceDetailsDialogOpen,
    setServiceDetailsDialogOpen,
    serviceDetailsDialogId,
    profile,
  } = useBookingContext();

  let selectedServiceData = null;
  if (profile && serviceDetailsDialogId) {
    selectedServiceData =
      profile.services.find((s) => s.id === serviceDetailsDialogId) ||
      profile.packages.find((p) => p.id === serviceDetailsDialogId) ||
      null;
  }

  if (!selectedServiceData) return null;

  return (
    <Dialog open={serviceDetailsDialogOpen} onOpenChange={setServiceDetailsDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {/* <div
              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
              style={{ backgroundColor: selectedServiceData.iconBg }}
            >
              {selectedServiceData.icon}
            </div> */}
            {selectedServiceData.title}
          </DialogTitle>
          <DialogDescription>{selectedServiceData.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-sm text-gray-600">Süre</h4>
              <p className="text-lg">
                {"duration" in selectedServiceData ? selectedServiceData.duration : "N/A"} dakika
              </p>
            </div>
            <div>
              <h4 className="font-medium text-sm text-gray-600">Fiyat</h4>
              <p className="text-lg font-semibold">
                {"price" in selectedServiceData
                  ? typeof selectedServiceData.price === "string"
                    ? parseInt(selectedServiceData.price)
                    : selectedServiceData.price
                  : 0} TL
              </p>
            </div>
            {"sessionsIncluded" in selectedServiceData && (
              <div>
                <h4 className="font-medium text-sm text-gray-600">Seans Sayısı</h4>
                <p className="text-lg">{selectedServiceData.sessionsIncluded} seans</p>
              </div>
            )}
            {"maxAttendees" in selectedServiceData && selectedServiceData.maxAttendees && (
              <div>
                <h4 className="font-medium text-sm text-gray-600">Maksimum Katılımcı</h4>
                <p className="text-lg">{selectedServiceData.maxAttendees} kişi</p>
              </div>
            )}
          </div>

          {"eventType" in selectedServiceData && (
            <div>
              <h4 className="font-medium text-sm text-gray-600 mb-2">Etkinlik Detayları</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">
                    {selectedServiceData.eventType === "online"
                      ? "Online"
                      : selectedServiceData.eventType === "offline"
                        ? "Yüz yüze"
                        : "Hibrit"}
                  </Badge>
                  {selectedServiceData.platform && (
                    <Badge variant="secondary">{selectedServiceData.platform}</Badge>
                  )}
                </div>
                {selectedServiceData.location && (
                  <p className="text-sm text-gray-600">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    {selectedServiceData.location}
                  </p>
                )}
              </div>
            </div>
          )}

          {"category" in selectedServiceData && (
            <div>
              <h4 className="font-medium text-sm text-gray-600">Kategori</h4>
              <Badge className="mt-1">{selectedServiceData.category}</Badge>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <Button
            variant="outline"
            onClick={() => setServiceDetailsDialogOpen(false)}
          >
            Kapat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
