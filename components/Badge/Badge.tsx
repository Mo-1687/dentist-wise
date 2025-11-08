"use client";
const Badge = ({ icon, text }: { icon: React.ReactNode; text: string }) => {
  return (
    <div className="flex items-center w-fit gap-2 px-5 py-2 border border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10 rounded-full text-primary">
      {icon}
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
};

export default Badge;
