import React from "react";

const FilterBarTeachers = ({ search, onSearchChange, statut, onStatutChange, onAdd }) => {
  return (
    <div className="filter-teacher w-full flex items-center justify-between mb-4">
      <div className="flex items-center gap-3 flex-grow">
        {/* Search Input */}
        <input
          value={search}
          onChange={onSearchChange}
          type="text"
          placeholder="Rechercher un enseignant..."
          className="w-[250px] h-[38px] bg-[#F2F2F2] rounded-[6px] pl-3 text-[14px] font-nunito focus:outline-none focus:ring-1 focus:ring-[#3B679A]"
        />

        {/* Status Dropdown */}
        <select
          value={statut}
          onChange={onStatutChange}
          className="w-[180px] h-[38px] bg-[#E5E7EB] rounded-[6px] px-3 text-[14px] font-nunito focus:outline-none cursor-pointer text-[#333]"
        >
          <option value="">Tous les statuts</option>
          <option value="Actif">Actif</option>
          <option value="En congé">En congé</option>
          <option value="Inactif">Inactif</option>
        </select>
      </div>

      {/* Add Button */}
      <button
        onClick={onAdd}
        className="bg-[#003366] h-[38px] px-4 rounded-[6px] text-white text-[14px] font-bold font-nunito flex items-center gap-2 hover:opacity-90 hover:-translate-y-1 transition-all duration-300 active:translate-y-1 shadow-md"
      >
        <span className="text-[18px] font-light">+</span> Ajouter un Enseignant
      </button>
    </div>
  );
};

export default FilterBarTeachers;