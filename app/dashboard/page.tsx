import MainAction from "@/components/Dashboard/MainAction";
import NextAppointment from "@/components/Dashboard/NextAppointment";
import OverView from "@/components/Dashboard/OverView";
import Navbar from "@/components/Navbar/Navbar";
import WelcomeBadge from "@/components/WelcomeBadge/WelcomeBadge";
import Image from "next/image";

export const dynamic = "force-dynamic";

const page = () => {
  const hour = new Date().getHours();
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        <WelcomeBadge
          text="Online"
          BadgeIcon={
            <div className="size-2 bg-primary rounded-full animate-pulse"></div>
          }
          heading={`Good ${
            hour < 12 ? "Morning" : hour < 18 ? "Afternoon" : "Evening"
          }`}
          description="Your personal AI dental assistant is ready to help you maintain perfect oral health."
          icon={
            <Image
              src="/logo.png"
              alt="DentWise"
              width={64}
              height={64}
              className="w-16 h-16"
            />
          }
        />
        <MainAction />
        <div className="grid lg:grid-cols-3 gap-6">
          <OverView />
          <NextAppointment />
        </div>
      </div>
    </div>
  );
};

export default page;
