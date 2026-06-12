"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Save, Bell, Shield, User, Globe, Mail, DollarSign, Camera, Check } from "lucide-react";
import Image from "next/image";

type Tab = "general" | "notifications" | "profile" | "security";

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("general");
  const [isSaving, setIsSaving] = useState(false);
  const [savedStatus, setSavedStatus] = useState<"idle" | "saved">("idle");

  const handleSave = () => {
    setIsSaving(true);
    setSavedStatus("idle");
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSavedStatus("saved");
      setTimeout(() => setSavedStatus("idle"), 3000);
    }, 800);
  };

  const navItems: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "general", label: "General Settings", icon: <Globe className="h-5 w-5" /> },
    { id: "notifications", label: "Notifications", icon: <Bell className="h-5 w-5" /> },
    { id: "profile", label: "Admin Profile", icon: <User className="h-5 w-5" /> },
    { id: "security", label: "Security", icon: <Shield className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-8 max-w-5xl">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-heading">Platform Settings</h1>
        <p className="text-slate-500">Manage your platform preferences, notifications, and profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Settings Navigation Sidebar */}
        <div className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 font-medium rounded-xl transition-all ${
                activeTab === item.id
                  ? "bg-white text-gold-600 font-bold shadow-sm border border-gray-100"
                  : "text-slate-600 hover:bg-white/60 border border-transparent"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* Settings Content Area */}
        <div className="md:col-span-2">
          
          {/* ---------------- GENERAL SETTINGS ---------------- */}
          {activeTab === "general" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-slate-900 font-heading">General Settings</h2>
                <p className="text-sm text-slate-500">Basic configuration for your real estate platform.</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label htmlFor="platformName" className="block text-sm font-semibold text-slate-900 mb-2">Platform Name</label>
                  <input 
                    id="platformName"
                    type="text" 
                    defaultValue="PrimeEstate" 
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="supportEmail" className="block text-sm font-semibold text-slate-900 mb-2">Support Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <input 
                      id="supportEmail"
                      type="email" 
                      defaultValue="support@primeestate.com" 
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="primaryCurrency" className="block text-sm font-semibold text-slate-900 mb-2">Primary Currency</label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
                    <select id="primaryCurrency" aria-label="Currency" className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none cursor-pointer transition-all">
                      <option value="TZS">Tanzanian Shilling (TZS)</option>
                      <option value="USD">US Dollar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 p-4 border-t border-gray-100 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className={`text-white transition-all ${savedStatus === 'saved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                  {isSaving ? (
                    <span className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Saving...</span>
                  ) : savedStatus === "saved" ? (
                    <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Saved Successfully</span>
                  ) : (
                    <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Save Changes</span>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* ---------------- NOTIFICATIONS ---------------- */}
          {activeTab === "notifications" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-slate-900 font-heading">Notification Preferences</h2>
                <p className="text-sm text-slate-500">Control when and how you receive administrative alerts.</p>
              </div>
              <div className="p-6 space-y-4">
                
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-900">New Property Submissions</h4>
                    <p className="text-sm text-slate-500">Receive an email when an agent submits a new property for approval.</p>
                  </div>
                  <label htmlFor="notif1" className="relative inline-flex items-center cursor-pointer">
                    <input id="notif1" aria-label="New Property Submissions" type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-900">New Agent Registrations</h4>
                    <p className="text-sm text-slate-500">Get notified when a new agent requests to join the platform.</p>
                  </div>
                  <label htmlFor="notif2" className="relative inline-flex items-center cursor-pointer">
                    <input id="notif2" aria-label="New Agent Registrations" type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-slate-300 transition-colors">
                  <div>
                    <h4 className="font-bold text-slate-900">Weekly Analytics Report</h4>
                    <p className="text-sm text-slate-500">Receive a weekly summary of platform traffic and inquiries.</p>
                  </div>
                  <label htmlFor="notif3" className="relative inline-flex items-center cursor-pointer">
                    <input id="notif3" aria-label="Weekly Analytics Report" type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                  </label>
                </div>

              </div>
              <div className="bg-slate-50 p-4 border-t border-gray-100 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className={`text-white transition-all ${savedStatus === 'saved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                  {isSaving ? (
                    <span className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Saving...</span>
                  ) : savedStatus === "saved" ? (
                    <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Saved Successfully</span>
                  ) : (
                    <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Save Preferences</span>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* ---------------- ADMIN PROFILE ---------------- */}
          {activeTab === "profile" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-slate-900 font-heading">Admin Profile</h2>
                <p className="text-sm text-slate-500">Update your personal information and profile picture.</p>
              </div>
              <div className="p-6 space-y-8">
                
                <div className="flex items-center gap-6">
                  <div className="relative h-24 w-24 rounded-full border-4 border-slate-50 overflow-hidden shadow-sm">
                    <Image src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Admin Profile" fill className="object-cover" unoptimized />
                  </div>
                  <div>
                    <Button variant="outline" className="border-slate-200 text-slate-700 mb-2">
                      <Camera className="h-4 w-4 mr-2" /> Change Photo
                    </Button>
                    <p className="text-xs text-slate-500">Recommended: Square JPG, PNG. Max 2MB.</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-slate-900 mb-2">First Name</label>
                    <input 
                      id="firstName"
                      type="text" 
                      defaultValue="System" 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-semibold text-slate-900 mb-2">Last Name</label>
                    <input 
                      id="lastName"
                      type="text" 
                      defaultValue="Admin" 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label htmlFor="profileEmail" className="block text-sm font-semibold text-slate-900 mb-2">Email Address</label>
                    <input 
                      id="profileEmail"
                      type="email" 
                      defaultValue="admin@primeestate.com" 
                      className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                    />
                  </div>
                </div>

              </div>
              <div className="bg-slate-50 p-4 border-t border-gray-100 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className={`text-white transition-all ${savedStatus === 'saved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                  {isSaving ? (
                    <span className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Saving...</span>
                  ) : savedStatus === "saved" ? (
                    <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Profile Updated</span>
                  ) : (
                    <span className="flex items-center gap-2"><Save className="h-4 w-4" /> Update Profile</span>
                  )}
                </Button>
              </div>
            </div>
          )}

          {/* ---------------- SECURITY ---------------- */}
          {activeTab === "security" && (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-300">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-slate-900 font-heading">Security Settings</h2>
                <p className="text-sm text-slate-500">Update your password and secure your account.</p>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-semibold text-slate-900 mb-2">Current Password</label>
                  <input 
                    id="currentPassword"
                    type="password" 
                    placeholder="Enter current password"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <label htmlFor="newPassword" className="block text-sm font-semibold text-slate-900 mb-2">New Password</label>
                  <input 
                    id="newPassword"
                    type="password" 
                    placeholder="Create a new password"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                  />
                  <p className="text-xs text-slate-500 mt-2">Must be at least 8 characters long and contain a number.</p>
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-900 mb-2">Confirm New Password</label>
                  <input 
                    id="confirmPassword"
                    type="password" 
                    placeholder="Confirm your new password"
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-gold-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="bg-slate-50 p-4 border-t border-gray-100 flex justify-end">
                <Button onClick={handleSave} disabled={isSaving} className={`text-white transition-all ${savedStatus === 'saved' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                  {isSaving ? (
                    <span className="flex items-center gap-2"><div className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin"></div> Updating...</span>
                  ) : savedStatus === "saved" ? (
                    <span className="flex items-center gap-2"><Check className="h-4 w-4" /> Password Changed</span>
                  ) : (
                    <span className="flex items-center gap-2"><Shield className="h-4 w-4" /> Change Password</span>
                  )}
                </Button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
