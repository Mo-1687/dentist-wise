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
