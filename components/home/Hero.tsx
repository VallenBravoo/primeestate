"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, MapPin, Home, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function Hero() {
  const router = useRouter();
  const [purpose, setPurpose] = useState("rent");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (purpose) params.append("purpose", purpose);
    if (location) params.append("location", location);
    if (propertyType && propertyType !== "all") params.append("type", propertyType);
    if (priceRange && priceRange !== "any") {
      const [min, max] = priceRange.split("-");
      if (min) params.append("minPrice", min);
      if (max) params.append("maxPrice", max);
    }

    router.push(`/properties?${params.toString()}`);
  };
  return (
    <div className="relative min-h-[600px] flex items-center justify-center pt-20 pb-32 overflow-hidden bg-slate-900">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-40 bg-cover bg-center bg-[url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2075&q=80')]"
      >
        <div className="absolute inset-0 bg-slate-900/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 font-heading tracking-tight max-w-4xl">
          Find Your Next Property or <span className="text-gold-500">Showcase Yours</span> Professionally
        </h1>
        <p className="text-lg md:text-xl text-slate-200 mb-10 max-w-3xl leading-relaxed">
          A modern real estate platform built to help agents, landlords, and property owners display listings, attract serious clients, and close deals faster.
        </p>

        {/* Search Panel */}
        <div className="w-full max-w-5xl bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl">
          <div className="bg-white rounded-xl p-4 md:p-6 shadow-inner">
            <Tabs defaultValue="rent" onValueChange={setPurpose} className="w-full">
              <TabsList className="grid w-full max-w-md grid-cols-2 mb-6 bg-slate-100">
                <TabsTrigger value="rent" className="text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">For Rent</TabsTrigger>
                <TabsTrigger value="sale" className="text-base font-semibold data-[state=active]:bg-white data-[state=active]:text-slate-900 data-[state=active]:shadow-sm">For Sale</TabsTrigger>
              </TabsList>
              
              {["rent", "sale"].map((tab) => (
                <TabsContent key={tab} value={tab} className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-gold-500" /> Location
                      </label>
                      <Input 
                        placeholder="e.g. Dar es Salaam" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="h-12 border-slate-200 focus-visible:ring-gold-500" 
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                        <Home className="h-4 w-4 text-gold-500" /> Property Type
                      </label>
                      <Select value={propertyType} onValueChange={(val) => setPropertyType(val || "")}>
                        <SelectTrigger className="h-12 border-slate-200 focus:ring-gold-500">
                          <SelectValue placeholder="All Types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Types</SelectItem>
                          <SelectItem value="house">House</SelectItem>
                          <SelectItem value="apartment">Apartment</SelectItem>
                          <SelectItem value="villa">Villa</SelectItem>
                          <SelectItem value="commercial">Commercial</SelectItem>
                          <SelectItem value="land">Land</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">
                        <Building className="h-4 w-4 text-gold-500" /> Price Range
                      </label>
                      <Select value={priceRange} onValueChange={(val) => setPriceRange(val || "")}>
                        <SelectTrigger className="h-12 border-slate-200 focus:ring-gold-500">
                          <SelectValue placeholder="Any Price" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="any">Any Price</SelectItem>
                          <SelectItem value="0-500000">Under 500k TZS</SelectItem>
                          <SelectItem value="500000-1000000">500k - 1M TZS</SelectItem>
                          <SelectItem value="1000000-5000000">1M - 5M TZS</SelectItem>
                          <SelectItem value="5000000-">Above 5M TZS</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <Button 
                      onClick={handleSearch}
                      className="h-12 bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold text-lg w-full"
                    >
                      <Search className="h-5 w-5 mr-2" />
                      Search
                    </Button>

                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>

      </div>
    </div>
  );
}
