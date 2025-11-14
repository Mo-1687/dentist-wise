"use client";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import Logo from "../Logo/Logo";
import { text } from "stream/consumers";

const Header = () => {
  const navItems = [
    {
      text: "How it Works",
      href: "#how-it-works",
    },
    {
      text: "About",
      href: "#about",
    },
    {
      text: "Contact Us",
      href: "#contact-us",
    },
    {
      text: "Pricing",
      href: "#pricing",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  function toggleMenu() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="fixed top-0 left-0 right-0 px-6 py-2  border-b border-border/50 bg-background/80 backdrop-blur-md h-16 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo href="/" />
        <div className="hidden lg:flex items-center gap-5 flex-1 justify-center">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.text}
            </a>
          ))}
        </div>
        <div className="flex flex-1 lg:flex-initial justify-end  gap-3">
          <SignInButton mode="modal">
            <Button variant={"ghost"}>Sign In</Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button>Sign Up</Button>
          </SignUpButton>
        </div>
        <Button onClick={toggleMenu} className="ms-5 lg:hidden">
          <Menu />
        </Button>
      </div>

      <div
        className={`${
          isOpen ? "h-50" : "h-0  "
        } overflow-hidden transition-all lg:hidden  duration-500`}
      >
        <div className="flex flex-col gap-5 bg-background/90 backdrop-blur-md p-4 mt-2 border border-border/50 rounded-md ">
          {navItems.map((item, index) => (
            <a
              href={item.href}
              key={index}
              className="text-muted-foreground hover:text-foreground"
            >
              {item.text}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
