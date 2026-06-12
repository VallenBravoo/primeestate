"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, LogOut, LayoutDashboard, User } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Properties", href: "/properties" },
  { name: "For Sale", href: "/for-sale" },
  { name: "For Rent", href: "/for-rent" },
  { name: "Agents", href: "/agents" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

function getDashboardHref(role?: string) {
  if (role === "ADMIN") return "/admin/dashboard";
  if (role === "AGENT") return "/agent-dashboard";
  return "/agent-dashboard";
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();

  // Close mobile menu on route change
  useEffect(() => {
    // eslint-disable-next-line
    setIsOpen(false);
  }, [pathname]);

  // Detect scroll to add shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  const userInitials = session?.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <nav
      className={cn(
        "bg-white sticky top-0 z-50 border-b border-gray-100 transition-shadow duration-200",
        scrolled && "shadow-md"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="PrimeEstate Logo"
                width={44}
                height={44}
                className="object-contain"
              />
              <span className="font-bold text-xl text-slate-900 tracking-tight">
                PrimeEstate
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive(link.href)
                      ? "text-slate-900 bg-slate-100 font-semibold"
                      : "text-gray-500 hover:text-slate-900 hover:bg-gray-50"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3 ml-2">
              {/* Auth area */}
              {status === "loading" ? (
                <div className="w-9 h-9 rounded-full bg-slate-100 animate-pulse" />
              ) : session ? (
                // Logged-in user dropdown
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 cursor-pointer">
                      <Avatar className="w-9 h-9 border-2 border-slate-200">
                        <AvatarImage src={session.user?.image ?? ""} />
                        <AvatarFallback className="bg-slate-800 text-white text-xs font-bold">
                          {userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium text-slate-700 hidden lg:block">
                        {session.user?.name?.split(" ")[0]}
                      </span>
                      <ChevronDown className="h-4 w-4 text-slate-500" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <div className="px-3 py-2">
                      <p className="text-sm font-semibold text-slate-900 truncate">{session.user?.name}</p>
                      <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => router.push(getDashboardHref(session.user?.role))}
                      className="cursor-pointer"
                    >
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut({ callbackUrl: "/" })}
                      className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                // Guest: Agent Only dropdown
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className={cn(
                      buttonVariants({ variant: "outline" }),
                      "border-slate-300 text-slate-700 hover:bg-slate-50 flex items-center gap-1 cursor-pointer"
                    )}
                  >
                    <User className="h-4 w-4" />
                    Agent Portal <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem
                      onClick={() => router.push("/auth/login")}
                      className="cursor-pointer"
                    >
                      Sign In
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => router.push("/auth/signup")}
                      className="cursor-pointer"
                    >
                      Sign Up
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Link
                href="/list-property"
                className={cn(
                  buttonVariants({ variant: "default" }),
                  "bg-slate-900 hover:bg-slate-800 text-white rounded-md px-5"
                )}
              >
                List Property
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3 md:hidden">
            {session && (
              <Avatar className="w-8 h-8 border-2 border-slate-200">
                <AvatarImage src={session.user?.image ?? ""} />
                <AvatarFallback className="bg-slate-800 text-white text-xs font-bold">
                  {userInitials}
                </AvatarFallback>
              </Avatar>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-slate-900 focus:outline-none p-1"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
          isOpen ? "max-h-[600px] border-t border-gray-100 shadow-lg" : "max-h-0"
        )}
      >
        <div className="bg-white px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "block px-3 py-2.5 rounded-md text-base font-medium transition-colors",
                isActive(link.href)
                  ? "text-slate-900 bg-slate-100 font-semibold"
                  : "text-gray-600 hover:text-slate-900 hover:bg-gray-50"
              )}
            >
              {link.name}
            </Link>
          ))}

          <div className="pt-4 border-t border-gray-100 space-y-3">
            {session ? (
              <>
                <div className="flex items-center gap-3 px-3 py-2">
                  <Avatar className="w-9 h-9 border-2 border-slate-200">
                    <AvatarImage src={session.user?.image ?? ""} />
                    <AvatarFallback className="bg-slate-800 text-white text-xs font-bold">
                      {userInitials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{session.user?.name}</p>
                    <p className="text-xs text-slate-500">{session.user?.email}</p>
                  </div>
                </div>
                <Link
                  href={getDashboardHref(session.user?.role)}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full flex items-center gap-2 border-slate-300"
                  )}
                >
                  <LayoutDashboard className="h-4 w-4" /> Dashboard
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className={cn(
                    buttonVariants({ variant: "outline" }),
                    "w-full flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                  )}
                >
                  <LogOut className="h-4 w-4" /> Sign Out
                </button>
              </>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="bg-slate-50 px-4 py-2 text-xs font-bold text-slate-500 border-b border-slate-200 uppercase tracking-wider">
                  Agent Portal
                </div>
                <Link
                  href="/auth/login"
                  className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="block px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 border-t border-slate-100"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <Link
              href="/list-property"
              className={cn(
                buttonVariants({ variant: "default" }),
                "w-full bg-slate-900 hover:bg-slate-800 text-white"
              )}
            >
              List Your Property
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
