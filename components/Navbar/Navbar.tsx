"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { CalendarIcon, CrownIcon, HomeIcon, MicIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";

function Navbar() {
  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Appointments", href: "/appointments", icon: CalendarIcon },
    { name: "Voice", href: "/voice", icon: MicIcon },
    { name: "Pro", href: "/pro", icon: CrownIcon },
  ];

  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* LOGO */}
        <Logo href="/dashboard" />
        {/* LOGO */}

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            <Link key={item.href}
              href={item.href}
              className={`flex items-center gap-2 transition-colors ${
                pathname === item.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="hidden md:inline">{item.name}</span>
            </Link>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-sm font-medium text-foreground">
                {user?.firstName} {user?.lastName}
              </span>
              <span className="text-xs text-muted-foreground">
                {user?.emailAddresses?.[0]?.emailAddress}
              </span>
            </div>

            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
