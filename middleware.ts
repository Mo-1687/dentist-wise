import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Authenticated user routes
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/voice(.*)",
  "/pro(.*)",
  "/appointments(.*)",
  "/admin(.*)",
]);

export default clerkMiddleware((auth, req) => {
  // Authenticated-only routes (any logged-in user)
  if (isProtectedRoute(req)) {
    auth.protect(); // ensures logged in
  }

  // Default: allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
