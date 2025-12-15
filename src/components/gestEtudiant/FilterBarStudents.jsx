import React from "react";

const FilterBarStudents = ({
  search,
  onSearchChange,
  niveau,
  onNiveauChange,
  groupe,
  onGroupeChange,
  onImport,
  onAdd,
  showGroupSelect = true,
  groupesOptions = []
}) => {
  return (
    <div className="filter-student w-full flex flex-wrap items-center justify-between gap-2">
      <input
        value={search}
        onChange={onSearchChange}
        type="text"
        placeholder="Rechercher un étudiant..."
        className="flex-grow min-w-[140px] max-w-[360px] bg-[#F2F2F2] rounded-[8px] pl-2 py-1 text-[14px] font-nunito shadow-sm"
      />

      <select
        value={niveau}
        onChange={onNiveauChange}
        className="min-w-[140px] max-w-[220px] bg-[#F2F2F2] rounded-[8px] pl-2 pr-2 py-1 text-[14px] font-nunito shadow-sm"
      >
        <option className="text-[rgb(180,180,180)]" value="">--Niveau d'etude--</option>
        <option value="L1">L1 - Informatique</option>
        <option value="L2">L2 - Informatique</option>
        <option value="L3">L3 - Informatique</option>
        <option value="M1">M1</option>
        <option value="M2">M2</option>
      </select>

      {showGroupSelect && (
        <select
          value={groupe}
          onChange={onGroupeChange}
          className="min-w-[140px] max-w-[220px] bg-[#F2F2F2] rounded-[8px] pl-2 pr-2 py-1 text-[14px] font-nunito shadow-sm"
        >
          <option className="text-[rgb(180,180,180)]" value="">--Groupe--</option>
          {groupesOptions.map((g, idx) => (
            <option key={idx} value={g}>{g}</option>
          ))}
        </select>
      )}

      <div className="flex items-center gap-2">
        <button
          onClick={onImport}
          className="min-w-[140px] bg-[#6B7280] rounded-[8px] text-white text-[14px] font-nunito flex items-center justify-center gap-2 py-1 px-2 shadow-sm cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
        >
          <img src="/src/assets/icons/importer.png" alt="Importer" className="w-[16px] h-[16px] invert" />
          Importer (Excel)
        </button>

        <button
          onClick={onAdd}
          className="min-w-[140px] bg-[#3B679A] rounded-[8px] text-white text-[14px] font-nunito flex items-center justify-center gap-2 py-1 px-2 shadow-sm cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
        >
          <img src="/src/assets/icons/plus1.png" alt="Ajouter" className="w-[16px] h-[16px]" />
          Ajouter un étudiant
        </button>
      </div>
    </div>
  );
};

export default FilterBarStudents;
