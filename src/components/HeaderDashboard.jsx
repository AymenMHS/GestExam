// Header.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import notificationIcon from '../assets/icons/notification.png';
import avatarImage from '../assets/icons/omar.png';
import profileIcon from '../assets/icons/utilisateur1.png';
import settingsIcon from '../assets/icons/parametres1.png';
import disconnectIcon from '../assets/icons/disconnectred.png';
import NotificationSidebar from './NotificationSidebar';
import { useNotifications } from './ui/Notifications';
import { sampleNotifications } from '../data/notificationData';

export default function Header({ user = { name: 'Benomar Omar', role: 'Responsable de planification' } }) {
    const navigate = useNavigate();
    const { confirm } = useNotifications();
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const profileRef = useRef(null);

    // Count unread notifications
    const unreadCount = sampleNotifications.filter(notif => !notif.lue).length;

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (profileRef.current && !profileRef.current.contains(event.target)) {
                setIsProfileDropdownOpen(false);
            }
        }

        if (isProfileDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen]);

    const handleLogout = async () => {
        setIsProfileDropdownOpen(false);

        const confirmed = await confirm({
            title: "Confirmation de déconnexion",
            message: "Voulez-vous vraiment vous déconnecter ?",
            confirmLabel: "Se déconnecter",
            cancelLabel: "Annuler"
        });

        if (confirmed) {
            // Add logout logic here when authentication is implemented
            console.log('Déconnexion confirmée...');
            // Future: navigate('/login');
        }
    };

    const handleProfileClick = () => {
        setIsProfileDropdownOpen(false);
        navigate('/dashboard/profil');
    };

    const handleSettingsClick = () => {
        setIsProfileDropdownOpen(false);
        navigate('/dashboard/parametres');
    };

    return (
        <>
            <header className="w-full h-16 md:h-14 flex items-center justify-end gap-4 px-6 bg-[#E3F0FF] border-b border-transparent">
                <button
                    onClick={() => setIsNotificationOpen(true)}
                    aria-label="notifications"
                    className="relative w-10 h-10 flex items-center justify-center rounded-md hover:opacity-80 cursor-pointer transition-opacity"
                >
                    <img src={notificationIcon} alt="Notif" className="w-7 h-7" />
                    {unreadCount > 0 && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                            {unreadCount > 9 ? '9+' : unreadCount}
                        </span>
                    )}
                </button>

                <div className="relative" ref={profileRef}>
                    <div
                        className="flex items-center gap-3 bg-transparent cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    >
                        <img
                            src={avatarImage}
                            alt="avatar"
                            className="w-12 h-12 rounded-full object-cover cursor-pointer"
                        />
                        <div className="hidden sm:flex flex-col justify-center text-left">
                            <h3 className="text-sm font-semibold">{user.name}</h3>
                            <p className="text-xs opacity-80">{user.role}</p>
                        </div>
                    </div>

                    {/* Profile Dropdown Menu */}
                    {isProfileDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                            <button
                                onClick={handleProfileClick}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3"
                            >
                                <img src={profileIcon} alt="Profil" className="w-5 h-5" />
                                <span>Profil</span>
                            </button>
                            <button
                                onClick={handleSettingsClick}
                                className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-3"
                            >
                                <img src={settingsIcon} alt="Parametres" className="w-5 h-5" />
                                <span>Parametres</span>
                            </button>
                            <hr className="my-2 border-gray-200" />
                            <button
                                onClick={handleLogout}
                                className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-3"
                            >
                                <img src={disconnectIcon} alt="Déconnexion" className="w-5 h-5" />
                                <span>Se déconnecter</span>
                            </button>
                        </div>
                    )}
                </div>
            </header>

            {/* Notification Sidebar */}
            <NotificationSidebar
                isOpen={isNotificationOpen}
                onClose={() => setIsNotificationOpen(false)}
            />
        </>
    );
}
