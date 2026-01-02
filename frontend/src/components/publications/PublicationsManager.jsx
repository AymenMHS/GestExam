// src/components/publications/PublicationsManager.jsx
import React, { useState, useMemo } from "react";
import { getUserRole } from "../../utils/user";
import TypeRow from "./TypeRow";
import CreatePublicationModal from "./modals/CreatePublicationModal";
import PreviewModal from "./modals/PreviewModal";
import ReclaimModal from "./modals/ReclaimModal";
import PostCard from "../PostCard";

/**
 * PublicationsManager (UI)
 * - main layout, gère l'état des modals et des niveaux
 * - Accessible seulement au "Chef Département"
 * - NOUVEAU: 2 onglets "Tous les publications" et "Planning prêt à publier"
 */

const btnAnim = "transition-all duration-200 ease-in-out hover:opacity-80 hover:-translate-y-[2px] active:translate-y-[1px]";

// --- Mock Data pour "Tous les publications" (similaire à HomePage) ---
// Idéalement, ceci viendrait d'une API/Contexte partagé
const POSTS_DATA = [
  {
    id: 1,
    category: "Examens",
    subCategory: "Master 1 - GL",
    time: "Il y a 5 heures",
    title: "Planning général des examens — Semeste 1",
    description: "Le planning officiel des examens (écrits) de la session du 10 au 25 janvier 2026.",
    fileName: "planning-exam.pdf",
  },
  {
    id: 2,
    category: "Examens",
    subCategory: "Master 1 - GL",
    time: "Il y a 5 heures",
    title: "Planning général des examens — Session Janvier 2026",
    description: "Le planning officiel des examens (écrits) de la session du 10 au 25 janvier 2026.",
    fileName: "planning-exam.pdf",
  },
  {
    id: 3,
    category: "Controle",
    subCategory: "Licence 2 - Info",
    time: "Il y a 1 jour",
    title: "Planning des contrôles continus — Semestre 1",
    description: "Dates des CC en programmation, architecture, algorithmes et réseaux.",
    fileName: "planning-cc.pdf",
  },
  {
    id: 5,
    category: "Annonce",
    subCategory: "Département",
    time: "Il y a 4 heures",
    title: "Prolongation de la date limite d’inscription",
    description: "Les étudiants peuvent s’inscrire jusqu’au 28 décembre 2025.",
    fileName: null,
  },
  {
    id: 7,
    category: "Annonce",
    subCategory: "Département",
    time: "Il y a 6 heures",
    title: "Décalage examens finaux",
    description: "Suite au récent événements, les examens seront decalé d'une semaine.",
    fileName: null,
  },
];

// --- Mock Data pour "Planning prêt à publier" ---
const SAMPLE_DATA = [
  {
    levelId: "M1-GL",
    label: "M1 - Génie Logiciel",
    types: [
      {
        id: "cc",
        label: "Contrôles Continus",
        exams: [
          { id: 1, title: "CC Algorithme", date: "2025-12-10", time: "09:00 - 10:30", room: "S1" },
          { id: 2, title: "CC Base de données", date: "2025-12-11", time: "13:00 - 14:30", room: "S2" },
        ],
      },
      {
        id: "ex",
        label: "Examens",
        exams: [{ id: 5, title: "Examen Projet", date: "2025-12-20", time: "09:00 - 12:00", room: "Amphi" }],
      },
    ],
  },
  {
    levelId: "L3-INF",
    label: "L3 - Informatique",
    types: [
      {
        id: "cc",
        label: "Contrôles Continus",
        exams: [{ id: 3, title: "CC Réseaux", date: "2025-12-08", time: "10:00 - 11:30", room: "S3" }],
      },
      {
        id: "rp",
        label: "Rattrapages",
        exams: [{ id: 4, title: "Rattrapage Algèbre", date: "2025-12-22", time: "14:00 - 16:00", room: "S4" }],
      },
    ],
  },
];

function downloadPlaceholderPDF(filename, textContent) {
  const blob = new Blob([textContent], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function PublicationsManager() {
  const currentRole = getUserRole();
  const allowed = currentRole === "Chef Département";

  // State for Tabs
  const [activeTab, setActiveTab] = useState("all"); // 'all' or 'planning'

  // State for Planning
  const [levels, setLevels] = useState(SAMPLE_DATA);
  const [expandedLevel, setExpandedLevel] = useState(null);

  // Modals
  const [createOpen, setCreateOpen] = useState(false);
  const [preview, setPreview] = useState({ open: false, lvl: null, type: null });
  const [reclaim, setReclaim] = useState({ open: false, lvl: null, type: null });

  const toggleExpand = (levelId) => setExpandedLevel(prev => (prev === levelId ? null : levelId));

  const onView = (lvl, type) => setPreview({ open: true, lvl, type });
  const onDownload = (lvl, type) => {
    const lines = [
      `Planning — ${lvl.label} / ${type.label}`,
      "-----------------------------------",
      ...type.exams.map(e => `${e.title} | ${e.date} | ${e.time} | ${e.room}`)
    ];
    downloadPlaceholderPDF(`${lvl.levelId}_${type.id}_planning.pdf`, lines.join("\n"));
  };
  const onReclaim = (lvl, type) => setReclaim({ open: true, lvl, type });

  const handleCreatePublication = (payload) => {
    console.log("Création publication (simulée)", payload);
    if (payload.target && payload.target !== "Tous") {
      setLevels(prev => prev.map(l => l.label === payload.target ? {
        ...l,
        types: [{ id: `ann-${Date.now()}`, label: `${payload.type} (nouveau)`, exams: [] }, ...l.types]
      } : l));
    }
  };

  const handleSendReclaim = (data) => {
    console.log("Réclamation envoyée (simulée)", data);
    alert("Réclamation envoyée au planificateur (simulation).");
  };

  const totalTypes = useMemo(() => levels.reduce((s, l) => s + l.types.length, 0), [levels]);

  if (!allowed) {
    return (
      <div className="w-full">
        <div className="bg-white p-6 rounded-md shadow-sm">
          <h2 className="font-nunito font-bold text-lg">Publications</h2>
          <p className="text-sm text-gray-500 mt-2">
            Accès réservé : Chef département.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="bg-white rounded-[10px] p-5 shadow-sm">

        {/* Header avec Titre et Bouton Create */}
        <div className="flex items-center justify-between mb-5">
          <h1 className="font-nunito font-extrabold text-2xl">Gestion des publications</h1>
          <button
            className={`px-4 py-2 rounded-md bg-[#071A83] text-white font-medium ${btnAnim}`}
            onClick={() => setCreateOpen(true)}
          >
            + Créer une publication
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-6 mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 text-[16px] font-semibold font-nunito transition-all ${activeTab === "all"
                ? "text-[#071A83] border-b-2 border-[#071A83]"
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            Tous les publications
          </button>
          <button
            onClick={() => setActiveTab("planning")}
            className={`pb-3 text-[16px] font-semibold font-nunito transition-all ${activeTab === "planning"
                ? "text-[#071A83] border-b-2 border-[#071A83]"
                : "text-gray-400 hover:text-gray-600"
              }`}
          >
            Planning prêt à publier
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "all" && (
          <div className="space-y-4 animate-fadeIn">
            {POSTS_DATA.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
            {POSTS_DATA.length === 0 && (
              <p className="text-gray-500 text-center py-10">Aucune publication trouvée.</p>
            )}
          </div>
        )}

        {activeTab === "planning" && (
          <div className="space-y-3 animate-fadeIn">
            <div className="mb-2">
              <p className="text-xs text-gray-500">{levels.length} niveaux • {totalTypes} types</p>
            </div>
            {levels.map(lvl => (
              <div key={lvl.levelId} className="border rounded-[10px] overflow-hidden">
                <div
                  className="flex items-center justify-between px-4 py-3 bg-[#F7FAFF] cursor-pointer hover:bg-[#eef6ff] transition"
                  onClick={() => toggleExpand(lvl.levelId)}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-[56px] h-[56px] rounded-[10px] bg-[#000E6C] flex items-center justify-center text-white font-nunito font-semibold">
                      {lvl.label.split(" ")[0]}
                    </div>
                    <div>
                      <div className="font-nunito font-bold">{lvl.label}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-2xl text-gray-400">{expandedLevel === lvl.levelId ? "▲" : "▼"}</div>
                  </div>
                </div>

                {expandedLevel === lvl.levelId && (
                  <div className="p-4 bg-white space-y-3">
                    <div className="flex flex-col gap-3">
                      {lvl.types.map(t => (
                        <TypeRow
                          key={t.id}
                          lvl={lvl}
                          type={t}
                          onView={onView}
                          onDownload={onDownload}
                          onReclaim={onReclaim}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      <CreatePublicationModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        onCreate={handleCreatePublication}
        levels={levels}
      />
      <PreviewModal
        open={preview.open}
        onClose={() => setPreview({ open: false, lvl: null, type: null })}
        lvl={preview.lvl || {}}
        type={preview.type || {}}
      />
      <ReclaimModal
        open={reclaim.open}
        onClose={() => setReclaim({ open: false, lvl: null, type: null })}
        lvl={reclaim.lvl || {}}
        type={reclaim.type || {}}
        onSend={handleSendReclaim}
      />
    </div>
  );
}
