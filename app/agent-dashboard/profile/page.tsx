"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  Mail, Phone, MapPin, Briefcase, Camera, Save,
  Loader2, CheckCircle, AlertCircle, Upload, X,
} from "lucide-react";

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  profileImage: string;
  bio: string;
  companyName: string;
  specialization: string;
  location: string;
  whatsapp: string;
}

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=500&h=500&q=80";

export default function AgentProfilePage() {
  const { data: session } = useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    email: "",
    phone: "",
    profileImage: "",
    bio: "",
    companyName: "",
    specialization: "",
    location: "",
    whatsapp: "",
  });

  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [saveMessage, setSaveMessage] = useState("");
  const [dbOffline, setDbOffline] = useState(false);

  // Load profile from API (falls back gracefully if DB is offline)
  const loadProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/agents/profile");
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const u = data.user;
          setProfile({
            name: u.name ?? "",
            email: u.email ?? "",
            phone: u.phone ?? u.agentProfile?.phone ?? "",
            profileImage: u.profileImage ?? u.agentProfile?.profileImage ?? "",
            bio: u.agentProfile?.bio ?? "",
            companyName: u.agentProfile?.companyName ?? "",
            specialization: u.agentProfile?.specialization ?? "",
            location: u.agentProfile?.location ?? "",
            whatsapp: u.agentProfile?.whatsapp ?? "",
          });
          setPreviewUrl(u.profileImage ?? u.agentProfile?.profileImage ?? "");
        }
      } else if (res.status === 500) {
        setDbOffline(true);
      }
    } catch {
      setDbOffline(true);
    }

    // Pre-fill from session if DB offline
    if (session?.user) {
      setProfile(prev => ({
        ...prev,
        name: prev.name || session.user.name || "",
        email: prev.email || session.user.email || "",
        profileImage: prev.profileImage || session.user.image || "",
      }));
      setPreviewUrl(prev => prev || session.user?.image || "");
    }
  }, [session]);

  useEffect(() => {
    if (session) loadProfile();
  }, [session, loadProfile]);

  // Handle file selection
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError("");

    // Client-side validation
    if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
      setUploadError("Only JPEG, PNG, or WebP images are allowed.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image must be under 5MB.");
      return;
    }

    // Show local preview immediately
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload to server
    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.success) {
        setProfile(prev => ({ ...prev, profileImage: data.url }));
        setPreviewUrl(data.url);
        URL.revokeObjectURL(objectUrl);
      } else {
        setUploadError(data.error ?? "Upload failed. Please try again.");
        setPreviewUrl(profile.profileImage || "");
      }
    } catch {
      setUploadError("Upload failed. Please check your connection.");
      setPreviewUrl(profile.profileImage || "");
    } finally {
      setUploadingImage(false);
      // Reset input so the same file can be re-selected
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl("");
    setProfile(prev => ({ ...prev, profileImage: "" }));
    setUploadError("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");

    try {
      const res = await fetch("/api/agents/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile),
      });
      const data = await res.json();

      if (data.success) {
        setSaveStatus("success");
        setSaveMessage("Profile updated successfully!");
      } else {
        setSaveStatus("error");
        setSaveMessage(data.error ?? "Failed to save. Please try again.");
      }
    } catch {
      setSaveStatus("error");
      setSaveMessage("Could not connect to server.");
    } finally {
      setSaving(false);
      setTimeout(() => setSaveStatus("idle"), 4000);
    }
  };

  const displayImage = previewUrl || DEFAULT_AVATAR;
  const initials = profile.name
    ? profile.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)
    : "AG";

  const inputClass =
    "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-slate-400/20 focus:border-slate-400 outline-none transition-all text-sm";

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Profile Settings</h1>
          <p className="text-slate-500 mt-1">Update your personal information and public profile</p>
        </div>

        <div className="flex items-center gap-3">
          {saveStatus === "success" && (
            <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
              <CheckCircle className="w-4 h-4" /> {saveMessage}
            </span>
          )}
          {saveStatus === "error" && (
            <span className="flex items-center gap-1.5 text-sm text-red-500 font-medium">
              <AlertCircle className="w-4 h-4" /> {saveMessage}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || uploadingImage}
            className="bg-slate-900 hover:bg-slate-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>

      {dbOffline && (
        <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p>
            <strong>Database offline:</strong> Profile data can't be loaded or saved right now.
            You can still upload a profile picture — changes will apply once the database is connected.
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Left: Avatar & Quick Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center text-center">

            {/* Avatar with upload overlay */}
            <div className="relative mb-6">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg relative bg-slate-100">
                <Image
                  src={displayImage}
                  alt="Profile photo"
                  fill
                  className="object-cover"
                  unoptimized={displayImage.startsWith("/uploads/")}
                />
                {uploadingImage && (
                  <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
                    <Loader2 className="w-7 h-7 text-white animate-spin" />
                  </div>
                )}
              </div>

              {/* Camera click-to-upload button */}
              {!uploadingImage && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1 -right-1 bg-slate-900 hover:bg-slate-700 text-white rounded-full p-2.5 shadow-lg transition-colors border-2 border-white"
                  title="Change profile picture"
                >
                  <Camera className="w-4 h-4" />
                </button>
              )}

              {/* Remove image button */}
              {previewUrl && !uploadingImage && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-1 -right-1 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-lg transition-colors border-2 border-white"
                  title="Remove photo"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp"
              className="hidden"
              aria-label="Upload profile picture"
              onChange={handleFileChange}
            />

            {/* Upload button (text) */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploadingImage}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 disabled:opacity-50 mb-1 transition-colors"
            >
              <Upload className="w-4 h-4" />
              {uploadingImage ? "Uploading…" : "Change Photo"}
            </button>
            <p className="text-xs text-slate-400 mb-4">JPEG, PNG or WebP · Max 5MB</p>

            {uploadError && (
              <p className="text-xs text-red-500 flex items-center gap-1 mb-3">
                <AlertCircle className="w-3 h-3" /> {uploadError}
              </p>
            )}

            <h2 className="text-xl font-bold text-slate-900 mb-1">
              {profile.name || "Your Name"}
            </h2>
            <p className="text-slate-500 text-sm mb-4">
              {profile.specialization || "Real Estate Agent"}
            </p>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
              Verified Agent
            </span>
          </div>

          {/* Quick info card */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h3 className="font-semibold text-slate-900 mb-2">Public Info</h3>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span className="truncate">{profile.email || session?.user?.email || "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{profile.phone || "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{profile.location || "—"}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600 text-sm">
              <Briefcase className="w-4 h-4 text-slate-400 flex-shrink-0" />
              <span>{profile.companyName || "—"}</span>
            </div>
          </div>
        </div>

        {/* Right: Edit Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
            <h2 className="text-lg font-bold text-slate-900 mb-6 border-b border-gray-100 pb-4">
              Personal Details
            </h2>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile(p => ({ ...p, name: e.target.value }))}
                    placeholder="Your full name"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={profile.email}
                    disabled
                    className={`${inputClass} opacity-60 cursor-not-allowed`}
                    title="Email cannot be changed"
                  />
                  <p className="text-xs text-slate-400">Email cannot be changed</p>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={profile.phone}
                    onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                    placeholder="+255 000 000 000"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="whatsapp" className="text-sm font-medium text-slate-700">
                    WhatsApp Number
                  </label>
                  <input
                    id="whatsapp"
                    type="tel"
                    value={profile.whatsapp}
                    onChange={e => setProfile(p => ({ ...p, whatsapp: e.target.value }))}
                    placeholder="+255 000 000 000"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="specialization" className="text-sm font-medium text-slate-700">
                    Job Title / Specialization
                  </label>
                  <input
                    id="specialization"
                    type="text"
                    value={profile.specialization}
                    onChange={e => setProfile(p => ({ ...p, specialization: e.target.value }))}
                    placeholder="e.g. Senior Property Consultant"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="company" className="text-sm font-medium text-slate-700">
                    Agency / Company
                  </label>
                  <input
                    id="company"
                    type="text"
                    value={profile.companyName}
                    onChange={e => setProfile(p => ({ ...p, companyName: e.target.value }))}
                    placeholder="Your agency name"
                    className={inputClass}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="location" className="text-sm font-medium text-slate-700">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={profile.location}
                    onChange={e => setProfile(p => ({ ...p, location: e.target.value }))}
                    placeholder="e.g. Dar es Salaam, Tanzania"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="space-y-2 pt-2">
                <label htmlFor="bio" className="text-sm font-medium text-slate-700">
                  About Me (Bio)
                </label>
                <textarea
                  id="bio"
                  rows={5}
                  value={profile.bio}
                  onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                  placeholder="Write a short bio about yourself, your experience, and specializations…"
                  className={`${inputClass} resize-none`}
                />
                <p className="text-xs text-slate-400">
                  Brief description shown on your public profile.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
