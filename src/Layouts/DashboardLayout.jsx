// src/Layouts/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import SidebarCD from "../components/SidebarCD";
import SidebarENS from "../components/SidebarsENS";
import SidebarETD from "../components/SidebarETD";
import HeaderDashboard from "../components/HeaderDashboard";
import Breadcrumb from "../components/Breadcrumb";
import { getUserRole, getUserName } from "../utils/user";

const DashboardLayout = () => {
  // Récupère le role depuis utils (localStorage pendant dev)
  const userRole = getUserRole(); // "Enseignant", "Chef Département", "Responsable de planification" , "Etudiant"
  const userName = getUserName();

  // Select the appropriate sidebar based on user role
  const renderSidebar = () => {
    switch (userRole) {
      case "Chef Département":
        return <SidebarCD />;
      case "Responsable de planification":
        return <Sidebar />;
      case "Enseignant":
        return <SidebarENS />;
      case "Etudiant":
        return <SidebarETD />;
      default:
        return <Sidebar />; // Default
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar changes based on user role */}
      {renderSidebar()}

      {/* Right column */}
      <div className="flex-1 flex flex-col min-h-0">
        <HeaderDashboard user={{ name: userName, role: userRole }} />

        {/* Breadcrumb navigation */}
        <Breadcrumb />

        {/* The content of the specific page will appear here */}
        <div className="flex-1 overflow-auto min-h-0 bg-[#E3F0FF] p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
