"use client"

import React from 'react'
import { Calendar, Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { useBookingContext } from '@/components/context/BookingContext'
import { getAvailableDatesAndTimes } from '@/components/utils/helpers'


interface DateTimeSelectionProps {
  showDateTimePicker?: boolean;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({ showDateTimePicker = true }) => {
  const { profile, bookingState, updateBookingState, validationErrors } = useBookingContext()

  if (!showDateTimePicker || !profile || !bookingState.selectedService) {
    return null;
  }

  const { dates: availableDates, times: availableTimesMap } = getAvailableDatesAndTimes(profile.availability.selectedSlots)
  const availableTimes = bookingState.selectedDate ? availableTimesMap[bookingState.selectedDate] || [] : []

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-orange-500" />
          Tarih ve Saat Seçin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="date">Uygun Tarihler *</Label>
          <Select
            value={bookingState.selectedDate}
            onValueChange={(date) => updateBookingState({ selectedDate: date, selectedTime: "" })}
          >
            <SelectTrigger className={validationErrors.date ? "border-red-500" : ""}>
              <SelectValue placeholder="Bir tarih seçin" />
            </SelectTrigger>
            <SelectContent>
              {availableDates.map((date) => (
                <SelectItem key={date} value={date}>
                  {new Date(date).toLocaleDateString("tr-TR", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {validationErrors.date && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.date}</p>
          )}
        </div>

        {bookingState.selectedDate && (
          <div>
            <Label>Uygun Saatler *</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {availableTimes.length > 0 ? (
                availableTimes.map((time) => (
                  <Button
                    key={time}
                    type="button"
                    variant={bookingState.selectedTime === time ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateBookingState({ selectedTime: time })}
                    className="justify-center"
                  >
                    <Clock className="w-4 h-4 mr-1 text-teal-500" />
                    {time}
                  </Button>
                ))
              ) : (
                <p className="col-span-3 text-sm text-gray-500 text-center py-2">
                  Bu tarih için uygun saat bulunmamaktadır.
                </p>
              )}
            </div>
            {validationErrors.time && (
              <p className="text-sm text-red-500 mt-1">{validationErrors.time}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}