import { CalendarIcon, MessageSquareIcon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "../ui/card";
import { features } from "process";

const MainAction = () => {
  const FeatureCards = [
    {
      heading: "AI Voice Assistant",
      description: "Get instant dental advice through voice calls",
      icon: (
        <Image
          src="/audio.png"
          alt="Voice AI"
          width={32}
          height={32}
          className="w-10"
        />
      ),
      features: [
        "24/7 availability",
        "Professional dental guidance",
        "Instant pain relief advice",
      ],
      isActive: true,
      Link: {
        href: "/voice",
        text: "Start Voice Call ",
        icon: <MessageSquareIcon className="mr-2 h-5 w-5" />,
      },
    },
    {
      heading: "Book Appointment",
      description: "Schedule with verified dentists in your area",
      icon: (
        <Image
          src="/calendar.png"
          alt="Calendar"
          width={32}
          height={32}
          className="w-10"
        />
      ),
      features: [
        "Verified dental professionals",
        "Flexible scheduling",
        "Instant confirmations",
      ],
      isActive: false,
      Link: {
        href: "/appointments",
        text: "Schedule Now",
        icon: <CalendarIcon className="mr-2 h-5 w-5" />,
      },
    },
  ];
  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      {/* AI Voice Assistant */}
      {FeatureCards.map((card, index) => (
        <Card
          key={index}
          className="relative overflow-hidden group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/30"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <CardContent className="relative p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {card.icon}
              </div>
              <div>
                <h3 className="text-2xl font-0 mb-2">{card.heading}</h3>
                <p className="text-muted-foreground">{card.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {card.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">{feature}</span>
                </div>
              ))}
            </div>

            <Link href={card.Link.href}>
              <Button
                variant={`${card.isActive ? "default" : "outline"}`}
                className={`w-full mt-6 font-semibold py-3 transition-all duration-300 rounded-xl ${
                  card.isActive
                    ? "bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white    shadow-lg hover:shadow-xl "
                    : "border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5    "
                } `}
              >
                {card.Link.icon}
                {card.Link.text}
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MainAction;
