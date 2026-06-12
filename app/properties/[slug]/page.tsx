import { PropertyGallery } from "@/components/properties/PropertyGallery";
import { PropertyInquiryForm } from "@/components/properties/PropertyInquiryForm";
import { PropertyActions } from "@/components/properties/PropertyActions";
import { SimilarProperties } from "@/components/properties/SimilarProperties";
import { PropertyBrochure } from "@/components/properties/PropertyBrochure";
import { MapPin, Bed, Bath, Car, Square, Calendar, Check, Map as MapIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function PropertyDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const baseProperty = await prisma.property.findUnique({
    where: { slug },
    include: { agent: true, images: true }
  });
  
  if (!baseProperty) notFound();

  // Extend base property with dummy data for UI purposes where fields are missing
  const property = {
    ...baseProperty,
    features: {
      bedrooms: baseProperty.bedrooms || 0,
      bathrooms: baseProperty.bathrooms || 0,
      parking: baseProperty.parking || 0,
      size: baseProperty.size || 0,
      landSize: baseProperty.landSize || baseProperty.size || 0,
      yearBuilt: baseProperty.yearBuilt || 2021,
      furnished: baseProperty.furnished,
    },
    amenities: baseProperty.amenities ? baseProperty.amenities.split(",").map(a => a.trim()).filter(Boolean) : [],
    agent: {
      id: baseProperty.agent.id,
      name: baseProperty.agent.name || "Agent",
      company: "Prime Estate",
      phone: baseProperty.agent.phone || "+255123456789",
      image: baseProperty.agent.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    },
    images: baseProperty.images.length > 0 
      ? baseProperty.images.map(img => ({ id: img.id, url: img.imageUrl }))
      : [{ id: "img1", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80" }]
  };

  const currency = "TZS";
  const formattedPrice = new Intl.NumberFormat("en-US").format(property.price);

  return (
    <>
      <div className="bg-slate-50 min-h-screen py-8 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white uppercase tracking-wider">
                {property.status.replace("_", " ")}
              </Badge>
              <Badge className="bg-slate-200 text-slate-800 hover:bg-slate-300">
                ID: {property.id}
              </Badge>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-2 font-heading">
              {property.title}
            </h1>
            <p className="flex items-center text-slate-500 text-lg">
              <MapPin className="h-5 w-5 mr-1 text-gold-500" /> {property.location}
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="text-4xl font-bold text-slate-900">
              {currency} {formattedPrice}
            </p>
            {property.purpose === "RENT" && <p className="text-slate-500 text-lg">/ month</p>}
          </div>
        </div>

        {/* Gallery */}
        <div className="mb-12">
          <PropertyGallery images={property.images} />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="w-full lg:w-2/3 space-y-12">
            
            {/* Quick Info Bar */}
            <div className="flex flex-wrap items-center justify-between gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-3 rounded-xl"><Bed className="h-6 w-6 text-slate-700" /></div>
                <div><p className="text-sm text-slate-500">Bedrooms</p><p className="font-bold text-slate-900">{property.features.bedrooms}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-3 rounded-xl"><Bath className="h-6 w-6 text-slate-700" /></div>
                <div><p className="text-sm text-slate-500">Bathrooms</p><p className="font-bold text-slate-900">{property.features.bathrooms}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-3 rounded-xl"><Car className="h-6 w-6 text-slate-700" /></div>
                <div><p className="text-sm text-slate-500">Parking</p><p className="font-bold text-slate-900">{property.features.parking}</p></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-slate-100 p-3 rounded-xl"><Square className="h-6 w-6 text-slate-700" /></div>
                <div><p className="text-sm text-slate-500">Area</p><p className="font-bold text-slate-900">{property.features.size} m²</p></div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading">Property Description</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            {/* Property Overview */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading">Property Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4">
                <div><p className="text-slate-500 text-sm">Property Type</p><p className="font-semibold text-slate-900">House</p></div>
                <div><p className="text-slate-500 text-sm">Year Built</p><p className="font-semibold text-slate-900 flex items-center gap-1"><Calendar className="h-4 w-4 text-gold-500" /> {property.features.yearBuilt}</p></div>
                <div><p className="text-slate-500 text-sm">Land Size</p><p className="font-semibold text-slate-900">{property.features.landSize} m²</p></div>
                <div><p className="text-slate-500 text-sm">Furnished</p><p className="font-semibold text-slate-900">{property.features.furnished ? "Yes" : "Unfurnished"}</p></div>
                <div><p className="text-slate-500 text-sm">Purpose</p><p className="font-semibold text-slate-900">{property.purpose}</p></div>
              </div>
            </div>

            {/* Amenities */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading">Amenities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {property.amenities.map(amenity => (
                  <div key={amenity} className="flex items-center gap-2">
                    <Check className="h-5 w-5 text-emerald-500 shrink-0" />
                    <span className="text-slate-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-6 font-heading flex items-center gap-2">
                <MapIcon className="h-6 w-6 text-gold-500" /> Location Map
              </h3>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-inner border border-slate-100 bg-slate-100">
                <iframe
                  width="100%"
                  height="100%"
                  className="border-0"
                  src={`https://www.google.com/maps?q=${encodeURIComponent(property.location)}&output=embed`}
                  allowFullScreen
                  title={`Map showing location of ${property.location}`}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
            
            {/* Action Buttons */}
            <PropertyActions title={property.title} />

            {/* Agent Card */}
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h4 className="text-lg font-bold text-slate-900 mb-4">Listed By</h4>
              <div className="flex items-center gap-4 mb-6">
                <Image src={property.agent.image} alt={property.agent.name} width={64} height={64} unoptimized className="rounded-full ring-2 ring-gold-100" />
                <div>
                  <p className="font-bold text-slate-900 text-lg">{property.agent.name}</p>
                  <p className="text-slate-500 text-sm">{property.agent.company}</p>
                </div>
              </div>
              <Link href={`/agents/${property.agent.id}`} className="block w-full">
                <Button variant="outline" className="w-full border-slate-200 text-slate-900 font-semibold hover:bg-slate-50">
                  View Profile
                </Button>
              </Link>
            </div>

            {/* Sticky Inquiry Form */}
            <div id="inquiry" className="sticky top-24">
              <PropertyInquiryForm propertyId={property.id} propertyTitle={property.title} agentPhone={property.agent.phone} />
            </div>

          </div>
        </div>

        <SimilarProperties />

      </div>
      </div>
      <PropertyBrochure property={property} />
    </>
  );
}
