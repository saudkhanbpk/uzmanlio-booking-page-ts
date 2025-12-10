import { useBookingContext } from '@/components/context/BookingContext';

export const useValidation = () => {
  const { bookingState, setValidationErrors } = useBookingContext();

  const validateForm = () => {
    const errors = {};
    const { selectedService, serviceType, selectedDate, selectedTime, clientInfo, paymentInfo, termsAccepted } = bookingState;

    if (!selectedService) {
      errors.service = "Lütfen bir hizmet seçin";
    }

    if (serviceType === "bireysel") {
      if (!selectedDate) {
        errors.date = "Lütfen bir tarih seçin";
      }
      if (!selectedTime) {
        errors.time = "Lütfen bir saat seçin";
      }
    }

    if (!clientInfo.firstName?.trim()) {
      errors.firstName = "Ad alanı zorunludur";
    }
    if (!clientInfo.lastName?.trim()) {
      errors.lastName = "Soyad alanı zorunludur";
    }
    if (!clientInfo.email?.trim()) {
      errors.email = "E-posta alanı zorunludur";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientInfo.email)) {
      errors.email = "Geçerli bir e-posta adresi girin";
    }
    if (!clientInfo.phone.trim()) {
      errors.phone = "Telefon numarası zorunludur";
    } else if (!/^[0-9]{10,}$/.test(clientInfo.phone.replace(/\D/g, ''))) {
      errors.phone = "Geçerli bir telefon numarası girin";
    }

    if (!paymentInfo.cardNumber.trim()) {
      errors.cardNumber = "Kart numarası zorunludur";
    } else if (paymentInfo.cardNumber.replace(/\s/g, '').length < 16) {
      errors.cardNumber = "Kart numarası 16 haneli olmalıdır";
    }
    if (!paymentInfo.cardExpiry.trim()) {
      errors.cardExpiry = "Son kullanma tarihi zorunludur";
    } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.cardExpiry)) {
      errors.cardExpiry = "Geçerli bir tarih girin (MM/YY)";
    }
    if (!paymentInfo.cardCvv.trim()) {
      errors.cardCvv = "CVV zorunludur";
    } else if (paymentInfo.cardCvv.length < 3) {
      errors.cardCvv = "CVV en az 3 haneli olmalıdır";
    }
    if (!paymentInfo.cardHolderName.trim()) {
      errors.cardHolderName = "Kart üzerindeki isim zorunludur";
    }

    if (!termsAccepted) {
      errors.terms = "Şartları kabul etmelisiniz";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  return { validateForm };
};
