export interface ProviderProfile {
  _id: string
  username: string
  pp: string
  ppFile?: string
  information: {
    name: string
    surname: string
    email: string
    phone: string
    about: string
    address: string
    gender: string
  }
  title: string
  star: number
  titles: Array<{
    title: string
    description: string
    _id: string
    id: string
  }>
  resume: {
    education: Array<{
      id: string
      level: string
      name: string
      department: string
      graduationYear: number
      _id: string
    }>
  }
  experience: Array<{
    id: string
    company: string
    position: string
    description: string
    start: number
    end: number
    stillWork: boolean
    _id: string
  }>
  certificates: Array<{
    name: string
    company: string
    issueDate: string
    expiryDate: string
    credentialId: string
    credentialUrl: string
    _id: string
    id: string
  }>
  socialMedia: {
    website?: string
    linkedin?: string
    twitter?: string
    instagram?: string
    youtube?: string
    tiktok?: string
    facebook?: string
    _id: string
  }
  services: Array<Service>
  packages: Array<Package>
  availability: {
    alwaysAvailable: boolean
    selectedSlots: string[]
    lastUpdated: string
    _id: string
  }
  blogCount: number
  blogs?: Array<{
    id: number
    title: string
    url: string
    coverImage: string
    _id: string

  }>

  forms: any[]
  events: Array<Event>
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  iconBg: string
  price: string
  duration: string
  category: string
  features: any[]
  date: string | null
  time: string | null
  location: string
  platform: string
  eventType: string
  meetingType: string
  maxAttendees: number | null
  isOfflineEvent: boolean
  selectedClients: any[]
  status: "active" | "inactive" | "onhold"
  createdAt: string
  updatedAt: string
  _id: string
}

export interface Package {
  id: string
  title: string
  description: string
  price: number
  originalPrice: number | null
  duration: number
  appointmentCount: number
  sessionsIncluded: number
  category: string
  eventType: string
  meetingType: string
  platform: string
  location: string
  date: string | null
  time: string | null
  maxAttendees: number | null
  icon: string
  iconBg: string
  status: "active" | "inactive"
  isAvailable: boolean
  isPurchased: boolean
  isOfflineEvent: boolean
  selectedClients: any[]
  features: any[]
  validUntil: string | null
  purchasedBy: any[]
  createdAt: string
  updatedAt: string
  _id: string
}

export interface Event {
  id: string
  title: string
  serviceId: string
  serviceName: string
  serviceType: "service" | "package"
  date: string
  time: string
  duration: number
  location: string
  platform: string
  eventType: string
  meetingType: string
  price: number
  maxAttendees: number
  attendees: number
  category: string
  status: "completed" | "approved" | "pending"
  paymentType: string
  isRecurring: boolean
  recurringType: string
  selectedClients: Array<{
    id: string
    name: string
    email: string
    packages: string[]
    _id: string
  }>
  appointmentNotes: string
  files: any[]
  createdAt: string
  updatedAt: string
  _id: string
}

export interface ClientInfo {
  firstName: string
  lastName: string
  email: string
  phone: string
}

export interface PaymentInfo {
  cardNumber: string
  cardHolderName: string
  cardExpiry: string
  cardType: string
  cardCvv: string
}

export interface CouponResponse {
  valid: boolean
  type?: string
  code?: string
  message?: string
  value: number
}

export interface BookingState {
  serviceType: string
  selectedService: { 
    serviceId: string
    serviceTitle: string
  }
  packageType: string
  selectedPackage: {
    packageId: string
    packageTitle: string

  }

  selectedDate: string
  selectedTime: string
  clientInfo: ClientInfo
  orderNotes: string
  uploadedFiles: File[]
  paymentInfo: PaymentInfo
  termsAccepted: boolean
  couponCode: string
  appliedCoupon: {
    code: string
    discountType: string
    discountValue: number
  } | null
}