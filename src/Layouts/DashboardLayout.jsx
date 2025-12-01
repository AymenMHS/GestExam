import React from "react";
import { Outlet } from "react-router-dom"; // Import Outlet
import Sidebar from "../components/Sidebar";
import HeaderDashboard from "../components/HeaderDashboard";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar stays persistent */}
      <Sidebar />

      {/* Right column */}
      <div className="flex-1 flex flex-col min-h-0">
        <HeaderDashboard user={{ name: "Benomar Omar", role: "Responsable de planification" }} />

        {/* The content of the specific page will appear here */}
        <div className="flex-1 overflow-auto min-h-0 bg-[#E3F0FF]">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;