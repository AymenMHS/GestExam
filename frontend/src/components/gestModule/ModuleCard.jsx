// src/components/gestModule/ModuleCard.jsx
import React, { useState } from "react";
import ModalAutoPlanExam from "./ModalAutoPlanExam";

function ModuleCard({ promo, onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const [openAuto, setOpenAuto] = useState(false);

  return (
    <div className={`w-full rounded-[8px] bg-[#F5F5F5] shadow-sm p-2 flex flex-col gap-2 ${!open ? "" : "bg-[#f3f3f3]"}`}>
      <div className="flex flex-row items-center gap-2 flex-wrap">
        <div className="w-[56px] h-[56px] rounded-[8px] bg-[#000E6C] flex items-center justify-center">
          <h1 className="text-white font-nunito font-semibold text-[20px]">{promo.label}</h1>
        </div>

        <div className="flex-1 flex flex-col justify-center items-start pl-2">
          <h2 className="font-nunito font-bold text-[18px]">{promo.title}</h2>
          <hr className="w-1/2 h-[1px] bg-[#d6d6d6] border-none my-1" />
          <p className="text-xs">
            <b>{promo.modulesCount}</b> Modules - <b>{promo.students}</b> Étudiants
          </p>
        </div>

        <div className="w-[300px] h-[32px] flex items-center justify-end gap-2">
          <button
            onClick={() => setOpenAuto(true)}
            className="h-[32px] px-2 py-1 rounded-[6px] bg-[#4c87af] text-white text-xs flex items-center
                      transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]"
          >
            <img src="/src/assets/icons/calendrier.png" alt="" className="w-3 h-3 mr-1" />
            Planifié automatiquement
          </button>

          <button
            onClick={onEdit}
            className="w-[32px] h-[32px] rounded-[6px] bg-green-600 flex items-center justify-center
                       transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]"
            aria-label="éditer"
          >
            <img src="/src/assets/icons/editer1.png" alt="edit" className="w-3 h-3" />
          </button>

          <button
            onClick={onDelete}
            className="w-[32px] h-[32px] rounded-[6px] bg-red-600 flex items-center justify-center
                       transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]"
            aria-label="supprimer"
          >
            <img src="/src/assets/icons/supprimer1.png" alt="delete" className="w-3 h-3" />
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="w-[32px] h-[32px] rounded-[6px] bg-transparent flex items-center justify-center
                       transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]"
            aria-label="toggle"
          >
            <img
              src="/src/assets/icons/arrow-down.png"
              alt="toggle"
              className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
            />
          </button>
        </div>
      </div>
      {openAuto && (
        <ModalAutoPlanExam
          isOpen={openAuto}
          onClose={() => setOpenAuto(false)}
          promo={promo}
        />
      )}

      {/* content plus d'info */}
      {open && (
        <div className="w-full flex gap-3">
          <div className="w-1/2 bg-white rounded-[8px] p-2 border border-[#a3a3a3]">
            <h3 className="font-nunito font-bold text-[16px] mb-1">Modules semestre 1</h3>
            <ul className="space-y-1 text-sm">
              {promo.modulesS1.map((m, i) => (
                <li key={i} className="flex justify-between">
                  <p className="text-xs">{m.name}</p>
                  <p className="text-xs">Coef : {m.coef}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-1/2 bg-white rounded-[8px] p-2 border border-[#a3a3a3]">
            <h3 className="font-nunito font-bold text-[16px] mb-1">Modules semestre 2</h3>
            <ul className="space-y-1 text-sm">
              {promo.modulesS2.map((m, i) => (
                <li key={i} className="flex justify-between">
                  <p className="text-xs">{m.name}</p>
                  <p className="text-xs">Coef : {m.coef}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModuleCard;
