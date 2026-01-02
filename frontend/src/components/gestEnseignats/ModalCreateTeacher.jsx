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

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({}); // Reset errors on open
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear error for this field when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nom.trim()) newErrors.nom = "Le nom est requis.";
    if (!form.prenom.trim()) newErrors.prenom = "Le prénom est requis.";
    // if (!form.dateNaissance) newErrors.dateNaissance = "La date de naissance est requise."; // Optionnel selon DB
    if (!form.statut) newErrors.statut = "Le statut est requis.";
    if (!form.surveillancesMax) newErrors.surveillancesMax = "Requis.";

    if (!form.email.trim()) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email invalide.";
    }

    if (!form.identifiant.trim()) newErrors.identifiant = "L'identifiant est requis.";

    // Password requis seulement si création (pas d'initial)
    if (!initial && !form.password) {
      newErrors.password = "Le mot de passe est requis.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      onSave(form);
      // onClose handled by parent usually, but here logic was onClose() inside handleSave.
      // Parent handleSave closes modal on success. 
      // We should NOT close here immediately if we wait for API, but current logic mimics previous behavior.
      // The parent is responsible for closing "setIsModalOpen(false)".
    }
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
              <h3 className="font-semibold font-nunito text-[16px]">
                Informations personnelles
              </h3>
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Nom <span className="text-red-500">*</span>
              </label>
              <input
                name="nom"
                value={form.nom}
                onChange={handleChange}
                placeholder="Nom de l'enseignant..."
                className={`w-full h-[40px] bg-white border ${errors.nom ? 'border-red-500' : 'border-[#E0E0E0]'} rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]`}
              />
              {errors.nom && <p className="text-red-500 text-xs mt-1">{errors.nom}</p>}
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Prénom <span className="text-red-500">*</span>
              </label>
              <input
                name="prenom"
                value={form.prenom}
                onChange={handleChange}
                placeholder="Prénom de l'enseignant..."
                className={`w-full h-[40px] bg-white border ${errors.prenom ? 'border-red-500' : 'border-[#E0E0E0]'} rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]`}
              />
              {errors.prenom && <p className="text-red-500 text-xs mt-1">{errors.prenom}</p>}
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
                  Statut <span className="text-red-500">*</span>
                </label>
                <select
                  name="statut"
                  value={form.statut}
                  onChange={handleChange}
                  className={`w-full h-[40px] bg-white border ${errors.statut ? 'border-red-500' : 'border-[#E0E0E0]'} rounded-[6px] pl-[10px] shadow-sm cursor-pointer`}
                >
                  <option value="">--- Statut ---</option>
                  <option value="Actif">Actif</option>
                  <option value="En congé">En congé</option>
                  <option value="Inactif">Inactif</option>
                </select>
                {errors.statut && <p className="text-red-500 text-xs mt-1">{errors.statut}</p>}
              </div>
            </div>

            <div className="w-1/2 pr-2">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Surveillances max <span className="text-red-500">*</span>
              </label>
              <input
                name="surveillancesMax"
                type="number"
                value={form.surveillancesMax}
                onChange={handleChange}
                placeholder="Ex: 5"
                className={`w-full h-[40px] bg-white border ${errors.surveillancesMax ? 'border-red-500' : 'border-[#E0E0E0]'} rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]`}
              />
              {errors.surveillancesMax && <p className="text-red-500 text-xs mt-1">{errors.surveillancesMax}</p>}
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
                Email <span className="text-red-500">*</span>
              </label>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email de l'enseignant..."
                className={`w-full h-[40px] bg-white border ${errors.email ? 'border-red-500' : 'border-[#E0E0E0]'} rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]`}
              />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Identifiant <span className="text-red-500">*</span>
              </label>
              <input
                name="identifiant"
                value={form.identifiant}
                onChange={handleChange}
                placeholder="Identifiant de l'enseignant..."
                className={`w-full h-[40px] bg-white border ${errors.identifiant ? 'border-red-500' : 'border-[#E0E0E0]'} rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]`}
              />
              {errors.identifiant && <p className="text-red-500 text-xs mt-1">{errors.identifiant}</p>}
            </div>

            <div className="w-full">
              <label className="text-[14px] font-semibold font-nunito block mb-1">
                Mot de passe {initial ? "" : <span className="text-red-500">*</span>}
              </label>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Mot de passe de l'enseignant..."
                className={`w-full h-[40px] bg-white border ${errors.password ? 'border-red-500' : 'border-[#E0E0E0]'} rounded-[6px] pl-[10px] shadow-sm focus:outline-none focus:border-[#3B679A]`}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
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
