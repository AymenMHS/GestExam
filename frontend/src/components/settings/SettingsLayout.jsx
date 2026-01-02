// src/components/settings/SettingsLayout.jsx
import React, { useState, useMemo } from "react";
import AppearanceSettings from "./AppearanceSettings";
import NotificationsSettings from "./NotificationsSettings";
import UsersManagement from "./UsersManagement";
import AboutApp from "./AboutApp";
import { getUserRole } from "../../utils/user";

/**
 * SettingsLayout
 * - n'affiche pas l'onglet "Comptes utilisateurs" pour les rôles "Enseignant" et "Etudiant"
 * - role lu depuis getUserRole() (fallback vers localStorage.debugRole pour tests)
 */

const ALL_TABS_BASE = [
  { id: "appearance", label: "Apparence", icon: "/src/assets/icons/parametres1.png" },
  { id: "notifications", label: "Notifications", icon: "/src/assets/icons/notification.png" },
  { id: "about", label: "A propos", icon: "/src/assets/icons/fichier1.png" },
];

const USERS_TAB = { id: "users", label: "Comptes utilisateurs", icon: "/src/assets/icons/utilisateur1.png" };

const SettingsLayout = () => {
  // getUserRole() est la source principale ; fallback sur debugRole si présent (pratique pour dev)
  const rawRole = localStorage.getItem("debugRole") || getUserRole();
  const role = (rawRole || "").toString();

  // Normalisation simple pour éviter les soucis de casse/variantes
  const roleLower = role.toLowerCase();

  // on affiche users uniquement pour les rôles "chef" (chef département) et "responsable"
  const showUsersTab = roleLower.includes("chef") || roleLower.includes("responsable");

  const tabs = useMemo(() => {
    const base = [...ALL_TABS_BASE];
    if (showUsersTab) {
      base.splice(base.length - 1, 0, USERS_TAB);
    }
    return base;
  }, [showUsersTab]);

  // si tabs change (ex: role change en dev), s'assurer d'avoir un active valide
  const [active, setActive] = useState(tabs[0]?.id ?? "appearance");

  // Si l'utilisateur change de role en dev et que l'onglet actif n'existe plus, on corrige
  React.useEffect(() => {
    if (!tabs.find(t => t.id === active)) {
      setActive(tabs[0]?.id ?? "appearance");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  return (
    <div className="flex justify-center items-start w-full h-full min-h-0 bg-[#E3F0FF] p-4">
      <div className="w-full max-w-[1200px] h-full">
        <div className="w-full bg-white rounded-[8px] p-3 flex gap-4 h-full">
          {/* left menu */}
          <aside className="w-[260px] min-w-[200px] border-r pr-3">
            <div className="mb-4">
              <h2 className="font-nunito font-bold text-[18px]">Paramètres</h2>
              <p className="text-xs text-gray-500">Personnalise l'application</p>
            </div>

            <nav className="flex flex-col gap-2">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className={`w-full text-left flex items-center gap-3 p-2 rounded-md transition-all duration-200
                    ${active === t.id ? "bg-[#b9cade] shadow-inner" : "hover:bg-gray-50"}`}
                >
                  <img src={t.icon} alt="" className="w-5 h-5" />
                  <span className="font-nunito text-sm">{t.label}</span>
                </button>
              ))}
            </nav>
          </aside>

          {/* content */}
          <main className="flex-1 h-full overflow-auto min-h-0">
            <div className="p-2 h-full flex flex-col gap-4">
              {active === "appearance" && <AppearanceSettings />}
              {active === "notifications" && <NotificationsSettings />}
              {active === "users" && showUsersTab && <UsersManagement />}
              {active === "about" && <AboutApp />}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
