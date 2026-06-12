"use client";

import { useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export function PropertyFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [type, setType] = useState(searchParams.get("type") || "");
  const [purpose, setPurpose] = useState(searchParams.get("purpose") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [bathrooms, setBathrooms] = useState(searchParams.get("bathrooms") || "");

  const handleApplyFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (keyword) params.set("keyword", keyword); else params.delete("keyword");
    if (location && location !== "all") params.set("location", location); else params.delete("location");
    if (type && type !== "all") params.set("type", type); else params.delete("type");
    if (purpose && purpose !== "all") params.set("purpose", purpose); else params.delete("purpose");
    if (minPrice) params.set("minPrice", minPrice); else params.delete("minPrice");
    if (maxPrice) params.set("maxPrice", maxPrice); else params.delete("maxPrice");
    if (bedrooms && bedrooms !== "any") params.set("bedrooms", bedrooms); else params.delete("bedrooms");
    if (bathrooms && bathrooms !== "any") params.set("bathrooms", bathrooms); else params.delete("bathrooms");

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
      <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <Search className="h-5 w-5 text-gold-500" /> Advanced Search
      </h3>

      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Keyword</Label>
          <Input 
            placeholder="Enter property name or location..." 
            className="bg-slate-50 border-slate-200" 
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label>Location</Label>
          <Select value={location} onValueChange={(val) => setLocation(val || "")}>
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="Dar es Salaam">Dar es Salaam</SelectItem>
              <SelectItem value="Arusha">Arusha</SelectItem>
              <SelectItem value="Mwanza">Mwanza</SelectItem>
              <SelectItem value="Zanzibar">Zanzibar</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select value={type} onValueChange={(val) => setType(val || "")}>
            <SelectTrigger className="bg-slate-50 border-slate-200">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="House">House</SelectItem>
              <SelectItem value="Apartment">Apartment</SelectItem>
              <SelectItem value="Commercial">Commercial</SelectItem>
              <SelectItem value="Land">Land</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {!pathname.includes('/for-sale') && !pathname.includes('/for-rent') && (
          <div className="space-y-2">
            <Label>Purpose</Label>
            <Select value={purpose} onValueChange={(val) => setPurpose(val || "")}>
              <SelectTrigger className="bg-slate-50 border-slate-200">
                <SelectValue placeholder="Rent or Sale" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Purposes</SelectItem>
                <SelectItem value="SALE">For Sale</SelectItem>
                <SelectItem value="RENT">For Rent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Min Price (TZS)</Label>
            <Input 
              type="number" 
              placeholder="e.g. 100000" 
              className="bg-slate-50 border-slate-200" 
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Max Price (TZS)</Label>
            <Input 
              type="number" 
              placeholder="Any" 
              className="bg-slate-50 border-slate-200" 
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Bedrooms</Label>
            <Select value={bedrooms} onValueChange={(val) => setBedrooms(val || "")}>
              <SelectTrigger className="bg-slate-50 border-slate-200">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Bathrooms</Label>
            <Select value={bathrooms} onValueChange={(val) => setBathrooms(val || "")}>
              <SelectTrigger className="bg-slate-50 border-slate-200">
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button 
          onClick={handleApplyFilters}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-6"
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
}
