// src/components/publications/modals/CreatePublicationModal.jsx
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function CreatePublicationModal({ open, onClose, onCreate, levels = [] }) {
  const [type, setType] = useState("Annonce");
  const [target, setTarget] = useState("Tous");
  const [objet, setObjet] = useState("");
  const [message, setMessage] = useState("");
  const [files, setFiles] = useState([]);

  const types = ["Annonce", "Planning", "Rappel", "Info importante"];

  useEffect(() => {
    // lock body scroll when modal open
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  const handleDrop = (e) => {
    e.preventDefault();
    const dropped = Array.from(e.dataTransfer.files || []);
    setFiles(f => [...f, ...dropped]);
  };
  const handleFileChange = (e) => setFiles(f => [...f, ...Array.from(e.target.files || [])]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-[10000] bg-white rounded-lg w-[92vw] max-w-[900px] p-5 shadow-xl max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-nunito font-bold text-lg">Créer une publication</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="text-xs text-gray-600">Type</label>
            <select value={type} onChange={e=>setType(e.target.value)} className="w-full h-10 rounded-md border px-2">
              {types.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <label className="text-xs text-gray-600">Cible</label>
            <select value={target} onChange={e=>setTarget(e.target.value)} className="w-full h-10 rounded-md border px-2">
              <option>Tous</option>
              {levels.map(l => <option key={l.levelId}>{l.label}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-600">Objet</label>
            <input value={objet} onChange={e=>setObjet(e.target.value)} className="w-full h-10 rounded-md border p-2" placeholder="Objet..." />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-600">Message</label>
            <textarea value={message} onChange={e=>setMessage(e.target.value)} className="w-full rounded-md border p-2 h-28" />
          </div>

          <div className="md:col-span-2">
            <label className="text-xs text-gray-600">Fichiers (optionnel)</label>
            <div
              onDrop={handleDrop}
              onDragOver={(e)=>e.preventDefault()}
              className="border-dashed border-2 border-gray-200 rounded-md p-4 text-center"
            >
              <p className="text-sm text-gray-500">Déposez vos fichiers ou cliquez pour sélectionner</p>
              <input type="file" multiple onChange={handleFileChange} className="mt-2" />
              {files.length > 0 && (
                <ul className="mt-3 text-xs text-gray-700 text-left">
                  {files.map((f, i) => <li key={i}>{f.name} <span className="text-gray-400">({Math.round((f.size||0)/1024)} KB)</span></li>)}
                </ul>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200">Annuler</button>
          <button onClick={() => { onCreate({ type, target, objet, message, files }); onClose(); }} className="px-4 py-2 rounded-md bg-[#071A83] text-white">Créer</button>
        </div>
      </div>
    </div>,
    document.body
  );
}
