import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, UserCheck, Users } from "lucide-react";
interface AdminStatsProps {
  activeDoctors: number;
  totalDoctors: number;
  totalAppointments: number;
  completedAppointments: number;
}

const AdminStats = ({
  activeDoctors,
  totalDoctors,
  totalAppointments,
  completedAppointments,
}: AdminStatsProps) => {
  const statsCard = [
    {
      total: activeDoctors,
      text: "Active Doctors",
    },
    {
      total: totalDoctors,
      text: "Total Doctors",
    },
    {
      total: totalAppointments,
      text: "Total Appointments",
    },
    {
      total: completedAppointments,
      text: "Completed Appointments",
    },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {statsCard.map((item) => (
        <Card
          className="border-2 hover:scale-105 hover:border-primary/30 transition-all duration-300"
          key={item.text}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center">
                <Users className="size-6" />
              </div>
              <div>
                <div className="text-2xl font-bold">{item.total}</div>
                <div className="text-sm text-muted-foreground">{item.text}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
