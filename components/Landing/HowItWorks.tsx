import Image from "next/image";
import Badge from "../Badge/Badge";
import { ArrowRight, ZapIcon } from "lucide-react";
import { SignUpButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const HowItWorks = () => {
  const stepsCard = [
    {
      image: "/audio.png",
      alt: "Voice Chat",
      title: "Ask Questions",
      description:
        "Chat with our AI assistant about any dental concerns. Get instant answers about symptoms, treatments, and oral health tips.",
      features: {
        one: "24/7 availability",
        two: "Instant Response",
      },
    },
    {
      image: "/brain.png",
      alt: "AI Brain",
      title: "Get Expert Advice",
      description:
        " Receive personalized recommendations based on thousands of dental cases. Our AIprovides professional-grade insights.",
      features: {
        one: " AI-Powered",
        two: " Personalized",
      },
    },
    {
      image: "/calendar.png",
      alt: "Calender",
      title: "Book & Get Care",
      description:
        "Schedule with verified dentists and receive comprehensive follow-up care. Track your progress seamlessly.",
      features: {
        one: " Verified Doctors",
        two: "Follow-Up Care",
      },
    },
  ];
  return (
    <div className="relative z-10 py-32 px-6 overflow-hidden max-w-7xl mx-auto">
      <div className="flex flex-col items-center justify-center space-y-5 text-center">
        <Badge icon={<ZapIcon size={10} />} text="Simple Process" />

        {/* Main Heading  */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight ">
          <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
            Three steps to
          </span>
          <br />
          <span className="bg-gradient-to-r from-primary  to-primary/70 bg-clip-text text-transparent">
            better dental health
          </span>
        </h1>
        {/* Main Heading  */}

        {/* SUBTITLE */}
        <p className="text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
          Our streamlined process makes dental care accessible, convenient, and
          stress-free for everyone
        </p>
        {/* SUBTITLE */}
      </div>

      {/* Connection Line  */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent transform -translate-y-1/2 hidden lg:block"></div>
      {/* Connection Line  */}

      {/* Steps */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-15">
        {stepsCard.map((step, index) => (
          <div key={index} className="relative bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl rounded-3xl p-8 border border-border/50 hover:border-primary/30 hover:-translate-y-5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
            {/* Step Number */}
            <div className="absolute -top-4 left-8 w-8 h-8 bg-gradient-to-r from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground text-sm font-bold shadow-lg">
              {index + 1}
            </div>

            {/* Icon */}
            <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 mb-6">
              <Image
                src={step.image}
                alt={step.alt}
                width={40}
                height={40}
                className="w-14"
              />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-center">
              {step.title}
            </h3>
            <p className="text-muted-foreground text-center leading-relaxed mb-6">
              {step.description}
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {step.features.one}
              </span>
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                {step.features.two}
              </span>
            </div>
          </div>
        ))}
      </div>
      {/* Steps */}

      {/* CTA Button  */}
      <div className="mt-10 text-center">
        <SignUpButton mode="modal">
          <Button className="flex mx-auto items-center px-5 py-6 gap-3">
            <ArrowRight />
            Get Started Now
          </Button>
        </SignUpButton>
      </div>
      {/* CTA Button  */}
    </div>
  );
};

export default HowItWorks;
