"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { CalendarIcon, CrownIcon, HomeIcon, Menu, MicIcon, ShieldCheckIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../Logo/Logo";
import { Button } from "../ui/button";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  const navItems = [
    { name: "Admin", href: "/admin", icon: ShieldCheckIcon },
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Appointments", href: "/appointments", icon: CalendarIcon },
    { name: "Voice", href: "/voice", icon: MicIcon },
    { name: "Pro", href: "/pro", icon: CrownIcon },
  ];

  const { user } = useUser();
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 w-screen z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16">
      <div className="max-w-7xl mx-auto flex justify-between items-center h-full">
        {/* LOGO */}
        <Logo href="/" />
        {/* LOGO */}

        <div className="lg:flex hidden items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
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
        <div className=" flex items-center">
          {user ? (
            <div className="flex items-center justify-end gap-4">
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
          ) : (
            <div className="flex  items-center justify-center gap-2 ">
              <SignInButton mode="modal">
                <Button variant={"secondary"} className="w-18">
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="w-18 lg:w-fit">Sign Up</Button>
              </SignUpButton>
            </div>
          )}
          <Button onClick={toggleMenu} className="ms-5 lg:hidden">
            <Menu />
          </Button>
        </div>
      </div>
      <div
        className={`${
          isOpen ? "h-100" : "h-0  "
        } overflow-hidden transition-all lg:hidden  duration-500`}
      >
        <div className="flex flex-col gap-5 bg-background/90 backdrop-blur-md p-4 mt-2 border border-border/50 rounded-md ">
          {navItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 transition-colors ${
                pathname === item.href
                  ? "text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span >{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
export default Navbar;
