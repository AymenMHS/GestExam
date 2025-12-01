import React from 'react'

const Statistic = () => {
  return (
    <>
       <div className="flex-1 h-full bg-[#E3F0FF] p-6 overflow-auto">
      {/* container-main (tailwind) */}
      <div className="mt-2 flex justify-center">
        <div className="w-[95%] bg-[#EFF1F3] rounded-xl shadow-lg p-4 overflow-auto">
          {/* header-dashboard */}
          <div className="w-full h-24 md:h-20 flex items-center bg-gray-200 rounded-lg p-4 mb-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-md flex items-center justify-center mr-4">
              <img src="src/assets/icons/accueil.png" alt="home" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </div>
            <div className="title-dashboard">
              <h1 className="text-xl md:text-2xl font-bold leading-tight">Tableau de bord</h1>
              <p className="text-sm md:text-base text-[#3B679A]">Département Informatique</p>
            </div>
          </div>

          {/* stats-dashboard */}
          <div className="w-full bg-white rounded-lg p-4 flex flex-col md:flex-row gap-4 items-stretch h-[300px] md:h-[300px]">
            {/* column 1 */}
            <div className="flex-1 flex flex-col gap-4 items-center">
              <div className="w-full h-[140px] rounded-lg flex flex-col items-center justify-center font-semibold text-black bg-green-200/60">
                <h2 className="text-lg md:text-base mb-2">Salle réservée</h2>
                <div className="w-3/5 h-14 rounded-full bg-white/60 flex items-center justify-center text-lg font-bold shadow">
                  34
                </div>
              </div>

              <div className="w-full h-[140px] rounded-lg flex flex-col items-center justify-center font-semibold text-black bg-orange-200/60">
                <h2 className="text-lg md:text-base mb-2">Enseignants disponible</h2>
                <div className="w-3/5 h-14 rounded-full bg-white/60 flex items-center justify-center text-lg font-bold shadow">
                  50
                </div>
              </div>
            </div>

            {/* column 2 */}
            <div className="flex-1 flex flex-col gap-4 items-center">
              <div className="w-full h-[140px] rounded-lg flex flex-col items-center justify-center font-semibold text-black bg-sky-200/60">
                <h2 className="text-lg md:text-base mb-2">Enseignants planifiés</h2>
                <div className="w-3/5 h-14 rounded-full bg-white/60 flex items-center justify-center text-lg font-bold shadow">
                  82
                </div>
              </div>

              <div className="w-full h-[140px] rounded-lg flex flex-col items-center justify-center font-semibold text-black bg-yellow-200/60">
                <h2 className="text-lg md:text-base mb-2">Étudiants inscrits</h2>
                <div className="w-3/5 h-14 rounded-full bg-white/60 flex items-center justify-center text-lg font-bold shadow">
                  1621
                </div>
              </div>
            </div>

            {/* column 3 (tall card) */}
            <div className="flex-1 flex flex-col gap-4 items-center">
              <div className="w-full h-[285px] md:h-full rounded-lg flex flex-col items-center justify-center font-semibold text-black bg-neutral-600/30">
                <h2 className="text-lg md:text-base mb-2">Examens planifiés</h2>
                <div className="w-3/5 h-14 rounded-full bg-white/60 flex items-center justify-center text-lg font-bold shadow">
                  68
                </div>

                <div className="mt-4 w-11/12 text-xs text-gray-700 text-center">
                  <p className="mb-1">Prochaine session : 12/12/2025</p>
                </div>
              </div>
            </div>
          </div>
          {/* end stats-dashboard */}
        </div>
      </div>
      {/* end container-main */}
    </div>
    </>
  )
}

export default Statistic
