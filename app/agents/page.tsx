import Image from "next/image";
import Link from "next/link";
import { Star, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

import { mockAgents } from "@/lib/mockData";

export default function AgentsPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-heading">
            Meet Our Top Agents
          </h1>
          <p className="text-slate-600 text-lg">
            Connect with verified real estate professionals who are ready to help you find your dream property or sell your current one.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mockAgents.map((agent) => (
            <div key={agent.id} className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 group flex flex-col">
              <div className="relative aspect-square w-full">
                <Image 
                  src={agent.image}
                  alt={agent.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{agent.name}</h3>
                <p className="text-gold-600 font-medium text-sm mb-4">{agent.role}</p>
                
                <div className="space-y-2 mb-6 text-sm text-slate-600 flex-grow">
                  <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-slate-400" /> {agent.location}</p>
                  <p className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-gold-500 fill-gold-500" /> 
                    <span className="font-semibold text-slate-900">{agent.rating}</span> 
                    ({agent.reviews} reviews)
                  </p>
                  <p className="flex items-center gap-2 font-medium">
                    <span className="bg-slate-100 px-2 py-1 rounded text-slate-700">{agent.propertiesCount} Active Listings</span>
                  </p>
                </div>

                <Link href={`/agents/${agent.id}`} className="block w-full">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
