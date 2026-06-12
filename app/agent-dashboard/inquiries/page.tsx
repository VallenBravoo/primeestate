import { MessageSquare, Phone, Mail, Calendar, ExternalLink, CheckCircle2, Circle } from "lucide-react";
import Link from "next/link";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { mockProperties } from "@/lib/mockData";

// Local mock data for inquiries
const mockInquiries = [
  {
    id: "inq-1",
    propertyId: "1",
    name: "Michael Johnson",
    email: "mjohnson@example.com",
    phone: "+255 712 345 678",
    message: "Hi, I'm very interested in this Mbezi Beach house. Is the price negotiable? I would like to schedule a viewing this weekend.",
    status: "NEW",
    date: "2023-11-05T10:30:00Z",
  },
  {
    id: "inq-2",
    propertyId: "3",
    name: "Sarah Williams",
    email: "sarah.w@corporate.com",
    phone: "+255 755 123 456",
    message: "Our company is looking for a new office space in Posta. Does this property have dedicated parking spots for executives?",
    status: "CONTACTED",
    date: "2023-11-04T14:15:00Z",
  },
  {
    id: "inq-3",
    propertyId: "2",
    name: "David Chen",
    email: "david.c@investments.org",
    phone: "+255 784 999 888",
    message: "I saw the luxury apartment in Masaki. Can you provide the ROI projections if I decide to put this on Airbnb?",
    status: "VIEWING_SCHEDULED",
    date: "2023-11-02T09:45:00Z",
  },
  {
    id: "inq-4",
    propertyId: "6",
    name: "Fatma Ali",
    email: "f.ali@business.tz",
    phone: "+255 655 444 333",
    message: "What are the zoning regulations for this commercial plot in Kigamboni? We plan to build a small warehouse.",
    status: "CLOSED",
    date: "2023-10-28T16:20:00Z",
  }
];

export default async function AgentInquiriesPage() {
  const session = await getServerSession(authOptions);
  const isVerified = session?.user?.verified ?? false;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'NEW':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><Circle className="w-3 h-3 fill-blue-500" /> New</span>;
      case 'CONTACTED':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800"><Circle className="w-3 h-3 fill-amber-500" /> Contacted</span>;
      case 'VIEWING_SCHEDULED':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800"><Circle className="w-3 h-3 fill-purple-500" /> Viewing Set</span>;
      case 'CLOSED':
        return <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800"><CheckCircle2 className="w-3 h-3" /> Closed</span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-800">{status}</span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 font-heading">Inquiries</h1>
          <p className="text-slate-500 mt-1">Manage messages and leads from potential clients</p>
        </div>
      </div>

      {isVerified ? (
        <div className="space-y-4">
          {mockInquiries.map((inquiry) => {
            const property = mockProperties.find(p => p.id === inquiry.propertyId);
            
            return (
              <div key={inquiry.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:border-blue-100 transition-colors group">
                <div className="flex flex-col lg:flex-row gap-6">
                  
                  {/* Client Info */}
                  <div className="lg:w-1/3 space-y-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{inquiry.name}</h3>
                        <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                          <Calendar className="w-4 h-4" />
                          {new Date(inquiry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </div>
                      </div>
                      <div className="lg:hidden">
                        {getStatusBadge(inquiry.status)}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        <Mail className="w-4 h-4 text-slate-400" />
                        {inquiry.email}
                      </a>
                      <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors">
                        <Phone className="w-4 h-4 text-slate-400" />
                        {inquiry.phone}
                      </a>
                    </div>
                  </div>

                  {/* Message & Property Info */}
                  <div className="lg:w-2/3 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        {property ? (
                          <Link href={`/properties/${property.slug}`} className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-lg">
                            {property.title} <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">Unknown Property</span>
                        )}
                        
                        <div className="hidden lg:block">
                          {getStatusBadge(inquiry.status)}
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 text-slate-700 text-sm leading-relaxed relative">
                        <MessageSquare className="w-5 h-5 absolute text-slate-200 -top-2.5 -left-2.5 bg-white rounded-full" />
                        <p>&quot;{inquiry.message}&quot;</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-gray-100">
                      <button className="text-sm font-medium text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 px-4 py-2 rounded-xl transition-colors">
                        Reply via Email
                      </button>
                      {inquiry.status === 'NEW' && (
                        <button className="text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl transition-colors shadow-sm">
                          Mark as Contacted
                        </button>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-12 text-center text-slate-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 text-slate-300" />
          <p className="text-lg font-medium text-slate-900">Inquiries Locked</p>
          <p className="mt-1 max-w-md mx-auto">You must be verified by an administrator before you can view and respond to client inquiries.</p>
        </div>
      )}
    </div>
  );
}
