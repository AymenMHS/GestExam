// src/components/publications/PublicationsManager.jsx
import React, { useState, useMemo } from "react";
import { getUserRole } from "../../utils/user";
import TypeRow from "./TypeRow";
import CreatePublicationModal from "./modals/CreatePublicationModal";
import PreviewModal from "./modals/PreviewModal";
import ReclaimModal from "./modals/ReclaimModal";

/**
 * PublicationsManager (UI)
 * - main layout, gère l'état des modals et des niveaux
 * - accessible seulement au "Chef Département"
 */

const btnAnim = "transition-all duration-200 ease-in-out hover:opacity-80 hover:-translate-y-[2px] active:translate-y-[1px]";

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

  const [levels, setLevels] = useState(SAMPLE_DATA);
  const [expandedLevel, setExpandedLevel] = useState(null);

  // modals
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
        <div className="flex items-center justify-between mb-5">
          <div>
            <h1 className="font-nunito font-extrabold text-2xl">Gestion des publications</h1>
            <p className="text-xs text-gray-500 mt-1">{levels.length} niveaux • {totalTypes} types</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              className={`px-4 py-2 rounded-md bg-[#071A83] text-white font-medium ${btnAnim}`}
              onClick={() => setCreateOpen(true)}
            >
              + Créer une publication
            </button>
          </div>
        </div>

        <div className="space-y-3">
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
                    {/* types empilés verticalement */}
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
