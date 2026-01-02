import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-[#003366] mt-12 py-12">
            <div className="w-5/6 mx-auto">
                <div className="flex justify-between items-start text-white mb-8">
                    <div className="flex items-start gap-4">
                        <img
                            className="w-60"
                            src="/public/univ-logo.png"
                            alt="univ-logo"
                        />
                    </div>
                    <div className="text-left text-2xl">
                        <p>Platform De Gestion Des Examens</p>
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold mb-3">DASHBOARD</p>
                        <p className="text-sm mb-2 cursor-pointer hover:underline">
                            CALENDRIER
                        </p>
                        <p className="text-sm cursor-pointer hover:underline">PROFIL</p>
                    </div>
                </div>
                <div className="border-t border-[#004080] my-6"></div>
                <div className="text-center text-white text-xs">
                    <p className="mb-1">POWERED BY - -------</p>
                    <p>Copyright ©. Tout droit réservé</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;