"use client";

import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-heading">
            Get in Touch
          </h1>
          <p className="text-slate-600 text-lg">
            Have a question about a property, our services, or want to partner with us? Our team is ready to help you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Contact Information */}
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-8 font-heading">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full shrink-0">
                    <MapPin className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Office Address</h3>
                    <p className="text-slate-600 mt-1">Ubungo<br />Dar es salaam, Tanzania</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full shrink-0">
                    <Phone className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Phone Numbers</h3>
                    <p className="text-slate-600 mt-1">+255 622 671 804</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full shrink-0">
                    <Mail className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Email Address</h3>
                    <p className="text-slate-600 mt-1">info@primeestate.com<br />support@primeestate.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-gold-100 p-3 rounded-full shrink-0">
                    <Clock className="h-6 w-6 text-gold-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Working Hours</h3>
                    <p className="text-slate-600 mt-1">Monday - Friday: 8:00 AM - 6:00 PM<br />Saturday: 9:00 AM - 2:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-32 h-32 rounded-full bg-gold-500 opacity-20 blur-2xl" />
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-3">
                <MessageSquare className="h-6 w-6 text-gold-500" /> Fast Response via WhatsApp
              </h3>
              <p className="text-slate-300 mb-6">
                Need immediate assistance? Click below to chat with our support team on WhatsApp.
              </p>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold w-full sm:w-auto">
                Chat on WhatsApp
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 font-heading">Send Us a Message</h2>
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">First Name</label>
                  <Input placeholder="John" className="bg-slate-50 h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700">Last Name</label>
                  <Input placeholder="Doe" className="bg-slate-50 h-12" />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email Address</label>
                <Input type="email" placeholder="john@example.com" className="bg-slate-50 h-12" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Subject</label>
                <Input placeholder="How can we help you?" className="bg-slate-50 h-12" />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Message</label>
                <Textarea placeholder="Type your message here..." className="bg-slate-50 min-h-[150px]" />
              </div>

              <Button type="submit" className="w-full h-14 bg-slate-900 hover:bg-slate-800 text-white font-bold text-lg">
                Send Message
              </Button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}
