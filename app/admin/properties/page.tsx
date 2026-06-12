import { Button } from "@/components/ui/button";
import { Search, Filter, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { prisma } from "@/lib/prisma";
import { AdminPropertyActions } from "@/components/admin/AdminPropertyActions";

export default async function AdminPropertiesPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dbProperties: any[] = [];
  try {
    dbProperties = await prisma.property.findMany({
      include: { agent: true },
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.warn("Database connection failed, falling back to mock data.", error);
  }

  const mockProperties = [
    { id: "PRO-001", title: "Modern Villa in Masaki", owner: "John Doe", status: "AVAILABLE", date: "2024-05-12", slug: "modern-villa" },
    { id: "PRO-003", title: "Beachfront Apartment", owner: "Michael Smith", status: "AVAILABLE", date: "2024-05-10", slug: "beachfront-apartment" },
    { id: "PRO-004", title: "Family House Mbezi", owner: "Emily Chen", status: "AVAILABLE", date: "2024-05-09", slug: "family-house" },
  ];

  const properties = dbProperties.length > 0 
    ? dbProperties.map(p => ({
        id: p.id,
        title: p.title,
        owner: p.agent?.name || p.agent?.email || "Unknown Agent",
        status: p.status,
        date: new Date(p.createdAt).toISOString().split('T')[0],
        slug: p.slug
      }))
    : mockProperties;

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Manage Properties</h1>
          <p className="text-slate-500">Review, verify, and manage all property listings.</p>
        </div>
        <Button className="bg-slate-900 text-white hover:bg-slate-800">Add New Property</Button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input placeholder="Search properties..." className="pl-10 bg-white" />
          </div>
          <Button variant="outline" className="w-full sm:w-auto bg-white">
            <Filter className="h-4 w-4 mr-2" /> Filter Options
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-gray-100 text-slate-500 text-sm font-semibold uppercase tracking-wider">
                <th className="p-6">ID</th>
                <th className="p-6">Property Title</th>
                <th className="p-6">Owner/Agent</th>
                <th className="p-6">Date Submitted</th>
                <th className="p-6">Status</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {properties.map((prop) => (
                <tr key={prop.id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-6 text-slate-500 font-medium">{prop.id}</td>
                  <td className="p-6 font-bold text-slate-900">{prop.title}</td>
                  <td className="p-6 text-slate-600">{prop.owner}</td>
                  <td className="p-6 text-slate-500">{prop.date}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide
                      ${prop.status === 'VERIFIED' ? 'bg-emerald-100 text-emerald-700' : 
                        prop.status === 'REJECTED' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'}`}
                    >
                      {prop.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <AdminPropertyActions propertyId={prop.id} slug={prop.slug} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {properties.length === 0 && (
          <div className="p-12 text-center text-slate-500">
            <Building2 className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-lg font-medium text-slate-900">No properties found</p>
            <p className="mt-1">There are no property listings available yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
