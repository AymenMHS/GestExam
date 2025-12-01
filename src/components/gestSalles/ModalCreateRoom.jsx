import React, { useState, useEffect } from "react";

const ModalCreateRoom = ({ isOpen, onClose, onSave, initial }) => {
  const [form, setForm] = useState({
    nom: "",
    type: "",
    capacite: ""
  });

  useEffect(() => {
    if (initial) {
      setForm({ ...initial });
    } else {
      setForm({
        nom: "",
        type: "",
        capacite: ""
      });
    }
  }, [initial, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-createRoom w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0" onClick={onClose}></div>
      <div className="modal-content w-[60vw] max-w-[800px] bg-white rounded-[10px] relative z-[1001] flex flex-col justify-start items-center overflow-hidden pb-4">
        
        {/* Header */}
        <div className="header-modal w-full h-[60px] flex justify-between items-center px-[30px] border-b border-[#f0f0f0]">
          <h2 className="text-[20px] font-bold font-nunito text-[#333]">
            {initial ? "Modifier la salle" : "Ajouter une nouvelle salle"}
          </h2>
          <button className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:-translate-y-1 transition-all duration-300" onClick={onClose}>
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Form Body */}
        <div className="w-full px-[40px] py-[30px] flex flex-col gap-5">
          
          {/* Row 1: Nom */}
          <div className="w-full">
            <label className="text-[14px] font-bold font-nunito text-[#333] mb-2 block">Nom de la salle</label>
            <input 
              name="nom" 
              value={form.nom} 
              onChange={handleChange} 
              placeholder="Nom de la salle..." 
              className="w-full h-[45px] bg-white border border-[#E0E0E0] rounded-[8px] pl-[15px] shadow-sm focus:outline-none focus:border-[#3B679A] font-nunito" 
            />
          </div>

          {/* Row 2: Type & Capacité */}
          <div className="w-full flex gap-6">
            <div className="w-1/2">
              <label className="text-[14px] font-bold font-nunito text-[#333] mb-2 block">Type de la salle</label>
              <select 
                name="type" 
                value={form.type} 
                onChange={handleChange} 
                className="w-full h-[45px] bg-white border border-[#E0E0E0] rounded-[8px] pl-[15px] pr-3 shadow-sm focus:outline-none focus:border-[#3B679A] font-nunito cursor-pointer"
              >
                <option value="">--- type ---</option>
                <option value="amphi">Amphi</option>
                <option value="salle">Salle de TD</option>
                <option value="labo">Laboratoire</option>
              </select>
            </div>

            <div className="w-1/2">
              <label className="text-[14px] font-bold font-nunito text-[#333] mb-2 block">Capacité de la salle</label>
              <input 
                name="capacite" 
                type="number"
                value={form.capacite} 
                onChange={handleChange} 
                placeholder="Capacité..." 
                className="w-full h-[45px] bg-white border border-[#E0E0E0] rounded-[8px] pl-[15px] shadow-sm focus:outline-none focus:border-[#3B679A] font-nunito" 
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full px-[40px] mt-auto flex justify-end items-center gap-3">
          <button className="h-[40px] px-6 bg-[#888] text-white rounded-[8px] font-nunito font-semibold flex items-center gap-2 hover:-translate-y-1 transition-all duration-300" onClick={onClose}>
            <img src="/src/assets/icons/annuler-la-fleche.png" alt="" className="w-4 h-4 invert opacity-80" />
            Annuler
          </button>
          <button className="h-[40px] px-6 bg-[#003366] text-white rounded-[8px] font-nunito font-semibold flex items-center gap-2 hover:-translate-y-1 transition-all duration-300" onClick={handleSave}>
            <img src="/src/assets/icons/sauvegarder.png" alt="" className="w-4 h-4" />
            Enregistrer
          </button>
        </div>

      </div>
    </div>
  );
};

export default ModalCreateRoom;