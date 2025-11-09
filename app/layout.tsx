import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import UserSync from "@/components/UserSync";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "DentWise - AI Powered Dental Assistant",
  description:
    "Get instant answers to your dental questions with DentWise, the AI-powered dental assistant designed to provide accurate and reliable information for all your oral health needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: {
          colorBackground: "#f3f4f6",
          colorText: "#11827",
          colorPrimary: "#e78a53",
          colorTextSecondary: "#6b7280",
          colorInputForeground: "#e78a53",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        >
          <UserSync />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
