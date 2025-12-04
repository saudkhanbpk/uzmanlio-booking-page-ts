"use client";
import React from "react";
import { User, Users, Package, Info, Calendar, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useBookingContext } from "@/components/context/BookingContext";
import { ServiceDetailsDialog } from "./ServiceDetailsDialog";

export const ServiceSelection = () => {
  const {
    profile,
    bookingState,
    updateBookingState,
    resetBookingState,
    validationErrors,
    setServiceDetailsDialogOpen,
    setServiceDetailsDialogId,
  } = useBookingContext();

  const [serviceType, setServiceType] = React.useState("bireysel");

  if (!profile) return null;
  console.log("profile:", profile);

  // ✅ Filter services and packages
  const bireyselServices = React.useMemo(
    () => profile.services.filter((s) => s.meetingType === "1-1" && s.status === "active"),
    [profile.services]
  );

  const grupServices = React.useMemo(
    () => profile.services.filter((s) => s.meetingType === "grup" && s.status === "active"),
    [profile.services]
  );

  const paketItems = React.useMemo(
    () => profile.packages.filter((p) => p.isAvailable && p.status === "active"),
    [profile.packages]
  );

  // ✅ Handle tab change
  const handleServiceTypeChange = (type) => {
    setServiceType(type);
    resetBookingState();
  };

  // ✅ Handle selection
  const handleSelect = (id, type) => {
    if (type === "service") {
      const selectedItem = profile.services.find((s) => s.id === id);
      if (!selectedItem) return;

      const meetingType = selectedItem.meetingType;

      updateBookingState({
        serviceType: meetingType,
        selectedService: {
          serviceId: selectedItem.id,
          serviceTitle: selectedItem.title,
        },
        packageType: "",
        selectedPackage: { packageId: "", packageTitle: "" },
        selectedDate: meetingType === "1-1" ? bookingState.selectedDate : "",
        selectedTime: meetingType === "1-1" ? bookingState.selectedTime : "",
      });
    } else {
      const selectedItem = profile.packages.find((p) => p.id === id);
      if (!selectedItem) return;

      updateBookingState({
        packageType: selectedItem.meetingType || "",
        selectedPackage: {
          packageId: selectedItem.id,
          packageTitle: selectedItem.title,
        },
        serviceType: "",
        selectedService: { serviceId: "", serviceTitle: "" },
        selectedDate: "",
        selectedTime: "",
      });
    }
  };

  // utils/price.js
  function finalPrice(item) {
    const price = parseInt(item.price);
    const discount = item.discount || 0;

    if (!discount || discount <= 0) return price;

    return Math.round(price - (price * discount) / 100);
  }


  // ✅ Render cards
  const renderCards = (list, type) => (
    <div className="grid gap-3">
      {list.length === 0 ? (
        <p className="text-center text-gray-500 py-4">
          {type === "service" ? "Hizmet bulunmamaktadır." : "Paket bulunmamaktadır."}
        </p>
      ) : (
        list.map((item) => {
          const isSelected =
            type === "service"
              ? bookingState.selectedService.serviceId === item.id
              : bookingState.selectedPackage.packageId === item.id;

          return (
            <div
              key={item.id}
              className={`p-4 border rounded-lg cursor-pointer transition-colors ${isSelected
                ? "border-primary bg-green-50"
                : "border-gray-200 hover:border-gray-300"
                }`}
              onClick={() => handleSelect(item.id, type)}
            >
              <div className="flex justify-between items-start">
                <div className={type === "package" ? "space-y-2" : ""}>
                  <h4 className="font-medium">{item.title}</h4>

                  {type === "service" ? (
                    <>
                      {(item.meetingType === "1-1" ||
                        item.meetingType === "bireysel" ||
                        item.meetingType === "face-to-face") && (
                          <p className="text-sm text-gray-600 mt-1">{item.duration} dakika</p>
                        )}

                      {item.meetingType === "grup" && (
                        <>
                          {item.maxAttendees && (
                            <div className="flex items-center gap-3 text-sm text-gray-600 mt-2">
                              <p className="text-sm text-gray-600 mt-1">{item.duration} dakika</p>
                              <p className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                Maks {item.maxAttendees} kişi
                              </p>
                            </div>
                          )}
                          {item.date && item.time && (
                            <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3 text-orange-500" />
                                {new Date(item.date).toLocaleDateString("tr-TR")}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3 text-teal-500" />
                                {item.time}
                              </span>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600">
                        {item.duration} dakika x {item.sessionsIncluded} seans
                      </p>
                      {item.discount && item.discount > 0 ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500 line-through">{item.price} TL</span>
                          <Badge variant="destructive" className="text-xs">
                            %{item.discount} İndirim
                          </Badge>
                        </div>
                      ) : (<span className="text-xs text-gray-500">{item.price} TL</span>)}
                    </>
                  )}
                </div>

                {item.discount && item.discount > 0 ? (
                  <Badge variant="default">{finalPrice(item)} TL</Badge>
                ) : (
                  <Badge variant="default">{parseInt(item.price)} TL</Badge>
                )}

              </div>

              <div className="mt-2 flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setServiceDetailsDialogId(item.id);
                    setServiceDetailsDialogOpen(true);
                  }}
                >
                  <Info className="w-4 h-4" />
                  Detaylar
                </Button>
              </div>
            </div>
          );
        })
      )}
    </div>
  );

  return (
    <>
      <ServiceDetailsDialog />
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-500" />
            Hizmet Seçin
          </CardTitle>
          {validationErrors.service && (
            <p className="text-sm text-red-500 mt-1">{validationErrors.service}</p>
          )}
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
              {renderCards(bireyselServices, "service")}
            </TabsContent>

            <TabsContent value="grup" className="mt-4">
              {renderCards(grupServices, "service")}
            </TabsContent>

            <TabsContent value="paket" className="mt-4">
              {renderCards(paketItems, "package")}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </>
  );
};
