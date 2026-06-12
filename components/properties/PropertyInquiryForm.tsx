"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, PhoneCall, CheckCircle2 } from "lucide-react";

const inquirySchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(8, "Phone number is too short"),
  message: z.string().min(10, "Message is too short"),
});

type InquiryFormValues = z.infer<typeof inquirySchema>;

export function PropertyInquiryForm({ propertyTitle, propertyId, agentPhone = "+255123456789" }: { propertyTitle: string; propertyId: string; agentPhone?: string }) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: `I am interested in ${propertyTitle}. Please send me more details.`,
    },
  });

  const onSubmit = async (data: InquiryFormValues) => {
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, propertyId }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        const errorData = await response.json();
        alert(`Failed to submit inquiry: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      alert("An error occurred while submitting your inquiry.");
    }
  };

  const whatsappMessage = encodeURIComponent(`Hello, I'm interested in this property: ${propertyTitle}`);

  if (isSubmitted) {
    return (
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
        <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-8 w-8 text-emerald-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
        <p className="text-slate-600">
          Your inquiry has been received. Our agent will contact you shortly.
        </p>
        <Button 
          variant="outline" 
          className="mt-6 w-full"
          onClick={() => setIsSubmitted(false)}
        >
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-slate-900 mb-2">Interested in this property?</h3>
      <p className="text-slate-500 text-sm mb-6">
        Send your details and our agent will contact you with more information and availability.
      </p>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Input placeholder="Full Name" {...form.register("name")} className="bg-slate-50" />
          {form.formState.errors.name && <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>}
        </div>
        <div>
          <Input placeholder="Email Address" type="email" {...form.register("email")} className="bg-slate-50" />
          {form.formState.errors.email && <p className="text-red-500 text-xs mt-1">{form.formState.errors.email.message}</p>}
        </div>
        <div>
          <Input placeholder="Phone Number" type="tel" {...form.register("phone")} className="bg-slate-50" />
          {form.formState.errors.phone && <p className="text-red-500 text-xs mt-1">{form.formState.errors.phone.message}</p>}
        </div>
        <div>
          <Textarea 
            placeholder="Message" 
            {...form.register("message")} 
            className="bg-slate-50 min-h-[100px]" 
          />
          {form.formState.errors.message && <p className="text-red-500 text-xs mt-1">{form.formState.errors.message.message}</p>}
        </div>
        <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold">
          Send Inquiry
        </Button>
      </form>

      <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
        <a aria-label="Contact via WhatsApp" href={`https://wa.me/${agentPhone.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", className: "w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800" })}>
          <MessageSquare className="h-4 w-4 mr-2" /> Contact via WhatsApp
        </a>
        <a aria-label="Call Agent" href={`tel:${agentPhone}`} className={buttonVariants({ variant: "outline", className: "w-full border-slate-200 text-slate-700 hover:bg-slate-50" })}>
          <PhoneCall className="h-4 w-4 mr-2" /> Call Agent
        </a>
      </div>
    </div>
  );
}
