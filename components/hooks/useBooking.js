"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useBookingContext } from "@/components/context/BookingContext";
import { useValidation } from "./useValidation";
import React from "react";
import { useParams } from "next/navigation";

export const useBooking = () => {
  const params = useParams();
  const router = useRouter();
  const {
    bookingState,
    updateBookingState,
    profile,
    setSubmitting,
    setApplyingCoupon,
  } = useBookingContext();

  const { validateForm } = useValidation();

  // Better unique ID generator
  const customerId = React.useMemo(
    () => crypto.randomUUID?.() || Math.random().toString(36).substring(2, 15),
    []
  );

  // 🟡 Apply Coupon
  const applyCoupon = async () => {
    const code = bookingState.couponCode.trim();
    if (!code) return;

    setApplyingCoupon(true);

    try {
      const response = await axios.post(`/api/booking/${customerId}/coupon/${code}`);

      const data = response?.data;
      console.log("✅ Backend result:", data);

      if (data?.value) {
        updateBookingState({
          appliedCoupon: {
            code: data.code || code,
            discountType: data.type || "amount",
            discountValue: data.value || 0,
          },
        });

        alert(
          `Kupon başarıyla uygulandı! ${data.value} ${data.type === "percentage" ? "%" : "₺"
          } indirim`
        );
      } else {
        alert(data?.error || data?.message || "Geçersiz kupon kodu");
      }
    } catch (error) {
      console.error("❌ Coupon validation error:", error);

      const backendError =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "Kupon doğrulanırken bir hata oluştu";

      alert(backendError);
    } finally {
      setApplyingCoupon(false);
    }
  };

  // 🧼 Remove Coupon
  const removeCoupon = () => {
    updateBookingState({
      appliedCoupon: null,
      couponCode: "",
    });
  };

  // 💰 Calculate Price (with coupon logic)
  const calculatePricing = () => {
    const selected = getSelectedServiceData();
    const subtotal =
      selected && "price" in selected
        ? typeof selected.price === "string"
          ? parseInt(selected.price)
          : selected.price
        : 0;

    let discount = 0;

    const coupon = bookingState.appliedCoupon;
    if (coupon) {
      const { discountType, discountValue } = coupon;
      if (discountType === "amount") {
        discount = Math.min(discountValue, subtotal);
      } else if (discountType === "percentage") {
        discount = Math.round((subtotal * discountValue) / 100);
      }
    }

    const total = Math.max(subtotal - discount, 0);
    return { subtotal, discount, total };
  };

  // 🧠 Get Selected Service or Package Data
  const getSelectedServiceData = () => {
    if (!profile) return null;

    const { serviceType, selectedService, selectedPackage } = bookingState;

    if (selectedService.serviceId) {
      return profile.services.find((s) => s.id === selectedService.serviceId);
    }

    if (selectedPackage.packageId) {
      return profile.packages.find((p) => p.id === selectedPackage.packageId);
    }

    return null;
  };

  // 🚀 Handle Booking Submission
  const handleBooking = async (e) => {
    e.preventDefault();


    if (!validateForm()) {
      alert("Lütfen tüm zorunlu alanları doldurun");
      return;
    }

    setSubmitting(true);

    try {
      const formData = new FormData();

      const isPackageBooking = !!bookingState.selectedPackage.packageId;

      const finalDate = isPackageBooking
        ? new Date().toISOString().split("T")[0]
        : bookingState.selectedDate;

      const finalTime = isPackageBooking
        ? new Date().toISOString().split("T")[1].substring(0, 5)
        : bookingState.selectedTime;

      const selectedServiceData = getSelectedServiceData();
      const { subtotal, discount, total } = calculatePricing();

      const bookingData = {
        serviceType: bookingState.serviceType,
        selectedService: bookingState.selectedService,
        packageType: bookingState.packageType,
        selectedPackage: bookingState.selectedPackage,
        selectedOffering: selectedServiceData,
        date: finalDate,
        time: finalTime,
        clientInfo: bookingState.clientInfo,
        orderNotes: bookingState.orderNotes,
        paymentInfo: bookingState.paymentInfo,
        coupon: bookingState.appliedCoupon,
        subtotal,
        discount,
        total,
        termsAccepted: bookingState.termsAccepted,
        providerId: profile?._id,
        expertId: params.expertID,
        providerName: profile
          ? `${profile.information.name} ${profile.information.surname}`
          : "",
      };

      console.log("🛃🛃🛃 profile?._id:", profile?._id);
      formData.append("bookingData", JSON.stringify(bookingData));

      bookingState.uploadedFiles?.forEach((file) => {
        formData.append("files", file, file.name);
      });

      const response = await fetch(`/api/booking/${profile?._id}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Booking result:", result);
      updateBookingState({
        serviceType: "",
        selectedService: { serviceId: "", serviceTitle: "" },
        packageType: "",
        selectedPackage: { packageId: "", packageTitle: "" },
        selectedDate: "",
        selectedTime: "",
        couponCode: "",
        appliedCoupon: null,
        clientInfo: {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
        },
        paymentInfo: {
          cardNumber: "",
          cardExpiry: "",
          cardCvv: "",
          cardHolderName: "",
        },
        termsAccepted: false,
        uploadedFiles: [],
        orderNotes: "",
      })

      alert(
        `✅ Rezervasyon başarıyla oluşturuldu(${result.bookingId || customerId
        })! for ${profile?.information.name} ${profile?.information.surname}`
      );
      // router.push(`/booking/success?id=${result.bookingId || customerId}`);
    } catch (error) {
      console.error("❌ Booking error:", error);
      alert("Rezervasyon oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    handleBooking,
    applyCoupon,
    removeCoupon,
    getSelectedServiceData,
    calculatePricing,
    customerId,
  };
};
