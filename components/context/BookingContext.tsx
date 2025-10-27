"use client";

import React, {
  createContext,
  useContext,
  useReducer,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import {
  BookingState,
  ProviderProfile,
} from "@/components/types/booking.types";

// --------------------
// Context Types
// --------------------
interface BookingContextType {
  // Provider data
  profile: ProviderProfile | null;
  setProfile: (profile: ProviderProfile | null) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;

  // Booking state
  bookingState: BookingState;
  updateBookingState: (updates: Partial<BookingState>) => void;
  resetBookingState: () => void;

  // UI state
  serviceDetailsDialogOpen: boolean;
  setServiceDetailsDialogOpen: (open: boolean) => void;
  serviceDetailsDialogId: string | null;
  setServiceDetailsDialogId: (id: string | null) => void;
  currentFormIndex: number;
  setCurrentFormIndex: (index: number) => void;
  submitting: boolean;
  setSubmitting: (submitting: boolean) => void;
  applyingCoupon: boolean;
  setApplyingCoupon: (applying: boolean) => void;
  validationErrors: Record<string, string>;
  setValidationErrors: (errors: Record<string, string>) => void;
}

// --------------------
// Initial Booking State
// --------------------
const initialBookingState: BookingState = {
  serviceType: "bireysel",
  selectedService: { serviceId: "", serviceTitle: "" },
  packageType: "bireysel",
  selectedPackage: { packageId: "", packageTitle: "" },
  selectedDate: new Date().toISOString().split("T")[0],
  selectedTime: new Date().toISOString().split("T")[1].substring(0, 5),
  clientInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  },
  orderNotes: "",
  uploadedFiles: [],
  paymentInfo: {
    cardNumber: "",
    cardHolderName: "",
    cardExpiry: "",
    cardType: "",
    cardCvv: "",
  },
  termsAccepted: false,
  couponCode: "",
  appliedCoupon: null,
};

// --------------------
// Reducer for Booking State
// --------------------
function bookingReducer(
  state: BookingState,
  action:
    | { type: "UPDATE"; payload: Partial<BookingState> }
    | { type: "RESET" }
): BookingState {
  switch (action.type) {
    case "UPDATE":
      return { ...state, ...action.payload };
    case "RESET":
      return { ...initialBookingState };
    default:
      return state;
  }
}

// --------------------
// Context Creation
// --------------------
const BookingContext = createContext<BookingContextType | undefined>(undefined);

// --------------------
// Hook
// --------------------
export const useBookingContext = () => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBookingContext must be used within BookingProvider");
  return ctx;
};

// --------------------
// Provider Component
// --------------------
export const BookingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Profile and basic UI states
  const [profile, setProfile] = React.useState<ProviderProfile | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [serviceDetailsDialogOpen, setServiceDetailsDialogOpen] = React.useState(false);
  const [serviceDetailsDialogId, setServiceDetailsDialogId] = React.useState<string | null>(null);
  const [currentFormIndex, setCurrentFormIndex] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);
  const [applyingCoupon, setApplyingCoupon] = React.useState(false);
  const [validationErrors, setValidationErrors] = React.useState<Record<string, string>>({});

  // Booking state via reducer
  const [bookingState, dispatch] = useReducer(bookingReducer, initialBookingState);

  // Efficient callbacks
  const updateBookingState = useCallback(
    (updates: Partial<BookingState>) => dispatch({ type: "UPDATE", payload: updates }),
    []
  );

  const resetBookingState = useCallback(() => dispatch({ type: "RESET" }), []);

  // Memoized context value to prevent re-renders
  const value = useMemo<BookingContextType>(
    () => ({
      profile,
      setProfile,
      loading,
      setLoading,
      bookingState,
      updateBookingState,
      resetBookingState,
      serviceDetailsDialogOpen,
      setServiceDetailsDialogOpen,
      serviceDetailsDialogId,
      setServiceDetailsDialogId,
      currentFormIndex,
      setCurrentFormIndex,
      submitting,
      setSubmitting,
      applyingCoupon,
      setApplyingCoupon,
      validationErrors,
      setValidationErrors,
    }),
    [
      profile,
      loading,
      bookingState,
      serviceDetailsDialogOpen,
      serviceDetailsDialogId,
      currentFormIndex,
      submitting,
      applyingCoupon,
      validationErrors,
    ]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
};
