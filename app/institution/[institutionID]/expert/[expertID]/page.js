"use client";

import React, { useEffect, useRef } from "react";
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
import {
  trackExpertProfileView,
  trackScrollDepth,
  trackTimeOnPage,
  trackCTAClick
} from "@/components/GoogleAnalytics";

function BookingContent() {
  const { expertID, institutionID } = useParams();
  const { loading, profile, bookingState } = useBookingContext();
  const startTimeRef = useRef(Date.now());
  const scrollTrackedRef = useRef({ 25: false, 50: false, 75: false, 100: false });

  // Track expert profile view when profile is loaded
  useEffect(() => {
    if (profile && expertID) {
      const expertName = `${profile.information?.name || ''} ${profile.information?.surname || ''}`.trim();
      trackExpertProfileView(expertID, expertName);
    }
  }, [profile, expertID]);

  // Track scroll depth
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = Math.round((scrollTop / docHeight) * 100);

      const thresholds = [25, 50, 75, 100];
      thresholds.forEach(threshold => {
        if (scrollPercent >= threshold && !scrollTrackedRef.current[threshold]) {
          scrollTrackedRef.current[threshold] = true;
          trackScrollDepth(threshold, 'expert_profile', expertID);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [expertID]);

  // Track time on page when leaving
  useEffect(() => {
    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTimeRef.current) / 1000);
      trackTimeOnPage(timeSpent, 'expert_profile', expertID);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      handleBeforeUnload(); // Track when component unmounts
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [expertID]);

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