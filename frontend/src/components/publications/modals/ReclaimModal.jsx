// src/components/publications/modals/ReclaimModal.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function ReclaimModal({ open, onClose, lvl = {}, type = {}, onSend }) {
  const [message, setMessage] = useState("");

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
      <div className="relative z-[10000] bg-white rounded-md w-[92vw] max-w-[640px] p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-nunito font-bold">Réclamer — {lvl.label || "—"} / {type.label || "—"}</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <p className="text-xs text-gray-600 mb-2">Expliquez le problème :</p>
        <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full h-28 p-2 border rounded-md" />

        <div className="mt-3 flex justify-end gap-2">
          <button onClick={() => { setMessage(""); onClose(); }} className="px-3 py-1 rounded-md bg-gray-200">Annuler</button>
          <button onClick={() => { onSend({ lvl, type, message }); setMessage(""); onClose(); }} className="px-3 py-1 rounded-md bg-[#E57B23] text-white">Envoyer</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
