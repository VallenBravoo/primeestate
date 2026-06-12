"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, KeyRound, LogIn, LockKeyhole } from "lucide-react";

function AdminLoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setError("Invalid admin credentials");
      setLoading(false);
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-500/10 text-red-500 p-3 rounded-lg mb-6 text-sm text-center border border-red-500/20">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">Admin Email</Label>
          <div className="relative">
            <Shield className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="pl-9 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-gold-500" 
              placeholder="admin@primeestate.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password" className="text-slate-300">Master Password</Label>
          </div>
          <div className="relative">
            <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="pl-9 bg-slate-900/50 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-gold-500" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-gold-600 hover:bg-gold-500 text-slate-950 font-bold mt-8 h-12 text-lg shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]">
          {loading ? "Authenticating..." : "Secure Login"} <LogIn className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-md w-full relative z-10 animate-in fade-in zoom-in duration-700">
        <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-slate-800">
          
          <div className="p-8 pb-6 text-center">
            <div className="bg-slate-800/50 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-slate-700 shadow-inner">
              <LockKeyhole className="h-10 w-10 text-gold-500" />
            </div>
            <h1 className="text-3xl font-bold text-white font-heading tracking-tight">Admin Portal</h1>
            <p className="text-slate-400 mt-2 text-sm">Restricted Access. Authorized personnel only.</p>
          </div>

          <div className="p-8 pt-0">
            <Suspense fallback={<div className="text-center text-sm text-slate-500">Initializing secure connection...</div>}>
              <AdminLoginForm />
            </Suspense>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-slate-600 flex items-center justify-center gap-2">
          <Shield className="h-4 w-4" /> Protected by Prime Estate Security
        </p>
      </div>
    </div>
  );
}
