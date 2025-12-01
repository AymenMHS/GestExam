// src/components/gestModule/ModuleList.jsx
import React, { useState } from "react";
import ModuleCard from "./ModuleCard";
import ModuleModal from "./ModuleModal";

const samplePromos = [
  {
    id: 1,
    label: "L1",
    title: "Licence 1 - Informatique",
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
  },

  {
    id: 3,
    label: "L3",
    title: "Licence 3 - Informatique",
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
  },

  {
    id: 3,
    label: "L3",
    title: "Licence 3 - Informatique",
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

function ModuleList() {
  const initialPromos = samplePromos;
  const [promos, setPromos] = useState(initialPromos);
  const [filter, setFilter] = useState("all");
  const [editingPromo, setEditingPromo] = useState(null);

  const openEditModal = (promo) => setEditingPromo(promo);
  const closeEditModal = () => setEditingPromo(null);
  const savePromo = (updatedPromo) => {
    setPromos((prev) => prev.map(p => p.id === updatedPromo.id ? updatedPromo : p));
    closeEditModal();
  };

  const filtered = filter === "all" ? promos : promos.filter(p => p.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="flex justify-center items-start w-full h-full min-h-0 p-2">
      <div className="w-full max-w-[1100px] h-full">
        <div className="w-full rounded-[8px] shadow-md p-0 flex flex-col h-full">
          {/* header */}
          <div className="w-full flex flex-col items-center bg-[rgba(58,103,155,0.4)] rounded-[8px] p-2 mb-2 text-center">
            <img src="/src/assets/icons/module1.png" alt="module" className="w-4 h-4 mb-1" />
            <h1 className="font-nunito font-extrabold text-[18px] text-black">ANNÉE UNIVERSITAIRE 2025 / 2026</h1>
            <p className="text-xs text-black">Département informatique</p>
          </div>

          {/* filtre */}
          <div className="w-full flex justify-end mb-2 px-1">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-[200px] h-[32px] rounded-[6px] bg-[#E1E1E1] px-2 text-sm font-nunito shadow-sm"
            >
              <option value="all">Toutes les niveau d'études</option>
              <option value="licence 1 - informatique">Licence 1 - Informatique</option>
              <option value="licence 2 - informatique">Licence 2 - Informatique</option>
              <option value="licence 3 - informatique">Licence 3 - Informatique</option>
            </select>
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
          </div>
        </div>
      </div>

      {/* modal d'édition */}
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
