import Navbar from "@/components/Navbar/Navbar";
import ProPlanRequired from "@/components/voice/ProPlanRequired";
import VapiWidget from "@/components/voice/VapiWidget";
import WelcomeBadge from "@/components/WelcomeBadge/WelcomeBadge";
import { auth } from "@clerk/nextjs/server";
import { MicIcon } from "lucide-react";
export const dynamic = 'force-dynamic';

const page = async () => {
  const { has } = await auth();
  const hasProPlan = has({ plan: "ai_basic" }) || has({ plan: "ai_pro" });

  if (!hasProPlan) return <ProPlanRequired />;

  return (
    <div className="min-h-screen  bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeBadge
          BadgeIcon={
            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          }
          text="Voice Assistant Ready"
          heading="AI Voice Assistant"
          description="Talk to your AI dental assistant using natural voice commands. Get instant advice and
            professional guidance."
          icon={<MicIcon className="w-16 h-16 text-primary" />}
        />
      </div>
      <VapiWidget />
    </div>
  );
};

export default page;
