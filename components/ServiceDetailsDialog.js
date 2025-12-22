// "use client"

// import React from 'react'
// import { MapPin, Users, Calendar, Video } from 'lucide-react'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
// } from '@/components/ui/dialog'
// import { Badge } from '@/components/ui/badge'
// import { Button } from '@/components/ui/button'

// import { useBookingContext } from '@/components/context/BookingContext'

// export const ServiceDetailsDialog = () => {
//   const {
//     serviceDetailsDialogOpen,
//     setServiceDetailsDialogOpen,
//     serviceDetailsDialogId,
//     profile,
//   } = useBookingContext();

//   let selectedServiceData = null;
//   let isPackage = false;

//   if (profile && serviceDetailsDialogId) {
//     selectedServiceData = profile.services.find((s) => s.id === serviceDetailsDialogId);
//     if (!selectedServiceData) {
//       selectedServiceData = profile.packages.find((p) => p.id === serviceDetailsDialogId);
//       isPackage = !!selectedServiceData;
//     }
//   }

//   if (!selectedServiceData) return null;

//   // Calculate final price with discount
//   const calculateFinalPrice = (item) => {
//     const price = parseInt(item.price);
//     const discount = item.discount || 0;
//     if (!discount || discount <= 0) return price;
//     return Math.round(price - (price * discount) / 100);
//   };

//   const finalPrice = calculateFinalPrice(selectedServiceData);
//   const hasDiscount = selectedServiceData.discount && selectedServiceData.discount > 0;

//   return (
//     <Dialog open={serviceDetailsDialogOpen} onOpenChange={setServiceDetailsDialogOpen}>
//       <DialogContent className="max-w-2xl">
//         <DialogHeader>
//           <DialogTitle className="flex items-center gap-3">
//             {selectedServiceData.title}
//           </DialogTitle>
//           <DialogDescription>{selectedServiceData.description}</DialogDescription>
//         </DialogHeader>
//         <div className="space-y-4 mt-4">
//           <div className="grid grid-cols-2 gap-4">
//             {/* Duration */}
//             {"duration" in selectedServiceData && (
//               <div>
//                 <h4 className="font-medium text-sm text-gray-600">Süre</h4>
//                 <p className="text-lg">
//                   {selectedServiceData.duration} dakika
//                 </p>
//               </div>
//             )}

//             {/* Price with discount */}
//             <div>
//               <h4 className="font-medium text-sm text-gray-600">Fiyat</h4>
//               <div className="flex items-center gap-2">
//                 {hasDiscount ? (
//                   <>
//                     <p className="text-lg font-semibold text-green-600">{finalPrice} TL</p>
//                     <p className="text-sm text-gray-400 line-through">{parseInt(selectedServiceData.price)} TL</p>
//                     <Badge variant="destructive" className="text-xs">%{selectedServiceData.discount} İndirim</Badge>
//                   </>
//                 ) : (
//                   <p className="text-lg font-semibold">{parseInt(selectedServiceData.price)} TL</p>
//                 )}
//               </div>
//             </div>

//             {/* Meeting Type */}
//             {"meetingType" in selectedServiceData && (
//               <div>
//                 <h4 className="font-medium text-sm text-gray-600">Görüşme Tipi</h4>
//                 <Badge variant="outline" className="mt-1">
//                   {selectedServiceData.meetingType === "1-1" || selectedServiceData.meetingType === "bireysel"
//                     ? "Bireysel"
//                     : selectedServiceData.meetingType === "grup"
//                       ? "Grup"
//                       : selectedServiceData.meetingType === "face-to-face"
//                         ? "Yüz Yüze"
//                         : selectedServiceData.meetingType}
//                 </Badge>
//               </div>
//             )}

//             {/* Sessions Included (for packages) */}
//             {"sessionsIncluded" in selectedServiceData && (
//               <div>
//                 <h4 className="font-medium text-sm text-gray-600">Seans Sayısı</h4>
//                 <p className="text-lg flex items-center gap-1">
//                   <Calendar className="w-4 h-4" />
//                   {selectedServiceData.sessionsIncluded} seans
//                 </p>
//               </div>
//             )}

//             {/* Max Attendees */}
//             {"maxAttendees" in selectedServiceData && selectedServiceData.maxAttendees && (
//               <div>
//                 <h4 className="font-medium text-sm text-gray-600">Maksimum Katılımcı</h4>
//                 <p className="text-lg flex items-center gap-1">
//                   <Users className="w-4 h-4" />
//                   {selectedServiceData.maxAttendees} kişi
//                 </p>
//               </div>
//             )}
//           </div>

//           {/* Event Type Details */}
//           {"eventType" in selectedServiceData && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-600 mb-2">Etkinlik Detayları</h4>
//               <div className="space-y-2">
//                 <div className="flex items-center gap-2 flex-wrap">
//                   <Badge variant="outline">
//                     {selectedServiceData.eventType === "online"
//                       ? "Online"
//                       : selectedServiceData.eventType === "offline"
//                         ? "Yüz yüze"
//                         : "Hibrit"}
//                   </Badge>
//                   {selectedServiceData.platform && (
//                     <Badge variant="secondary" className="flex items-center gap-1">
//                       <Video className="w-3 h-3" />
//                       {selectedServiceData.platform}
//                     </Badge>
//                   )}
//                 </div>
//                 {selectedServiceData.location && (
//                   <p className="text-sm text-gray-600 flex items-center gap-1">
//                     <MapPin className="w-4 h-4" />
//                     {selectedServiceData.location}
//                   </p>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Category */}
//           {"category" in selectedServiceData && (
//             <div>
//               <h4 className="font-medium text-sm text-gray-600">Kategori</h4>
//               <Badge className="mt-1">{selectedServiceData.category}</Badge>
//             </div>
//           )}
//         </div>
//         <div className="flex justify-end mt-6">
//           <Button
//             type="button"
//             variant="outline"
//             onClick={() => setServiceDetailsDialogOpen(false)}
//           >
//             Kapat
//           </Button>
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }


"use client"

import React from 'react'
import { MapPin, Users, Calendar, Video } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import { useBookingContext } from '@/components/context/BookingContext'

export const ServiceDetailsDialog = () => {
  const {
    serviceDetailsDialogOpen,
    setServiceDetailsDialogOpen,
    serviceDetailsDialogId,
    profile,
  } = useBookingContext();

  let selectedServiceData = null;

  if (profile && serviceDetailsDialogId) {
    selectedServiceData = profile.services.find((s) => s._id === serviceDetailsDialogId);
    if (!selectedServiceData) {
      selectedServiceData = profile.packages.find((p) => p._id === serviceDetailsDialogId);
    }
  }

  if (!selectedServiceData) return null;

  // ✅ FIXED: Discount now always works (handles "20", "20%", numeric, or string)
  const normalizeDiscount = (value) => {
    if (!value) return 0;
    return Number(String(value).replace("%", "").trim());
  };

  const discountValue = normalizeDiscount(selectedServiceData.discount);

  const calculateFinalPrice = (item) => {
    const price = Number(item.price);
    if (discountValue <= 0) return price;
    return Math.round(price - (price * discountValue) / 100);
  };

  const finalPrice = calculateFinalPrice(selectedServiceData);
  const hasDiscount = discountValue > 0;

  return (
    <Dialog open={serviceDetailsDialogOpen} onOpenChange={setServiceDetailsDialogOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {selectedServiceData.title}
          </DialogTitle>
          <DialogDescription>{selectedServiceData.description}</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="grid grid-cols-2 gap-4">
            {"duration" in selectedServiceData && (
              <div>
                <h4 className="font-medium text-sm text-gray-600">Süre</h4>
                <p className="text-lg">
                  {selectedServiceData.duration} dakika
                </p>
              </div>
            )}

            {/* ✅ FIXED DISCOUNT SECTION */}
            <div>
              <h4 className="font-medium text-sm text-gray-600">Fiyat</h4>
              <div className="flex items-center gap-2">
                {hasDiscount ? (
                  <>
                    <p className="text-lg font-semibold text-green-600">{finalPrice} TL</p>
                    <p className="text-sm text-gray-400 line-through">
                      {Number(selectedServiceData.price)} TL
                    </p>
                    <Badge variant="destructive" className="text-xs">%{discountValue} İndirim</Badge>
                  </>
                ) : (
                  <p className="text-lg font-semibold">
                    {Number(selectedServiceData.price)} TL
                  </p>
                )}
              </div>
            </div>

            {"meetingType" in selectedServiceData && (
              <div>
                <h4 className="font-medium text-sm text-gray-600">Görüşme Tipi</h4>
                <Badge variant="outline" className="mt-1">
                  {selectedServiceData.meetingType === "1-1" || selectedServiceData.meetingType === "bireysel"
                    ? "Bireysel"
                    : selectedServiceData.meetingType === "grup"
                      ? "Grup"
                      : selectedServiceData.meetingType === "face-to-face"
                        ? "Yüz Yüze"
                        : selectedServiceData.meetingType}
                </Badge>
              </div>
            )}

            {"sessionsIncluded" in selectedServiceData && (
              <div>
                <h4 className="font-medium text-sm text-gray-600">Seans Sayısı</h4>
                <p className="text-lg flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {selectedServiceData.sessionsIncluded} seans
                </p>
              </div>
            )}

            {"maxAttendees" in selectedServiceData && selectedServiceData.maxAttendees && (
              <div>
                <h4 className="font-medium text-sm text-gray-600">Maksimum Katılımcı</h4>
                <p className="text-lg flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {selectedServiceData.maxAttendees} kişi
                </p>
              </div>
            )}
          </div>

          {"eventType" in selectedServiceData && (
            <div>
              <h4 className="font-medium text-sm text-gray-600 mb-2">Etkinlik Detayları</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="outline">
                    {selectedServiceData.eventType === "online"
                      ? "Online"
                      : selectedServiceData.eventType === "offline"
                        ? "Yüz yüze"
                        : "Hibrit"}
                  </Badge>
                  {selectedServiceData.platform && (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      {selectedServiceData.platform}
                    </Badge>
                  )}
                </div>
                {selectedServiceData.location && (
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedServiceData.location}
                  </p>
                )}
              </div>
            </div>
          )}

          {"category" in selectedServiceData && (
            <div>
              <h4 className="font-medium text-sm text-gray-600">Kategori</h4>
              <Badge className="mt-1">{selectedServiceData.category}</Badge>
            </div>
          )}
        </div>
        <div className="flex justify-end mt-6">
          <Button
            type="button"
            variant="outline"
            onClick={() => setServiceDetailsDialogOpen(false)}
          >
            Kapat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
