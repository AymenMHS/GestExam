import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// Layouts
import DashboardLayout from "./Layouts/DashboardLayout";

// Public Pages
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";

// Dashboard Pages
import Statistic from "./components/Statistic"; // Dashboard Home
import ExamCalendar from "./components/ExamCalender";
import GestExamen from "./Pages/gestExamen";
import GestModule from "./Pages/gestModule";
import GestEtudiant from "./Pages/gestEtudiant";
import GestionEnseignants from "./components/gestEnseignats/GestionEnseignants";
import GestionSalles from "./components/gestSalles/GestionSalles";
import ProfilePage from "./Pages/ProfilePage";

function App() {
  return (
    <Routes>
      {/* --- Public Routes (No Sidebar) --- */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* --- Dashboard Routes (With Sidebar) --- */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* /dashboard renders Statistic by default */}
        <Route index element={<Statistic />} /> 
        
        <Route path="calendrier" element={<ExamCalendar />} />
        <Route path="examens" element={<GestExamen />} />
        <Route path="modules" element={<GestModule />} />
        <Route path="etudiants" element={<GestEtudiant />} />
        <Route path="enseignants" element={<GestionEnseignants />} />
        <Route path="salles" element={<GestionSalles />} />
        <Route path="profil" element={<ProfilePage />} />
      </Route>

      {/* Catch all - Redirect to Home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;