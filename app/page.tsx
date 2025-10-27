// "use client"

// import type React from "react"
// import { useEffect, useState } from "react"
// import axios from "axios"
// import {
//   Calendar,
//   Clock,
//   CreditCard,
//   FileText,
//   Upload,
//   User,
//   Star,
//   MapPin,
//   Phone,
//   Mail,
//   Instagram,
//   Facebook,
//   Twitter,
//   Youtube,
//   Linkedin,
//   GraduationCap,
//   Briefcase,
//   Award,
//   Users,
//   Package,
//   Info,
//   ChevronLeft,
//   ChevronRight,
//   ExternalLink,
//   FileCheck,
//   Globe,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Separator } from "@/components/ui/separator"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"

// // TypeScript Interface for the API Response
// interface ProviderProfile {
//   _id: string
//   username: string
//   pp: string
//   ppFile?: string
//   information: {
//     name: string
//     surname: string
//     email: string
//     phone: string
//     about: string
//     address: string
//     gender: string
//   }
//   title: string
//   star: number
//   titles: Array<{
//     title: string
//     description: string
//     _id: string
//     id: string
//   }>
//   resume: {
//     education: Array<{
//       id: string
//       level: string
//       name: string
//       department: string
//       graduationYear: number
//       _id: string
//     }>
//   }
//   experience: Array<{
//     id: string
//     company: string
//     position: string
//     description: string
//     start: number
//     end: number
//     stillWork: boolean
//     _id: string
//   }>
//   certificates: Array<{
//     name: string
//     company: string
//     issueDate: string
//     expiryDate: string
//     credentialId: string
//     credentialUrl: string
//     _id: string
//     id: string
//   }>
//   socialMedia: {
//     website?: string
//     linkedin?: string
//     twitter?: string
//     instagram?: string
//     youtube?: string
//     tiktok?: string
//     facebook?: string
//     _id: string
//   }
//   services: Array<{
//     id: string
//     title: string
//     description: string
//     icon: string
//     iconBg: string
//     price: string
//     duration: string
//     category: string
//     features: any[]
//     date: string | null
//     time: string | null
//     location: string
//     platform: string
//     eventType: string
//     meetingType: string
//     maxAttendees: number | null
//     isOfflineEvent: boolean
//     selectedClients: any[]
//     status: "active" | "inactive" | "onhold"
//     createdAt: string
//     updatedAt: string
//     _id: string
//   }>
//   packages: Array<{
//     id: string
//     title: string
//     description: string
//     price: number
//     originalPrice: number | null
//     duration: number
//     appointmentCount: number
//     sessionsIncluded: number
//     category: string
//     eventType: string
//     meetingType: string
//     platform: string
//     location: string
//     date: string | null
//     time: string | null
//     maxAttendees: number | null
//     icon: string
//     iconBg: string
//     status: "active" | "inactive"
//     isAvailable: boolean
//     isPurchased: boolean
//     isOfflineEvent: boolean
//     selectedClients: any[]
//     features: any[]
//     validUntil: string | null
//     purchasedBy: any[]
//     createdAt: string
//     updatedAt: string
//     _id: string
//   }>
//   availability: {
//     alwaysAvailable: boolean
//     selectedSlots: string[]
//     lastUpdated: string
//     _id: string
//   }
//   blogCount: number
//   blogs?: number
//   forms: any[]
//   events: Array<{
//     id: string
//     title: string
//     serviceId: string
//     serviceName: string
//     serviceType: "service" | "package"
//     date: string
//     time: string
//     duration: number
//     location: string
//     platform: string
//     eventType: string
//     meetingType: string
//     price: number
//     maxAttendees: number
//     attendees: number
//     category: string
//     status: "completed" | "approved" | "pending"
//     paymentType: string
//     isRecurring: boolean
//     recurringType: string
//     selectedClients: Array<{
//       id: string
//       name: string
//       email: string
//       packages: string[]
//       _id: string
//     }>
//     appointmentNotes: string
//     files: any[]
//     createdAt: string
//     updatedAt: string
//     _id: string
//   }>
// }

// interface CouponResponse {
//   valid: boolean
//   discount?: number
//   code?: string
//   message?: string
// }

// export default function BookingPage() {
//   const [profile, setProfile] = useState<ProviderProfile | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [serviceType, setServiceType] = useState("bireysel")
//   const [selectedService, setSelectedService] = useState("")
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
//   const [selectedTime, setSelectedTime] = useState(new Date().toISOString().split("T")[1].substring(0, 5))
//   const [clientInfo, setClientInfo] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   })
//   const [orderNotes, setOrderNotes] = useState("")
//   const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
//   const [paymentInfo, setPaymentInfo] = useState({
//     cardNumber: "",
//     expiryDate: "",
//     cvv: "",
//     nameOnCard: "",
//   })
//   const [termsAccepted, setTermsAccepted] = useState(false)
//   const [couponCode, setCouponCode] = useState("")
//   const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
//   const [serviceDetailsDialogOpen, setServiceDetailsDialogOpen] = useState(false)
//   const [currentFormIndex, setCurrentFormIndex] = useState(0)
//   const [currentBlogCarouselIndex, setCurrentBlogCarouselIndex] = useState(0)
//   const [submitting, setSubmitting] = useState(false)
//   const [validationErrors, setValidationErrors] = useState<Record<string, string>>({})
//   const [applyingCoupon, setApplyingCoupon] = useState(false)

//   const router = (typeof window !== 'undefined') ? require('next/navigation').useRouter() : null
//   const customerId = Math.random().toString(36).substring(2, 15)

//   // Fetch provider data
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { data } = await axios.get<ProviderProfile>("/api/testing")
//         setProfile(data)
//         setLoading(false)
//       } catch (err) {
//         console.error("Fetch error:", err)
//         setLoading(false)
//       }
//     }
//     fetchData()
//   }, [])

//   // Validation function
//   const validateForm = () => {
//     const errors: Record<string, string> = {}

//     if (!selectedService) {
//       errors.service = "Lütfen bir hizmet seçin"
//     }

//     if (serviceType === "bireysel") {
//       if (!selectedDate) {
//         errors.date = "Lütfen bir tarih seçin"
//       }
//       if (!selectedTime) {
//         errors.time = "Lütfen bir saat seçin"
//       }
//     }

//     if (!clientInfo.firstName.trim()) {
//       errors.firstName = "Ad alanı zorunludur"
//     }
//     if (!clientInfo.lastName.trim()) {
//       errors.lastName = "Soyad alanı zorunludur"
//     }
//     if (!clientInfo.email.trim()) {
//       errors.email = "E-posta alanı zorunludur"
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(clientInfo.email)) {
//       errors.email = "Geçerli bir e-posta adresi girin"
//     }
//     if (!clientInfo.phone.trim()) {
//       errors.phone = "Telefon numarası zorunludur"
//     } else if (!/^[0-9]{10,}$/.test(clientInfo.phone.replace(/\D/g, ''))) {
//       errors.phone = "Geçerli bir telefon numarası girin"
//     }

//     if (!paymentInfo.cardNumber.trim()) {
//       errors.cardNumber = "Kart numarası zorunludur"
//     } else if (paymentInfo.cardNumber.replace(/\s/g, '').length < 16) {
//       errors.cardNumber = "Kart numarası 16 haneli olmalıdır"
//     }
//     if (!paymentInfo.expiryDate.trim()) {
//       errors.expiryDate = "Son kullanma tarihi zorunludur"
//     } else if (!/^\d{2}\/\d{2}$/.test(paymentInfo.expiryDate)) {
//       errors.expiryDate = "Geçerli bir tarih girin (MM/YY)"
//     }
//     if (!paymentInfo.cvv.trim()) {
//       errors.cvv = "CVV zorunludur"
//     } else if (paymentInfo.cvv.length < 3) {
//       errors.cvv = "CVV en az 3 haneli olmalıdır"
//     }
//     if (!paymentInfo.nameOnCard.trim()) {
//       errors.nameOnCard = "Kart üzerindeki isim zorunludur"
//     }

//     if (!termsAccepted) {
//       errors.terms = "Şartları kabul etmelisiniz"
//     }

//     setValidationErrors(errors)
//     return Object.keys(errors).length === 0
//   }

//   // Apply coupon with API call
//   const applyCoupon = async () => {
//     if (!couponCode.trim()) return

//     setApplyingCoupon(true)
//     try {
//       const response = await axios.get<CouponResponse>(`/api/booking/${couponCode}/route`)

//       if (response.data.valid && response.data.discount) {
//         setAppliedCoupon({
//           code: response.data.code || couponCode.toUpperCase(),
//           discount: response.data.discount
//         })
//         alert(`Kupon başarıyla uygulandı! %${response.data.discount} indirim`)
//       } else {
//         alert(response.data.message || "Geçersiz kupon kodu")
//       }
//     } catch (error) {
//       console.error("Coupon validation error:", error)
//       alert("Kupon doğrulanırken bir hata oluştu")
//     } finally {
//       setApplyingCoupon(false)
//     }
//   }

//   const removeCoupon = () => {
//     setAppliedCoupon(null)
//     setCouponCode("")
//   }

//   // Handle booking submission
//   const handleBooking = async (e: React.FormEvent) => {
//     e.preventDefault()

//     if (!validateForm()) {
//       alert("Lütfen tüm zorunlu alanları doldurun")
//       return
//     }

//     setSubmitting(true)

//     try {
//       const formData = new FormData()

//       // Get final date and time based on service type
//       const finalDate = serviceType === "paket"
//         ? new Date().toISOString().split("T")[0]
//         : selectedDate

//       const finalTime = serviceType === "paket"
//         ? new Date().toISOString().split("T")[1].substring(0, 5)
//         : selectedTime

//       const bookingData = {
//         serviceType,
//         serviceId: selectedService,
//         serviceDetails: selectedServiceData,
//         date: finalDate,
//         time: finalTime,
//         clientInfo,
//         orderNotes,
//         paymentInfo: {
//           cardLastFour: paymentInfo.cardNumber.slice(-4),
//           nameOnCard: paymentInfo.nameOnCard,
//         },
//         coupon: appliedCoupon,
//         subtotal,
//         discount,
//         total,
//         termsAccepted,
//         providerId: profile?._id,
//         providerName: profile ? `${profile.information.name} ${profile.information.surname}` : "",
//       }

//       formData.append("bookingData", JSON.stringify(bookingData))

//       if (uploadedFiles.length > 0) {
//         uploadedFiles.forEach((file) => {
//           formData.append('files', file, file.name)
//         })
//       }

//       const response = await fetch(`/api/booking/${customerId}`, {
//         method: 'POST',
//         body: formData,
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || `HTTP error! status: ${response.status}`)
//       }

//       const result = await response.json()
//       alert("Rezervasyon başarıyla oluşturuldu!")

//       // if (router) {
//       //   router.push(`/booking/success?id=${result.bookingId || customerId}`)
//       // }

//     } catch (error) {
//       console.error("Booking error:", error)
//       alert("Rezervasyon oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.")
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   // Helper functions
//   const getAvailableDatesAndTimes = () => {
//     if (!profile?.availability.selectedSlots.length) return { dates: [], times: {} }

//     const now = new Date()
//     const datesObj: Record<string, string[]> = {}
//     const todayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1

//     profile.availability.selectedSlots.forEach((slot) => {
//       const [dayOffsetStr, time] = slot.split("-")
//       const dayOffset = parseInt(dayOffsetStr)

//       for (let weekOffset = 0; weekOffset < 2; weekOffset++) {
//         const targetDate = new Date(now)
//         let daysToAdd = dayOffset - todayIndex + weekOffset * 7
//         if (daysToAdd < 0 && weekOffset === 0) continue
//         targetDate.setDate(now.getDate() + daysToAdd)

//         const dateString = targetDate.toISOString().split("T")[0]
//         if (!datesObj[dateString]) datesObj[dateString] = []
//         if (!datesObj[dateString].includes(time)) {
//           datesObj[dateString].push(time)
//         }
//       }
//     })

//     Object.keys(datesObj).forEach((date) => {
//       datesObj[date].sort()
//     })

//     return {
//       dates: Object.keys(datesObj).sort(),
//       times: datesObj,
//     }
//   }

//   // Computed values
//   const bireyselServices = profile?.services.filter((s) => s.meetingType === "1-1" && s.status === "active") || []
//   const grupServices = profile?.services.filter((s) => s.meetingType === "grup" && s.status === "active") || []
//   const paketServices = profile?.packages.filter((p) => p.isAvailable && p.status === "active") || []

//   const currentServices =
//     serviceType === "bireysel" ? bireyselServices : serviceType === "grup" ? grupServices : paketServices

//   const selectedServiceData = currentServices.find((s) => s.id === selectedService)

//   const { dates: availableDates, times: availableTimesMap } = getAvailableDatesAndTimes()
//   const availableTimes = selectedDate ? availableTimesMap[selectedDate] || [] : []

//   const socialIcons = [
//     {
//       name: "Website",
//       icon: Globe,
//       url: profile?.socialMedia.website,
//       color: "text-green-600 hover:text-green-700",
//     },
//     {
//       name: "Instagram",
//       icon: Instagram,
//       url: profile?.socialMedia.instagram,
//       color: "text-pink-500 hover:text-pink-600",
//     },
//     {
//       name: "Facebook",
//       icon: Facebook,
//       url: profile?.socialMedia.facebook,
//       color: "text-blue-600 hover:text-blue-700",
//     },
//     {
//       name: "Twitter",
//       icon: Twitter,
//       url: profile?.socialMedia.twitter,
//       color: "text-sky-500 hover:text-sky-600",
//     },
//     {
//       name: "YouTube",
//       icon: Youtube,
//       url: profile?.socialMedia.youtube,
//       color: "text-red-500 hover:text-red-600",
//     },
//     {
//       name: "LinkedIn",
//       icon: Linkedin,
//       url: profile?.socialMedia.linkedin,
//       color: "text-blue-700 hover:text-blue-800",
//     },
//     {
//       name: "TikTok",
//       icon: User,
//       url: profile?.socialMedia.tiktok,
//       color: "text-black hover:text-gray-800",
//     },
//   ].filter((social) => social.url)

//   const handleServiceTypeChange = (newType: string) => {
//     setServiceType(newType)
//     setSelectedService("")
//     setSelectedDate(new Date().toISOString().split("T")[0])
//     setSelectedTime(new Date().toISOString().split("T")[1].substring(0, 5))
//   }

//   const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const files = Array.from(event.target.files || [])
//     const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
//     const validFiles = files.filter(file => {
//       if (file.size > MAX_FILE_SIZE) {
//         alert(`${file.name} dosyası çok büyük. Maksimum dosya boyutu 5MB olmalıdır.`)
//         return false
//       }
//       return true
//     })
//     setUploadedFiles((prev) => [...prev, ...validFiles])
//   }

//   const removeFile = (index: number) => {
//     setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
//   }

//   const subtotal = selectedServiceData
//     ? "price" in selectedServiceData
//       ? typeof selectedServiceData.price === "string"
//         ? parseInt(selectedServiceData.price)
//         : selectedServiceData.price
//       : 0
//     : 0
//   const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discount) / 100) : 0
//   const total = subtotal - discount

//   const nextForm = () => {
//     if (!profile?.forms.length) return
//     setCurrentFormIndex((prev) => (prev + 1) % profile.forms.length)
//   }

//   const prevForm = () => {
//     if (!profile?.forms.length) return
//     setCurrentFormIndex((prev) => (prev - 1 + profile.forms.length) % profile.forms.length)
//   }

//   // Loading state
//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" >
//         <div className="text-xl" > Yükleniyor...</div>
//       </div>
//     )
//   }

//   // No profile found
//   if (!profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center" >
//         <div className="text-xl" > Uzman bilgileri bulunamadı.</div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 font-sans" >
//       <div className="max-w-6xl mx-auto px-4" >
//         {/* Header */}
//         < div className="text-center mb-8" >
//           <h1 className="text-3xl font-bold text-gray-900 mb-2" > Randevunuzu Alın </h1>
//           < p className="text-gray-600" > Nitelikli bir uzmanla seansınızı planlayın </p>
//         </div>
//         < div className="grid lg:grid-cols-3 gap-8" >
//           {/* Provider Information */}
//           < div className="lg:col-span-1" >
//             <Card className="sticky top-8" >
//               <CardHeader className="text-center" >
//                 <Avatar className="w-24 h-24 mx-auto mb-4" >
//                   <AvatarImage
//                     src={profile.pp || "/placeholder.svg"}
//                     alt={`${profile.information.name} ${profile.information.surname}`
//                     }
//                   />
//                   <AvatarFallback>
//                     {profile.information.name[0]} {profile.information.surname[0]}
//                   </AvatarFallback>
//                 </Avatar>
//                 < CardTitle className="text-xl" >
//                   {profile.information.name} {profile.information.surname}
//                 </CardTitle>
//                 < CardDescription className="text-base" >
//                   {
//                     profile?.titles?.length
//                       ? profile.titles.map(t => t.title).join(" | ")
//                       : profile?.title
//                   }
//                 </CardDescription>
//                 < div className="flex items-center justify-center gap-2 mt-2" >
//                   <div className="flex items-center" >
//                     <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                     <span className="ml-1 font-medium" > {profile.star || 4.5} </span>
//                   </div>
//                 </div>
//               </CardHeader>
//               < CardContent className="space-y-4" >
//                 <div className="flex items-center gap-2 text-sm text-gray-600" >
//                   <MapPin className="w-4 h-4 text-green-500" />
//                   <span>{profile.information.address} </span>
//                 </div>
//                 < div className="flex items-center gap-2 text-sm text-gray-600" >
//                   <Phone className="w-4 h-4 text-blue-500" />
//                   <span>{profile.information.phone} </span>
//                 </div>
//                 < div className="flex items-center gap-2 text-sm text-gray-600" >
//                   <Mail className="w-4 h-4 text-red-500" />
//                   <span>{profile.information.email} </span>
//                 </div>

//                 {/* Social Media Icons */}
//                 {
//                   socialIcons.length > 0 && (
//                     <div className="flex items-center gap-3 justify-center pt-2" >
//                       {
//                         socialIcons.map((social) => (
//                           <a
//                             key={social.name}
//                             href={social.url}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             className={`transition-colors ${social.color}`}
//                             title={social.name}
//                           >
//                             <social.icon className="w-5 h-5" />
//                           </a>
//                         ))
//                       }
//                     </div>
//                   )}

//                 <Separator />

//                 < div >
//                   <h4 className="font-medium mb-2" > Hakkında </h4>
//                   < p className="text-sm text-gray-600 leading-relaxed mb-4" > {profile.information.about} </p>

//                   {/* Education */}
//                   {
//                     profile.resume.education.length > 0 && (
//                       <div className="mb-4" >
//                         <h5 className="font-medium text-sm mb-2 flex items-center gap-2" >
//                           <GraduationCap className="w-4 h-4 text-purple-500" />
//                           Eğitim
//                         </h5>
//                         < ul className="text-xs text-gray-600 space-y-1" >
//                           {
//                             profile.resume.education.map((edu) => (
//                               <li key={edu.id} className="leading-relaxed" >
//                                 • {edu.name}, {edu.department}({edu.graduationYear})
//                               </li>
//                             ))
//                           }
//                         </ul>
//                       </div>
//                     )
//                   }

//                   {/* Experience */}
//                   {
//                     profile.experience.length > 0 && (
//                       <div className="mb-4" >
//                         <h5 className="font-medium text-sm mb-2 flex items-center gap-2" >
//                           <Briefcase className="w-4 h-4 text-blue-500" />
//                           Deneyim
//                         </h5>
//                         < ul className="text-xs text-gray-600 space-y-1" >
//                           {
//                             profile.experience.map((exp) => (
//                               <li key={exp.id} className="leading-relaxed" >
//                                 • {exp.position} @{exp.company}({exp.start} - {exp.stillWork ? "Devam ediyor" : exp.end})
//                               </li>
//                             ))
//                           }
//                         </ul>
//                       </div>
//                     )
//                   }

//                   {/* Certificates */}
//                   {
//                     profile.certificates.length > 0 && (
//                       <div className="mb-4" >
//                         <h5 className="font-medium text-sm mb-2 flex items-center gap-2" >
//                           <Award className="w-4 h-4 text-yellow-500" />
//                           Sertifikalar
//                         </h5>
//                         < ul className="text-xs text-gray-600 space-y-1" >
//                           {
//                             profile.certificates.map((cert) => (
//                               <li key={cert.id} className="leading-relaxed" >
//                                 • {cert.name}({cert.company})
//                               </li>
//                             ))
//                           }
//                         </ul>
//                       </div>
//                     )
//                   }

//                   {/* Forms */}
//                   {
//                     profile.forms.length > 0 && (
//                       <div className="mb-4" >
//                         <h5 className="font-medium text-sm mb-2 flex items-center gap-2" >
//                           <FileCheck className="w-4 h-4 text-green-500" />
//                           Formlar
//                         </h5>
//                         < div className="relative" >
//                           <div className="bg-gray-50 rounded-lg p-3 border" >
//                             <div className="flex items-center justify-between mb-2" >
//                               <h6 className="font-medium text-xs text-gray-800" >
//                                 {profile.forms[currentFormIndex].title}
//                               </h6>
//                               < div className="flex items-center gap-1" >
//                                 <button
//                                   onClick={prevForm}
//                                   className="p-1 hover:bg-gray-200 rounded transition-colors"
//                                   disabled={profile.forms.length <= 1}
//                                 >
//                                   <ChevronLeft className="w-3 h-3 text-gray-500" />
//                                 </button>
//                                 < span className="text-xs text-gray-500 px-2" >
//                                   {currentFormIndex + 1
//                                   }/{profile.forms.length}
//                                 </span>
//                                 < button
//                                   onClick={nextForm}
//                                   className="p-1 hover:bg-gray-200 rounded transition-colors"
//                                   disabled={profile.forms.length <= 1}
//                                 >
//                                   <ChevronRight className="w-3 h-3 text-gray-500" />
//                                 </button>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                 </div>
//               </CardContent>
//             </Card>
//           </div>

//           {/* Booking Form */}
//           <form onSubmit={handleBooking} className="lg:col-span-2 space-y-6" >
//             {/* Service Selection with Tabs */}
//             < Card >
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2" >
//                   <User className="w-5 h-5 text-indigo-500" />
//                   Hizmet Seçin
//                 </CardTitle>
//                 {
//                   validationErrors.service && (
//                     <p className="text-sm text-red-500 mt-1" > {validationErrors.service} </p>
//                   )
//                 }
//               </CardHeader>
//               < CardContent >
//                 <Tabs value={serviceType} onValueChange={handleServiceTypeChange} className="w-full" >
//                   <TabsList className="grid w-full grid-cols-3" >
//                     <TabsTrigger value="bireysel" className="flex items-center gap-2" >
//                       <User className="w-4 h-4" />
//                       Bireysel
//                     </TabsTrigger>
//                     < TabsTrigger value="grup" className="flex items-center gap-2" >
//                       <Users className="w-4 h-4" />
//                       Grup
//                     </TabsTrigger>
//                     < TabsTrigger value="paket" className="flex items-center gap-2" >
//                       <Package className="w-4 h-4" />
//                       Paket
//                     </TabsTrigger>
//                   </TabsList>

//                   < TabsContent value="bireysel" className="mt-4" >
//                     <div className="grid gap-3" >
//                       {
//                         bireyselServices.length === 0 ? (
//                           <p className="text-center text-gray-500 py-4" > Bireysel hizmet bulunmamaktadır.</p>
//                         ) : (
//                           bireyselServices.map((service) => (
//                             <div
//                               key={service.id}
//                               className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedService === service.id
//                                 ? "border-primary bg-green-50"
//                                 : "border-gray-200 hover:border-gray-300"
//                                 }`}
//                               onClick={() => setSelectedService(service.id)}
//                             >
//                               <div className="flex justify-between items-start" >
//                                 <div className="flex items-center gap-3" >
//                                   <div
//                                     className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
//                                     style={{ backgroundColor: service.iconBg }}
//                                   >
//                                     {service.icon}
//                                   </div>
//                                   < div >
//                                     <h4 className="font-medium" > {service.title} </h4>
//                                     < p className="text-sm text-gray-600 mt-1" > {service.duration} dakika </p>
//                                     < p className="text-xs text-gray-500 mt-1" > {service.description} </p>
//                                   </div>
//                                 </div>
//                                 < Badge variant="secondary" > {parseInt(service.price)} TL </Badge>

//                               </div>
//                             </div>
//                           ))
//                         )}
//                     </div>
//                   </TabsContent>

//                   < TabsContent value="grup" className="mt-4" >
//                     <div className="grid gap-3" >
//                       {
//                         grupServices.length === 0 ? (
//                           <p className="text-center text-gray-500 py-4" > Grup hizmeti bulunmamaktadır.</p>
//                         ) : (
//                           grupServices.map((service) => (
//                             <div
//                               key={service.id}
//                               className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedService === service.id
//                                 ? "border-primary bg-green-50"
//                                 : "border-gray-200 hover:border-gray-300"
//                                 }`}
//                               onClick={() => setSelectedService(service.id)}
//                             >
//                               <div className="flex justify-between items-start" >
//                                 <div className="flex items-center gap-3" >
//                                   <div
//                                     className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
//                                     style={{ backgroundColor: service.iconBg }}
//                                   >
//                                     {service.icon}
//                                   </div>
//                                   < div className="space-y-2" >
//                                     <h4 className="font-medium" > {service.title} </h4>
//                                     < div className="flex items-center gap-4 text-sm text-gray-600" >
//                                       <span>{service.duration} dakika </span>
//                                       {
//                                         service.maxAttendees && (
//                                           <span className="flex items-center gap-1">
//                                             <Users className="w-3 h-3" />
//                                             Maks {service.maxAttendees} kişi
//                                           </span>
//                                         )}
//                                     </div>
//                                     {
//                                       service.date && service.time && (
//                                         <div className="flex items-center gap-4 text-sm text-gray-600">
//                                           <span className="flex items-center gap-1">
//                                             <Calendar className="w-3 h-3 text-orange-500" />
//                                             {new Date(service.date).toLocaleDateString("tr-TR")}
//                                           </span>
//                                           < span className="flex items-center gap-1" >
//                                             <Clock className="w-3 h-3 text-teal-500" />
//                                             {service.time}
//                                           </span>
//                                         </div>
//                                       )}
//                                     <p className="text-xs text-gray-500" > {service.description} </p>
//                                   </div>
//                                 </div>
//                                 < Badge variant="secondary" > {parseInt(service.price)} TL </Badge>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                     </div>
//                   </TabsContent>

//                   < TabsContent value="paket" className="mt-4" >
//                     <div className="grid gap-3" >
//                       {
//                         paketServices.length === 0 ? (
//                           <p className="text-center text-gray-500 py-4" > Paket hizmeti bulunmamaktadır.</p>
//                         ) : (
//                           paketServices.map((service) => (
//                             <div
//                               key={service.id}
//                               className={`p-4 border rounded-lg cursor-pointer transition-colors ${selectedService === service.id
//                                 ? "border-primary bg-green-50"
//                                 : "border-gray-200 hover:border-gray-300"
//                                 }`}
//                               onClick={() => setSelectedService(service.id)}
//                             >
//                               <div className="flex justify-between items-start" >
//                                 <div className="flex items-center gap-3" >
//                                   <div
//                                     className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
//                                     style={{ backgroundColor: service.iconBg }}
//                                   >
//                                     {service.icon}
//                                   </div>
//                                   < div className="space-y-2" >
//                                     <h4 className="font-medium" > {service.title} </h4>
//                                     < p className="text-sm text-gray-600" >
//                                       {service.duration} dakika x {service.sessionsIncluded} seans
//                                     </p>
//                                     {
//                                       service.originalPrice && (
//                                         <div className="flex items-center gap-2">
//                                           <span className="text-xs text-gray-500 line-through">
//                                             {service.originalPrice} TL
//                                           </ span >
//                                           <Badge variant="destructive" className="text-xs" >
//                                             %
//                                             {
//                                               Math.round(
//                                                 ((service.originalPrice - service.price) / service.originalPrice) * 100
//                                               )
//                                             }{" "}
//                                             İndirim
//                                           </Badge>
//                                         </div>
//                                       )}
//                                     <p className="text-xs text-gray-500" > {service.description} </p>
//                                   </div>
//                                 </div>
//                                 < Badge variant="secondary" > {service.price} TL </Badge>
//                               </div>
//                             </div>
//                           ))
//                         )}
//                     </div>
//                   </TabsContent>
//                 </Tabs>
//               </CardContent>
//             </Card>

//             {/* Date & Time Selection - Only for Bireysel */}
//             {
//               serviceType === "bireysel" && selectedService && (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center gap-2" >
//                       <Calendar className="w-5 h-5 text-orange-500" />
//                       Tarih ve Saat Seçin
//                     </CardTitle>
//                   </CardHeader>
//                   < CardContent className="space-y-4" >
//                     <div>
//                       <Label htmlFor="date" > Uygun Tarihler * </Label>
//                       < Select value={selectedDate} onValueChange={setSelectedDate} >
//                         <SelectTrigger className={validationErrors.date ? "border-red-500" : ""}>
//                           <SelectValue placeholder="Bir tarih seçin" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {
//                             availableDates.map((date) => (
//                               <SelectItem key={date} value={date} >
//                                 {
//                                   new Date(date).toLocaleDateString("tr-TR", {
//                                     weekday: "long",
//                                     year: "numeric",
//                                     month: "long",
//                                     day: "numeric",
//                                   })
//                                 }
//                               </SelectItem>
//                             ))
//                           }
//                         </SelectContent>
//                       </Select>
//                       {
//                         validationErrors.date && (
//                           <p className="text-sm text-red-500 mt-1" > {validationErrors.date} </p>
//                         )
//                       }
//                     </div>

//                     {
//                       selectedDate && (
//                         <div>
//                           <Label>Uygun Saatler * </Label>
//                           < div className="grid grid-cols-3 gap-2 mt-2" >
//                             {
//                               availableTimes.map((time) => (
//                                 <Button
//                                   key={time}
//                                   type="button"
//                                   variant={selectedTime === time ? "default" : "outline"}
//                                   size="sm"
//                                   onClick={() => setSelectedTime(time)
//                                   }
//                                   className="justify-center"
//                                 >
//                                   <Clock className="w-4 h-4 mr-1 text-teal-500" />
//                                   {time}
//                                 </Button>
//                               ))
//                             }
//                           </div>
//                           {
//                             validationErrors.time && (
//                               <p className="text-sm text-red-500 mt-1" > {validationErrors.time} </p>
//                             )
//                           }
//                         </div>
//                       )}
//                   </CardContent>
//                 </Card>
//               )}

//             {/* Client Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Bilgileriniz </CardTitle>
//               </CardHeader>
//               < CardContent className="space-y-4" >
//                 <div className="grid grid-cols-2 gap-4" >
//                   <div>
//                     <Label htmlFor="firstName" > Ad * </Label>
//                     < Input
//                       id="firstName"
//                       name="firstName"
//                       value={clientInfo.firstName}
//                       onChange={(e) => setClientInfo((prev) => ({ ...prev, firstName: e.target.value }))}
//                       placeholder="Adınızı girin"
//                       className={validationErrors.firstName ? "border-red-500" : ""}
//                       required
//                     />
//                     {
//                       validationErrors.firstName && (
//                         <p className="text-sm text-red-500 mt-1"> {validationErrors.firstName} </p>
//                       )
//                     }
//                   </div>
//                   < div >
//                     <Label htmlFor="lastName" > Soyad * </Label>
//                     < Input
//                       id="lastName"
//                       name="lastName"
//                       value={clientInfo.lastName}
//                       onChange={(e) => setClientInfo((prev) => ({ ...prev, lastName: e.target.value }))}
//                       placeholder="Soyadınızı girin"
//                       className={validationErrors.lastName ? "border-red-500" : ""}
//                       required
//                     />
//                     {
//                       validationErrors.lastName && (
//                         <p className="text-sm text-red-500 mt-1"> {validationErrors.lastName} </p>
//                       )
//                     }
//                   </div>
//                 </div>
//                 < div >
//                   <Label htmlFor="email" > E - posta * </Label>
//                   < Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     value={clientInfo.email}
//                     onChange={(e) => setClientInfo((prev) => ({ ...prev, email: e.target.value }))}
//                     placeholder="E-posta adresinizi girin"
//                     className={validationErrors.email ? "border-red-500" : ""}
//                     required
//                   />
//                   {
//                     validationErrors.email && (
//                       <p className="text-sm text-red-500 mt-1"> {validationErrors.email} </p>
//                     )
//                   }
//                 </div>
//                 < div >
//                   <Label htmlFor="phone" > Telefon Numarası * </Label>
//                   < Input
//                     id="phone"
//                     name="phone"
//                     type="tel"
//                     value={clientInfo.phone}
//                     onChange={(e) => setClientInfo((prev) => ({ ...prev, phone: e.target.value }))}
//                     placeholder="Telefon numaranızı girin"
//                     className={validationErrors.phone ? "border-red-500" : ""}
//                     required
//                   />
//                   {
//                     validationErrors.phone && (
//                       <p className="text-sm text-red-500 mt-1"> {validationErrors.phone} </p>
//                     )
//                   }
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Order Notes & Files */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2" >
//                   <FileText className="w-5 h-5 text-cyan-500" />
//                   Ek Bilgiler
//                 </CardTitle>
//               </CardHeader>
//               < CardContent className="space-y-4" >
//                 <div>
//                   <Label htmlFor="notes" > Sipariş Notları(İsteğe Bağlı) </Label>
//                   < Textarea
//                     id="notes"
//                     name="notes"
//                     value={orderNotes}
//                     onChange={(e) => setOrderNotes(e.target.value)}
//                     placeholder="Özel gereksinimleriniz veya paylaşmak istediğiniz bilgiler..."
//                     className="min-h-[100px]"
//                   />
//                 </div>
//                 < div >
//                   <Label htmlFor="files" > Dosya Yükle(İsteğe Bağlı) </Label>
//                   < div className="mt-2" >
//                     <Input
//                       id="files"
//                       type="file"
//                       multiple
//                       onChange={handleFileUpload}
//                       className="hidden"
//                       accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       onClick={() => document.getElementById("files")?.click()}
//                       className="w-full"
//                     >
//                       <Upload className="w-4 h-4 mr-2 text-emerald-500" />
//                       Dosya Seç
//                     </Button>
//                   </div>
//                   {
//                     uploadedFiles.length > 0 && (
//                       <div className="mt-3 space-y-2" >
//                         {
//                           uploadedFiles.map((file, index) => (
//                             <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded" >
//                               <span className="text-sm truncate flex-1 mr-2" > {file.name} </span>
//                               < Button
//                                 type="button"
//                                 variant="ghost"
//                                 size="sm"
//                                 onClick={() => removeFile(index)}
//                               >
//                                 Kaldır
//                               </Button>
//                             </div>
//                           ))
//                         }
//                       </div>
//                     )}
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Payment Information */}
//             <Card>
//               <CardHeader>
//                 <CardTitle className="flex items-center gap-2" >
//                   <CreditCard className="w-5 h-5 text-violet-500" />
//                   Ödeme Bilgileri
//                 </CardTitle>
//               </CardHeader>
//               < CardContent className="space-y-4" >
//                 <div>
//                   <Label htmlFor="cardNumber" > Kart Numarası * </Label>
//                   < Input
//                     id="cardNumber"
//                     name="cardNumber"
//                     value={paymentInfo.cardNumber}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
//                       const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
//                       setPaymentInfo((prev) => ({ ...prev, cardNumber: formatted }))
//                     }}
//                     placeholder="1234 5678 9012 3456"
//                     maxLength={19}
//                     className={validationErrors.cardNumber ? "border-red-500" : ""}
//                     required
//                   />
//                   {
//                     validationErrors.cardNumber && (
//                       <p className="text-sm text-red-500 mt-1"> {validationErrors.cardNumber} </p>
//                     )
//                   }
//                 </div>
//                 < div className="grid grid-cols-3 gap-4" >
//                   <div className="col-span-2" >
//                     <Label htmlFor="expiryDate" > Son Kullanma Tarihi * </Label>
//                     < Input
//                       id="expiryDate"
//                       name="expiryDate"
//                       value={paymentInfo.expiryDate}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, '');
//                         let formatted = value;
//                         if (value.length >= 2) {
//                           formatted = value.slice(0, 2) + '/' + value.slice(2, 4);
//                         }
//                         setPaymentInfo((prev) => ({ ...prev, expiryDate: formatted }))
//                       }}
//                       placeholder="MM/YY"
//                       maxLength={5}
//                       className={validationErrors.expiryDate ? "border-red-500" : ""}
//                       required
//                     />
//                     {
//                       validationErrors.expiryDate && (
//                         <p className="text-sm text-red-500 mt-1"> {validationErrors.expiryDate} </p>
//                       )
//                     }
//                   </div>
//                   < div >
//                     <Label htmlFor="cvv" > CVV * </Label>
//                     < Input
//                       id="cvv"
//                       name="cvv"
//                       type="password"
//                       value={paymentInfo.cvv}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/\D/g, '');
//                         setPaymentInfo((prev) => ({ ...prev, cvv: value }))
//                       }}
//                       placeholder="123"
//                       maxLength={4}
//                       className={validationErrors.cvv ? "border-red-500" : ""}
//                       required
//                     />
//                     {
//                       validationErrors.cvv && (
//                         <p className="text-sm text-red-500 mt-1"> {validationErrors.cvv} </p>
//                       )
//                     }
//                   </div>
//                 </div>
//                 < div >
//                   <Label htmlFor="nameOnCard" > Kart Üzerindeki İsim * </Label>
//                   < Input
//                     id="nameOnCard"
//                     name="nameOnCard"
//                     value={paymentInfo.nameOnCard}
//                     onChange={(e) => setPaymentInfo((prev) => ({ ...prev, nameOnCard: e.target.value.toUpperCase() }))}
//                     placeholder="KARTTA YAZAN İSİM"
//                     className={validationErrors.nameOnCard ? "border-red-500" : ""}
//                     required
//                   />
//                   {
//                     validationErrors.nameOnCard && (
//                       <p className="text-sm text-red-500 mt-1"> {validationErrors.nameOnCard} </p>
//                     )
//                   }
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Booking Summary & Submit */}
//             <Card>
//               <CardHeader>
//                 <CardTitle>Rezervasyon Özeti </CardTitle>
//               </CardHeader>
//               < CardContent className="space-y-4" >
//                 {selectedServiceData && (
//                   <div className="space-y-3" >
//                     <div className="flex justify-between items-center" >
//                       <span className="font-medium" > {selectedServiceData.title} </span>
//                       < span className="font-medium" > {subtotal} TL </span>
//                     </div>
//                     {
//                       serviceType === "bireysel" && selectedDate && selectedTime && (
//                         <div className="flex justify-between items-center text-sm text-gray-600" >
//                           <span>Tarih ve Saat </span>
//                           <span>
//                             {new Date(selectedDate).toLocaleDateString("tr-TR")} - {selectedTime}
//                           </span>
//                         </div>
//                       )
//                     }
//                     {
//                       serviceType === "grup" && "date" in selectedServiceData && selectedServiceData.date && (
//                         <div className="flex justify-between items-center text-sm text-gray-600" >
//                           <span>Tarih ve Saat </span>
//                           <span>
//                             {new Date(selectedServiceData.date).toLocaleDateString("tr-TR")} - {selectedServiceData.time}
//                           </span>
//                         </div>
//                       )
//                     }
//                     {
//                       serviceType === "paket" && (
//                         <div className="space-y-2" >
//                           {
//                             "sessionsIncluded" in selectedServiceData && (
//                               <div className="flex justify-between items-center text-sm text-gray-600">
//                                 <span>Paket İçeriği</ span >
//                                 <span>{selectedServiceData.sessionsIncluded} seans </span>
//                               </div>
//                             )
//                           }
//                           <div className="flex justify-between items-center text-sm text-gray-600" >
//                             <span>Başlangıç Tarihi </span>
//                             < span > {new Date().toLocaleDateString("tr-TR")} </span>
//                           </div>
//                         </div>
//                       )}
//                   </div>
//                 )}

//                 {/* Coupon Code Section */}
//                 <div className="space-y-3" >
//                   <Label className="text-sm font-medium" > Kupon Kodu </Label>
//                   {
//                     !appliedCoupon ? (
//                       <div className="flex gap-2" >
//                         <Input
//                           value={couponCode}
//                           onChange={(e) => setCouponCode(e.target.value.toUpperCase())
//                           }
//                           placeholder="Kupon kodunuzu girin"
//                           className="flex-1"
//                         />
//                         <Button
//                           type="button"
//                           variant="outline"
//                           onClick={applyCoupon}
//                           disabled={!couponCode.trim() || applyingCoupon}
//                           className="px-4 bg-transparent"
//                         >
//                           {
//                             applyingCoupon ? (
//                               <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
//                             ) : (
//                               "Uygula"
//                             )
//                           }
//                         </Button>
//                       </div>
//                     ) : (
//                       <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg" >
//                         <div className="flex items-center gap-2" >
//                           <div className="w-2 h-2 bg-green-500 rounded-full" > </div>
//                           < span className="text-sm font-medium text-green-700" >
//                             {appliedCoupon.code} uygulandı(% {appliedCoupon.discount} indirim)
//                           </span>
//                         </div>
//                         < Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={removeCoupon}
//                           className="text-green-700 hover:text-green-800"
//                         >
//                           Kaldır
//                         </Button>
//                       </div>
//                     )}
//                 </div>

//                 < Separator />

//                 {selectedServiceData && (
//                   <div className="space-y-2" >
//                     <div className="flex justify-between items-center" >
//                       <span>Ara Toplam </span>
//                       < span > {subtotal} TL </span>
//                     </div>
//                     {
//                       appliedCoupon && (
//                         <div className="flex justify-between items-center text-green-600" >
//                           <span>İndirim({appliedCoupon.code}) </span>
//                           < span > -{discount} TL </span>
//                         </div>
//                       )
//                     }
//                     <Separator />
//                     < div className="flex justify-between items-center text-lg font-semibold" >
//                       <span>Toplam </span>
//                       < span > {total} TL </span>
//                     </div>
//                   </div>
//                 )}

//                 {/* Terms and Conditions */}
//                 <div className="flex items-start space-x-2 pt-4" >
//                   <Checkbox
//                     id="terms"
//                     checked={termsAccepted}
//                     onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
//                     className={validationErrors.terms ? "border-red-500" : ""}
//                   />
//                   <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer" >
//                     <a href="/terms" target="_blank" className="underline" > Mesafeli Satış Sözleşmesi </a>,
//                     < a href="/privacy" target="_blank" className="underline ml-1" > Ön Bilgilendirme Formu </a>,
//                     < a href="/kvkk" target="_blank" className="underline ml-1" > KVKK Aydınlatma ve Açık Rıza Metni </a>'ni kabul
//                     ediyorum
//                   </Label>
//                 </div>
//                 {
//                   validationErrors.terms && (
//                     <p className="text-sm text-red-500" > {validationErrors.terms} </p>
//                   )
//                 }

//                 <Button
//                   type="submit"
//                   disabled={submitting || !selectedService}
//                   className="w-full bg-primary hover:bg-primary/90"
//                   size="lg"
//                 >
//                   {
//                     submitting ? (
//                       <>
//                         <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//                         İşleniyor...
//                       </>
//                     ) : (
//                       "Rezervasyonu Tamamla"
//                     )}
//                 </Button>

//                 {/* General error message */}
//                 {
//                   Object.keys(validationErrors).length > 0 && (
//                     <div className="p-3 bg-red-50 border border-red-200 rounded-lg" >
//                       <p className="text-sm text-red-600" >
//                         Lütfen tüm zorunlu alanları doldurun ve hataları düzeltin.
//                       </p>
//                     </div>
//                   )
//                 }
//               </CardContent>
//             </Card>
//           </form>
//         </div>

//         {/* Blog Posts Section - Only show if there are blog posts */}
//         {
//           profile.blogCount > 0 && (
//             <div className="mt-16 mb-8" >
//               <div className="text-center mb-8" >
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2" > Blog Yazıları </h2>
//                 < p className="text-gray-600" > Uzmanımızın paylaştığı faydalı içerikler </p>
//               </div>
//               {/* Blog carousel would go here when blog data is available */}
//             </div>
//           )
//         }

//         {/* Recent Events Section */}
//         {
//           profile.events.length > 0 && (
//             <div className="mt-16 mb-8" >
//               <div className="text-center mb-8" >
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2" > Yaklaşan Etkinlikler </h2>
//                 < p className="text-gray-600" > Uzmanımızın düzenlediği etkinlikler </p>
//               </div>
//               < div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" >
//                 {
//                   profile.events
//                     .filter((event) => event.status === "approved")
//                     .slice(0, 3)
//                     .map((event) => (
//                       <Card key={event.id} className="hover:shadow-lg transition-shadow" >
//                         <CardHeader>
//                           <CardTitle className="text-lg" > {event.title} </CardTitle>
//                           <CardDescription>
//                             {new Date(event.date).toLocaleDateString("tr-TR")} - {event.time}
//                           </CardDescription>
//                         </CardHeader>
//                         < CardContent >
//                           <div className="space-y-2 text-sm" >
//                             <div className="flex justify-between" >
//                               <span className="text-gray-600" > Süre: </span>
//                               < span > {event.duration} dakika </span>
//                             </div>
//                             < div className="flex justify-between" >
//                               <span className="text-gray-600" > Fiyat: </span>
//                               < span className="font-medium" > {event.price} TL </span>
//                             </div>
//                             < div className="flex justify-between" >
//                               <span className="text-gray-600" > Tür: </span>
//                               < Badge variant="outline" > {event.meetingType === "1-1" ? "Birebir" : "Grup"} </Badge>
//                             </div>
//                             {
//                               event.location && (
//                                 <div className="flex justify-between">
//                                   <span className="text-gray-600"> Konum:</span>
//                                   < span className="text-right text-xs" > {event.location} </span>
//                                 </div>
//                               )
//                             }
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))
//                 }
//               </div>
//             </div>
//           )}

//         {/* Service Details Dialog */}
//         {
//           selectedServiceData && (
//             <Dialog open={serviceDetailsDialogOpen} onOpenChange={setServiceDetailsDialogOpen} >
//               <DialogContent className="max-w-2xl" >
//                 <DialogHeader>
//                   <DialogTitle className="flex items-center gap-3" >
//                     <div
//                       className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
//                       style={{ backgroundColor: selectedServiceData.iconBg }
//                       }
//                     >
//                       {selectedServiceData.icon}
//                     </div>
//                     {selectedServiceData.title}
//                   </DialogTitle>
//                   < DialogDescription > {selectedServiceData.description} </DialogDescription>
//                 </DialogHeader>
//                 < div className="space-y-4 mt-4" >
//                   <div className="grid grid-cols-2 gap-4" >
//                     <div>
//                       <h4 className="font-medium text-sm text-gray-600" > Süre </h4>
//                       < p className="text-lg" >
//                         {"duration" in selectedServiceData ? selectedServiceData.duration : "N/A"} dakika
//                       </p>
//                     </div>
//                     < div >
//                       <h4 className="font-medium text-sm text-gray-600" > Fiyat </h4>
//                       < p className="text-lg font-semibold" >
//                         {
//                           "price" in selectedServiceData
//                             ? typeof selectedServiceData.price === "string"
//                               ? parseInt(selectedServiceData.price)
//                               : selectedServiceData.price
//                             : 0
//                         } TL
//                       </p>
//                     </div>
//                     {
//                       "sessionsIncluded" in selectedServiceData && (
//                         <div>
//                           <h4 className="font-medium text-sm text-gray-600" > Seans Sayısı </h4>
//                           < p className="text-lg" > {selectedServiceData.sessionsIncluded} seans </p>
//                         </div>
//                       )
//                     }
//                     {
//                       "maxAttendees" in selectedServiceData && selectedServiceData.maxAttendees && (
//                         <div>
//                           <h4 className="font-medium text-sm text-gray-600" > Maksimum Katılımcı </h4>
//                           < p className="text-lg" > {selectedServiceData.maxAttendees} kişi </p>
//                         </div>
//                       )
//                     }
//                   </div>

//                   {
//                     "eventType" in selectedServiceData && (
//                       <div>
//                         <h4 className="font-medium text-sm text-gray-600 mb-2" > Etkinlik Detayları </h4>
//                         < div className="space-y-2" >
//                           <div className="flex items-center gap-2" >
//                             <Badge variant="outline" >
//                               {
//                                 selectedServiceData.eventType === "online"
//                                   ? "Online"
//                                   : selectedServiceData.eventType === "offline"
//                                     ? "Yüz yüze"
//                                     : "Hibrit"
//                               }
//                             </Badge>
//                             {
//                               selectedServiceData.platform && (
//                                 <Badge variant="secondary" > {selectedServiceData.platform} </Badge>
//                               )
//                             }
//                           </div>
//                           {
//                             selectedServiceData.location && (
//                               <p className="text-sm text-gray-600" >
//                                 <MapPin className="w-4 h-4 inline mr-1" />
//                                 {selectedServiceData.location}
//                               </p>
//                             )
//                           }
//                         </div>
//                       </div>
//                     )
//                   }

//                   {
//                     "category" in selectedServiceData && (
//                       <div>
//                         <h4 className="font-medium text-sm text-gray-600" > Kategori </h4>
//                         < Badge className="mt-1" > {selectedServiceData.category} </Badge>
//                       </div>
//                     )
//                   }
//                 </div>
//                 < div className="flex justify-end mt-6" >
//                   <Button
//                     variant="outline"
//                     onClick={() => setServiceDetailsDialogOpen(false)}
//                   >
//                     Kapat
//                   </Button>
//                 </div>
//               </DialogContent>
//             </Dialog>
//           )}
//       </div>
//     </div>
//   )
// }

"use client"

import React from 'react'
import { BookingProvider } from '@/components/context/BookingContext'
import { useBookingContext } from '@/components/context/BookingContext'
import { useProviderData } from '@/components/hooks/useProviderData'
import { ProviderCard } from '@/components/ProviderCard'
import { ServiceSelection } from '@/components/ServiceSelection'
import { DateTimeSelection } from '@/components/DateTimeSelection'
import { ClientInformation } from '@/components/ClientInformation'
import { OrderNotes } from '@/components/OrderNotes'
import { PaymentInformation } from '@/components/PaymentInformation'
import { BookingSummary } from '@/components/BookingSummary'
import { EventsSection } from '@/components/EventsSection'
import { ServiceDetailsDialog } from '@/components/ServiceDetailsDialog'
import BlogsSection from '@/components/BlogsSection'

function BookingContent() {
  const { loading, profile, bookingState } = useBookingContext()
  if (loading) { console.log("Loading provider data...") } else {
    console.log("Provider data loaded:", profile);
  }

  // Fetch provider data
  useProviderData()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Yükleniyor...</div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Uzman bilgileri bulunamadı.</div>
      </div>
    )
  }

  // Determine if the selected item is an individual service
  let showDateTimePicker = false;
  if (profile && bookingState.selectedService) {
    const foundService = profile.services.find(s => s.id === bookingState.selectedService.serviceId);
    showDateTimePicker = !!(foundService && foundService.meetingType === "1-1");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 font-sans">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Randevunuzu Alın</h1>
          <p className="text-gray-600">Nitelikli bir uzmanla seansınızı planlayın</p>
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

        {/* Blog Posts Section - Only show if there are blog posts */}
        {(profile?.blogs?.length ?? 0) > 0 && (
          <BlogsSection blogsData={profile.blogs} />
        )}

        {/* Recent Events Section */}
        {/* <EventsSection /> */}

        {/* Service Details Dialog */}
        <ServiceDetailsDialog />
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingContent />
    </BookingProvider>
  )
}

