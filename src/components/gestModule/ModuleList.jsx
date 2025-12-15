// src/components/gestModule/ModuleList.jsx
import React, { useState, useMemo } from "react";
import ModuleCard from "./ModuleCard";
import ModuleModal from "./ModuleModal";

/* samplePromos (inchangé sauf academicYear présent) */
const samplePromos = [
  {
    id: 1,
    label: "L1",
    title: "Licence 1 - Informatique",
    academicYear: 2025,
    modulesS1: [
      { name: "Algorithmique et programmation", coef: 3 },
      { name: "Mathématiques discrètes", coef: 3 },
      { name: "Introduction aux systèmes d'exploitation", coef: 3 },
      { name: "Architecture des ordinateurs", coef: 3 },
      { name: "Introduction aux bases de données", coef: 3 },
      { name: "Logique numérique", coef: 2 },
      { name: "Anglais technique", coef: 1 }
    ],
    modulesS2: [
      { name: "Structures de données", coef: 3 },
      { name: "Programmation orientée objet", coef: 3 },
      { name: "Systèmes d'exploitation avancés", coef: 3 }
    ],
    modulesCount: 16,
    students: 300
  },
  {
    id: 2,
    label: "L2",
    title: "Licence 2 - Informatique",
    academicYear: 2024,
    modulesS1: [
      { name: "Structures de données avancées", coef: 3 },
      { name: "Mathématiques pour l'informatique", coef: 3 }
    ],
    modulesS2: [
      { name: "Systèmes d'exploitation", coef: 3 },
      { name: "Ingénierie logicielle", coef: 3 }
    ],
    modulesCount: 12,
    students: 210
  },
  {
    id: 3,
    label: "L3",
    title: "Licence 3 - Informatique",
    academicYear: 2025,
    modulesS1: [
      { name: "Bases de données distribuées", coef: 3 },
      { name: "Intelligence artificielle (intro)", coef: 3 }
    ],
    modulesS2: [
      { name: "Programmation concurrente", coef: 3 },
      { name: "Apprentissage automatique (ML)", coef: 3 }
    ],
    modulesCount: 11,
    students: 240
  }
];

function formatAcademicLabel(yearStart) {
  if (!yearStart) return "";
  return `${yearStart} / ${Number(yearStart) + 1}`;
}

function ModuleList() {
  const initialPromos = samplePromos;
  const [promos, setPromos] = useState(initialPromos);
  const [filter, setFilter] = useState("all");

  const defaultYear = useMemo(() => {
    const yrs = promos.map(p => p.academicYear).filter(Boolean);
    return yrs.length ? Math.max(...yrs) : new Date().getFullYear();
  }, [promos]);

  const [selectedYear, setSelectedYear] = useState(defaultYear.toString());
  const [editingPromo, setEditingPromo] = useState(null);

  const openEditModal = (promo) => setEditingPromo(promo);
  const closeEditModal = () => setEditingPromo(null);

  // save (update if exists, otherwise add)
  const savePromo = (updatedPromo) => {
    setPromos((prev) => {
      const exists = prev.some(p => p.id === updatedPromo.id);
      if (exists) return prev.map(p => (p.id === updatedPromo.id ? updatedPromo : p));
      return [...prev, updatedPromo];
    });
    closeEditModal();
  };

  // années proposées (ex: 2020..current+1)
  const yearsOptions = useMemo(() => {
    const current = new Date().getFullYear();
    const min = 2020;
    const max = Math.max(current + 1, defaultYear + 1);
    const arr = [];
    for (let y = max; y >= min; y--) arr.push(y);
    return arr;
  }, [defaultYear]);

  const filtered = useMemo(() => {
    return promos.filter(p => {
      const matchesFilter = filter === "all" ? true : p.title.toLowerCase().includes(filter.toLowerCase());
      const matchesYear = selectedYear === "all" ? true : (p.academicYear && String(p.academicYear) === String(selectedYear));
      return matchesFilter && matchesYear;
    });
  }, [promos, filter, selectedYear]);

  // create new promo handler
  const handleCreatePromo = () => {
    const newId = Date.now(); // simple unique id
    const newPromo = {
      id: newId,
      label: "",
      title: "",
      specialty: "",
      academicYear: Number(selectedYear) || defaultYear,
      modulesS1: [],
      modulesS2: [],
      modulesCount: 0,
      students: 0
    };
    setEditingPromo(newPromo);
  };

  return (
    <div className="flex justify-center items-start w-full h-full min-h-0 p-2">
      <div className="w-full max-w-[1100px] h-full">
        <div className="w-full rounded-[8px] shadow-md p-0 flex flex-col h-full">
          {/* header */}
          <div className="w-full flex items-center justify-between bg-[rgba(58,103,155,0.4)] rounded-[8px] p-2 mb-2">
            <div className="flex items-center gap-3">
              <img src="/src/assets/icons/module1.png" alt="module" className="w-4 h-4" />
              <div>
                <h1 className="font-nunito font-extrabold text-[18px] text-black">
                  ANNÉE UNIVERSITAIRE {selectedYear === "all" ? "" : formatAcademicLabel(Number(selectedYear))}
                </h1>
                <p className="text-xs text-black">Département informatique</p>
              </div>
            </div>

            {/* controls: year select, filter, add button */}
            <div className="flex items-center gap-2">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-[180px] h-[32px] rounded-[6px] bg-[#E1E1E1] px-2 text-sm font-nunito shadow-sm"
                aria-label="Sélectionner année académique"
              >
                <option value="all">Toutes les années</option>
                {yearsOptions.map((y) => (
                  <option key={y} value={y}>
                    {formatAcademicLabel(y)}
                  </option>
                ))}
              </select>

              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-[220px] h-[32px] rounded-[6px] bg-[#E1E1E1] px-2 text-sm font-nunito shadow-sm"
                aria-label="Filtrer niveau"
              >
                <option value="all">Toutes les niveau d'études</option>
                <option value="licence 1 - informatique">Licence 1 - Informatique</option>
                <option value="licence 2 - informatique">Licence 2 - Informatique</option>
                <option value="licence 3 - informatique">Licence 3 - Informatique</option>
              </select>

              <button
                onClick={handleCreatePromo}
                className="h-[32px] px-3 rounded-[6px] bg-[#28a745] text-white text-sm font-nunito flex items-center gap-2 shadow-sm"
                title="Ajouter une nouvelle promo"
              >
                <img src="/src/assets/icons/plus1.png" alt="ajouter" className="w-4 h-4" />
                Ajouter une promo
              </button>
            </div>
          </div>

          {/* liste */}
          <div className="w-full flex-1 overflow-auto p-2 flex flex-col gap-2">
            {filtered.map((p) => (
              <ModuleCard
                key={p.id}
                promo={p}
                onEdit={() => openEditModal(p)}
                onDelete={() => setPromos(prev => prev.filter(item => item.id !== p.id))}
              />
            ))}

            {filtered.length === 0 && (
              <div className="p-4 text-sm text-[#666] bg-white rounded shadow-sm">
                Aucune promo pour {selectedYear === "all" ? "la sélection actuelle" : formatAcademicLabel(Number(selectedYear))}.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* modal d'édition/création */}
      {editingPromo && (
        <ModuleModal
          isOpen={Boolean(editingPromo)}
          promo={editingPromo}
          onClose={closeEditModal}
          onSave={savePromo}
        />
      )}
    </div>
  );
}

export default ModuleList;
