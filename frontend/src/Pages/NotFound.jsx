// NotFound.jsx - 404 Page
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#E3F0FF] via-[#F0F7FF] to-[#FFFFFF] flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* Animated 404 */}
                <div className="relative mb-8">
                    <h1 className="text-[180px] md:text-[220px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#071A83] to-[#4c87af] leading-none animate-pulse">
                        404
                    </h1>

                    {/* Floating elements */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="relative">
                            {/* Question mark icon */}
                            <svg
                                className="w-24 h-24 text-[#071A83] opacity-20 animate-bounce"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Message */}
                <div className="mb-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        Page non trouvée
                    </h2>
                    <p className="text-lg text-gray-600 mb-2">
                        Oups! La page que vous recherchez n'existe pas.
                    </p>
                    <p className="text-sm text-gray-500">
                        Il se peut que le lien soit cassé ou que la page ait été supprimée.
                    </p>
                </div>

                {/* Illustration/Icon */}
                <div className="mb-10 flex justify-center">
                    <div className="relative">
                        {/* Decorative circles */}
                        <div className="absolute -top-4 -left-4 w-20 h-20 bg-[#4c87af] rounded-full opacity-10 animate-ping"></div>
                        <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-[#071A83] rounded-full opacity-10 animate-ping" style={{ animationDelay: '0.5s' }}></div>

                        {/* Main icon */}
                        <div className="relative bg-white rounded-full p-8 shadow-xl">
                            <svg
                                className="w-32 h-32 text-[#071A83]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={1.5}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-3 bg-white text-[#071A83] border-2 border-[#071A83] rounded-lg font-semibold
                                   hover:bg-[#071A83] hover:text-white transition-all duration-300 
                                   transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg
                                   flex items-center gap-2 min-w-[180px] justify-center"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M10 19l-7-7m0 0l7-7m-7 7h18"
                            />
                        </svg>
                        <span>Retour</span>
                    </button>

                    <button
                        onClick={() => navigate('/')}
                        className="px-6 py-3 bg-gradient-to-r from-[#071A83] to-[#4c87af] text-white rounded-lg font-semibold
                                   hover:from-[#05145e] hover:to-[#3a6a8a] transition-all duration-300 
                                   transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg
                                   flex items-center gap-2 min-w-[180px] justify-center"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                            />
                        </svg>
                        <span>Page d'accueil</span>
                    </button>
                </div>

                {/* Additional help text */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                    <p className="text-sm text-gray-500">
                        Besoin d'aide ? Contactez l'administrateur ou retournez à la page d'accueil.
                    </p>
                </div>
            </div>

            {/* Background decorative elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
                <div className="absolute top-20 left-10 w-64 h-64 bg-[#4c87af] rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-[#071A83] rounded-full opacity-5 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-[#071A83] to-[#4c87af] rounded-full opacity-3 blur-3xl"></div>
            </div>
        </div>
    );
}
