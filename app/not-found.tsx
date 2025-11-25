"use client";

import Link from "next/link";
import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-md w-full text-center border border-border/50 rounded-2xl p-10 bg-card shadow-sm">
        <div className="flex justify-center mb-6">
          <SearchX className="w-16 h-16 text-primary" />
        </div>

        <h1 className="text-4xl font-semibold mb-3 text-foreground">
          Page Not Found
        </h1>

        <p className="text-muted-foreground mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  );
}
