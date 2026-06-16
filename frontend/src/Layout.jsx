import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex">

      <Sidebar />

      <div className="flex-1 ml-64">

        <Navbar />

        <div className="p-10 min-h-screen bg-gradient-to-r from-slate-900 to-slate-800">
          <Outlet />
        </div>

        <Footer />

      </div>

    </div>
  );
}

export default Layout;