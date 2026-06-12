import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Eye, Building2, MessageSquare, TrendingUp, User } from "lucide-react";

export default async function AgentDashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-heading">
          Welcome back, {session?.user?.name || "Agent"}!
        </h1>
        <p className="text-slate-500 mt-2">Here is a summary of your property performance today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gold-300 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gold-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="bg-gold-100 w-12 h-12 rounded-xl flex items-center justify-center text-gold-600 mb-4">
              <Building2 className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Active Listings</p>
            <h3 className="text-3xl font-bold text-slate-900">0</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-emerald-300 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center text-emerald-600 mb-4">
              <Eye className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Total Views</p>
            <h3 className="text-3xl font-bold text-slate-900">0</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-blue-300 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center text-blue-600 mb-4">
              <MessageSquare className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">New Inquiries</p>
            <h3 className="text-3xl font-bold text-slate-900">0</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-purple-300 transition-colors">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <div className="relative z-10">
            <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center text-purple-600 mb-4">
              <TrendingUp className="h-6 w-6" />
            </div>
            <p className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-1">Conversion Rate</p>
            <h3 className="text-3xl font-bold text-slate-900">0%</h3>
          </div>
        </div>
      </div>

      {/* Quick Actions & Recent Activity Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Recent Inquiries</h2>
          <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <MessageSquare className="h-8 w-8 mx-auto mb-2 text-slate-300" />
            <p>You have no recent inquiries.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl border border-slate-200 text-left flex items-center gap-3 transition-colors">
              <Building2 className="h-5 w-5 text-slate-400" /> List New Property
            </button>
            <button className="w-full py-3 px-4 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-xl border border-slate-200 text-left flex items-center gap-3 transition-colors">
              <User className="h-5 w-5 text-slate-400" /> Update Profile
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
