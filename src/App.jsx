// src/App.jsx
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";

// Notification provider
import { NotificationProvider } from "./components/ui/Notifications";

// Layouts
import DashboardLayout from "./Layouts/DashboardLayout";

// Public Pages
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ForgotPassword from "./Pages/ForgotPassword";
import NotFound from "./Pages/NotFound";

// Dashboard Pages / Components
import Statistic from "./components/Statistic";
import ExamCalendar from "./components/ExamCalender";
import GestExamen from "./Pages/gestExamen";
import GestModule from "./Pages/gestModule";
import GestEtudiant from "./Pages/gestEtudiant";
import GestionEnseignants from "./components/gestEnseignats/GestionEnseignants";
import GestionSalles from "./components/gestSalles/GestionSalles";
import ProfilePage from "./Pages/ProfilePage";

// Composants ajoutés
import ReclamationList from "./components/prochSurveillances/SurveillancesList";
import RoleBasedDashboard from "./components/RoleBasedDashboard";
import ReclamationsManager from "./components/gestReclamations/ReclamationsManager";
import ReclamationsAdmin from "./components/gestReclamations/ReclamationsAdmin";
import PublicationsPage from "./components/publications/PublicationsPage";
import RoleDebugSwitch from "./components/RoleDebugSwitch";
import Parametres from "./Pages/Parametres";
import PublicationsManager from "./components/publications/PublicationsManager";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (
    <NotificationProvider>
      <Routes>
        {/* --- Public Routes (No Sidebar) --- */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* --- Dashboard Routes (With Sidebar) --- */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<RoleBasedDashboard />} />

          <Route path="calendrier" element={<ExamCalendar />} />
          <Route path="examens" element={<GestExamen />} />
          <Route path="modules" element={<GestModule />} />
          <Route path="etudiants" element={<GestEtudiant />} />
          <Route path="enseignants" element={<GestionEnseignants />} />
          <Route path="salles" element={<GestionSalles />} />
          <Route path="profil" element={<ProfilePage />} />

          <Route path="surveillances" element={<ReclamationList />} />
          <Route path="reclamations" element={<ReclamationsManager />} />
          <Route path="admin-reclamations" element={<ReclamationsAdmin />} />
          <Route path="publications" element={<PublicationsManager />} />
          {/* Publications routes */}
          <Route path="mes-publications" element={<PublicationsPage category="Toutes les publications" />} />
          <Route path="mes-examens" element={<PublicationsPage category="Examens" />} />
          <Route path="mes-cc" element={<PublicationsPage category="Controle Continu" />} />
          <Route path="mes-remplacements" element={<PublicationsPage category="Remplacement" />} />
          <Route path="mes-rattrapages" element={<PublicationsPage category="Rattrapage" />} />
          <Route path="parametres" element={<Parametres />} />
        </Route>

        {/* 404 - Page not found */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {/* DEBUG: boutons de changement de rôle (affiché seulement en dev via Vite) */}
      {import.meta.env.DEV && <RoleDebugSwitch />}
    </NotificationProvider>
  );
}

export default App;
