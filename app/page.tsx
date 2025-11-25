import CTA from "@/components/Landing/CTA";
import Footer from "@/components/Landing/Footer";
import Hero from "@/components/Landing/Hero";
import HowItWorks from "@/components/Landing/HowItWorks";
import PricingSection from "@/components/Landing/PricingSection";
import WhatToAsk from "@/components/Landing/WhatToAsk";
import Navbar from "@/components/Navbar/Navbar";
import { syncUser } from "@/lib/actions/users";

export default async function Home() {
  return (
    <div className=" min-h-screen bg-background">
      <Navbar />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
}
