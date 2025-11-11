"use client";
import AdminStats from "@/components/admin/AdminStats/AdminStats";
import DoctorManagement from "@/components/admin/DoctorManagement/DoctorManagement";
import Badge from "@/components/Badge/Badge";
import Navbar from "@/components/Navbar/Navbar";
import { useGetAppointments } from "@/hooks/use-appointments";
import { useGetDoctors } from "@/hooks/use-doctors";
import { useUser } from "@clerk/nextjs";
import { LoaderIcon, SettingsIcon } from "lucide-react";

const AdminDashboardClient = () => {
  const { user } = useUser();
  const { data: doctors = [], isLoading: isLoadingDoctors } = useGetDoctors();
  const { data: appointments = [], isLoading: isLoadingAppointments } =
    useGetAppointments();

  const stats = {
    totalDoctors: doctors!.length,
    activeDoctors: doctors!.filter((doc) => doc.isActive).length,
    totalAppointments: appointments!.length,
    completedAppointments: appointments!.filter(
      (app) => app.status === "COMPLETED"
    ).length,
  };

  if (isLoadingDoctors || isLoadingAppointments)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <LoaderIcon />
      </div>
    );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8 pt-24">
        {/* ADMIN WELCOME SECTION */}
        <div className="mb-12 flex items-center justify-between bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 border border-primary/20">
          <div className="space-y-4">
            <Badge
              icon={
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              }
              text="Admin Dashboard"
            />
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                Welcome back, {user?.firstName || "Admin"}!
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                Manage doctors, oversee appointments, and monitor your dental
                practice performance.
              </p>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="w-32 h-32 bg-gradient-to-br from-primary/20 to-primary/10 rounded-full flex items-center justify-center">
              <SettingsIcon className="w-16 h-16 text-primary" />
            </div>
          </div>
        </div>

        {/* Admin Stats  */}
        <AdminStats
          totalDoctors={stats.totalDoctors}
          activeDoctors={stats.activeDoctors}
          totalAppointments={stats.totalAppointments}
          completedAppointments={stats.completedAppointments}
        />
        <DoctorManagement />
      </div>
    </div>
  );
};

export default AdminDashboardClient;
