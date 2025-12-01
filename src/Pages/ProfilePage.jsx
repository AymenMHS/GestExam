import React from "react";

const ProfilePage = () => {
  return (
    <div className="min-h-[80vh] bg-[#E3F0FF] p-2">
      {/* Main full-width card */}
      <div className="w-full bg-white rounded-[16px] shadow-lg md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/src/assets/icons/omar.png"
              alt="Profile"
              className="w-20 h-20 md:w-24 md:h-24 rounded-full"
            />
            <div className="text-left">
              <p className="text-gray-400 text-sm mb-1">Chef département</p>
              <h1 className="text-[#234a78] font-extrabold text-xl md:text-2xl leading-tight">
                Matallah Hocine
              </h1>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-end">
            <button className="flex items-center gap-2.5 px-4 py-2 rounded-lg border border-[#d6deea] bg-white text-[#234a78] font-semibold text-sm shadow-sm hover:bg-[#234a78] hover:text-white transition-all">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Modifier le profil
            </button>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#f0f7ff] p-3 rounded-xl shadow-sm">
            <p className="text-gray-400 text-xs mb-1">Adresse mail</p>
            <p className="text-[#234a78] font-bold text-sm truncate">
              Matallahhocine21@gmail.com
            </p>
          </div>

          <div className="bg-[#f0f7ff] p-3 rounded-xl shadow-sm">
            <p className="text-gray-400 text-xs mb-1">Spécialité</p>
            <p className="text-[#234a78] font-bold text-sm">Informatique</p>
          </div>

          <div className="bg-[#f0f7ff] p-3 rounded-xl shadow-sm">
            <p className="text-gray-400 text-xs mb-1">Résidence</p>
            <p className="text-[#234a78] font-bold text-sm">Tlemcen</p>
          </div>
        </div>

        {/* Bio area inspired by the screenshot */}
        <div className="mt-6">
          <div className="relative bg-[#274e7a] rounded-xl p-4 md:p-5 text-white shadow-md overflow-hidden">
            {/* small left label like screenshot */}
            <div className=" text-white font-semibold text-xl py-1 rounded-md">
              Bio
            </div>

            <div className="mt-3">
              <p className="text-[13px] leading-relaxed">
                Je suis chef du département d'informatique à l'Université de
                Tlemcen. Passionné par les nouvelles technologies et
                l'innovation pédagogique, je veille à garantir la qualité de
                l'enseignement et à encourager la collaboration entre
                enseignants, étudiants et chercheurs.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
