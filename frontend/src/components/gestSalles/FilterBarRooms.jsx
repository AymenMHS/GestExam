import React from "react";

const FilterBarRooms = ({ search, onSearchChange, type, onTypeChange, onAdd, onImportClick }) => {
  return (
    <div className="filter-room w-full flex items-center justify-between mb-5">
      <div className="flex items-center gap-3">
        <input
          value={search}
          onChange={onSearchChange}
          type="text"
          placeholder="Rechercher une salle..."
          className="w-[280px] h-[40px] bg-[#F2F2F2] rounded-[8px] pl-3 text-[14px] font-nunito shadow-sm focus:outline-none focus:ring-1 focus:ring-[#3B679A]"
        />
        <select
          value={type}
          onChange={onTypeChange}
          className="w-[200px] h-[40px] bg-[#E5E5E5] rounded-[8px] px-3 text-[14px] font-nunito shadow-sm focus:outline-none cursor-pointer text-[#555]"
        >
          <option value="">Type de salle</option>
          <option value="amphi">Amphi</option>
          <option value="salle">Salle de TD</option>
          <option value="labo">Laboratoire</option>
        </select>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onImportClick}
          className="bg-[#0b5bd7] h-[40px] px-4 rounded-[8px] text-white text-[14px] font-bold font-nunito flex items-center gap-2 hover:-translate-y-1 transition shadow-md"
        >
          <img src="/src/assets/icons/importer1.png" alt="import" className="w-[16px] h-[16px]" />
          Importer (Excel)
        </button>

        <button
          onClick={onAdd}
          className="bg-[#003366] h-[40px] px-5 rounded-[8px] text-white text-[14px] font-bold font-nunito flex items-center gap-2 hover:-translate-y-1 transition-all duration-300 shadow-md active:translate-y-1"
        >
          <span className="text-[20px] font-light leading-none pb-1">+</span> Ajouter une Salle
        </button>
      </div>
    </div>
  );
};

export default FilterBarRooms;
