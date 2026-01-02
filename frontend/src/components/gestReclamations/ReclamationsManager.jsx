// src/components/gestReclamations/ReclamationsManager.jsx
import React, { useState } from "react";

/**
 * ReclamationsManager
 * - Liste des réclamations de l'utilisateur (enseignant)
 * - Voir statut : 'pending' | 'accepted' | 'rejected'
 * - Cliquer sur la flèche déroule le détail (raison + message)
 *
 * Copie ce fichier à : src/components/gestReclamations/ReclamationsManager.jsx
 */

const sampleReclamations = [
  {
    id: 1,
    examen: "Algorithmique 1",
    date: "18/11/2025",
    heure: "8h30 - 10h00",
    statut: "pending",
    raison: "Maladie",
    message:
      "Bonsoir, suite au changement climatique j'ai attrapé froid, je ne pourrais pas assurer la surveillance, veuillez m'excuser. Merci.",
  },
  {
    id: 2,
    examen: "Algebre 1",
    date: "20/11/2025",
    heure: "13h30 - 15h00",
    statut: "accepted",
    raison: "Problème personnel",
    message:
      "Impossible d'être présent, demande acceptée par l'administration. Merci pour votre compréhension.",
  },
  {
    id: 3,
    examen: "Physique 1",
    date: "23/11/2025",
    heure: "11h00 - 12h30",
    statut: "rejected",
    raison: "Non justifié",
    message:
      "Réclamation refusée car information manquante. Merci de fournir un justificatif si vous souhaitez contester.",
  },{
    id: 3,
    examen: "Physique 1",
    date: "23/11/2025",
    heure: "11h00 - 12h30",
    statut: "rejected",
    raison: "Non justifié",
    message:
      "Réclamation refusée car information manquante. Merci de fournir un justificatif si vous souhaitez contester.",
  },{
    id: 3,
    examen: "Physique 1",
    date: "23/11/2025",
    heure: "11h00 - 12h30",
    statut: "rejected",
    raison: "Non justifié",
    message:
      "Réclamation refusée car information manquante. Merci de fournir un justificatif si vous souhaitez contester.",
  },{
    id: 3,
    examen: "Physique 1",
    date: "23/11/2025",
    heure: "11h00 - 12h30",
    statut: "rejected",
    raison: "Non justifié",
    message:
      "Réclamation refusée car information manquante. Merci de fournir un justificatif si vous souhaitez contester.",
  },{
    id: 3,
    examen: "Physique 1",
    date: "23/11/2025",
    heure: "11h00 - 12h30",
    statut: "rejected",
    raison: "Non justifié",
    message:
      "Réclamation refusée car information manquante. Merci de fournir un justificatif si vous souhaitez contester.",
  },{
    id: 3,
    examen: "Physique 1",
    date: "23/11/2025",
    heure: "11h00 - 12h30",
    statut: "rejected",
    raison: "Non justifié",
    message:
      "Réclamation refusée car information manquante. Merci de fournir un justificatif si vous souhaitez contester.",
  },{
    id: 3,
    examen: "Physique 1",
    date: "23/11/2025",
    heure: "11h00 - 12h30",
    statut: "rejected",
    raison: "Non justifié",
    message:
      "Réclamation refusée car information manquante. Merci de fournir un justificatif si vous souhaitez contester.",
  }
];

const StatusBadge = ({ statut }) => {
  const map = {
    pending: { label: "En attente", className: "bg-[#9E9E9E]" },
    accepted: { label: "Accepté", className: "bg-[#1FA12B]" },
    rejected: { label: "Refusé", className: "bg-[#C02727]" },
  };

  const s = map[statut] || map.pending;

  return (
    <span
      className={`${s.className} text-white px-3 py-[6px] rounded-full text-[13px] font-medium inline-block`}
      aria-label={`statut-${statut}`}
    >
      {s.label}
    </span>
  );
};

const ChevronDown = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const ChevronUp = ({ className = "" }) => (
  <svg className={`w-5 h-5 ${className}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  </svg>
);

const ReclamationRow = ({ item, expanded, onToggle }) => {
  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-between border-b border-[#E0E0E0] px-4 py-3 hover:bg-white transition-all duration-150">
        <div className="w-[28%] text-[14px] font-medium text-[#333333]">{item.examen}</div>
        <div className="w-[18%] text-[14px] text-[#333333]">{item.date}</div>
        <div className="w-[18%] text-[14px] text-[#333333]">{item.heure}</div>
        <div className="w-[18%] flex items-center justify-center">{<StatusBadge statut={item.statut} />}</div>
        <div className="w-[12%] flex items-center justify-end pr-2">
          <button
            onClick={() => onToggle(item.id)}
            className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-gray-100 transition-all duration-200"
            aria-label={`toggle-${item.id}`}
          >
            {expanded ? <ChevronUp /> : <ChevronDown />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="px-6 py-4 bg-[#F7F7F7] border-b border-[#E0E0E0]">
          <div className="bg-white rounded-md p-4 shadow-sm">
            <div className="mb-2 flex gap-4">
              <div className="w-[80px] text-[#6b6b6b] font-medium">Raison :</div>
              <div className="text-[14px]">{item.raison}</div>
            </div>
            <div className="flex gap-4">
              <div className="w-[80px] text-[#6b6b6b] font-medium">Message :</div>
              <div className="text-[14px] leading-relaxed">{item.message}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const ReclamationsManager = () => {
  const [items, setItems] = useState(sampleReclamations);
  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Optionnel : permet de simuler changement de statut (utile pour admin)
  const changeStatus = (id, newStatus) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, statut: newStatus } : p)));
  };

  return (
    <div className="reclamations-manager w-full">
      <div className="bg-white rounded-[8px] p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-[20px] font-bold font-nunito">Mes réclamations</h1>
            <p className="text-[13px] text-[#8b96a6] mt-1">{items.length} réclamation(s)</p>
          </div>
        </div>

        {/* Table header */}
        <div className="w-full rounded-t-[6px] bg-[#E9EFFF] px-4 py-3 border border-[#E0E0E0] flex items-center font-semibold text-[#555555]">
          <div className="w-[28%]">Examen</div>
          <div className="w-[18%]">Date</div>
          <div className="w-[18%]">Heure</div>
          <div className="w-[18%] text-center">Statut</div>
          <div className="w-[12%] text-right pr-2">Actions</div>
        </div>

        {/* Rows */}
        <div className="divide-y divide-[#E0E0E0]">
          {items.map((it) => (
            <ReclamationRow key={it.id} item={it} expanded={expandedId === it.id} onToggle={toggleExpand} />
          ))}
        </div>

        {/* Pagination placeholder */}
        <div className="mt-5 flex justify-end">
          <div className="pagination-exam flex items-center gap-2">
            <button className="w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 transition-all duration-300 cursor-pointer">
              <img src="/src/assets/icons/left-arrow.png" alt="prev" className="w-[12px] h-[12px]" />
            </button>
            <button className="w-[34px] h-[34px] bg-[#ECF0FF] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm border-2 border-[#3B679A]">1</button>
            <button className="w-[34px] h-[34px] bg-white rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 transition-all duration-300 cursor-pointer">2</button>
            <button className="w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 transition-all duration-300 cursor-pointer">
              <img src="/src/assets/icons/right-arrow.png" alt="next" className="w-[12px] h-[12px]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReclamationsManager;
