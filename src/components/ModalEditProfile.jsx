import React, { useEffect, useRef, useState } from "react";

/**
 * ModalEditProfile.jsx
 *
 * Props:
 *  - isOpen (boolean)  OR open (boolean)  -> contrôle l'ouverture
 *  - onClose: () => void
 *  - onSave: (updatedData) => void
 *  - initial: { name, title, email, specialty, residence, bio, avatar }
 *
 * Style et classes: aligné avec tes autres modals (BtnSave, BtnCancel, font-nunito, overlay, icônes).
 */

const ModalEditProfile = ({ isOpen, open, onClose, onSave, initial = {} }) => {
  const visible = typeof isOpen !== "undefined" ? isOpen : open;
  const [form, setForm] = useState({
    name: "",
    title: "",
    email: "",
    specialty: "",
    residence: "",
    bio: "",
    avatar: "",
  });
  const fileRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setForm({
        name: initial.name || "",
        title: initial.title || "",
        email: initial.email || "",
        specialty: initial.specialty || "",
        residence: initial.residence || "",
        bio: initial.bio || "",
        avatar: initial.avatar || "",
      });
      // reset input file
      if (fileRef.current) fileRef.current.value = "";
    }
  }, [initial, visible]);

  if (!visible) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const reader = new FileReader();
    reader.onload = (ev) => setForm((s) => ({ ...s, avatar: ev.target.result }));
    reader.readAsDataURL(f);
  };

  const removeAvatar = () => {
    setForm((s) => ({ ...s, avatar: "" }));
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = () => {
    // validation minimale
    if (!form.name.trim()) {
      alert("Le nom est requis.");
      return;
    }
    if (!form.email.trim()) {
      alert("L'email est requis.");
      return;
    }
    onSave && onSave({ ...form });
    onClose && onClose();
  };

  return (
    <div className="modal-editProfile w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div
        className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0"
        onClick={onClose}
      ></div>

      <div className="modal-create w-[70vw] max-h-[85vh] bg-white rounded-[10px] relative z-[1001] flex flex-col justify-start items-center overflow-x-hidden">
        {/* Header */}
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px]">
          <h2 className="text-[20px] font-bold font-nunito">Modifier le profil</h2>
          <button
            className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:opacity-80 transition-all duration-300"
            onClick={onClose}
          >
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Content */}
        <div className="content-createModal flex flex-col items-center justify-start w-full px-6 pb-4 overflow-y-auto">
          <div className="w-full flex gap-6 mt-2">
            {/* Avatar colonne */}
            <div className="w-1/3 flex flex-col items-center">
              <div className="w-36 h-36 rounded-full bg-[#F2F2F2] flex items-center justify-center overflow-hidden border">
                {form.avatar ? (
                  <img src={form.avatar} alt="avatar" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-sm text-gray-400 text-center p-3">Aucune photo</div>
                )}
              </div>

              <div className="flex gap-2 mt-3">
                <label
                  htmlFor="avatarUpload"
                  className="w-[110px] h-10 flex justify-center items-center gap-2 bg-white border-none rounded-[10px] cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  <img src="/src/assets/icons/editer.png" alt="Changer" className="w-5 h-5" />
                  <span className="font-nunito font-semibold text-[14px]">Changer</span>
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
                  className="w-[110px] h-10 flex justify-center items-center gap-2 bg-[rgb(102,102,102)] text-white rounded-[10px] cursor-pointer shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
                >
                  <img src="/src/assets/icons/supprimer1.png" alt="Suppr" className="w-5 h-5" />
                  <span className="font-nunito font-semibold text-[14px]">Supprimer</span>
                </button>
              </div>

              <p className="text-[12px] text-[#7b7b7b] mt-2 text-center">jpg / png • Max recommandé 2MB</p>
            </div>

            {/* Form colonne */}
            <div className="w-2/3">
              <h3 className="font-nunito font-semibold text-[16px] mb-2">Informations</h3>
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="text-[14px] font-semibold font-nunito">Nom complet</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px] mt-1"
                    placeholder="Ex: Matallah Hocine"
                  />
                </div>

                <div>
                  <label className="text-[14px] font-semibold font-nunito">Titre / Rôle</label>
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px] mt-1"
                    placeholder="Ex: Chef département"
                  />
                </div>

                <div>
                  <label className="text-[14px] font-semibold font-nunito">Adresse mail</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px] mt-1"
                    placeholder="nom@exemple.com"
                  />
                </div>

                <div>
                  <label className="text-[14px] font-semibold font-nunito">Spécialité</label>
                  <input
                    name="specialty"
                    value={form.specialty}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px] mt-1"
                    placeholder="Informatique"
                  />
                </div>

                <div>
                  <label className="text-[14px] font-semibold font-nunito">Résidence</label>
                  <input
                    name="residence"
                    value={form.residence}
                    onChange={handleChange}
                    className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-[10px] mt-1"
                    placeholder="Tlemcen"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="text-[14px] font-semibold font-nunito">Bio</label>
                  <textarea
                    name="bio"
                    value={form.bio}
                    onChange={handleChange}
                    rows={4}
                    className="w-full mt-1 bg-[#F2F2F2] rounded-[5px] p-2.5"
                    placeholder="Quelques lignes..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer boutons */}
        <div className="BtnSaveCancel w-[90%] h-[60px] flex justify-end items-center gap-[10px] mt-[10px] mb-[10px]">
          <button
            onClick={onClose}
            className="BtnCancel w-[150px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] font-nunito text-[16px] font-semibold cursor-pointer border-none bg-[rgb(102,102,102)] text-white hover:opacity-80 transition-all duration-300"
          >
            <img src="/src/assets/icons/annuler-la-fleche.png" alt="Annuler" className="w-[20px] h-[20px]" />
            Annuler
          </button>

          <button
            onClick={handleSave}
            className="BtnSave w-[160px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] font-nunito text-[16px] font-semibold cursor-pointer border-none bg-[rgb(7,26,131)] text-white hover:opacity-80 transition-all duration-300"
          >
            <img src="/src/assets/icons/sauvegarder.png" alt="Enregistrer" className="w-[20px] h-[20px]" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalEditProfile;
