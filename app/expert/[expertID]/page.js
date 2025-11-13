"use client";

import React from "react";
import { BookingProvider } from "@/components/context/BookingContext";
import { useBookingContext } from "@/components/context/BookingContext";
import { useProviderData } from "@/components/hooks/useProviderData";
import { ProviderCard } from "@/components/ProviderCard";
import { ServiceSelection } from "@/components/ServiceSelection";
import { DateTimeSelection } from "@/components/DateTimeSelection";
import { ClientInformation } from "@/components/ClientInformation";
import { OrderNotes } from "@/components/OrderNotes";
import { PaymentInformation } from "@/components/PaymentInformation";
import { BookingSummary } from "@/components/BookingSummary";
import { EventsSection } from "@/components/EventsSection";
import { ServiceDetailsDialog } from "@/components/ServiceDetailsDialog";
import BlogsSection from "@/components/BlogsSection";
import { useParams } from "next/navigation";

function BookingContent() {
  const {expertID} = useParams();
  const { loading, profile, bookingState } = useBookingContext();

  if (loading) {
    console.log("Loading provider data...");
  } else {
    console.log("Provider data loaded:", profile);
  }

  // Fetch provider data
  useProviderData(expertID);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Uzman bilgileri bulunamadı.</div>
      </div>
    );
  }

  // Determine if the selected item is an individual service
  let showDateTimePicker = false;
  if (profile && bookingState.selectedService) {
    const foundService = profile.services.find(
      (s) => s.id === bookingState.selectedService.serviceId
    );
    showDateTimePicker = !!(foundService && foundService.meetingType === "1-1");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Randevunuzu Alın
          </h1>
          <p className="text-gray-600">
            Nitelikli bir uzmanla seansınızı planlayın
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Provider Information */}
          <div className="lg:col-span-1">
            <ProviderCard />
          </div>

          {/* Booking Form */}
          <form className="lg:col-span-2 space-y-6">
            <ServiceSelection />
            <DateTimeSelection showDateTimePicker={showDateTimePicker} />
            <ClientInformation />
            <OrderNotes />
            <PaymentInformation />
            <BookingSummary />
          </form>
        </div>

        {/* Blog Posts Section */}
        {(profile?.blogs?.length ?? 0) > 0 && (
          <BlogsSection blogsData={profile.blogs} />
        )}

        {/* Events Section (optional) */}
        {/* <EventsSection /> */}

        {/* Service Details Dialog */}
        <ServiceDetailsDialog />
      </div>
    </div>
  );
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  );
}