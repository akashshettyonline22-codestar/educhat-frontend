import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-indigo-50">
      {/* Sidebar "push" style; occupies left when open */}
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
      <div className={`transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-0"}`}>
        {/* Header always visible, shifts right with content */}
        <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
