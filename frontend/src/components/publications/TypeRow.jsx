// src/components/publications/TypeRow.jsx
import React from "react";

const btnAnim = "transition-all duration-200 ease-in-out hover:opacity-80 hover:-translate-y-[2px] active:translate-y-[1px]";

export default function TypeRow({ lvl, type, onView, onDownload, onReclaim }) {
  return (
    <div className="p-3 rounded-md border shadow-sm bg-white flex items-center justify-between gap-4">
      <div>
        <div className="font-nunito font-bold text-sm">{type.label}</div>
        <div className="text-xs text-gray-500 mt-1">{type.exams.length} examen(s)</div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => onView(lvl, type)}
          className={`px-3 py-1 rounded-md bg-[#071A83] text-white text-xs ${btnAnim}`}
        >
          Voir
        </button>

        <button
          onClick={() => onDownload(lvl, type)}
          className={`px-3 py-1 rounded-md bg-[#234a78] text-white text-xs ${btnAnim}`}
        >
          Télécharger
        </button>

        <button
          onClick={() => onReclaim(lvl, type)}
          className={`px-3 py-1 rounded-md bg-[#E57B23] text-white text-xs ${btnAnim}`}
        >
          Réclamer
        </button>
      </div>
    </div>
  );
}
