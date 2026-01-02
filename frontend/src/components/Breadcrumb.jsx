// Breadcrumb.jsx - Fil d'Ariane component
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

// Mapping des routes vers des labels en français
const routeLabels = {
    'dashboard': 'Tableau de bord',
    'calendrier': 'Calendrier',
    'examens': 'Gestion des examens',
    'modules': 'Gestion des modules',
    'etudiants': 'Gestion des étudiants',
    'enseignants': 'Gestion des enseignants',
    'salles': 'Gestion des salles',
    'profil': 'Mon profil',
    'surveillances': 'Mes surveillances',
    'reclamations': 'Réclamations',
    'admin-reclamations': 'Gestion des réclamations',
    'publications': 'Gestion des publications',
    'mes-publications': 'Toutes les publications',
    'mes-examens': 'Mes examens',
    'mes-cc': 'Contrôles continus',
    'mes-remplacements': 'Remplacements',
    'mes-rattrapages': 'Rattrapages',
    'parametres': 'Paramètres'
};

export default function Breadcrumb() {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter((x) => x);

    if (pathnames.length <= 1) {
        return null;
    }

    return (
        <nav className="bg-[#E3F0FF] px-6 py-3">
            <ol className="flex items-center space-x-2 text-sm">
                {/* Home / Dashboard link */}
                <li className="flex items-center">
                    <Link
                        to="/dashboard"
                        className="text-gray-500 hover:text-[#071A83] transition-colors flex items-center gap-1.5"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        <span>Accueil</span>
                    </Link>
                </li>

                {/* Breadcrumb items */}
                {pathnames.map((value, index) => {
                    if (value === 'dashboard') return null;

                    const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const label = routeLabels[value] || value;

                    return (
                        <li key={to} className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>

                            {isLast ? (
                                <span className="text-[#071A83] font-semibold">
                                    {label}
                                </span>
                            ) : (
                                <Link
                                    to={to}
                                    className="text-gray-500 hover:text-[#071A83] transition-colors"
                                >
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
