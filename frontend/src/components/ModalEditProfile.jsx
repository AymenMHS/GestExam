import React, { useEffect, useRef, useState } from "react";

const WILAYAS = [
  "Adrar", "Chlef", "Laghouat", "Oum El Bouaghi", "Batna", "Béjaïa", "Biskra", "Béchar", "Blida", "Bouira",
  "Tamanrasset", "Tébessa", "Tlemcen", "Tiaret", "Tizi Ouzou", "Alger", "Djelfa", "Jijel", "Sétif", "Saïda",
  "Skikda", "Sidi Bel Abbès", "Annaba", "Guelma", "Constantine", "Médéa", "Mostaganem", "M'Sila", "Mascara",
  "Ouargla", "Oran", "El Bayadh", "Illizi", "Bordj Bou Arréridj", "Boumerdès", "El Tarf", "Tindouf",
  "Tissemsilt", "El Oued", "Khenchela", "Souk Ahras", "Tipaza", "Mila", "Aïn Defla", "Naâma",
  "Aïn Témouchent", "Ghardaïa", "Relizane", "Timimoun", "Bordj Badji Mokhtar", "Ouled Djellal",
  "Béni Abbès", "In Salah", "In Guezzam", "Touggourt", "Djanet", "El M'Ghair", "El Meniaa"
];

const SPECIALITIES = ["Non renseigné", "Informatique"];

const ModalEditProfile = ({ isOpen, open, onClose, onSave, initial = {} }) => {
  const visible = typeof isOpen !== "undefined" ? isOpen : open;
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    title: "",
    email: "",
    specialty: "",
    residence: "",
    bio: "",
    avatar: "", // URL aperçu
    identifiant: "",
    date_naissance: "",
  });
  const [avatarFile, setAvatarFile] = useState(null); // Le fichier réel à uploader
  const fileRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setForm({
        nom: initial.nom || "",
        prenom: initial.prenom || "",
        title: initial.title || "",
        email: initial.email || "",
        specialty: initial.specialty || "Non renseigné",
        residence: initial.residence || "Non renseigné",
        bio: initial.bio || "",
        avatar: initial.avatar || "",
        identifiant: initial.identifiant || "",
        date_naissance: initial.date_naissance || "",
      });
      setAvatarFile(null); // Reset fichier
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [initial, visible]);

  if (!visible) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    // Garder le fichier réel pour l'envoi
    setAvatarFile(f);

    // Créer un aperçu local
    const reader = new FileReader();
    reader.onload = (ev) => setForm((s) => ({ ...s, avatar: ev.target.result }));
    reader.readAsDataURL(f);
  };

  const removeAvatar = () => {
    setForm((s) => ({ ...s, avatar: "" }));
    setAvatarFile(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = () => {
    if (!form.nom.trim() || !form.prenom.trim()) {
      alert("Le nom et le prénom sont requis.");
      return;
    }
    // On renvoie le form ET le fichier
    onSave && onSave({ ...form, avatarFile });
    onClose && onClose();
  };

  return (
    <div className="modal-editProfile w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div
        className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0"
        onClick={onClose}
      ></div>

      <div className="modal-create w-[70vw] max-h-[90vh] bg-white rounded-[10px] relative z-[1001] flex flex-col justify-start items-center overflow-x-hidden">
        {/* Header */}
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px] border-b">
          <h2 className="text-[20px] font-bold font-nunito">Modifier le profil</h2>
          <button
            className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:opacity-80 transition-all duration-300"
            onClick={onClose}
          >
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Content */}
        <div className="content-createModal flex flex-col items-center justify-start w-full px-6 py-4 overflow-y-auto">
          <div className="w-full flex flex-col md:flex-row gap-6 mt-2">
            {/* Avatar colonne */}
            <div className="w-full md:w-1/3 flex flex-col items-center border-r pr-4">
              <div className="w-36 h-36 rounded-full bg-[#F2F2F2] flex items-center justify-center overflow-hidden border shadow-sm">
                {form.avatar ? (
                  <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-sm text-gray-400 text-center p-3">Aucune photo</div>
                )}
              </div>

              <div className="flex flex-col gap-2 mt-4 w-full items-center">
                <label
                  htmlFor="avatarUpload"
                  className="w-[140px] h-9 flex justify-center items-center gap-2 bg-white border border-gray-300 rounded-[8px] cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <img src="/src/assets/icons/editer.png" alt="Changer" className="w-4 h-4" />
                  <span className="font-nunito font-semibold text-[13px]">Changer photo</span>
                </label>
                <input
                  id="avatarUpload"
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />

                <button
                  type="button"
                  onClick={removeAvatar}
                  className="w-[140px] h-9 flex justify-center items-center gap-2 bg-red-50 text-red-600 border border-red-200 rounded-[8px] cursor-pointer hover:bg-red-100 transition-colors"
                >
                  <img src="/src/assets/icons/supprimer1.png" alt="Suppr" className="w-4 h-4 opacity-70" />
                  <span className="font-nunito font-semibold text-[13px]">Supprimer</span>
                </button>
              </div>
            </div>

            {/* Form colonne */}
            <div className="w-full md:w-2/3">
              <h3 className="font-nunito font-bold text-[#071A83] text-[16px] mb-4 border-b pb-2">Informations Personnelles</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Identifiant (Read only) */}
                <div>
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Identifiant</label>
                  <input
                    name="identifiant"
                    value={form.identifiant}
                    disabled
                    className="w-full h-[36px] bg-gray-100 text-gray-500 rounded-[5px] pl-[10px] mt-1 border border-gray-200 cursor-not-allowed"
                  />
                </div>

                {/* Email (Read only) */}
                <div>
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Adresse mail</label>
                  <input
                    name="email"
                    value={form.email}
                    disabled
                    className="w-full h-[36px] bg-gray-100 text-gray-500 rounded-[5px] pl-[10px] mt-1 border border-gray-200 cursor-not-allowed"
                  />
                </div>

                {/* Rôle (Read only) */}
                <div>
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Rôle</label>
                  <input
                    name="title"
                    value={form.title}
                    disabled
                    className="w-full h-[36px] bg-gray-100 text-gray-500 rounded-[5px] pl-[10px] mt-1 border border-gray-200 cursor-not-allowed"
                  />
                </div>

                {/* Date de naissance */}
                <div>
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Date de naissance</label>
                  <input
                    name="date_naissance"
                    type="date"
                    value={form.date_naissance}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F9FAFB] border border-gray-300 rounded-[5px] pl-[10px] mt-1 focus:outline-none focus:border-[#071A83]"
                  />
                </div>

                {/* Nom */}
                <div>
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Nom</label>
                  <input
                    name="nom"
                    value={form.nom}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F9FAFB] border border-gray-300 rounded-[5px] pl-[10px] mt-1 focus:outline-none focus:border-[#071A83]"
                    placeholder="Votre nom"
                  />
                </div>

                {/* Prénom */}
                <div>
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Prénom</label>
                  <input
                    name="prenom"
                    value={form.prenom}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F9FAFB] border border-gray-300 rounded-[5px] pl-[10px] mt-1 focus:outline-none focus:border-[#071A83]"
                    placeholder="Votre prénom"
                  />
                </div>

                {/* Spécialité Select */}
                <div>
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Spécialité</label>
                  <select
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F9FAFB] border border-gray-300 rounded-[5px] pl-[10px] mt-1 focus:outline-none focus:border-[#071A83]"
                  >
                    {SPECIALITIES.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                </div>

                {/* Résidence Select */}
                <div>
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Résidence</label>
                  <select
                    name="residence"
                    value={form.residence}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F9FAFB] border border-gray-300 rounded-[5px] pl-[10px] mt-1 focus:outline-none focus:border-[#071A83]"
                  >
                    <option value="Non renseigné">Non renseigné</option>
                    {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
                  </select>
                </div>

                {/* Bio (Full width) */}
                <div className="md:col-span-2">
                  <label className="text-[13px] font-bold font-nunito text-gray-700">Biographie</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={3}
                    className="w-full mt-1 bg-[#F9FAFB] border border-gray-300 rounded-[5px] p-2.5 focus:outline-none focus:border-[#071A83]"
                    placeholder="Quelques mots sur vous..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer boutons */}
        <div className="w-full px-6 py-4 border-t flex justify-end items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors"
          >
            Annuler
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2 rounded-lg bg-[#071A83] text-white font-semibold hover:bg-blue-900 transition-colors shadow-md"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditProfile;
