"use client"

import type React from "react"

import { useState } from "react"
import {
  Calendar,
  Clock,
  CreditCard,
  FileText,
  Upload,
  User,
  Star,
  MapPin,
  Phone,
  Mail,
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  Linkedin,
  GraduationCap,
  Briefcase,
  Award,
  Users,
  Package,
  Info,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  FileCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

// Mock data for demonstration - now in Turkish
const providerData = {
  name: "Dr. Sarah Johnson",
  title: "Lisanslı Klinik Psikolog",
  rating: 4.9,
  reviews: 127,
  location: "İstanbul, Türkiye",
  phone: "+90 (555) 123-4567",
  email: "sarah@zihinwellness.com",
  avatar: "/placeholder.svg?height=120&width=120",
  bio: "Dr. Sarah Johnson, 10 yılı aşkın deneyime sahip lisanslı klinik psikolog olarak bireylerin kaygı, depresyon ve ilişki sorunlarını aşmalarında yardımcı olmaktadır. Bilişsel davranışçı terapi ve farkındalık temelli müdahaleler konularında uzmanlaşmıştır.",
  education: [
    "Doktora - Klinik Psikoloji, İstanbul Üniversitesi (2010)",
    "Yüksek Lisans - Psikoloji, Boğaziçi Üniversitesi (2006)",
    "Lisans - Psikoloji, ODTÜ (2004)",
  ],
  experience: [
    "Baş Psikolog - Özel Zihin Sağlığı Merkezi (2018-Günümüz)",
    "Klinik Psikolog - Acıbadem Hastanesi (2012-2018)",
    "Araştırma Görevlisi - İstanbul Üniversitesi (2010-2012)",
  ],
  certificates: [
    "Bilişsel Davranışçı Terapi Sertifikası - Beck Enstitüsü",
    "EMDR Terapisti Sertifikası - EMDR Derneği",
    "Mindfulness Temelli Stres Azaltma Sertifikası",
  ],
  forms: [
    {
      id: 1,
      title: "Ön Değerlendirme Formu",
      coverImage: "/placeholder.svg?height=80&width=120&text=Form+1",
    },
    {
      id: 2,
      title: "Kaygı Değerlendirme Ölçeği",
      coverImage: "/placeholder.svg?height=80&width=120&text=Form+2",
    },
    {
      id: 3,
      title: "Çift Terapisi Başvuru Formu",
      coverImage: "/placeholder.svg?height=80&width=120&text=Form+3",
    },
    {
      id: 4,
      title: "Haftalık İlerleme Formu",
      coverImage: "/placeholder.svg?height=80&width=120&text=Form+4",
    },
  ],
  blogPosts: [
    {
      id: 1,
      title: "Kaygı ile Başa Çıkma Teknikleri",
      url: "https://example.com/blog/kaygi-ile-basa-cikma",
      coverImage: "/placeholder.svg?height=200&width=300&text=Blog+1",
    },
    {
      id: 2,
      title: "İlişkilerde İletişimin Önemi",
      url: "https://example.com/blog/iliski-iletisim",
      coverImage: "/placeholder.svg?height=200&width=300&text=Blog+2",
    },
    {
      id: 3,
      title: "Stres Yönetimi ve Mindfulness",
      url: "https://example.com/blog/stres-yonetimi",
      coverImage: "/placeholder.svg?height=200&width=300&text=Blog+3",
    },
    {
      id: 4,
      title: "Çocuklarda Davranış Problemleri",
      url: "https://example.com/blog/cocuk-davranis",
      coverImage: "/placeholder.svg?height=200&width=300&text=Blog+4",
    },
    {
      id: 5,
      title: "Depresyonla Başa Çıkma Yolları",
      url: "https://example.com/blog/depresyon-basa-cikma",
      coverImage: "/placeholder.svg?height=200&width=300&text=Blog+5",
    },
    {
      id: 6,
      title: "Aile İçi İletişim Sorunları",
      url: "https://example.com/blog/aile-iletisim",
      coverImage: "/placeholder.svg?height=200&width=300&text=Blog+6",
    },
  ],
  socialMedia: {
    instagram: "https://instagram.com/drsarahjohnson",
    facebook: "https://facebook.com/drsarahjohnson",
    twitter: "https://twitter.com/drsarahjohnson",
    youtube: "https://youtube.com/drsarahjohnson",
    linkedin: "https://linkedin.com/in/drsarahjohnson",
    tiktok: "https://tiktok.com/@drsarahjohnson",
  },
  services: {
    bireysel: [
      {
        id: 1,
        name: "Bireysel Terapi Seansı",
        duration: 50,
        price: 750,
        description:
          "Kişisel sorunlarınızı çözmek için birebir terapi seansı. Kaygı, depresyon, stres yönetimi ve kişisel gelişim konularında profesyonel destek.",
        includes: ["Detaylı değerlendirme", "Kişiselleştirilmiş tedavi planı", "Ev ödevleri", "İlerleme takibi"],
        suitable: ["Kaygı bozuklukları", "Depresyon", "Stres yönetimi", "Kişisel gelişim"],
      },
      {
        id: 2,
        name: "Çift Terapisi Seansı",
        duration: 80,
        price: 1000,
        description: "İlişki sorunlarını çözmek ve iletişimi güçlendirmek için çiftlere yönelik terapi seansı.",
        includes: ["İlişki değerlendirmesi", "İletişim teknikleri", "Çatışma çözme stratejileri", "Ev ödevleri"],
        suitable: ["İletişim sorunları", "Güven problemleri", "Çatışma yönetimi", "İlişki güçlendirme"],
      },
      {
        id: 3,
        name: "İlk Görüşme",
        duration: 30,
        price: 500,
        description:
          "Tanışma ve değerlendirme amaçlı ilk görüşme. Durumunuzu anlayarak size en uygun tedavi planını belirleriz.",
        includes: ["Genel değerlendirme", "Tedavi planı önerisi", "Soru-cevap", "Bilgilendirme"],
        suitable: ["Yeni danışanlar", "Durum değerlendirmesi", "Tedavi planlaması", "Bilgi alma"],
      },
    ],
    grup: [
      {
        id: 4,
        name: "Grup Terapi Seansı",
        duration: 90,
        price: 400,
        maxParticipants: 8,
        scheduledDate: "2024-01-20",
        scheduledTime: "14:00",
        description:
          "Benzer sorunları yaşayan kişilerle birlikte grup halinde terapi seansı. Sosyal destek ve paylaşım odaklı.",
        includes: ["Grup dinamiği", "Paylaşım ortamı", "Sosyal destek", "Grup aktiviteleri"],
        suitable: ["Sosyal kaygı", "Depresyon", "Kişilerarası ilişkiler", "Sosyal beceriler"],
      },
      {
        id: 5,
        name: "Mindfulness Grup Seansı",
        duration: 60,
        price: 300,
        maxParticipants: 12,
        scheduledDate: "2024-01-22",
        scheduledTime: "16:00",
        description: "Farkındalık temelli stres azaltma teknikleri öğrenmek için grup seansı.",
        includes: ["Nefes teknikleri", "Meditasyon", "Farkındalık egzersizleri", "Günlük pratikler"],
        suitable: ["Stres yönetimi", "Kaygı azaltma", "Odaklanma", "İç huzur"],
      },
      {
        id: 6,
        name: "Stres Yönetimi Grubu",
        duration: 75,
        price: 350,
        maxParticipants: 10,
        scheduledDate: "2024-01-25",
        scheduledTime: "18:00",
        description: "Stresle başa çıkma stratejileri öğrenmek için grup çalışması.",
        includes: ["Stres analizi", "Başa çıkma teknikleri", "Zaman yönetimi", "Rahatlama teknikleri"],
        suitable: ["İş stresi", "Günlük stres", "Zaman yönetimi", "Rahatlama"],
      },
    ],
    paket: [
      {
        id: 7,
        name: "Temel Terapi Paketi",
        duration: 50,
        sessions: 8,
        price: 5000,
        originalPrice: 6000,
        description: "8 seanslık temel terapi paketi. Kısa vadeli sorunların çözümü için ideal.",
        includes: ["8 bireysel seans", "Değerlendirme raporu", "Ev ödevleri", "Telefon desteği"],
        suitable: ["Kısa vadeli sorunlar", "Belirli hedefler", "Hızlı çözüm", "Bütçe dostu"],
      },
      {
        id: 8,
        name: "Yoğun Terapi Paketi",
        duration: 50,
        sessions: 12,
        price: 7200,
        originalPrice: 9000,
        description: "12 seanslık yoğun terapi paketi. Derin ve kapsamlı çalışma için.",
        includes: ["12 bireysel seans", "Detaylı değerlendirme", "Kişisel gelişim planı", "Sürekli destek"],
        suitable: ["Derin sorunlar", "Uzun vadeli hedefler", "Kapsamlı değişim", "Sürekli destek"],
      },
      {
        id: 9,
        name: "Çift Terapisi Paketi",
        duration: 80,
        sessions: 6,
        price: 5400,
        originalPrice: 6000,
        description: "6 seanslık çift terapisi paketi. İlişki sorunlarının çözümü için.",
        includes: ["6 çift seansı", "İlişki değerlendirmesi", "İletişim rehberi", "Takip desteği"],
        suitable: ["İlişki sorunları", "İletişim problemleri", "Çift gelişimi", "Uzun vadeli çözüm"],
      },
    ],
  },
  availability: {
    "2024-01-15": ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"],
    "2024-01-16": ["09:00", "10:00", "13:00", "14:00", "15:00"],
    "2024-01-17": ["10:00", "11:00", "14:00", "15:00", "16:00", "17:00"],
    "2024-01-18": ["09:00", "11:00", "13:00", "14:00", "16:00"],
    "2024-01-19": ["09:00", "10:00", "11:00", "15:00", "16:00"],
  },
}

export default function BookingPage() {
  const [serviceType, setServiceType] = useState("bireysel")
  const [selectedService, setSelectedService] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [clientInfo, setClientInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [orderNotes, setOrderNotes] = useState("")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [couponCode, setCouponCode] = useState("")
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discount: number } | null>(null)
  const [serviceDetailsDialogOpen, setServiceDetailsDialogOpen] = useState(false)
  const [currentFormIndex, setCurrentFormIndex] = useState(0)
  const [currentBlogCarouselIndex, setCurrentBlogCarouselIndex] = useState(0)

  const currentServices = providerData.services[serviceType as keyof typeof providerData.services]
  const selectedServiceData = currentServices.find((s) => s.id.toString() === selectedService)
  const availableDates = Object.keys(providerData.availability)
  const availableTimes = selectedDate
    ? providerData.availability[selectedDate as keyof typeof providerData.availability] || []
    : []

  const handleServiceTypeChange = (newType: string) => {
    setServiceType(newType)
    setSelectedService("")
    setSelectedDate("")
    setSelectedTime("")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setUploadedFiles((prev) => [...prev, ...files])
  }

  const removeFile = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const applyCoupon = () => {
    // Mock coupon validation - in real app, this would call an API
    const validCoupons = {
      WELCOME10: 10,
      FIRST20: 20,
      STUDENT15: 15,
    }

    const discount = validCoupons[couponCode.toUpperCase() as keyof typeof validCoupons]
    if (discount) {
      setAppliedCoupon({ code: couponCode.toUpperCase(), discount })
      alert(`Kupon başarıyla uygulandı! %${discount} indirim`)
    } else {
      alert("Geçersiz kupon kodu")
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode("")
  }

  const handleBooking = () => {
    // Handle booking submission
    console.log("Rezervasyon gönderildi:", {
      serviceType,
      service: selectedServiceData,
      date: selectedDate,
      time: selectedTime,
      client: clientInfo,
      notes: orderNotes,
      files: uploadedFiles,
      payment: paymentInfo,
    })
    alert("Rezervasyon başarıyla gönderildi!")
  }

  const isBookingComplete =
    selectedService &&
    (serviceType === "bireysel" ? selectedDate && selectedTime : true) &&
    clientInfo.firstName &&
    clientInfo.lastName &&
    clientInfo.email &&
    paymentInfo.cardNumber &&
    paymentInfo.expiryDate &&
    paymentInfo.cvv &&
    paymentInfo.nameOnCard &&
    termsAccepted

  const socialIcons = [
    {
      name: "Instagram",
      icon: Instagram,
      url: providerData.socialMedia.instagram,
      color: "text-pink-500 hover:text-pink-600",
    },
    {
      name: "Facebook",
      icon: Facebook,
      url: providerData.socialMedia.facebook,
      color: "text-blue-600 hover:text-blue-700",
    },
    { name: "Twitter", icon: Twitter, url: providerData.socialMedia.twitter, color: "text-sky-500 hover:text-sky-600" },
    { name: "YouTube", icon: Youtube, url: providerData.socialMedia.youtube, color: "text-red-500 hover:text-red-600" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: providerData.socialMedia.linkedin,
      color: "text-blue-700 hover:text-blue-800",
    },
    { name: "TikTok", icon: User, url: providerData.socialMedia.tiktok, color: "text-black hover:text-gray-800" },
  ]

  const subtotal = selectedServiceData?.price || 0
  const discount = appliedCoupon ? Math.round((subtotal * appliedCoupon.discount) / 100) : 0
  const total = subtotal - discount

  const nextForm = () => {
    setCurrentFormIndex((prev) => (prev + 1) % providerData.forms.length)
  }

  const prevForm = () => {
    setCurrentFormIndex((prev) => (prev - 1 + providerData.forms.length) % providerData.forms.length)
  }

  const nextBlogCarousel = () => {
    setCurrentBlogCarouselIndex((prev) => (prev + 3) % providerData.blogPosts.length)
  }

  const prevBlogCarousel = () => {
    setCurrentBlogCarouselIndex((prev) => (prev - 3 + providerData.blogPosts.length) % providerData.blogPosts.length)
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
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={providerData.avatar || "/placeholder.svg"} alt={providerData.name} />
                  <AvatarFallback>
                    {providerData.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{providerData.name}</CardTitle>
                <CardDescription className="text-base">{providerData.title}</CardDescription>
                <div className="flex items-center justify-center gap-2 mt-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 font-medium">{providerData.rating}</span>
                  </div>
                  <span className="text-gray-500">({providerData.reviews} değerlendirme)</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-green-500" />
                  <span>{providerData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="w-4 h-4 text-blue-500" />
                  <span>{providerData.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4 text-red-500" />
                  <span>{providerData.email}</span>
                </div>

                {/* Social Media Icons */}
                <div className="flex items-center gap-3 justify-center pt-2">
                  {socialIcons.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`transition-colors ${social.color}`}
                      title={social.name}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Hakkında</h4>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">{providerData.bio}</p>

                  {/* Education */}
                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-purple-500" />
                      Eğitim
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {providerData.education.map((edu, index) => (
                        <li key={index} className="leading-relaxed">
                          • {edu}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Experience */}
                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-blue-500" />
                      Deneyim
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {providerData.experience.map((exp, index) => (
                        <li key={index} className="leading-relaxed">
                          • {exp}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Certificates */}
                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      Sertifikalar
                    </h5>
                    <ul className="text-xs text-gray-600 space-y-1">
                      {providerData.certificates.map((cert, index) => (
                        <li key={index} className="leading-relaxed">
                          • {cert}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Forms */}
                  <div className="mb-4">
                    <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-green-500" />
                      Formlar
                    </h5>
                    <div className="relative">
                      <div className="bg-gray-50 rounded-lg p-3 border">
                        <div className="flex items-center justify-between mb-2">
                          <h6 className="font-medium text-xs text-gray-800">
                            {providerData.forms[currentFormIndex].title}
                          </h6>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={prevForm}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              disabled={providerData.forms.length <= 1}
                            >
                              <ChevronLeft className="w-3 h-3 text-gray-500" />
                            </button>
                            <span className="text-xs text-gray-500 px-2">
                              {currentFormIndex + 1}/{providerData.forms.length}
                            </span>
                            <button
                              onClick={nextForm}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              disabled={providerData.forms.length <= 1}
                            >
                              <ChevronRight className="w-3 h-3 text-gray-500" />
                            </button>
                          </div>
                        </div>
                        <div className="w-full aspect-video bg-gray-200 rounded overflow-hidden">
                          <img
                            src={providerData.forms[currentFormIndex].coverImage || "/placeholder.svg"}
                            alt={providerData.forms[currentFormIndex].title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Service Selection with Tabs */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-indigo-500" />
                  Hizmet Seçin
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={serviceType} onValueChange={handleServiceTypeChange} className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="bireysel" className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Bireysel
                    </TabsTrigger>
                    <TabsTrigger value="grup" className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Grup
                    </TabsTrigger>
                    <TabsTrigger value="paket" className="flex items-center gap-2">
                      <Package className="w-4 h-4" />
                      Paket
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="bireysel" className="mt-4">
                    <div className="grid gap-3">
                      {providerData.services.bireysel.map((service) => (
                        <div
                          key={service.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedService === service.id.toString()
                              ? "border-primary bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedService(service.id.toString())}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{service.duration} dakika</p>
                            </div>
                            <Badge variant="secondary">{service.price} TL</Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setServiceDetailsDialogOpen(true)}>
                              <Info className="w-4 h-4" />
                              Detaylar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="grup" className="mt-4">
                    <div className="grid gap-3">
                      {providerData.services.grup.map((service) => (
                        <div
                          key={service.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedService === service.id.toString()
                              ? "border-primary bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedService(service.id.toString())}
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h4 className="font-medium">{service.name}</h4>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span>{service.duration} dakika</span>
                                <span className="flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  Maks {service.maxParticipants} kişi
                                </span>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3 text-orange-500" />
                                  {new Date(service.scheduledDate).toLocaleDateString("tr-TR")}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3 text-teal-500" />
                                  {service.scheduledTime}
                                </span>
                              </div>
                            </div>
                            <Badge variant="secondary">{service.price} TL</Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setServiceDetailsDialogOpen(true)}>
                              <Info className="w-4 h-4" />
                              Detaylar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="paket" className="mt-4">
                    <div className="grid gap-3">
                      {providerData.services.paket.map((service) => (
                        <div
                          key={service.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                            selectedService === service.id.toString()
                              ? "border-primary bg-green-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedService(service.id.toString())}
                        >
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h4 className="font-medium">{service.name}</h4>
                              <p className="text-sm text-gray-600">
                                {service.duration} dakika x {service.sessions} seans
                              </p>
                              {service.originalPrice && (
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-gray-500 line-through">{service.originalPrice} TL</span>
                                  <Badge variant="destructive" className="text-xs">
                                    %
                                    {Math.round(
                                      ((service.originalPrice - service.price) / service.originalPrice) * 100,
                                    )}{" "}
                                    İndirim
                                  </Badge>
                                </div>
                              )}
                            </div>
                            <Badge variant="secondary">{service.price} TL</Badge>
                          </div>
                          <div className="mt-2 flex items-center gap-2">
                            <Button variant="outline" size="sm" onClick={() => setServiceDetailsDialogOpen(true)}>
                              <Info className="w-4 h-4" />
                              Detaylar
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            {/* Date & Time Selection - Only for Bireysel */}
            {serviceType === "bireysel" && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-orange-500" />
                    Tarih ve Saat Seçin
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="date">Uygun Tarihler</Label>
                    <Select value={selectedDate} onValueChange={setSelectedDate}>
                      <SelectTrigger>
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
                  </div>

                  {selectedDate && (
                    <div>
                      <Label>Uygun Saatler</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {availableTimes.map((time) => (
                          <Button
                            key={time}
                            variant={selectedTime === time ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSelectedTime(time)}
                            className="justify-center"
                          >
                            <Clock className="w-4 h-4 mr-1 text-teal-500" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Client Information */}
            <Card>
              <CardHeader>
                <CardTitle>Bilgileriniz</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Ad</Label>
                    <Input
                      id="firstName"
                      value={clientInfo.firstName}
                      onChange={(e) => setClientInfo((prev) => ({ ...prev, firstName: e.target.value }))}
                      placeholder="Adınızı girin"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Soyad</Label>
                    <Input
                      id="lastName"
                      value={clientInfo.lastName}
                      onChange={(e) => setClientInfo((prev) => ({ ...prev, lastName: e.target.value }))}
                      placeholder="Soyadınızı girin"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">E-posta</Label>
                  <Input
                    id="email"
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo((prev) => ({ ...prev, email: e.target.value }))}
                    placeholder="E-posta adresinizi girin"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon Numarası</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={clientInfo.phone}
                    onChange={(e) => setClientInfo((prev) => ({ ...prev, phone: e.target.value }))}
                    placeholder="Telefon numaranızı girin"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Order Notes & Files */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-cyan-500" />
                  Ek Bilgiler
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="notes">Sipariş Notları (İsteğe Bağlı)</Label>
                  <Textarea
                    id="notes"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Özel gereksinimleriniz veya paylaşmak istediğiniz bilgiler..."
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="files">Dosya Yükle (İsteğe Bağlı)</Label>
                  <div className="mt-2">
                    <Input id="files" type="file" multiple onChange={handleFileUpload} className="hidden" />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById("files")?.click()}
                      className="w-full"
                    >
                      <Upload className="w-4 h-4 mr-2 text-emerald-500" />
                      Dosya Seç
                    </Button>
                  </div>
                  {uploadedFiles.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                            Kaldır
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-violet-500" />
                  Ödeme Bilgileri
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Kart Numarası</Label>
                  <Input
                    id="cardNumber"
                    value={paymentInfo.cardNumber}
                    onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cardNumber: e.target.value }))}
                    placeholder="1234 5678 9012 3456"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <Label htmlFor="expiryDate">Son Kullanma Tarihi</Label>
                    <Input
                      id="expiryDate"
                      value={paymentInfo.expiryDate}
                      onChange={(e) => setPaymentInfo((prev) => ({ ...prev, expiryDate: e.target.value }))}
                      placeholder="AA/YY"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      value={paymentInfo.cvv}
                      onChange={(e) => setPaymentInfo((prev) => ({ ...prev, cvv: e.target.value }))}
                      placeholder="123"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="nameOnCard">Kart Üzerindeki İsim</Label>
                  <Input
                    id="nameOnCard"
                    value={paymentInfo.nameOnCard}
                    onChange={(e) => setPaymentInfo((prev) => ({ ...prev, nameOnCard: e.target.value }))}
                    placeholder="Kartta yazan ismi girin"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary & Submit */}
            <Card>
              <CardHeader>
                <CardTitle>Rezervasyon Özeti</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedServiceData && (
                  <div className="flex justify-between items-center">
                    <span>{selectedServiceData.name}</span>
                    <span className="font-medium">{selectedServiceData.price} TL</span>
                  </div>
                )}
                {serviceType === "bireysel" && selectedDate && selectedTime && (
                  <div className="flex justify-between items-center">
                    <span>Tarih ve Saat</span>
                    <span className="font-medium">
                      {new Date(selectedDate).toLocaleDateString("tr-TR")} saat {selectedTime}
                    </span>
                  </div>
                )}
                {serviceType === "grup" && selectedServiceData && "scheduledDate" in selectedServiceData && (
                  <div className="flex justify-between items-center">
                    <span>Tarih ve Saat</span>
                    <span className="font-medium">
                      {new Date(selectedServiceData.scheduledDate).toLocaleDateString("tr-TR")} saat{" "}
                      {selectedServiceData.scheduledTime}
                    </span>
                  </div>
                )}
                {/* Coupon Code Section */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Kupon Kodu</Label>
                  {!appliedCoupon ? (
                    <div className="flex gap-2">
                      <Input
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Kupon kodunuzu girin"
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={applyCoupon}
                        disabled={!couponCode.trim()}
                        className="px-4 bg-transparent"
                      >
                        Uygula
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm font-medium text-green-700">
                          {appliedCoupon.code} uygulandı (%{appliedCoupon.discount} indirim)
                        </span>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={removeCoupon}
                        className="text-green-700 hover:text-green-800"
                      >
                        Kaldır
                      </Button>
                    </div>
                  )}
                </div>
                <Separator />
                {selectedServiceData && (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Ara Toplam</span>
                      <span>{subtotal} TL</span>
                    </div>
                    {appliedCoupon && (
                      <div className="flex justify-between items-center text-green-600">
                        <span>İndirim ({appliedCoupon.code})</span>
                        <span>-{discount} TL</span>
                      </div>
                    )}
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Toplam</span>
                      <span>{total} TL</span>
                    </div>
                  </div>
                )}

                {/* Terms and Conditions */}
                <div className="flex items-start space-x-2 pt-4">
                  <Checkbox
                    id="terms"
                    checked={termsAccepted}
                    onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed">
                    Mesafeli Satış Sözleşmesi, Ön Bilgilendirme Formu, KVKK Aydınlatma ve Açık Rıza Metni'ni kabul
                    ediyorum
                  </Label>
                </div>

                <Button
                  onClick={handleBooking}
                  disabled={!isBookingComplete}
                  className="w-full bg-primary hover:bg-primary/90"
                  size="lg"
                >
                  Rezervasyonu Tamamla
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Blog Posts Section */}
        <div className="mt-16 mb-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Blog Yazıları</h2>
            <p className="text-gray-600">Uzmanımızın paylaştığı faydalı içerikler</p>
          </div>

          <div className="relative">
            <div className="grid md:grid-cols-3 gap-6">
              {providerData.blogPosts.slice(currentBlogCarouselIndex, currentBlogCarouselIndex + 3).map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => window.open(post.url, "_blank")}
                >
                  <div className="aspect-video bg-gray-200 overflow-hidden">
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 line-clamp-2 leading-relaxed">{post.title}</h3>
                    <div className="mt-3 flex items-center text-sm text-gray-500">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      <span>Yazıyı oku</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Navigation */}
            {providerData.blogPosts.length > 3 && (
              <div className="flex items-center justify-center gap-4 mt-8">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={prevBlogCarousel}
                  disabled={currentBlogCarouselIndex === 0}
                  className="flex items-center gap-2 bg-transparent"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Önceki
                </Button>
                <span className="text-sm text-gray-500">
                  {Math.floor(currentBlogCarouselIndex / 3) + 1} / {Math.ceil(providerData.blogPosts.length / 3)}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={nextBlogCarousel}
                  disabled={currentBlogCarouselIndex + 3 >= providerData.blogPosts.length}
                  className="flex items-center gap-2"
                >
                  Sonraki
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Service Details Dialog */}
        {selectedServiceData && (
          <Dialog open={serviceDetailsDialogOpen} onOpenChange={setServiceDetailsDialogOpen}>
            <DialogTrigger className="hidden">Trigger</DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{selectedServiceData.name}</DialogTitle>
                <DialogDescription>{selectedServiceData.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium">İçerir</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedServiceData.includes.map((include, index) => (
                      <li key={index} className="leading-relaxed">
                        • {include}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium">Uygunlar</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {selectedServiceData.suitable.map((suitable, index) => (
                      <li key={index} className="leading-relaxed">
                        • {suitable}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 bg-transparent"
                onClick={() => setServiceDetailsDialogOpen(false)}
              >
                Kapat
              </Button>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}
