import { Button } from "@/components/ui/button";
import { Search, Filter, Reply, Trash2, Mail, Phone, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function AdminInquiriesPage() {
  const mockInquiries = [
    { id: "INQ-001", propertyTitle: "Modern Villa in Masaki", name: "Sarah Smith", email: "sarah@example.com", phone: "+255 123 456 789", date: "2024-05-12 10:30 AM", status: "UNREAD", message: "I am interested in the Modern Villa in Masaki. Is it still available for viewing this weekend?" },
    { id: "INQ-002", propertyTitle: "Commercial Office Space", name: "James Bond", email: "james@example.com", phone: "+255 987 654 321", date: "2024-05-11 02:15 PM", status: "READ", message: "What is the minimum lease period for this office space?" },
    { id: "INQ-003", propertyTitle: "Beachfront Apartment", name: "Alice Wonderland", email: "alice@example.com", phone: "+255 111 222 333", date: "2024-05-10 09:00 AM", status: "REPLIED", message: "I would like to schedule a viewing. Please contact me." },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 font-heading">Manage Inquiries</h1>
          <p className="text-slate-500">Review and respond to property inquiries from potential buyers and tenants.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <Input placeholder="Search inquiries..." className="pl-10 bg-white" />
          </div>
          <Button variant="outline" className="w-full sm:w-auto bg-white">
            <Filter className="h-4 w-4 mr-2" /> Filter Options
          </Button>
        </div>

        <div className="divide-y divide-gray-100">
          {mockInquiries.map((inq) => (
            <div key={inq.id} className={`p-6 hover:bg-slate-50 transition-colors ${inq.status === 'UNREAD' ? 'bg-blue-50/30' : ''}`}>
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex-grow space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-lg text-slate-900">{inq.name}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide
                          ${inq.status === 'UNREAD' ? 'bg-blue-100 text-blue-700' : 
                            inq.status === 'REPLIED' ? 'bg-emerald-100 text-emerald-700' : 
                            'bg-slate-100 text-slate-700'}`}
                        >
                          {inq.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-gold-600">Re: {inq.propertyTitle}</p>
                    </div>
                    <span className="text-sm text-slate-500 whitespace-nowrap">{inq.date}</span>
                  </div>
                  
                  <p className="text-slate-700 bg-white p-4 rounded-xl border border-slate-100">
                    &quot;{inq.message}&quot;
                  </p>

                  <div className="flex gap-4 text-sm text-slate-600">
                    <span className="flex items-center gap-1.5"><Mail className="h-4 w-4" /> {inq.email}</span>
                    <span className="flex items-center gap-1.5"><Phone className="h-4 w-4" /> {inq.phone}</span>
                  </div>
                </div>

                <div className="flex lg:flex-col gap-2 shrink-0">
                  <Button variant="outline" className="flex-1 bg-white border-slate-200 text-slate-700 hover:text-slate-900">
                    <Reply className="h-4 w-4 mr-2" /> Reply
                  </Button>
                  {inq.status === 'UNREAD' && (
                    <Button variant="outline" className="flex-1 bg-white border-slate-200 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                      <CheckCircle2 className="h-4 w-4 mr-2" /> Mark Read
                    </Button>
                  )}
                  <Button variant="ghost" className="flex-1 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
