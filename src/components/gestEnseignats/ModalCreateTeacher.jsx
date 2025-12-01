import React, { useState, useEffect } from "react";

const ModalCreateTeacher = ({ isOpen, onClose, onSave, initial }) => {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    dateNaissance: "",
    statut: "",
    surveillancesMax: "",
    email: "",
    identifiant: "",
    password: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({ ...initial });
    } else {
      setForm({
        nom: "",
        prenom: "",
        dateNaissance: "",
        statut: "",
        surveillancesMax: "",
        email: "",
        identifiant: "",
        password: "",
      });
    }
  }, [initial, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = () => {
    onSave(form);
    onClose();
  };

  return (
    <div className="modal-createTeacher w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div
        className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0"
        onClick={onClose}
      ></div>
      <div className="modal-create w-[75vw] max-h-[85vh] bg-white rounded-[10px] relative z-[1001] flex flex-col justify-start items-center overflow-x-hidden">
        {/* Header */}
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px]">
          <h2 className="text-[20px] font-bold font-nunito">
            {initial
              ? "Modifier un Enseignant"
              : "Ajouter un nouveau Enseignant"}
          </h2>
          <button
            className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300"
            onClick={onClose}
          >
            <img
              src="/src/assets/icons/x.png"
              alt="Fermer"
              className="w-[20px] h-[20px]"
            />
          </button>
        </div>

        {/* Content */}
        <div className="content-createModal w-full px-6 pb-6 overflow-y-auto flex gap-6">
          {/* Column 1: Informations personnelles */}
          <div className="w-1/2 flex flex-col gap-3  bg-[#e5e5e5] p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <img
                src="/src/assets/icons/utilisateur1.png"
                className="w-6 h-6 "
                alt=""
              />
              {/* Note: Icon placeholder based on screenshot style, assuming a user icon exists or similar */}
              <h3 className="font-semibold font-nunito text-[16px]">
                Informations personnelles
              </h3>
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Nom
              </label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Nom de l'enseignant..."
                className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]"
              />
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Prénom
              </label>
              <input
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                placeholder="Prénom de l'enseignant..."
                className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]"
              />
            </div>

            <div className="flex gap-3">
              <div className="w-1/2">
                <label className="text-[14px] font-semibold font-nunito block mb-1">
                  Date de naissance
                </label>
                <input
                  name="dateNaissance"
                  value={form.dateNaissance}
                  onChange={handleChange}
                  type="date"
                  className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[6px] pl-[10px] shadow-sm"
                />
              </div>
              <div className="w-1/2">
                <label className="text-[14px] font-semibold font-nunito block mb-1">
                  Statut
                </label>
                <select
                  name="statut"
                  value={form.statut}
                  onChange={handleChange}
                  className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[6px] pl-[10px] shadow-sm cursor-pointer"
                >
                  <option value="">--- Statut ---</option>
                  <option value="Actif">Actif</option>
                  <option value="En congé">En congé</option>
                  <option value="Inactif">Inactif</option>
                </select>
              </div>
            </div>

            <div className="w-1/2 pr-2">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Surveillances max
              </label>
              <input
                name="surveillancesMax"
                type="number"
                value={form.surveillancesMax}
                onChange={handleChange}
                placeholder="Surveillances max..."
                className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]"
              />
            </div>
          </div>

          {/* Column 2: Compte & connexion */}
          <div className="w-1/2 flex flex-col gap-3 bg-[#e5e5e5] p-3 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg
                class="w-6 h-6  text-black"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 10V7a4 4 0 1 1 8 0v3h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h1Zm2-3a2 2 0 1 1 4 0v3h-4V7Zm2 6a1 1 0 0 1 1 1v3a1 1 0 1 1-2 0v-3a1 1 0 0 1 1-1Z"
                  clip-rule="evenodd"
                />
              </svg>

              <h3 className="font-semibold font-nunito text-[16px]">
                Compte & connexion
              </h3>
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Email
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email de l'enseignant..."
                className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]"
              />
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Identifiant
              </label>
              <input
                name="identifiant"
                value={form.identifiant}
                onChange={handleChange}
                placeholder="Identifiant de l'enseignant..."
                className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]"
              />
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Mot de passe
              </label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Mot de passe de l'enseignant..."
                className="w-full h-[40px] bg-white border border-[#E0E0E0] rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]"
              />
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="w-full h-[80px] flex justify-end items-center px-6 gap-3">
          <button
            className="BtnCancel px-6 py-2 bg-[#757575] text-white rounded-[8px] font-nunito font-semibold hover:-translate-y-1 transition-all duration-300 active:translate-y-1 flex items-center gap-2"
            onClick={onClose}
          >
            <img
              src="/src/assets/icons/annuler-la-fleche.png"
              alt=""
              className="w-4 h-4 invert"
            />
            Annuler
          </button>
          <button
            className="BtnSave px-6 py-2 bg-[#003366] text-white rounded-[8px] font-nunito font-semibold hover:-translate-y-1 transition-all duration-300 active:translate-y-1 flex items-center gap-2"
            onClick={handleSave}
          >
            <img
              src="/src/assets/icons/sauvegarder.png"
              alt=""
              className="w-4 h-4"
            />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateTeacher;
