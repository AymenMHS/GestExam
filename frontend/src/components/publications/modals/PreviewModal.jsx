// src/components/publications/modals/PreviewModal.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";

export default function PreviewModal({ open, onClose, lvl = {}, type = {} }) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-[10000] bg-white rounded-md w-[92vw] max-w-[900px] p-4 max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-nunito font-bold">Prévisualisation — {lvl.label} / {type.label}</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="space-y-3">
          {(!type.exams || type.exams.length === 0) && <div className="text-sm text-gray-500">Aucun examen pour ce type.</div>}
          {(type.exams || []).map(e => (
            <div key={e.id} className="p-3 rounded-md bg-[#f8f9fb] flex justify-between items-center">
              <div>
                <div className="font-semibold">{e.title}</div>
                <div className="text-xs text-gray-400">{e.date} • {e.time} • {e.room}</div>
              </div>
              <div>
                <button className="px-3 py-1 rounded-md bg-[#234a78] text-white text-xs">Voir sur le calendrier</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  );
}
