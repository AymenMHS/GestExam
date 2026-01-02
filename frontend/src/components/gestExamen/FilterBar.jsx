import React from "react";

const FilterBar = ({ onAdd }) => {
  return (
    <div className="filter-exam w-full flex flex-wrap items-center justify-between gap-2">
      <input
        type="text"
        placeholder="Rechercher un examen..."
        className="flex-grow min-w-[140px] max-w-[360px] bg-[#F2F2F2] rounded-[8px] pl-2 py-1 text-[14px] font-nunito shadow-sm"
      />

      <select className="min-w-[140px] max-w-[220px] bg-[#F2F2F2] rounded-[8px] pl-2 pr-2 py-1 text-[14px] font-nunito shadow-sm">
        <option className="text-[rgb(180,180,180)]">--Niveau d'etude--</option>
        <option>L1 - Informatique</option>
        <option>L2 - Informatique</option>
        <option>L3 - Informatique</option>
        <option>M1</option>
        <option>M2</option>
      </select>

      <select className="min-w-[140px] max-w-[220px] bg-[#F2F2F2] rounded-[8px] pl-2 pr-2 py-1 text-[14px] font-nunito shadow-sm">
        <option className="text-[rgb(180,180,180)]">--Type d'examen--</option>
        <option>Controle Continu</option>
        <option>Remplacement CC</option>
        <option>Test TP</option>
        <option>Examen Final</option>
        <option>Remplacement Examen</option>
        <option>Rattrapage</option>
      </select>

      <button
        onClick={onAdd}
        className="min-w-[100px] bg-[#3B679A] rounded-[8px] text-white text-[14px] font-nunito flex items-center justify-center gap-2 py-1 px-2 shadow-sm cursor-pointer hover:opacity-80 hover:-translate-y-1 active:translate-y-1 transition-all duration-300"
      >
        <img src="/src/assets/icons/plus1.png" alt="Ajouter" className="w-[16px] h-[16px]" />
        Ajouter un examen
      </button>
    </div>
  );
};

export default FilterBar;
