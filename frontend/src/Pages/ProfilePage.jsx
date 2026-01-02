import React, { useState, useEffect } from "react";
import ModalEditProfile from "../components/ModalEditProfile";
import { authService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNotifications } from "../components/ui/Notifications"; // Import notifications

const ProfilePage = () => {
  const { user: authUser } = useAuth(); // User from context/session
  const { notifySuccess, notifyError } = useNotifications(); // Hook notifs

  const [profile, setProfile] = useState({
    avatar: "/src/assets/icons/omar.png",
    title: "",
    nom: "...",
    prenom: "...",
    identifiant: "",
    date_naissance: "",
    email: "",
    specialty: "",
    residence: "",
    bio: "",
  });

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les détails frais depuis l'API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await authService.me();

        setProfile(prev => ({
          ...prev,
          nom: userData.nom,
          prenom: userData.prenom,
          name: `${userData.nom} ${userData.prenom}`, // Pour affichage carte
          title: userData.role,
          identifiant: userData.identifiant,
          date_naissance: userData.date_naissance || "",
          email: userData.email,
          bio: userData.bio || "Aucune biographie renseignée.",
          avatar: userData.photo_profil || prev.avatar,
          residence: userData.adresse || "Non renseigné",
          specialty: userData.specialite || "Non renseigné",
        }));
      } catch (err) {
        console.error("Erreur chargement profil", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSave = async (updated) => {
    try {
      // 1. Préparer les données
      const formData = new FormData();
      formData.append('nom', updated.nom);
      formData.append('prenom', updated.prenom);
      formData.append('email', updated.email);
      formData.append('bio', updated.bio || "");
      formData.append('specialite', updated.specialty || "");
      formData.append('adresse', updated.residence || "");
      formData.append('date_naissance', updated.date_naissance || "");

      // Ajout de la photo SEULEMENT si un nouveau fichier a été sélectionné
      if (updated.avatarFile) {
        formData.append('photo', updated.avatarFile);
      }

      // 2. Appel API (qui gérera le multipart)
      const result = await authService.updateProfile(formData);

      // 3. UI Update + Notif
      if (result.user) {
        setProfile(prev => ({
          ...prev,
          ...updated, // Garde les valeurs du form (y compris l'aperçu avatar en base64 temporaire pour fluidité)
          // L'API nous renvoie la VRAIE url de la photo, on devrait l'utiliser si dispo
          avatar: result.user.photo_profil || prev.avatar,
          name: `${result.user.nom} ${result.user.prenom}`,
        }));
        notifySuccess("Succès", "Votre profil a été mis à jour avec succès.");
      }
    } catch (err) {
      console.error("Erreur sauvegarde profil", err);
      notifyError("Erreur", "Impossible de mettre à jour le profil : " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="min-h-[80vh] bg-[#E3F0FF] p-2">
      {/* Main full-width card */}
      <div className="w-full bg-white rounded-[16px] shadow-lg md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt="Profile"
              className="w-40 h-40 md:w-40 md:h-40 rounded-full object-cover"
            />
            <div className="text-left">
              <p className="text-gray-400 text-sm mb-1">{profile.title}</p>
              <h1 className="text-[#234a78] font-extrabold text-xl md:text-2xl leading-tight">
                {profile.name}
              </h1>
            </div>
          </div>

          <div className="w-full md:w-auto flex justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2.5 px-4 py-2 rounded-lg border border-[#d6deea] bg-white text-[#234a78] font-semibold text-sm shadow-sm hover:bg-[#234a78] hover:text-white transition-all"
            >
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
              Modifier le profil
            </button>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#f0f7ff] p-3 rounded-xl shadow-sm">
            <p className="text-gray-400 text-xs mb-1">Adresse mail</p>
            <p className="text-[#234a78] font-bold text-sm truncate">{profile.email}</p>
          </div>

          <div className="bg-[#f0f7ff] p-3 rounded-xl shadow-sm">
            <p className="text-gray-400 text-xs mb-1">Spécialité</p>
            <p className="text-[#234a78] font-bold text-sm">{profile.specialty}</p>
          </div>

          <div className="bg-[#f0f7ff] p-3 rounded-xl shadow-sm">
            <p className="text-gray-400 text-xs mb-1">Résidence</p>
            <p className="text-[#234a78] font-bold text-sm">{profile.residence}</p>
          </div>
        </div>

        {/* Bio area inspired by the screenshot */}
        <div className="mt-6">
          <div className="relative bg-[#274e7a] rounded-xl p-4 md:p-5 text-white shadow-md overflow-hidden">
            <div className=" text-white font-semibold text-xl py-1 rounded-md">Bio</div>

            <div className="mt-3">
              <p className="text-[13px] leading-relaxed">{profile.bio}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalEditProfile isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} initial={profile} onSave={handleSave} />
    </div>
  );
};

export default ProfilePage;
