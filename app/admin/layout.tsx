"use client";

import { Building2, LayoutDashboard, Home, Users, MessageSquare, Settings, LogOut, Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Properties", href: "/admin/properties", icon: Home },
  { name: "Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { name: "Agents", href: "/admin/agents", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex w-64 flex-col bg-slate-900 border-r border-slate-800">
        <div className="h-16 flex items-center px-6 border-b border-slate-800">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-gold-500" />
            <span className="text-xl font-bold font-heading text-white tracking-tight">PrimeEstate</span>
          </Link>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-gold-500 text-slate-900" 
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                )}
              >
                <link.icon className="h-5 w-5 shrink-0" />
                {link.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <Button 
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="ghost" 
            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800"
          >
            <LogOut className="h-5 w-5 mr-3 shrink-0" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <div className="md:hidden h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-gold-500" />
            <span className="text-lg font-bold font-heading text-white">PrimeEstate Admin</span>
          </Link>
          <Button variant="ghost" size="icon" className="text-white hover:bg-slate-800">
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
