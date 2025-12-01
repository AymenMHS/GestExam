import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink

function Sidebar() {
  // Define paths for your items
  const items = [
    { key: 'Tableau de bord', path: '/dashboard', icon: 'src/assets/icons/accueil1.png', end: true }, // end=true for exact match
    { key: 'Calendrier', path: '/dashboard/calendrier', icon: 'src/assets/icons/calendrier.png' },
    { key: 'Examens', path: '/dashboard/examens', icon: 'src/assets/icons/examen.png' },
    { key: 'Promos/Modules', path: '/dashboard/modules', icon: 'src/assets/icons/module.png' },
    { key: 'Etudiants', path: '/dashboard/etudiants', icon: 'src/assets/icons/etudiant.png' },
    { key: 'Enseignants', path: '/dashboard/enseignants', icon: 'src/assets/icons/enseigner.png' },
    { key: 'Salles', path: '/dashboard/salles', icon: 'src/assets/icons/salle.png' }
  ];

  const footerItems = [
    { key: 'Profil', path: '/dashboard/profil', icon: 'src/assets/icons/utilisateur.png' },
    { key: 'Parametres', path: '/dashboard/parametres', icon: 'src/assets/icons/parametres.png' }
  ];

  // Helper class for styling active/inactive links
  const getLinkClass = ({ isActive }) => 
    `w-11/12 h-8 flex items-center text-sm pl-2 my-0.5 cursor-pointer transition rounded-md ${
      isActive ? 'bg-white text-black' : 'text-white hover:bg-white/10'
    }`;

  // Helper to invert icon color when active
  const getIconClass = (isActive) => `w-5 h-5 mr-2 ${isActive ? 'filter invert' : ''}`;

  return (
    <aside className="h-screen w-1/5 min-w-[180px] bg-[#3B679A] rounded-tr-lg rounded-br-lg p-2 flex flex-col">
      {/* Collapse button */}
      <div className="w-full h-7 flex justify-end items-center">
        <button className="w-7 h-7 bg-transparent p-0 flex items-center justify-center hover:opacity-60">
          <img src="src/assets/icons/telechargements.png" alt="collapse" className="w-5 h-5" />
        </button>
      </div>

      {/* Logo */}
      <div className="w-full h-20 flex justify-center items-center mt-3 mb-3">
        <img src="/univ-logo.png" alt="logo" className="w-40 object-contain" />
      </div>

      {/* Navigation list */}
      <nav className="flex-1 flex flex-col items-center pt-1 overflow-auto">
        <div className="w-full flex flex-col items-center">
          
          {items.map((it) => (
            <NavLink 
              key={it.key} 
              to={it.path} 
              end={it.end}
              className={getLinkClass}
            >
              {({ isActive }) => (
                <>
                  <img src={it.icon} alt="" className={getIconClass(isActive)} />
                  <span className="select-none truncate">{it.key}</span>
                </>
              )}
            </NavLink>
          ))}

          <hr className="border-white border w-[90%] my-1 opacity-30" />

          {footerItems.map((it) => (
            <NavLink 
              key={it.key} 
              to={it.path} 
              className={getLinkClass}
            >
              {({ isActive }) => (
                <>
                  <img src={it.icon} alt="" className={getIconClass(isActive)} />
                  <span className="select-none truncate">{it.key}</span>
                </>
              )}
            </NavLink>
          ))}

          <button className="mt-4 w-10/12 h-9 bg-white text-black rounded-md flex items-center justify-center text-sm cursor-pointer hover:bg-gray-200">
            <img src="src/assets/icons/disconnect.png" alt="disconnect" className="w-5 h-5 mr-2" />
            <span>SE DÉCONNECTE</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default Sidebar;