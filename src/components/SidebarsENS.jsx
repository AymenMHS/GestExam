// src/components/SidebarsENS.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

// import icons (assure-toi que les imports existent)
import accueilIcon from '../assets/icons/accueil1.png';
import calendrierIcon from '../assets/icons/calendrier.png';
import surveillancesIcon from '../assets/icons/fichier.png'; // icone réutilisée
import profilIcon from '../assets/icons/utilisateur.png';
import parametresIcon from '../assets/icons/parametres.png';
import collapseIcon from '../assets/icons/telechargements.png';
import disconnectIcon from '../assets/icons/disconnect.png';

function SidebarENS() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const mainItems = [
    { key: 'Tableau de bord', path: '/dashboard', icon: accueilIcon, end: true, hasRoute: true }
  ];

  const items = [
    { key: 'Calendrier des surveillances', path: '/dashboard/calendrier', icon: calendrierIcon, hasRoute: true },
    { key: 'Mes reclamations', path: '/dashboard/reclamations', icon: surveillancesIcon, hasRoute: true }
  ];

  const footerItems = [
    { key: 'Profil', path: '/dashboard/profil', icon: profilIcon, hasRoute: true },
    { key: 'Parametres', path: '/dashboard/parametres', icon: parametresIcon, hasRoute: true }
  ];

  const getLinkClass = ({ isActive }) =>
    `w-11/12 h-8 flex items-center text-sm my-0.5 cursor-pointer transition rounded-md ${isOpen ? 'pl-2' : 'justify-center'} ${isActive ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`;

  const getButtonClass = (isSelected) =>
    `w-11/12 h-8 flex items-center text-sm my-0.5 cursor-pointer transition rounded-md ${isOpen ? 'pl-2' : 'justify-center'} ${isSelected ? 'bg-white text-black' : 'text-white hover:bg-white/10'}`;

  const getIconClass = (isActive) => `w-5 h-5 ${isOpen ? 'mr-2' : ''} ${isActive ? 'filter invert' : ''}`;

  return (
    <aside className={`h-screen ${isOpen ? 'w-1/5 min-w-[180px]' : 'w-20'} bg-[#3B679A] rounded-tr-lg rounded-br-lg p-2 flex flex-col transition-all duration-300`}>
      <div className={`w-full h-7 flex ${isOpen ? 'justify-end' : 'justify-center'} items-center`}>
        <button onClick={() => setIsOpen(!isOpen)} className="w-7 h-7 bg-transparent p-0 flex items-center justify-center hover:opacity-60">
          <img src={collapseIcon} alt="collapse" className={`w-5 h-5 transition-transform duration-300 ${!isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>

      <div className="w-full h-20 flex justify-center items-center mt-3 mb-3 overflow-hidden">
        {isOpen && <img src="/univ-logo.png" alt="logo" className="w-40 object-contain" />}
      </div>

      <nav className="flex-1 flex flex-col items-center pt-1 overflow-auto">
        <div className="w-full flex flex-col items-center">
          {mainItems.map((it) =>
            it.hasRoute ? (
              <NavLink key={it.key} to={it.path} end={it.end} className={getLinkClass}>
                {({ isActive }) => (
                  <>
                    <img src={it.icon} alt="" className={getIconClass(isActive)} />
                    {isOpen && <span className="select-none truncate">{it.key}</span>}
                  </>
                )}
              </NavLink>
            ) : (
              <div key={it.key} onClick={() => setSelectedItem(it.key)} className={getButtonClass(selectedItem === it.key)}>
                <img src={it.icon} alt="" className={getIconClass(selectedItem === it.key)} />
                {isOpen && <span className="select-none truncate">{it.key}</span>}
              </div>
            )
          )}

          <hr className="border-white border w-[90%] my-1 opacity-30" />

          {items.map((it) =>
            it.hasRoute ? (
              <NavLink key={it.key} to={it.path} className={getLinkClass}>
                {({ isActive }) => (
                  <>
                    <img src={it.icon} alt="" className={getIconClass(isActive)} />
                    {isOpen && <span className="select-none truncate">{it.key}</span>}
                  </>
                )}
              </NavLink>
            ) : (
              <div key={it.key} onClick={() => setSelectedItem(it.key)} className={getButtonClass(selectedItem === it.key)}>
                <img src={it.icon} alt="" className={getIconClass(selectedItem === it.key)} />
                {isOpen && <span className="select-none truncate">{it.key}</span>}
              </div>
            )
          )}

          <hr className="border-white border w-[90%] my-1 opacity-30" />

          {footerItems.map((it) =>
            it.hasRoute ? (
              <NavLink key={it.key} to={it.path} className={getLinkClass}>
                {({ isActive }) => (
                  <>
                    <img src={it.icon} alt="" className={getIconClass(isActive)} />
                    {isOpen && <span className="select-none truncate">{it.key}</span>}
                  </>
                )}
              </NavLink>
            ) : (
              <div key={it.key} onClick={() => setSelectedItem(it.key)} className={getButtonClass(selectedItem === it.key)}>
                <img src={it.icon} alt="" className={getIconClass(selectedItem === it.key)} />
                {isOpen && <span className="select-none truncate">{it.key}</span>}
              </div>
            )
          )}

          <button className={`mt-4 w-10/12 h-9 bg-white text-black rounded-md flex items-center justify-center text-sm cursor-pointer hover:bg-gray-200 ${!isOpen ? 'px-0' : ''}`}>
            <img src={disconnectIcon} alt="disconnect" className={`w-5 h-5 ${isOpen ? 'mr-2' : ''}`} />
            {isOpen && <span>SE DÉCONNECTE</span>}
          </button>
        </div>
      </nav>
    </aside>
  );
}

export default SidebarENS;
