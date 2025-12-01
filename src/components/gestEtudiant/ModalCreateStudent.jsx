import React, { useState, useEffect } from "react";

const ModalCreateStudent = ({ isOpen, onClose, onSave, initial }) => {
  const [form, setForm] = useState({
    code: "",
    nom: "",
    prenom: "",
    dateNaissance: "",
    niveau: "",
    groupe: "",
    email: "",
    identifiant: "",
    password: ""
  });

  useEffect(() => {
    if (initial) {
      setForm({ ...initial });
    } else {
      setForm({
        code: "",
        nom: "",
        prenom: "",
        dateNaissance: "",
        niveau: "",
        groupe: "",
        email: "",
        identifiant: "",
        password: ""
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
    <div className="modal-createStudent w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0" onClick={onClose}></div>
      <div className="modal-create w-[70vw] max-h-[85vh] bg-white rounded-[10px] relative z-[1001] flex flex-col justify-start items-center overflow-x-hidden">
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px]">
          <h2 className="text-[20px] font-bold font-nunito">{initial ? "Modifier un étudiant" : "Ajouter un étudiant"}</h2>
          <button className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300" onClick={onClose}>
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div className="content-createModal flex flex-col items-center justify-start w-full px-6 pb-6 overflow-y-auto">
          <h3 className="w-full text-left font-semibold font-nunito text-[16px] mt-2">Informations personnelles</h3>
          <div className="w-full flex gap-4 mt-2">
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Code</label>
              <input name="code" value={form.code} onChange={handleChange} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]" />
            </div>
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Nom</label>
              <input name="nom" value={form.nom} onChange={handleChange} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]" />
            </div>
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Prénom</label>
              <input name="prenom" value={form.prenom} onChange={handleChange} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]" />
            </div>
          </div>

          <div className="w-full flex gap-4 mt-3">
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Date de naissance</label>
              <input name="dateNaissance" value={form.dateNaissance} onChange={handleChange} type="date" className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]" />
            </div>
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Niveau d'étude</label>
              <select name="niveau" value={form.niveau} onChange={handleChange} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]">
                <option value="">--Niveau--</option>
                <option value="L1">L1 - Informatique</option>
                <option value="L2">L2 - Informatique</option>
                <option value="L3">L3 - Informatique</option>
                <option value="M1">M1</option>
                <option value="M2">M2</option>
              </select>
            </div>
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Groupe</label>
              <input name="groupe" value={form.groupe} onChange={handleChange} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]" placeholder="Groupe 1" />
            </div>
          </div>

          <h3 className="w-full text-left font-semibold font-nunito text-[16px] mt-4">Informations Compte & connexion</h3>
          <div className="w-full flex gap-4 mt-2">
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Email</label>
              <input name="email" value={form.email} onChange={handleChange} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]" />
            </div>
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Identifiant</label>
              <input name="identifiant" value={form.identifiant} onChange={handleChange} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]" />
            </div>
            <div className="w-1/3">
              <label className="text-[14px] font-semibold font-nunito">Mot de passe</label>
              <input name="password" value={form.password} onChange={handleChange} type="password" className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px]" />
            </div>
          </div>
        </div>

        <div className="BtnSaveCancel w-[90%] h-[60px] flex justify-end items-center gap-[10px] mt-[10px] mb-[10px]">
          <button className="BtnCancel w-[150px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] font-nunito text-[16px] font-semibold cursor-pointer border-none bg-[rgb(102,102,102)] text-white hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300" onClick={onClose}>
            <img src="/src/assets/icons/annuler-la-fleche.png" alt="Annuler" className="w-[20px] h-[20px]" />
            Annuler
          </button>
          <button className="BtnSave w-[160px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] font-nunito text-[16px] font-semibold cursor-pointer border-none bg-[rgb(7,26,131)] text-white hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300" onClick={handleSave}>
            <img src="/src/assets/icons/sauvegarder.png" alt="Enregistrer" className="w-[20px] h-[20px]" />
            {initial ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateStudent;
