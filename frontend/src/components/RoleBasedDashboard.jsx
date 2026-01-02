// src/components/RoleBasedDashboard.jsx
import React from "react";
import { getUserRole } from "../utils/user";
import DashboardQuickActions from "./DashboardQuickActions";
import Statistic from "./Statistic";
import ProchSurveillances from "./prochSurveillances/SurveillancesList";
import StudentExams from "./prochExamens/StudentExams";

const RoleBasedDashboard = () => {
  const role = getUserRole();

  return (
    <div className="space-y-6">
      {/* Quick actions en tête — choisit automatiquement selon role */}
      <DashboardQuickActions />

      {/* contenu spécifique par role */}
      {role === "Enseignant" ? <ProchSurveillances /> :
       role === "Etudiant" ? <StudentExams /> :
       <Statistic />}
    </div>
  );
};

export default RoleBasedDashboard;
