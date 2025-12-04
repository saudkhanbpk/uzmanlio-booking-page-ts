"use client";

import React from 'react';
import {
  Star, MapPin, Phone, Mail, GraduationCap, Briefcase, Award, FileCheck,
  ChevronLeft, ChevronRight, Globe, Instagram, Facebook, Twitter, Youtube, Linkedin, User,
  File, FileText, FileImage, FileVideo, Download, Eye
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useBookingContext } from '@/components/context/BookingContext';
import { getSocialIcons } from '@/components/utils/helpers';

const iconMap = { Globe, Instagram, Facebook, Twitter, Youtube, Linkedin, User };

export const ProviderCard = () => {
  const { profile, currentFormIndex, setCurrentFormIndex } = useBookingContext();

  if (!profile) return null;

  const socialIcons = getSocialIcons(profile.socialMedia);

  const nextForm = () => {
    if (!profile.forms.length) return;
    setCurrentFormIndex((currentFormIndex + 1) % profile.forms.length);
  };

  const prevForm = () => {
    if (!profile.forms.length) return;
    setCurrentFormIndex((currentFormIndex - 1 + profile.forms.length) % profile.forms.length);
  };

  return (
    <Card className="sticky top-8">
      <CardHeader className="text-center">
        <Avatar className="w-24 h-24 mx-auto mb-4">
          <AvatarImage
            src={profile.pp || "/placeholder.svg"}
            alt={`${profile.information.name} ${profile.information.surname}`}
          />
          <AvatarFallback>
            {profile.information.name[0]}{profile.information.surname[0]}
          </AvatarFallback>
        </Avatar>
        <CardTitle className="text-xl">
          {profile.information.name} {profile.information.surname}
        </CardTitle>
        <CardDescription className="text-base">
          {profile.titles?.length
            ? profile.titles.map(t => t.title).join(" | ")
            : profile.title}
        </CardDescription>
        <div className="flex items-center justify-center gap-2 mt-2">
          <div className="flex items-center">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 font-medium">{profile.star || 4.5}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 text-green-500" />
          <span>{profile.information.address}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 text-blue-500" />
          <span>{profile.information.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 text-red-500" />
          <span>{profile.information.email}</span>
        </div>

        {/* Social Icons */}
        {socialIcons.length > 0 && (
          <div className="flex items-center gap-3 justify-center pt-2">
            {socialIcons.map((social) => {
              const IconComponent = iconMap[social.icon];
              return (
                <a
                  key={social.name}
                  href={
                    social.url.startsWith("http://") || social.url.startsWith("https://")
                      ? social.url
                      : `https://${social.url}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`transition-colors ${social.color}`}
                  title={social.name}
                >
                  <IconComponent className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        )}

        <Separator />

        {/* About Section */}
        <div>
          <h4 className="font-medium mb-2">Hakkında</h4>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">{profile.information.about}</p>

          {/* Education */}
          {profile.resume?.education?.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-500" />
                Eğitim
              </h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {profile.resume.education.map((edu) => (
                  <li key={edu.id} className="leading-relaxed">
                    • {edu.name}, {edu.department} ({edu.graduationYear})

                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Skills */}
          {profile.skills?.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-purple-500" />
                Uzmanlık Alanlarım
              </h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {profile.skills.map((skill) => (
                  <li key={skill.id} className="leading-relaxed flex flex-col">
                    <div className="flex items-center justify-between">
                      <span>• {skill.name}</span>
                      <span className="text-sm text-gray-600">{skill.level}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </li>

                ))}
              </ul>
            </div>
          )}

          {/* Experience */}
          {profile.experience.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-blue-500" />
                Deneyim
              </h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {profile.experience.map((exp) => (
                  <li key={exp.id} className="leading-relaxed">
                    • {exp.position} @ {exp.company} ({exp.start} - {exp.stillWork ? "Devam ediyor" : exp.end})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Certificates */}
          {profile.certificates.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <Award className="w-4 h-4 text-yellow-500" />
                Sertifikalar
              </h5>
              <ul className="text-xs text-gray-600 space-y-1">
                {profile.certificates.map((cert) => (
                  <li key={cert.id} className="leading-relaxed">
                    • {cert.name} ({cert.company})
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Forms */}
          {profile.forms.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-green-500" />
                Formlar
              </h5>
              <div className="relative">
                <div className="bg-gray-50 rounded-lg p-3 border">
                  <div className="flex items-center justify-between mb-2">
                    <h6 className="font-medium text-xs text-gray-800">
                      {profile.forms[currentFormIndex].title}
                    </h6>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={prevForm}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        disabled={profile.forms.length <= 1}
                      >
                        <ChevronLeft className="w-3 h-3 text-gray-500" />
                      </button>
                      <span className="text-xs text-gray-500 px-2">
                        {currentFormIndex + 1}/{profile.forms.length}
                      </span>
                      <button
                        onClick={nextForm}
                        className="p-1 hover:bg-gray-200 rounded transition-colors"
                        disabled={profile.forms.length <= 1}
                      >
                        <ChevronRight className="w-3 h-3 text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {profile.galleryFiles && profile.galleryFiles.length > 0 && (
            <div className="mb-4">
              <h5 className="font-medium text-sm mb-2 flex items-center gap-2">
                <File className="w-4 h-4 text-blue-500" />
                Dokümanlar
              </h5>
              <div className="space-y-2">
                {profile.galleryFiles.filter(file => file.isVisible).map((file) => {
                  const getFileIcon = (fileType) => {
                    switch (fileType) {
                      case 'image': return <FileImage className="w-4 h-4 text-purple-500" />;
                      case 'video': return <FileVideo className="w-4 h-4 text-red-500" />;
                      case 'document': return <FileText className="w-4 h-4 text-blue-500" />;
                      default: return <File className="w-4 h-4 text-gray-500" />;
                    }
                  };

                  // Build file URL using the same pattern as institution page
                  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL || '';
                  const filePath = file.filePath || file.fileUrl || '';

                  let fileUrl = '';
                  if (filePath.startsWith('http')) {
                    fileUrl = filePath;
                  } else {
                    const i = filePath.indexOf('uploads');
                    if (i !== -1) {
                      const rel = filePath.substring(i).replace(/\\/g, '/');
                      fileUrl = `${baseUrl}/${rel}`;
                    } else {
                      fileUrl = filePath;
                    }
                  }

                  return (
                    <div key={file.id} className="bg-gray-50 rounded-lg p-2 border flex items-center justify-between hover:bg-gray-100 transition-colors">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        {getFileIcon(file.fileType)}
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-gray-800 truncate">
                            {file.originalName || file.filename}
                          </p>
                          {file.description && (
                            <p className="text-xs text-gray-500 truncate">{file.description}</p>
                          )}
                        </div>
                      </div>
                      <a
                        href={fileUrl}
                        download={file.originalName || file.filename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
                        title="İndir"
                      >
                        <Eye className="w-3 h-3 text-gray-600" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
