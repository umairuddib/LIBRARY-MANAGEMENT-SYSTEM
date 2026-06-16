import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

import {
  Outlet,
  Navigate
} from "react-router-dom";

function AdminLayout() {

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  console.log(token);
  console.log(role);

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (role !== "admin") {
    return <Navigate to="/student/home" />;
  }

  return (

    <div className="flex">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Navbar />

        <div className="p-10 min-h-screen bg-white">
          <Outlet />
        </div>

        <Footer />

      </div>

    </div>

  );
}

export default AdminLayout;