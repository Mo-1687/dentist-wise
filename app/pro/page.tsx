import Navbar from "@/components/Navbar/Navbar";
import WelcomeBadge from "@/components/WelcomeBadge/WelcomeBadge";
import { PricingTable } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { CrownIcon } from "lucide-react";
import { redirect } from "next/navigation";

const ProPage = async () => {
  const user = await currentUser();
  const { has } = await auth();

  if (!user) redirect("/");

  //   Check User Plan
  const isInProSub = has({ plan: "ai_pro" }) ? "You are in a" : "Unlock";

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* Welcome Section  */}
        <WelcomeBadge
          icon={<CrownIcon className="w-16 h-16 text-primary" />}
          text={`${isInProSub ? "Upgrade to pro" : "Pro Subscription"}`}
          heading={`${
            isInProSub ? "You are in a" : "Unlock"
          } Premium AI Dental Care"`}
          description="Get unlimited AI consultations, advanced features, and priority support to take
                  your dental health to the next level."
        />
        {/* Welcome Section  */}

        {/* PRICING SECTION */}
        <div className="space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Choose Your Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan for your dental care needs. All plans
              include secure access and bank-level encryption.
            </p>
          </div>

          <PricingTable />
        </div>
        {/* PRICING SECTION */}
      </div>
    </>
  );
};

export default ProPage;
