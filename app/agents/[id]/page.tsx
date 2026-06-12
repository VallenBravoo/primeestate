import Image from "next/image";
import { Star, MapPin, Mail, ShieldCheck, Award, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/properties/PropertyCard";

import { mockAgents, mockProperties } from "@/lib/mockData";
import { notFound } from "next/navigation";

export default async function AgentProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const agent = mockAgents.find(a => a.id === id);
  if (!agent) {
    notFound();
  }

  // Assign mock properties for display
  const agentProperties = mockProperties.slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Agent Header Profile */}
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="relative w-40 h-40 shrink-0">
              <Image 
                src={agent.image} 
                alt={agent.name} 
                fill 
                className="object-cover rounded-full ring-4 ring-gold-100"
              />
              {agent.verified && (
                <div className="absolute bottom-0 right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white">
                  <ShieldCheck className="h-5 w-5" />
                </div>
              )}
            </div>
            
            <div className="flex-grow space-y-4">
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 mb-1">{agent.name}</h1>
                  <p className="text-lg text-gold-600 font-medium mb-3">{agent.role} at {agent.company}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                    <span className="flex items-center gap-1.5"><MapPin className="h-4 w-4" /> {agent.location}</span>
                    <span className="flex items-center gap-1.5"><Award className="h-4 w-4" /> {agent.experience} Experience</span>
                    <span className="flex items-center gap-1.5">
                      <Star className="h-4 w-4 text-gold-500 fill-gold-500" /> 
                      <strong className="text-slate-900">{agent.rating}</strong> ({agent.reviews} reviews)
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <a aria-label={`WhatsApp ${agent.name}`} href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(agent.name)},%20I%20saw%20your%20profile%20on%20PrimeEstate.`} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full sm:w-auto bg-gold-500 hover:bg-gold-600 text-slate-900 font-bold">
                      <MessageSquare className="h-4 w-4 mr-2" /> WhatsApp
                    </Button>
                  </a>
                  <a aria-label={`Email ${agent.name}`} href={`mailto:${agent.email}?subject=Inquiry%20from%20PrimeEstate`}>
                    <Button variant="outline" className="w-full sm:w-auto border-slate-200">
                      <Mail className="h-4 w-4 mr-2" /> Email
                    </Button>
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <h3 className="font-bold text-slate-900 mb-2">About {agent.name}</h3>
                <p className="text-slate-600 leading-relaxed max-w-4xl">{agent.bio}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Agent's Listings */}
        <div>
          <div className="flex justify-between items-end mb-8">
            <h2 className="text-2xl font-bold text-slate-900 font-heading">
              Active Listings ({agentProperties.length})
            </h2>
            <select aria-label="Sort properties" className="border-slate-200 rounded-md text-sm p-2 bg-white shadow-sm outline-none focus:ring-gold-500">
              <option>Newest First</option>
              <option>Price: Low to High</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {agentProperties.map(property => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
