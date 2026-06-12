"use client";

import { useState, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, LogIn, CheckCircle2 } from "lucide-react";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const isRegistered = searchParams.get("registered") === "true";

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
      setError("Invalid email or password");
      setLoading(false);
    } else {
      router.push("/agent-dashboard");
      router.refresh();
    }
  };

  return (
    <>
      {isRegistered && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl mb-6 text-sm text-center border border-emerald-100 flex items-center justify-center gap-2">
          <CheckCircle2 className="h-4 w-4" /> Account created successfully! Please sign in.
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-xl mb-6 text-sm text-center border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              id="email" 
              name="email" 
              type="email" 
              required 
              className="pl-9 bg-slate-50" 
              placeholder="agent@primeestate.com"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="password">Password</Label>
            <Link href="#" className="text-xs text-gold-600 hover:underline">Forgot password?</Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              id="password" 
              name="password" 
              type="password" 
              required 
              className="pl-9 bg-slate-50" 
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-slate-900 hover:bg-slate-800 text-white mt-6 h-12 text-lg">
          {loading ? "Signing In..." : "Sign In"} <LogIn className="ml-2 h-5 w-5" />
        </Button>
      </form>
    </>
  );
}

export default function AgentLoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="relative z-10">
            <div className="bg-transparent w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Image src="/logo.png" alt="Prime Estate Logo" width={96} height={96} className="object-contain scale-150" />
            </div>
            <h1 className="text-2xl font-bold text-white font-heading">Welcome Back</h1>
            <p className="text-slate-300 mt-2">Sign in to your agent dashboard to manage your properties.</p>
          </div>
        </div>

        <div className="p-8">
          <Suspense fallback={<div className="text-center text-sm text-slate-500">Loading...</div>}>
            <LoginForm />
          </Suspense>

          <p className="text-center mt-6 text-sm text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-gold-600 font-bold hover:underline">
              Register as Agent
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
