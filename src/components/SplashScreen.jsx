// SplashScreen.jsx - Simple and clean splash screen
import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onComplete }) {
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Start fade out after 2.5 seconds
        const fadeTimer = setTimeout(() => {
            setFadeOut(true);
        }, 2500);

        // Complete and unmount after 3 seconds
        const completeTimer = setTimeout(() => {
            onComplete();
        }, 3000);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(completeTimer);
        };
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-gradient-to-br from-[#071A83] via-[#0a2ba8] to-[#4c87af] transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {/* University Logo */}
            <div className="mb-8 animate-fadeIn">
                <img
                    src="/univ-logo.png"
                    alt="Logo Université"
                    className="w-48 h-48 object-contain"
                />
            </div>

            {/* Simple Spinner */}
            <div className="mb-4">
                <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>

            {/* Loading Text */}
            <p className="text-xl font-medium text-white animate-fadeIn">
                Chargement...
            </p>

            {/* Custom animations */}
            <style jsx>{`
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
}
