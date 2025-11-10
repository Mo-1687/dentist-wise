import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import Navbar from "@/components/Navbar/Navbar";

const AdminPage = async () => {
  const user = await currentUser();
  if (!user) redirect("/");
  const adminEmail = process.env.ADMAIN_EMAIL;
  if (!adminEmail || user?.emailAddresses[0].emailAddress !== adminEmail) {
    redirect("/dashboard");
  }
  return (
    <div>
      <Navbar />
      <AdminDashboardClient />
    </div>
  );
};

export default AdminPage;
