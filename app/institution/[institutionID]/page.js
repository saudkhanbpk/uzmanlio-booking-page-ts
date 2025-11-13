"use client";
// src/pages/InstitutionProfile.jsx
import { useEffect, useState } from "react";
import { useParams } from 'next/navigation';
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge.js";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useInstitution } from "@/components/context/InstitutionContext";
import {
  Building,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Facebook,
  MapPin,
} from "lucide-react";
const TwitterIcon = () => <Twitter className="w-5 h-5" />;
const LinkedInIcon = () => <Linkedin className="w-5 h-5" />;
const InstagramIcon = () => <Instagram className="w-5 h-5" />;
const YouTubeIcon = () => <Youtube className="w-5 h-5" />;
const FacebookIcon = () => <Facebook className="w-5 h-5" />;

export default function InstitutionProfile() {
  const { Institutions, addInstitution } = useInstitution();
  const { institutionID } = useParams();
  const [institution, setInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [formIdx, setFormIdx] = useState(0);
  const [blogIdx, setBlogIdx] = useState(0);
  const [forms, setForms] = useState([]);      // Initialize forms state
  const [blogPosts, setBlogPosts] = useState([]); // Initialize blogPosts state
  const router = useRouter();


  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const PLACEHOLDER = "https://placehold.co/400x300?text=No+Image";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;


  // Safe function to build image URLs with fallback
  const buildImg = (path) => {
    if (!path) return PLACEHOLDER;
    const i = path.indexOf("uploads");
    if (i === -1) return path.startsWith("http") ? path : PLACEHOLDER;
    const rel = path.substring(i).replace(/\\/g, "/");
    return `${baseUrl}/${rel}`;
  };

  const handleExpertClick = (expertID) => {
    router.push(`/expert/${expertID}`);
  }

  useEffect(() => {
    if (!institutionID) return;

    // 1️⃣ Try context first
    const existing = Institutions.find((i) => i._id === institutionID);
    if (existing) {
      setInstitution(existing);
      setForms(flattenForms(existing));
      setBlogPosts(flattenBlogs(existing));
      setLoading(false);
      fetchFormsAndBlogs();
      return;
    }

    // 2️⃣ Fetch from backend
    const fetchInstitution = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${backendUrl}/experts-institutions`);
        const data = await res.json();
        const found = data.institutions?.find((i) => i._id === institutionID);
        if (found) {
          setInstitution(found);
          addInstitution(found);
        } else setInstitution(null);
      } catch (err) {
        console.error(err);
        setInstitution(null);
      } finally {
        setLoading(false);
      }
    };

    fetchInstitution();
    fetchFormsAndBlogs();
  }, [institutionID, Institutions]);


  const fetchFormsAndBlogs = async () => {
    try {
      const response = await fetch(`${backendUrl}/${institutionID}/blogs-forms`);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      setForms(flattenForms(data));
      setBlogPosts(flattenBlogs(data));
    } catch (error) {
      console.error('Error fetching forms and blogs:', error);
    }
  };


  // Flatten forms from all users safely
  const flattenForms = (inst) => {
    return inst.users?.flatMap(user =>
      (user.forms || []).map(f => ({
        ...f,
        userName: user.information?.name || "",
        image: f.image || PLACEHOLDER
      }))
    ) || [];
  };

  // Flatten blogs from all users safely
  const flattenBlogs = (inst) => {
    return inst.users?.flatMap(user =>
      (user.blogs || []).map(b => ({
        ...b,
        userName: user.information?.name || "",
        image: b.image || PLACEHOLDER,
        date: b.date || ""
      }))
    ) || [];
  };

  // Carousel helpers
  const next = (setter, arr) => () => setter((p) => (arr.length ? (p + 1) % arr.length : 0));
  const prev = (setter, arr) => () => setter((p) => (arr.length ? (p - 1 + arr.length) % arr.length : 0));
  const visible = (arr, idx, count = 3) => {
    const res = [];
    for (let i = 0; i < Math.min(count, arr.length); i++) res.push(arr[(idx + i) % arr.length]);
    return res;
  };

  const companyUrl = `www.uzmanlio.com/company/${institutionID || ""}`;
  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(companyUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!institution) return <p className="text-center mt-10 text-red-600">Institution not found.</p>;

  return (
    <div className="min-h-screen bg-white">
      {/* Cover Image */}
      <div className="bg-[#C8E53F] py-4 md:py-6">
        <div className="container">
          <img
            src={buildImg(institution.officialAxe)}
            alt="Cover"
            className="w-full max-h-96 object-cover rounded-lg shadow-lg"
            onError={(e) => e.currentTarget.src = "https://placehold.co/1200x300?text=Cover+Image"}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-8">

            {/* Logo + Name + Bio */}
            <div className="flex items-start gap-4">
              <img
                src={buildImg(institution.logo)}
                alt={institution.name}
                className="w-20 h-20 rounded-full object-cover bg-gray-100"
                onError={(e) => e.currentTarget.src = "https://placehold.co/80x80?text=Logo"}
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{institution.name}</h1>
                <p className="text-gray-600 mt-1">{institution.bio || "No bio available."}</p>
              </div>
            </div>

            {/* Category */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Building className="w-4 h-4" />
              <span>Company Category</span>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {institution.Admin?.socialMedia?.twitter && (
                <a href={institution.Admin.socialMedia.twitter} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                  <TwitterIcon />
                </a>
              )}
              {institution.Admin?.socialMedia?.linkedin && (
                <a href={institution.Admin.socialMedia.linkedin} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                  <LinkedInIcon />
                </a>
              )}
              {institution.Admin?.socialMedia?.instagram && (
                <a href={institution.Admin.socialMedia.instagram} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                  <InstagramIcon />
                </a>
              )}
              {institution.Admin?.socialMedia?.youtube && (
                <a href={institution.Admin.socialMedia.youtube} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                  <YouTubeIcon />
                </a>
              )}
              {institution.Admin?.socialMedia?.facebook && (
                <a href={institution.Admin.socialMedia.facebook} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-gray-600">
                  <FacebookIcon />
                </a>
              )}
            </div>

            {/* About */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Hakkımızda</h2>
              <p className="text-gray-700 leading-relaxed">{institution.about || "No description provided."}</p>
            </div>

            {/* Forms Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Formlar</h2>
                {forms.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={prev(setFormIdx, forms)} className="w-8 h-8 p-0">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={next(setFormIdx, forms)} className="w-8 h-8 p-0">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {forms.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {visible(forms, formIdx).map((form, idx) => (
                    <Card key={`${form.id || idx}-${formIdx}`} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <div className="aspect-video">
                          <img
                            src={form.image || PLACEHOLDER}
                            alt={form.title || "No title"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3">
                          <h3 className="text-sm font-medium text-gray-900">{form.title || "Untitled Form"}</h3>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-center">Henüz gösterilecek form yok.</p>
              )}
            </div>

            {/* Blog Posts Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Blog Yazıları</h2>
                {blogPosts.length > 0 && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={prev(setBlogIdx, blogPosts)} className="w-8 h-8 p-0">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={next(setBlogIdx, blogPosts)} className="w-8 h-8 p-0">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>

              {blogPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {visible(blogPosts, blogIdx).map((blog, idx) => (
                    <Card key={`${blog.id || idx}-${blogIdx}`} className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer">
                      <CardContent className="p-0">
                        <div className="aspect-video">
                          <img
                            src={blog.image || PLACEHOLDER}
                            alt={blog.title || "No title"}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-3 space-y-1">
                          <h3 className="text-sm font-medium text-gray-900 line-clamp-2">{blog.title || "Untitled Blog"}</h3>
                          <p className="text-xs text-gray-500">{blog.date}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 italic text-center">Henüz gösterilecek blog yazısı yok.</p>
              )}
            </div>


          </div>

          {/* RIGHT COLUMN - TEAM */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Ekibimiz</h2>
            <div className="space-y-4">
              {(institution.users || []).map((member) => {
                const fullName = `${member.information?.name || ""} ${member.information?.surname || ""}`.trim();
                const initials = fullName.split(" ").map(n => n[0]).join("").toUpperCase();
                const title = member.titles?.[0]?.title || "Uzman";

                return (
                  <Card key={member._id}
                    onClick={() => handleExpertClick(member._id)}
                    className="cursor-pointer border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
                        <Badge variant="secondary" className="text-xs bg-blue-50 text-blue-700">{title}</Badge>
                      </div>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-gray-100 text-xs">{initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{fullName}</div>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            {member.information?.city || "N/A"}, {member.information?.country || "N/A"}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Share Card */}
            <Card className="border border-gray-200 rounded-lg bg-white">
              <CardContent className="p-4 space-y-3">
                <h3 className="text-base font-semibold text-gray-900">Şirketi Paylaş</h3>
                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <code className="flex-1 text-sm text-gray-700 font-mono truncate">{companyUrl}</code>
                  <Button variant="outline" size="sm" onClick={copyUrl} className="h-8 px-3">
                    {copied ? (
                      <>
                        <Check className="w-3 h-3" />
                        <span className="text-xs">Kopyalandı</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span className="text-xs">Kopyala</span>
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500">Bu bağlantıyı paylaşarak şirket sayfamızı başkalarıyla paylaşabilirsiniz.</p>
              </CardContent>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
}
