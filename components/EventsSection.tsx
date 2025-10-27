"use client"

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useBookingContext } from '@/components/context/BookingContext'

export const EventsSection: React.FC = () => {
  const { profile } = useBookingContext()

  if (!profile || profile.events.length === 0) return null

  return (
    <div className="mt-16 mb-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Yaklaşan Etkinlikler</h2>
        <p className="text-gray-600">Uzmanımızın düzenlediği etkinlikler</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profile.events
          .filter((event) => event.status === "approved")
          .slice(0, 3)
          .map((event) => (
            <Card key={event.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>
                  {new Date(event.date).toLocaleDateString("tr-TR")} - {event.time}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Süre:</span>
                    <span>{event.duration} dakika</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Fiyat:</span>
                    <span className="font-medium">{event.price} TL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tür:</span>
                    <Badge variant="outline">{event.meetingType === "1-1" ? "Birebir" : "Grup"}</Badge>
                  </div>
                  {event.location && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Konum:</span>
                      <span className="text-right text-xs">{event.location}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}