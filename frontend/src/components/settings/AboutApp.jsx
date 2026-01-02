// src/components/settings/AboutApp.jsx
import React from "react";

const AboutApp = () => {
return (
    <div className="h-full flex flex-col gap-4">
        <div className="bg-[#f9f9fb] rounded-md p-4 shadow-sm">
            <h3 className="font-nunito font-bold text-[16px]">À propos de l'application</h3>
            <p className="text-sm text-gray-600 mt-2">
                Cette application a été développée dans le cadre de Master 1 Génie Logiciel.
                Elle permet la planification et la gestion des examens, des promotions/modules, des étudiants et enseignants.
            </p>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <p className="text-xs text-gray-400">Développé par</p>
                    <p className="font-semibold text-sm">
                        Hadj Slimane Mohammed Aymen<br/>
                        Mekidiche Mohamed Hichem<br/>
                        Salhi Zakarya<br/>
                        Gourari Acem Soulyman<br/>
                        Yahiaoui Djaber
                    </p>
                </div>

                <div>
                    <p className="text-xs text-gray-400">Version</p>
                    <p className="font-semibold">v1.0.0</p>
                </div>

                <div>
                    <p className="text-xs text-gray-400">Niveau</p>
                    <p className="font-semibold">Master 1 - Génie Logiciel</p>
                </div>
            </div>
        </div>
    </div>
);
};

export default AboutApp;
