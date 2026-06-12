import Image from "next/image";
import { ShieldCheck, Target } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-slate-900 py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Office building"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/80 mix-blend-multiply" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8 flex justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="bg-transparent w-32 h-32 rounded-3xl flex items-center justify-center">
              <Image src="/logo.png" alt="Prime Estate Logo" width={128} height={128} className="object-contain scale-150" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-heading">
            About PrimeEstate
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            We are redefining the real estate experience by connecting property seekers with verified owners and top-tier agents through a premium, trusted platform.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20 mb-20">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-bold text-gold-500 mb-2">5K+</p>
              <p className="text-slate-600 font-medium">Verified Properties</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gold-500 mb-2">1.2K</p>
              <p className="text-slate-600 font-medium">Trusted Agents</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gold-500 mb-2">10K+</p>
              <p className="text-slate-600 font-medium">Happy Clients</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-gold-500 mb-2">15+</p>
              <p className="text-slate-600 font-medium">Cities Covered</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission & Vision */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="relative aspect-square md:aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
            <Image 
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1973&q=80"
              alt="Team meeting"
              fill
              className="object-cover"
            />
          </div>
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading flex items-center gap-3">
                <Target className="h-8 w-8 text-gold-500" /> Our Mission
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                To simplify the property search process and provide a transparent, secure, and professional marketplace for all real estate transactions. We believe finding a home or office should be an exciting journey, not a stressful chore.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4 font-heading flex items-center gap-3">
                <ShieldCheck className="h-8 w-8 text-gold-500" /> Our Promise
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                Every listing on our platform undergoes a strict verification process. We ensure that our users only interact with genuine property owners and registered agents to eliminate fraud and save time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-slate-900 py-20 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">
            Ready to find your dream property?
          </h2>
          <p className="text-slate-300 text-lg mb-8">
            Join thousands of satisfied clients who have found their perfect space with PrimeEstate.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/properties">
              <Button className="bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold px-8 py-6 text-lg">
                Browse Properties
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="border-slate-600 text-white hover:bg-slate-800 px-8 py-6 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
