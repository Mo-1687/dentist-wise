import CTA from "@/components/Landing/CTA";
import Footer from "@/components/Landing/Footer";
import Header from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import HowItWorks from "@/components/Landing/HowItWorks";
import PricingSection from "@/components/Landing/PricingSection";
import WhatToAsk from "@/components/Landing/WhatToAsk";
import { syncUser } from "@/lib/actions/users";

export default async function Home() {
  await syncUser();
  return (
    <div className=" min-h-screen bg-background">
      <Header />
      <Hero />
      <HowItWorks />
      <WhatToAsk />
      <PricingSection />
      <CTA />
      <Footer />
    </div>
  );
}
