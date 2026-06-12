import { Home, Users, MessageSquare, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 font-heading">Dashboard Overview</h1>
        <p className="text-slate-500">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 p-3 rounded-lg"><Home className="h-6 w-6 text-blue-600" /></div>
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded"><ArrowUpRight className="h-4 w-4 mr-1" /> +12%</span>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Total Properties</h3>
          <p className="text-3xl font-bold text-slate-900">452</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-gold-50 p-3 rounded-lg"><Users className="h-6 w-6 text-gold-600" /></div>
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded"><ArrowUpRight className="h-4 w-4 mr-1" /> +5%</span>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Active Agents</h3>
          <p className="text-3xl font-bold text-slate-900">124</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg"><MessageSquare className="h-6 w-6 text-emerald-600" /></div>
            <span className="flex items-center text-sm font-medium text-red-600 bg-red-50 px-2 py-1 rounded"><ArrowDownRight className="h-4 w-4 mr-1" /> -2%</span>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">New Inquiries</h3>
          <p className="text-3xl font-bold text-slate-900">89</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="bg-purple-50 p-3 rounded-lg"><TrendingUp className="h-6 w-6 text-purple-600" /></div>
            <span className="flex items-center text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-1 rounded"><ArrowUpRight className="h-4 w-4 mr-1" /> +18%</span>
          </div>
          <h3 className="text-slate-500 font-medium mb-1">Total Views</h3>
          <p className="text-3xl font-bold text-slate-900">45.2K</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Recent Inquiries */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-900 font-heading">Recent Inquiries</h2>
            <a href="/admin/inquiries" className="text-sm font-medium text-gold-600 hover:text-gold-700">View All</a>
          </div>
          <div className="divide-y divide-gray-100">
            {[1, 2, 3].map((item) => (
              <div key={item} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-slate-900">Sarah Smith</h4>
                  <span className="text-xs font-medium text-slate-500">10 mins ago</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">
                  I am interested in the Modern Villa in Masaki. Is it still available for viewing this weekend?
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
