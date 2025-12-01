// Header.jsx
import React from 'react';

export default function Header({ user = { name: 'Benomar Omar', role: 'Responsable de planification' } }) {
    return (
        <header className="w-full h-16 md:h-14 flex items-center justify-end gap-4 px-6 bg-[#E3F0FF] border-b border-transparent">
            <button
                aria-label="notifications"
                className="w-10 h-10 flex items-center justify-center rounded-md hover:opacity-80 cursor-pointer"
            >
                <img src="src/assets/icons/notification.png" alt="Notif" className="w-7 h-7" />
            </button>

            <div className="flex items-center gap-3 bg-transparent cursor-pointer">
                <img
                    src="src/assets/icons/omar.png"
                    alt="avatar"
                    className="w-12 h-12 rounded-full object-cover cursor-pointer"
                />
                <div className="hidden sm:flex flex-col justify-center text-left">
                    <h3 className="text-sm font-semibold">{user.name}</h3>
                    <p className="text-xs opacity-80">{user.role}</p>
                </div>
            </div>
        </header>
    );
}
