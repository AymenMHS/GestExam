import React from 'react';
import { sampleNotifications } from '../data/notificationData';

// Get icon SVG for notification types (Facebook-style)
const getNotificationIcon = (type) => {
    const iconProps = "w-10 h-10";

    switch (type) {
        case 'surveillance':
            return (
                <div className={`${iconProps} rounded-full bg-[#E3F0FF] flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-[#3B679A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
            );
        case 'reclamation':
            return (
                <div className={`${iconProps} rounded-full bg-[#E3F0FF] flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-[#3B679A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
            );
        case 'publication':
            return (
                <div className={`${iconProps} rounded-full bg-[#E3F0FF] flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-[#3B679A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                </div>
            );
        case 'examen':
            return (
                <div className={`${iconProps} rounded-full bg-[#E3F0FF] flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-[#3B679A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                </div>
            );
        case 'systeme':
            return (
                <div className={`${iconProps} rounded-full bg-[#E3F0FF] flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-[#3B679A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
            );
        default:
            return (
                <div className={`${iconProps} rounded-full bg-[#E3F0FF] flex items-center justify-center`}>
                    <svg className="w-6 h-6 text-[#3B679A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                </div>
            );
    }
};

// Format date to relative time (French) — prêt à l'emploi et robuste face aux ISO sans 'Z'
// Affiche aussi l'heure locale (HH:mm)
const formatRelativeTime = (dateInput, assumeUTC = true) => {
    // parse input (string | number | Date)
    const parseDate = (input) => {
        if (input instanceof Date) return new Date(input.getTime());
        if (typeof input === 'number') return new Date(input);
        if (typeof input === 'string') {
            // ISO sans timezone "YYYY-MM-DDTHH:mm:ss"
            const isoNoZone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
            if (assumeUTC && isoNoZone.test(input)) {
                return new Date(input + 'Z'); // force UTC parsing
            }
            return new Date(input); // navigateur gère le reste
        }
        return null;
    };

    const date = parseDate(dateInput);
    if (!date || isNaN(date.getTime())) return '';

    const now = new Date();

    // Normaliser à minuit local pour comparer uniquement les jours (évite problèmes de fuseau)
    const startOfLocalDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const today = startOfLocalDay(now);
    const target = startOfLocalDay(date);

    const msInDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round((today - target) / msInDay);

    const timeStr = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }); // ex: "14:30"

    if (diffDays === 0) return `Aujourd'hui — ${timeStr}`;
    if (diffDays === 1) return `Hier — ${timeStr}`;
    if (diffDays > 1 && diffDays < 7) return `Il y a ${diffDays} jours — ${timeStr}`;

    // Sinon : date courte JJ/MM/AAAA — on inclut aussi l'heure
    const dateStr = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    return `${dateStr} — ${timeStr}`;
};

const NotificationSidebar = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    // Sort notifications by date (newest first)
    const sortedNotifications = [...sampleNotifications].sort(
        (a, b) => new Date(b.date_notification) - new Date(a.date_notification)
    );

    return (
        <>
            {/* Overlay */}
            <div
                className="fixed inset-0 bg-black/30 z-[999] transition-opacity duration-300"
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside className="fixed top-0 right-0 h-screen w-full sm:w-[420px] bg-white shadow-2xl z-[1000] flex flex-col animate-slide-in">
                {/* Header */}
                <div className="px-4 py-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
                        <button
                            onClick={onClose}
                            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Fermer"
                        >
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto bg-[#F0F2F5] p-3">
                    {sortedNotifications.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 px-8">
                            <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                            </div>
                            <p className="text-base font-semibold text-gray-600">Aucune notification</p>
                            <p className="text-sm text-gray-500 mt-1">Vous êtes à jour !</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {sortedNotifications.map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`relative rounded-xl shadow-sm border transition-all duration-200 hover:shadow-md cursor-pointer overflow-hidden ${!notification.lue
                                            ? 'bg-white border-[#3B679A]/20 hover:border-[#3B679A]/40'
                                            : 'bg-white border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    {/* Unread indicator bar */}
                                    {!notification.lue && (
                                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#3B679A] to-[#4c87af]"></div>
                                    )}

                                    <div className="p-4 pl-5">
                                        <div className="flex gap-3">
                                            {/* Icon */}
                                            <div className="flex-shrink-0 mt-0.5">
                                                {getNotificationIcon(notification.type_notification)}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                {/* Title */}
                                                <div className="flex items-start justify-between gap-2 mb-2">
                                                    <h3 className="text-[15px] font-bold text-gray-900 leading-snug">
                                                        {notification.titre}
                                                    </h3>
                                                    {!notification.lue && (
                                                        <span className="flex-shrink-0 w-2.5 h-2.5 bg-[#3B679A] rounded-full mt-1.5"></span>
                                                    )}
                                                </div>

                                                {/* Message */}
                                                <p className="text-[14px] text-gray-700 leading-relaxed mb-3">
                                                    {notification.message}
                                                </p>

                                                {/* Footer with time and type badge */}
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-2">
                                                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="text-[13px] text-gray-500 font-medium">
                                                            {formatRelativeTime(notification.date_notification)}
                                                        </span>
                                                    </div>

                                                    {/* Type badge */}
                                                    <span className="px-2.5 py-1 bg-[#E3F0FF] text-[#3B679A] text-[11px] font-semibold rounded-full uppercase tracking-wide">
                                                        {notification.type_notification}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="px-4 py-3 bg-white border-t border-gray-200">
                    <button className="w-full py-2 text-[#3B679A] text-sm font-semibold hover:bg-[#E3F0FF] rounded-lg transition-colors">
                        Marquer tout comme lu
                    </button>
                </div>
            </aside>
        </>
    );
};

export default NotificationSidebar;
