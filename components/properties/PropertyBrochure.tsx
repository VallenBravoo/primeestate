"use client";

import { MapPin, PhoneCall, Mail, Ruler, Bed, Bath, Car, Check } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function PropertyBrochure({ property }: { property: any }) {
  // Format price
  const formattedPrice = new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: 'TZS',
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="hidden print:block bg-white text-slate-900 absolute top-0 left-0 w-full min-h-screen z-[9999] p-8">
      
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-gold-500 pb-6 mb-6">
        <div>
          <h1 className="text-4xl font-bold font-heading text-slate-900 mb-2">{property.title}</h1>
          <p className="text-xl text-slate-600 flex items-center gap-2">
            <MapPin className="h-5 w-5" /> {property.location}
          </p>
        </div>
        <div className="text-right">
          <p className="text-3xl font-bold text-gold-600">{formattedPrice}</p>
          <p className="text-slate-500 uppercase tracking-widest text-sm font-bold mt-1">
            {property.status.replace("_", " ")}
          </p>
        </div>
      </div>

      {/* Main Image */}
      <div className="w-full h-[400px] relative rounded-xl overflow-hidden mb-8 shadow-md print:break-inside-avoid">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img 
          src={property.images[0]?.url || property.imageUrl} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
      </div>

      {/* Key Specs */}
      <div className="grid grid-cols-4 gap-4 mb-8 bg-slate-50 p-6 rounded-xl border border-slate-100 print:break-inside-avoid">
        <div className="flex flex-col items-center justify-center text-center">
          <Bed className="h-8 w-8 text-gold-500 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{property.features.bedrooms}</p>
          <p className="text-sm text-slate-500 uppercase">Bedrooms</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center border-l border-slate-200">
          <Bath className="h-8 w-8 text-gold-500 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{property.features.bathrooms}</p>
          <p className="text-sm text-slate-500 uppercase">Bathrooms</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center border-l border-slate-200">
          <Car className="h-8 w-8 text-gold-500 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{property.features.parking}</p>
          <p className="text-sm text-slate-500 uppercase">Parking</p>
        </div>
        <div className="flex flex-col items-center justify-center text-center border-l border-slate-200">
          <Ruler className="h-8 w-8 text-gold-500 mb-2" />
          <p className="text-2xl font-bold text-slate-900">{property.features.area} m²</p>
          <p className="text-sm text-slate-500 uppercase">Size</p>
        </div>
      </div>

      {/* Two Column Layout for Description & Details */}
      <div className="grid grid-cols-2 gap-8 mb-8 print:break-inside-avoid">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Description</h3>
          <p className="text-slate-700 leading-relaxed text-sm">
            {property.description}
          </p>
          
          <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4 border-b pb-2">Property Features</h3>
          <ul className="grid grid-cols-1 gap-2">
            {property.featuresList?.map((feature: string, idx: number) => (
              <li key={idx} className="flex items-center text-sm text-slate-700">
                <Check className="h-4 w-4 text-emerald-500 mr-2 shrink-0" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Amenities</h3>
          <ul className="grid grid-cols-2 gap-2">
            {property.amenities?.map((amenity: string, idx: number) => (
              <li key={idx} className="flex items-center text-sm text-slate-700">
                <Check className="h-4 w-4 text-gold-500 mr-2 shrink-0" />
                {amenity}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Gallery Grid (Avoid breaks inside) */}
      <div className="mb-8 print:break-inside-avoid">
        <h3 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">Additional Photos</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {property.images.slice(1, 4).map((img: any, idx: number) => (
            <div key={idx} className="aspect-[4/3] relative rounded-lg overflow-hidden">
               {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={img.url} 
                alt={`${property.title} - view ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Agent Footer Footer anchored to bottom or below content */}
      <div className="mt-12 bg-slate-900 text-white rounded-xl p-6 flex items-center justify-between print:break-inside-avoid">
        <div className="flex items-center gap-4">
          <div className="h-16 w-16 relative rounded-full overflow-hidden border-2 border-gold-500">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={property.agent.image} 
              alt={property.agent.name}
              className="w-full h-full object-cover" 
            />
          </div>
          <div>
            <p className="text-gold-400 text-sm font-semibold uppercase tracking-wider mb-1">Listed By</p>
            <h3 className="text-2xl font-bold">{property.agent.name}</h3>
            <p className="text-slate-300 text-sm">{property.agent.company}</p>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 border-l border-slate-700 pl-8">
          <p className="flex items-center text-lg font-medium">
            <PhoneCall className="h-5 w-5 text-gold-500 mr-3" />
            {property.agent.phone}
          </p>
          <p className="flex items-center text-lg font-medium">
            <Mail className="h-5 w-5 text-gold-500 mr-3" />
            {property.agent.email}
          </p>
        </div>
      </div>

    </div>
  );
}
