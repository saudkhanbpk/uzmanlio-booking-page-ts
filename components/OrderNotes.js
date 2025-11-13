"use client";

import React from 'react';
import { FileText, Upload } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBookingContext } from '@/components/context/BookingContext';

export const OrderNotes = () => {
  const { bookingState, updateBookingState } = useBookingContext();

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files || []);
    const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

    // ❌ Blocked file extensions for security
    const blockedExtensions = [
      "exe", "bat", "cmd", "sh", "js", "msi", "scr", "jar", "vbs", "com", "pif", "cpl"
    ];

    const validFiles = files.filter(file => {
      const extension = file.name.split(".").pop()?.toLowerCase() || "";

      // 1️⃣ Block malicious extensions
      if (blockedExtensions.includes(extension)) {
        alert(`${file.name} yüklenemiyor. Bu dosya türüne izin verilmiyor.`);
        return false;
      }

      // 2️⃣ Enforce size limit
      if (file.size > MAX_FILE_SIZE) {
        alert(`${file.name} dosyası çok büyük. Maksimum dosya boyutu 50MB olmalıdır.`);
        return false;
      }

      return true;
    });

    if (validFiles.length > 0) {
      updateBookingState({
        uploadedFiles: [...bookingState.uploadedFiles, ...validFiles],
      });
    }

    // ✅ Clear input value to allow re-uploading the same file if needed
    // event.target.value = "";
  };

  const removeFile = (index) => {
    updateBookingState({
      uploadedFiles: bookingState.uploadedFiles.filter((_, i) => i !== index)
    });
  };

  return (
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
            name="notes"
            value={bookingState.orderNotes}
            onChange={(e) => updateBookingState({ orderNotes: e.target.value })}
            placeholder="Özel gereksinimleriniz veya paylaşmak istediğiniz bilgiler..."
            className="min-h-[100px]"
          />
        </div>
        <div>
          <Label htmlFor="files">Dosya Yükle (İsteğe Bağlı)</Label>
          <div className="mt-2">
            <Input
              id="files"
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.mp4,.mp3"
            />
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
          {bookingState.uploadedFiles.length > 0 && (
            <div className="mt-3 space-y-2">
              {bookingState.uploadedFiles.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-gray-50  rounded">
                  <span className="text-sm truncate flex-1 mr-2">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className='hover:bg-red-200'
                    onClick={() => removeFile(index)}
                  >
                    Kaldır
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
