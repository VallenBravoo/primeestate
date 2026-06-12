"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle2, UploadCloud, Building2, MapPin, DollarSign, ListChecks } from "lucide-react";

const propertySchema = z.object({
  title: z.string().min(10, "Title is too short"),
  description: z.string().min(50, "Description is too short (min 50 characters)"),
  location: z.string().min(5, "Location is required"),
  price: z.string().min(1, "Price is required"),
  purpose: z.enum(["SALE", "RENT"]),
  propertyType: z.string().min(1, "Property type is required"),
  bedrooms: z.string().optional(),
  bathrooms: z.string().optional(),
  size: z.string().optional(),
  ownerName: z.string().min(2, "Owner name is required"),
  ownerPhone: z.string().min(8, "Valid phone number is required"),
  ownerEmail: z.string().email("Valid email is required"),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

export default function ListPropertyPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [step, setStep] = useState(1);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      price: "",
      purpose: "SALE",
      propertyType: "",
      bedrooms: "",
      bathrooms: "",
      size: "",
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
    },
  });

  const onSubmit = async (data: PropertyFormValues) => {
    try {
      const response = await fetch("/api/properties", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        console.error("Failed to submit property:", await response.text());
        alert("Failed to submit property. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-slate-50 min-h-screen py-24 flex items-center justify-center px-4">
        <div className="bg-white p-12 rounded-3xl border border-gray-100 shadow-xl text-center max-w-2xl w-full">
          <div className="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-4 font-heading">Listing Submitted Successfully!</h1>
          <p className="text-slate-600 text-lg mb-8">
            Thank you for listing your property with PrimeEstate. Our team will review the details and verify your listing within 24 hours. Once verified, it will be visible to thousands of potential buyers and tenants.
          </p>
          <Button 
            onClick={() => { setIsSubmitted(false); form.reset(); setStep(1); }}
            className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-6 text-lg"
          >
            Submit Another Property
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-heading">
            List Your Property
          </h1>
          <p className="text-slate-600 text-lg">
            Reach thousands of serious buyers and tenants by listing your property on PrimeEstate.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Progress Steps */}
          <div className="bg-slate-900 p-6 flex justify-between items-center text-white">
            <div className={`flex flex-col items-center gap-2 ${step >= 1 ? "opacity-100" : "opacity-50"}`}>
              <div className="h-10 w-10 rounded-full bg-gold-500 text-slate-900 flex items-center justify-center font-bold"><Building2 className="h-5 w-5" /></div>
              <span className="text-sm font-medium">Basic Info</span>
            </div>
            <div className="flex-grow h-1 bg-slate-700 mx-4">
              <div className={`h-full bg-gold-500 transition-all ${step >= 2 ? "w-full" : "w-0"}`} />
            </div>
            <div className={`flex flex-col items-center gap-2 ${step >= 2 ? "opacity-100" : "opacity-50"}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 2 ? "bg-gold-500 text-slate-900" : "bg-slate-800 text-slate-400"}`}><ListChecks className="h-5 w-5" /></div>
              <span className="text-sm font-medium">Details</span>
            </div>
            <div className="flex-grow h-1 bg-slate-700 mx-4">
              <div className={`h-full bg-gold-500 transition-all ${step >= 3 ? "w-full" : "w-0"}`} />
            </div>
            <div className={`flex flex-col items-center gap-2 ${step >= 3 ? "opacity-100" : "opacity-50"}`}>
              <div className={`h-10 w-10 rounded-full flex items-center justify-center font-bold ${step >= 3 ? "bg-gold-500 text-slate-900" : "bg-slate-800 text-slate-400"}`}><CheckCircle2 className="h-5 w-5" /></div>
              <span className="text-sm font-medium">Contact</span>
            </div>
          </div>

          <form onSubmit={form.handleSubmit(onSubmit)} className="p-8 md:p-12 space-y-8">
            
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading flex items-center gap-2">
                  <Building2 className="h-6 w-6 text-gold-500" /> Basic Property Information
                </h2>
                
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Property Title</label>
                  <Input placeholder="e.g. Modern 4 Bedroom House in Mbezi Beach" {...form.register("title")} className="bg-slate-50 h-12" />
                  {form.formState.errors.title && <p className="text-red-500 text-xs">{form.formState.errors.title.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Property Type</label>
                    <Select onValueChange={(val) => form.setValue("propertyType", (val as string) || "")}>
                      <SelectTrigger className="bg-slate-50 h-12">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="HOUSE">House</SelectItem>
                        <SelectItem value="APARTMENT">Apartment</SelectItem>
                        <SelectItem value="COMMERCIAL">Commercial</SelectItem>
                        <SelectItem value="LAND">Land/Plot</SelectItem>
                      </SelectContent>
                    </Select>
                    {form.formState.errors.propertyType && <p className="text-red-500 text-xs">{form.formState.errors.propertyType.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Purpose</label>
                    <Select onValueChange={(val) => form.setValue("purpose", (val as "SALE" | "RENT") || "SALE")}>
                      <SelectTrigger className="bg-slate-50 h-12">
                        <SelectValue placeholder="For Sale or Rent?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SALE">For Sale</SelectItem>
                        <SelectItem value="RENT">For Rent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><DollarSign className="h-4 w-4" /> Price (TZS)</label>
                    <Input type="number" placeholder="e.g. 350000000" {...form.register("price")} className="bg-slate-50 h-12" />
                    {form.formState.errors.price && <p className="text-red-500 text-xs">{form.formState.errors.price.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-2"><MapPin className="h-4 w-4" /> Location</label>
                    <Input placeholder="e.g. Mbezi Beach, Dar es Salaam" {...form.register("location")} className="bg-slate-50 h-12" />
                    {form.formState.errors.location && <p className="text-red-500 text-xs">{form.formState.errors.location.message}</p>}
                  </div>
                </div>

                <Button type="button" onClick={() => setStep(2)} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold h-14">
                  Continue to Next Step
                </Button>
              </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading flex items-center gap-2">
                  <ListChecks className="h-6 w-6 text-gold-500" /> Property Details
                </h2>

                <div className="grid grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Bedrooms</label>
                    <Input type="number" placeholder="e.g. 4" {...form.register("bedrooms")} className="bg-slate-50 h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Bathrooms</label>
                    <Input type="number" placeholder="e.g. 3" {...form.register("bathrooms")} className="bg-slate-50 h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Size (m²)</label>
                    <Input type="number" placeholder="e.g. 450" {...form.register("size")} className="bg-slate-50 h-12" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Property Description</label>
                  <Textarea placeholder="Describe your property in detail. Mention key features, nearby amenities, condition..." {...form.register("description")} className="bg-slate-50 min-h-[150px]" />
                  {form.formState.errors.description && <p className="text-red-500 text-xs">{form.formState.errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Property Images</label>
                  <div className="border-2 border-dashed border-slate-300 rounded-xl p-10 text-center bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer flex flex-col items-center justify-center">
                    <UploadCloud className="h-10 w-10 text-slate-400 mb-4" />
                    <p className="text-slate-600 font-medium mb-1">Click to upload or drag and drop</p>
                    <p className="text-slate-400 text-sm">Max 10 images (JPEG, PNG, WEBP)</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button type="button" variant="outline" onClick={() => setStep(1)} className="flex-1 border-slate-200 h-14 font-bold">
                    Back
                  </Button>
                  <Button type="button" onClick={() => setStep(3)} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold h-14">
                    Continue to Next Step
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Contact */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 font-heading flex items-center gap-2">
                  <CheckCircle2 className="h-6 w-6 text-gold-500" /> Owner/Agent Contact Details
                </h2>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Full Name</label>
                  <Input placeholder="John Doe" {...form.register("ownerName")} className="bg-slate-50 h-12" />
                  {form.formState.errors.ownerName && <p className="text-red-500 text-xs">{form.formState.errors.ownerName.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Phone Number (WhatsApp preferred)</label>
                    <Input type="tel" placeholder="+255..." {...form.register("ownerPhone")} className="bg-slate-50 h-12" />
                    {form.formState.errors.ownerPhone && <p className="text-red-500 text-xs">{form.formState.errors.ownerPhone.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <Input type="email" placeholder="john@example.com" {...form.register("ownerEmail")} className="bg-slate-50 h-12" />
                    {form.formState.errors.ownerEmail && <p className="text-red-500 text-xs">{form.formState.errors.ownerEmail.message}</p>}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button type="button" variant="outline" onClick={() => setStep(2)} className="flex-1 border-slate-200 h-14 font-bold">
                    Back
                  </Button>
                  <Button type="submit" className="flex-1 bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold h-14">
                    Submit Property Listing
                  </Button>
                </div>
              </div>
            )}
          </form>

        </div>
      </div>
    </div>
  );
}
