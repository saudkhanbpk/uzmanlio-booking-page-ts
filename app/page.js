"use client";

import React from "react";
import { useEffect, useState } from "react";
import { MapPin, Building2, Award, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useInstitution } from "@/components/context/InstitutionContext";
import { useExpert } from "@/components/context/ExpertContext";


export default function LandingPage() {
  const { Institutions, addInstitution, setInstitutions } = useInstitution();
  const { Experts, addExpert, setExperts } = useExpert();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("institutions");
  const [searchQuery, setSearchQuery] = useState("");
  const [experts, setexperts] = useState([]);
  const [institutions, setinstitutions] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  const PLACEHOLDER = "https://placehold.co/400x300?text=No+Image";


  useEffect(() => {
    async function fetchData() {
      //First check the context
      if (Experts.length > 0 && Institutions.length > 0) {
        setexperts(Experts);
        setinstitutions(Institutions);
        setLoading(false);
        return;
      }

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

      try {
        setLoading(true);
        const response = await fetch(`${backendUrl}/experts-institutions`);
        if (!response.ok) {
          throw new Error("Failed to fetch experts");
        }

        const data = await response.json(); // ← Parse JSON here

        // Filter experts
        const filteredExperts = (data.experts || []).filter(
          (expert) => expert.subscription?.seats <= 1
        );

        setexperts(filteredExperts || []);
        setinstitutions(data.institutions || []); // ← Use `data`, not `response`
        setLoading(false);
        setInstitutions(data.institutions);
        setExperts(filteredExperts)
      } catch (error) {
        console.error("Error fetching data:", error);
        setexperts([]);
        setinstitutions([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Build correct image URL
  const buildImageUrl = (path) => {
    if (!path) return PLACEHOLDER;
    const i = path.indexOf("uploads");
    if (i === -1) return PLACEHOLDER;
    const rel = path.substring(i).replace(/\\/g, "/");
    return `${API_BASE}/${rel}`;
  };

  // Map Institutions
  const mappedInstitutions = (institutions || []).map((inst) => ({
    id: inst._id,
    name: inst.name || "Unnamed Institution",
    location: `${inst.Admin?.information?.city || "N/A"}, ${inst.Admin?.information?.country || ""}`.trim(),
    workType: inst.Admin?.subscription?.plantype === "institutional" ? "Offline" : "Online",
    price: `$${(inst.Admin?.subscription?.price || 0) / 100}/yr`,
    image: buildImageUrl(inst.logo),
    fullData: inst,
  }));

  // Map Experts
  const mappedExperts = (experts || []).map((expert) => {
    const galleryImage = expert.galleryFiles?.[0]?.path;
    return {
      id: expert._id,
      name: `${expert.information?.name || ""} ${expert.information?.surname || ""}`.trim(),
      location: `${expert.information?.city || "N/A"}, ${expert.information?.country || ""}`.trim(),
      workType: expert.subscription?.plantype === "individual" ? "Online" : "Offline",
      price: expert.hourlyPrice > 0 ? `$${expert.hourlyPrice}/hr` : "Free Consultation",
      specialty: expert.titles?.[0]?.title || "Expert",
      image: galleryImage ? buildImageUrl(galleryImage) : PLACEHOLDER,
      fullData: expert,
    };
  });

  const currentData = activeTab === "institutions" ? mappedInstitutions : mappedExperts;

  // Click Handlers
  const handleInstitutionClick = (item) => {
    console.log("Institution ID:", item.id);
    const institutionID = item.id;
    router.push(`/institution/${institutionID}`); // Dynamic URL
  };

  const handleExpertClick = (item) => {
    console.log("Expert ID:", item.id);
    const expertID = item.id;
    router.push(`/expert/${expertID}`); // Dynamic URL
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Find the Perfect Expert</h1>
          <p className="text-xl text-emerald-50 mb-8">
            Connect with top-rated institutions and professionals worldwide
          </p>
          <div className="max-w-3xl bg-white rounded-full shadow-xl p-2 flex items-center">
            <input
              type="text"
              placeholder="Search for services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-3 text-gray-800 outline-none rounded-full"
            />
            <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition">
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center mb-12 gap-3">
          <button
            onClick={() => setActiveTab("institutions")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "institutions"
                ? "bg-emerald-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 shadow hover:shadow-md"
            }`}
          >
            <Building2 size={20} />
            Institutions
          </button>
          <button
            onClick={() => setActiveTab("experts")}
            className={`px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center gap-2 ${
              activeTab === "experts"
                ? "bg-emerald-600 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 shadow hover:shadow-md"
            }`}
          >
            <Award size={20} />
            Experts
          </button>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-gray-600">Loading experts...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-gray-600 text-lg">
                <span className="font-semibold text-gray-900">{currentData.length}</span> services available
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentData.map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    activeTab === "institutions"
                      ? handleInstitutionClick(item)
                      : handleExpertClick(item)
                  }
                  className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group"
                >
                  <div className="relative h-56 bg-gray-200 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = PLACEHOLDER;
                      }}
                    />
                    {/* <div className="absolute top-3 right-3 bg-white rounded-full px-3 py-1 shadow-lg">
                      <span className="text-sm font-bold text-gray-900">{item.price}</span>
                    </div> */}
                    <div className="absolute top-3 left-3 bg-emerald-600 text-white rounded-full px-3 py-1 text-xs font-semibold">
                      {item.workType}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition">
                      {item.name}
                    </h3>

                    {activeTab === "experts" && item.specialty && (
                      <p className="text-sm text-gray-600 mb-2 font-medium">{item.specialty}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    <button className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2 group">
                      View Profile
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {currentData.length === 0 && !loading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No {activeTab} found.</p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12 mt-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-gray-300 mb-6">Join thousands of satisfied clients</p>
          <button className="bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition">
            Get Started Today
          </button>
        </div>
      </div>
    </div>
  );
}


