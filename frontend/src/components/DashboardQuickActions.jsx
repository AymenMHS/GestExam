// src/components/DashboardQuickActions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { getUserRole } from "../utils/user";

// Icons (utilise les icônes déjà présentes dans src/assets/icons)
import calendrierIcon from "../assets/icons/calendrier.png";
import examenIcon from "../assets/icons/examen.png";
import moduleIcon from "../assets/icons/module.png";
import etudiantIcon from "../assets/icons/etudiant.png";
import enseignantIcon from "../assets/icons/enseigner.png";
import salleIcon from "../assets/icons/salle.png";
import reclamationIcon from "../assets/icons/fichier.png";
import surveillancesIcon from "../assets/icons/fichier.png";
import pubIcon from "../assets/icons/publication.png";

const ROLE_ACTIONS = {
  // Responsable de planification / Chef Département
  Responsable: [
    { key: "Calendrier", to: "/dashboard/calendrier", icon: calendrierIcon },
    { key: "Examens", to: "/dashboard/examens", icon: examenIcon },
    { key: "Niveaux / Modules", to: "/dashboard/modules", icon: moduleIcon },
    { key: "Etudiants", to: "/dashboard/etudiants", icon: etudiantIcon },
    { key: "Enseignants", to: "/dashboard/enseignants", icon: enseignantIcon },
    { key: "Salles", to: "/dashboard/salles", icon: salleIcon },
    { key: "Réclamations", to: "/dashboard/admin-reclamations", icon: reclamationIcon }
  ],
  "Chef Département": [
    { key: "Calendrier", to: "/dashboard/calendrier", icon: calendrierIcon },
    { key: "Examens", to: "/dashboard/examens", icon: examenIcon },
    { key: "Niveaux / Modules", to: "/dashboard/modules", icon: moduleIcon },
    { key: "Etudiants", to: "/dashboard/etudiants", icon: etudiantIcon },
    { key: "Enseignants", to: "/dashboard/enseignants", icon: enseignantIcon },
    { key: "Salles", to: "/dashboard/salles", icon: salleIcon },
    { key: "Réclamations", to: "/dashboard/admin-reclamations", icon: reclamationIcon }
  ],
  Enseignant: [
    { key: "Calendrier", to: "/dashboard/calendrier", icon: calendrierIcon },
    { key: "Mes surveillances", to: "/dashboard/surveillances", icon: surveillancesIcon },
    { key: "Mes examens", to: "/dashboard/mes-examens", icon: examenIcon },
    { key: "Publications", to: "/dashboard/publications", icon: pubIcon }
  ],
  Etudiant: [
    { key: "Calendrier", to: "/dashboard/calendrier", icon: calendrierIcon },
    { key: "Mes Examens", to: "/dashboard/mes-examens", icon: examenIcon },
    { key: "Mes CC", to: "/dashboard/mes-cc", icon: pubIcon },
    { key: "Mes Remplacements", to: "/dashboard/mes-remplacements", icon: pubIcon },
    { key: "Mes Rattrapages", to: "/dashboard/mes-rattrapages", icon: pubIcon }
  ],
  Admin: [
    { key: "Calendrier", to: "/dashboard/calendrier", icon: calendrierIcon },
    { key: "Examens", to: "/dashboard/examens", icon: examenIcon },
    { key: "Modules", to: "/dashboard/modules", icon: moduleIcon },
    { key: "Etudiants", to: "/dashboard/etudiants", icon: etudiantIcon },
    { key: "Enseignants", to: "/dashboard/enseignants", icon: enseignantIcon },
    { key: "Salles", to: "/dashboard/salles", icon: salleIcon },
    { key: "Publications", to: "/dashboard/publications", icon: pubIcon }
  ]
};

export default function DashboardQuickActions({ role: forcedRole = null }) {
  const navigate = useNavigate();
  const role = forcedRole || getUserRole() || "Responsable";

  // fallback: if role not found, use Responsable set
  const actions = ROLE_ACTIONS[role] || ROLE_ACTIONS["Responsable"];

  return (
    <section className="w-full">
      <div className="w-full mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg leading-6 font-semibold text-gray-900">Accès rapide</h3>
            <p className="mt-1 text-sm text-gray-500">Raccourcis utiles pour votre rôle : <span className="font-medium">{role}</span></p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {actions.map((a) => (
            <button
              key={a.key}
              type="button"
              onClick={() => navigate(a.to)}
              onKeyDown={(e) => { if (e.key === "Enter") navigate(a.to); }}
              className="group relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl shadow-sm bg-white hover:shadow-md border border-gray-100 focus:outline-none focus:ring-2 focus:ring-rose-300 transition"
              aria-label={a.key}
            >
              <div className="w-11 h-11 rounded-lg flex items-center justify-center bg-[#3B679A] from-rose-50 to-white border border-gray-100">
                <img src={a.icon} alt={a.key} className="w-6 h-6 object-contain" />
              </div>
              <div className="text-sm font-medium text-gray-700 text-center truncate px-1">{a.key}</div>
              <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs text-white bg-rose-500 rounded-full px-2 py-0.5">Aller</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
