import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from './ui/Notifications';

// Import icons
import accueilIcon from '../assets/icons/accueil1.png';
import calendrierIcon from '../assets/icons/calendrier.png';
import examenIcon from '../assets/icons/examen.png';
import moduleIcon from '../assets/icons/module.png';
import etudiantIcon from '../assets/icons/etudiant.png';
import enseignantIcon from '../assets/icons/enseigner.png';
import salleIcon from '../assets/icons/salle.png';
import reclamationIcon from '../assets/icons/fichier.png';
import profilIcon from '../assets/icons/utilisateur.png';
import parametresIcon from '../assets/icons/parametres.png';
import collapseIcon from '../assets/icons/telechargements.png';
import disconnectIcon from '../assets/icons/disconnect.png';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const { logout } = useAuth();
  const { confirm } = useNotifications();

  // Define paths for your items - Responsable de planification
  const items = [
    { key: 'Tableau de bord', path: '/dashboard', icon: accueilIcon, end: true, hasRoute: true },
    { key: 'Calendrier', path: '/dashboard/calendrier', icon: calendrierIcon, hasRoute: true },
    { key: 'Examens', path: '/dashboard/examens', icon: examenIcon, hasRoute: true },
    { key: 'Niveaux/Modules', path: '/dashboard/modules', icon: moduleIcon, hasRoute: true },
    { key: 'Gestion des Etudiants', path: '/dashboard/etudiants', icon: etudiantIcon, hasRoute: true },
    { key: 'Gestion des Enseignants', path: '/dashboard/enseignants', icon: enseignantIcon, hasRoute: true },
    { key: 'Gestion des Salles', path: '/dashboard/salles', icon: salleIcon, hasRoute: true },
    { key: 'Gestion des Réclamations', path: '/dashboard/admin-reclamations', icon: reclamationIcon, hasRoute: true }
  ];

  const footerItems = [
    { key: 'Profil', path: '/dashboard/profil', icon: profilIcon, hasRoute: true },
    { key: 'Parametres', path: '/dashboard/parametres', icon: parametresIcon, hasRoute: true }
  ];

  // Helper class for styling active/inactive links
  const getLinkClass = ({ isActive }) =>
    `w-11/12 h-8 flex items-center text-sm my-0.5 cursor-pointer transition rounded-md ${isOpen ? 'pl-2' : 'justify-center'
    } ${isActive ? 'bg-white text-black' : 'text-white hover:bg-white/10'
    }`;

  // Helper class for non-routed items
  const getButtonClass = (isSelected) =>
    `w-11/12 h-8 flex items-center text-sm my-0.5 cursor-pointer transition rounded-md ${isOpen ? 'pl-2' : 'justify-center'
    } ${isSelected ? 'bg-white text-black' : 'text-white hover:bg-white/10'
    }`;

  // Helper to invert icon color when active
  const getIconClass = (isActive) => `w-5 h-5 ${isOpen ? 'mr-2' : ''} ${isActive ? 'filter invert' : ''}`;

  const handleLogout = async () => {
    const confirmed = await confirm({
      title: "Déconnexion",
      message: "Voulez-vous vraiment vous déconnecter ?",
      confirmLabel: "Se déconnecter",
      cancelLabel: "Annuler"
    });

    if (confirmed) {
      await logout();
      window.location.href = '/login';
    }
  };

  return (
    <aside className={`h-screen ${isOpen ? 'w-1/5 min-w-[180px]' : 'w-20'} bg-[#3B679A] rounded-tr-lg rounded-br-lg p-2 flex flex-col transition-all duration-300`}>
      {/* Collapse button */}
      <div className={`w-full h-7 flex ${isOpen ? 'justify-end' : 'justify-center'} items-center`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-7 h-7 bg-transparent p-0 flex items-center justify-center hover:opacity-60"
        >
          <img src={collapseIcon} alt="collapse" className={`w-5 h-5 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      {/* Logo */}
      <div className="w-full h-20 flex justify-center items-center mt-3 mb-3 overflow-hidden">
        {isOpen && <img src="/univ-logo.png" alt="logo" className="w-40 object-contain" />}
      </div>

      {/* Navigation list */}
      <nav className="flex-1 flex flex-col items-center pt-1 overflow-auto">
        <div className="w-full flex flex-col items-center">

          {items.map((it) => (
            it.hasRoute ? (
              <NavLink
                key={it.key}
                to={it.path}
                end={it.end}
                className={getLinkClass}
              >
                {({ isActive }) => (
                  <>
                    <img src={it.icon} alt="" className={getIconClass(isActive)} />
                    {isOpen && <span className="select-none truncate">{it.key}</span>}
                  </>
                )}
              </NavLink>
            ) : (
              <div
                key={it.key}
                onClick={() => setSelectedItem(it.key)}
                className={getButtonClass(selectedItem === it.key)}
              >
                <img src={it.icon} alt="" className={getIconClass(selectedItem === it.key)} />
                {isOpen && <span className="select-none truncate">{it.key}</span>}
              </div>
            )
          ))}

          <hr className="border-white border w-[90%] my-1 opacity-30" />

          {footerItems.map((it) => (
            it.hasRoute ? (
              <NavLink
                key={it.key}
                to={it.path}
                className={getLinkClass}
              >
                {({ isActive }) => (
                  <>
                    <img src={it.icon} alt="" className={getIconClass(isActive)} />
                    {isOpen && <span className="select-none truncate">{it.key}</span>}
                  </>
                )}
              </NavLink>
            ) : (
              <div
                key={it.key}
                onClick={() => setSelectedItem(it.key)}
                className={getButtonClass(selectedItem === it.key)}
              >
                <img src={it.icon} alt="" className={getIconClass(selectedItem === it.key)} />
                {isOpen && <span className="select-none truncate">{it.key}</span>}
              </div>
            )
          ))}

          <button
            onClick={handleLogout}
            className={`mt-4 w-10/12 h-9 bg-white text-black rounded-md flex items-center justify-center text-sm cursor-pointer hover:bg-gray-200 ${!isOpen ? 'px-0' : ''}`}
          >
            <img src={disconnectIcon} alt="disconnect" className={`w-5 h-5 ${isOpen ? 'mr-2' : ''}`} />
            {isOpen && <span>SE DÉCONNECTER</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;