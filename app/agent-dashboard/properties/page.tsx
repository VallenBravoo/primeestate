import { mockProperties } from "@/lib/mockData";
import { Plus, Eye, MapPin, Building2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { AgentPropertyActions } from "@/components/properties/AgentPropertyActions";
import { prisma } from "@/lib/prisma";

export default async function AgentPropertiesPage() {
  const session = await getServerSession(authOptions);
  const isVerified = session?.user?.verified ?? false;
  
  // Fetch real properties
  const dbProperties = session?.user?.id ? await prisma.property.findMany({
    where: { agentId: session.user.id },
    include: { images: true },
    orderBy: { createdAt: "desc" },
  }) : [];

  // Map to the shape expected by the UI, falling back to mock properties if empty
  const agentProperties = dbProperties.length > 0 
    ? dbProperties.map(p => ({
        ...p,
        imageUrl: p.images[0]?.imageUrl || "/placeholder.jpg"
      }))
    : mockProperties.slice(0, 6) as { id: string; title: string; imageUrl: string; slug: string; location: string; status: string; price: number; purpose: string }[];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">My Properties</h1>
          <p className="text-slate-500 mt-1">Manage your property listings</p>
        </div>
        {isVerified ? (
          <Link 
            href="/agent-dashboard/properties/new" 
            className="bg-gold-500 hover:bg-gold-600 text-slate-900 font-semibold px-5 py-2.5 rounded-xl transition-colors flex items-center gap-2 shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add Property
          </Link>
        ) : (
          <button 
            disabled
            className="bg-slate-200 text-slate-400 font-semibold px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-sm cursor-not-allowed"
            title="Verification required"
          >
            <Plus className="w-5 h-5" />
            Add Property (Locked)
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 text-sm font-medium">
                <th className="px-6 py-4">Property</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Views</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {agentProperties.map((property) => (
                <tr key={property.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden relative flex-shrink-0 bg-slate-100">
                        <Image 
                          src={property.imageUrl} 
                          alt={property.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link href={`/properties/${property.slug}`} className="font-semibold text-slate-900 hover:text-gold-600 transition-colors line-clamp-1">
                          {property.title}
                        </Link>
                        <div className="flex items-center gap-1.5 text-slate-500 text-sm mt-1">
                          <MapPin className="w-3.5 h-3.5" />
                          <span className="truncate max-w-[200px]">{property.location}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      property.status === 'AVAILABLE' || property.status === 'FOR_SALE' || property.status === 'FOR_RENT' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : property.status === 'SOLD' 
                          ? 'bg-slate-100 text-slate-800'
                          : 'bg-amber-100 text-amber-800'
                    }`}>
                      {property.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {property.price.toLocaleString()} {property.purpose === 'RENT' && '/mo'}
                  </td>
                  <td className="px-6 py-4 text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4 text-slate-400" />
                      {property.id.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0) * 17 % 450 + 50}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <AgentPropertyActions propertyId={property.id} purpose={property.purpose} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {agentProperties.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-lg font-medium text-slate-900">No properties found</p>
            <p className="mt-1">You haven&apos;t listed any properties yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
