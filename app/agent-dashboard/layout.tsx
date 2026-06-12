import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Building, LayoutDashboard, MessageSquare, User, AlertTriangle } from "lucide-react";
import SignOutButton from "./SignOutButton";

export default async function AgentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // Protect the route: Only logged-in users (Agents or Admins) can access
  if (!session) {
    redirect("/auth/login");
  }

  const navItems = [
    { name: "Dashboard", href: "/agent-dashboard", icon: LayoutDashboard },
    { name: "My Properties", href: "/agent-dashboard/properties", icon: Building },
    { name: "Inquiries", href: "/agent-dashboard/inquiries", icon: MessageSquare },
    { name: "Profile Settings", href: "/agent-dashboard/profile", icon: User },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 min-h-screen border-r border-slate-800">
        <div className="p-6 border-b border-slate-800 flex items-center gap-3">
          <div className="bg-gold-500 text-slate-900 p-2 rounded-lg">
            <Building className="h-6 w-6" />
          </div>
          <div>
            <h2 className="font-bold text-white text-lg leading-tight">Agent Portal</h2>
            <p className="text-xs text-slate-400 truncate">{session.user?.email}</p>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 hover:text-white transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 mt-auto">
          <SignOutButton />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="max-w-6xl mx-auto">
          {!session.user.verified && session.user.role === "AGENT" && (
            <div className="mb-6 bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-start gap-3 text-amber-800 shadow-sm animate-in fade-in slide-in-from-top-2">
              <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0 text-amber-600" />
              <div>
                <h3 className="font-semibold text-amber-900">Account Pending Verification</h3>
                <p className="text-sm mt-1">
                  Your agent account is currently under review by our administration team. 
                  You cannot add new properties or view client inquiries until you are verified. 
                  Please complete your <Link href="/agent-dashboard/profile" className="font-medium underline hover:text-amber-900">Profile Settings</Link> to expedite the process.
                </p>
              </div>
            </div>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
