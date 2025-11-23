import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminDashboardClient from "./AdminDashboardClient";
import Navbar from "@/components/Navbar/Navbar";

const AdminPage = async () => {
 
  return (
    <div>
      <Navbar />
      <AdminDashboardClient />
    </div>
  );
};

export default AdminPage;
