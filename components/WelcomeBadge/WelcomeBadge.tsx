import React from "react";
import Badge from "../Badge/Badge";

const WelcomeBadge = ({
  heading,
  description,
  text,
  icon,
  BadgeIcon = <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>,
}: {
  heading: string;
  description: string;
  text: string;
  icon: React.ReactNode;
  BadgeIcon?: React.ReactNode;
}) => {
  return (
    <>
      {/* ADMIN WELCOME SECTION */}
      <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
        <div className="space-y-4">
          <Badge icon={BadgeIcon } text={text} />
          <div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 capitalize">
              {heading}
            </h1>
            <p className="text-muted-foreground text-sm md:text-base">
              {description}
            </p>
          </div>
        </div>

        <div className="hidden md:block">
          <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
            {icon}
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeBadge;
