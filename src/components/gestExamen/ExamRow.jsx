import React from "react";

const ExamRow = ({ examen, onView, onEdit }) => {
  return (
    <div className="tr-table w-full flex items-center justify-between border-b border-[#E0E0E0]">
      <div className="td-table w-[12%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{examen.code}</div>
      <div className="td-table w-[24%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{examen.niveau}</div>
      <div className="td-table w-[18%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{examen.module}</div>
      <div className="td-table w-[14%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{examen.type}</div>
      <div className="td-table w-[10%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{examen.date}</div>
      <div className="td-table w-[10%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{examen.horaire}</div>
      <div className="td-table w-[12%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2 flex items-center justify-center gap-1">
        <button
          onClick={onView}
          className="w-[26px] h-[26px] rounded-[6px] text-white text-[11px] font-nunito shadow-sm border-none flex justify-center items-center bg-[#1d599c] cursor-pointer hover:opacity-80 hover:-translate-y-1 active:translate-y-1 transition-all duration-300"
          title="Voir"
        >
          <img src="/src/assets/icons/voir1.png" alt="Voir" className="w-[12px] h-[12px]" />
        </button>

        <button
          onClick={onEdit}
          className="w-[26px] h-[26px] rounded-[6px] text-white text-[11px] font-nunito shadow-sm border-none flex justify-center items-center bg-[#289c1d] cursor-pointer hover:opacity-80 hover:-translate-y-1 active:translate-y-1 transition-all duration-300"
          title="Éditer"
        >
          <img src="/src/assets/icons/editer1.png" alt="Éditer" className="w-[12px] h-[12px]" />
        </button>

        <button
          className="w-[26px] h-[26px] rounded-[6px] text-white text-[11px] font-nunito shadow-sm border-none flex justify-center items-center bg-[#9c1d1d] cursor-pointer hover:opacity-80 hover:-translate-y-1 active:translate-y-1 transition-all duration-300"
          title="Supprimer"
        >
          <img src="/src/assets/icons/supprimer1.png" alt="Supprimer" className="w-[12px] h-[12px]" />
        </button>
      </div>
    </div>
  );
};

export default ExamRow;
