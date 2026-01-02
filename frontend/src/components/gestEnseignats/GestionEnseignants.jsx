import React, { useState, useEffect } from "react";
import TeacherTable from "./TeacherTable";
import FilterBarTeachers from "./FilterBarTeacher";
import ModalCreateTeacher from "./ModalCreateTeacher";
import PaginationStudents from "../gestEtudiant/PaginationStudents";
import api from "../../services/api";
import { useNotifications } from "../ui/Notifications";

const GestionEnseignants = () => {
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const { notifySuccess, notifyError, notifyLoading, dismiss } = useNotifications();

  const itemsPerPage = 8;

  // Helpers
  const formatStatus = (s) => {
    // API: actif, en_conge, inactif
    // UI: Actif, En congé, Inactif
    if (!s) return "Inactif";
    if (s === 'actif') return 'Actif';
    if (s === 'en_conge') return 'En congé';
    if (s === 'inactif') return 'Inactif';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  const fetchTeachers = async () => {
    try {
      const response = await api.get('/enseignants');
      // Mapping structure Back -> Front
      const mapped = response.data.map(t => ({
        id: t.id,
        userId: t.user_id,
        code: t.user.identifiant,
        nom: t.user.nom,
        prenom: t.user.prenom,
        email: t.user.email,
        identifiant: t.user.identifiant,
        // dateNaissance: t.user.date_naissance || "", // Champ manquant dans user pour l'instant
        dateNaissance: "",
        statut: formatStatus(t.statut),
        surveillancesMax: t.surveillance_max
      }));

      // Tri par ID décroissant
      mapped.sort((a, b) => b.id - a.id);

      setTeachers(mapped);
    } catch (error) {
      console.error(error);
      notifyError("Erreur chargement enseignants");
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Filtering Logic
  const filteredTeachers = teachers.filter(t => {
    const sLower = search.trim().toLowerCase();
    const matchSearch = (
      t.nom.toLowerCase().includes(sLower) ||
      t.prenom.toLowerCase().includes(sLower) ||
      t.identifiant.toLowerCase().includes(sLower)
    );
    const matchStatut = statut ? t.statut === statut : true;
    return matchSearch && matchStatut;
  });

  // Pagination Logic
  const totalPages = Math.max(1, Math.ceil(filteredTeachers.length / itemsPerPage));
  const displayTeachers = filteredTeachers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleAdd = () => {
    setCurrentTeacher(null);
    setIsModalOpen(true);
  };

  const handleEdit = (teacher) => {
    // Reconstruire l'objet form pour le modal
    setCurrentTeacher({
      ...teacher,
      // password vide car on ne l'édite pas par défaut
      password: ""
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (teacher) => {
    if (window.confirm(`Supprimer ${teacher.nom} ?`)) {
      try {
        await api.delete(`/enseignants/${teacher.id}`);
        notifySuccess("Enseignant supprimé");
        fetchTeachers();
      } catch (error) {
        notifyError("Erreur suppression");
      }
    }
  };

  const handleSave = async (formData) => {
    let loadingId = null;

    try {
      if (currentTeacher?.id) {
        // Edit logic not fully implemented in controller yet
        notifyError("Modification non disponible pour l'instant (Backend TODO)");
      } else {
        // Add logic
        loadingId = notifyLoading("Ajout en cours...");

        const payload = {
          nom: formData.nom,
          prenom: formData.prenom,
          email: formData.email,
          identifiant: formData.identifiant,
          password: formData.password,
          surveillancesMax: parseInt(formData.surveillancesMax, 10),
          statut: formData.statut,
        };

        await api.post('/enseignants', payload);

        dismiss(loadingId);
        notifySuccess("Enseignant ajouté");
        fetchTeachers();
        setIsModalOpen(false);
      }
    } catch (error) {
      console.error(error);
      if (loadingId) dismiss(loadingId);

      let errorMessage = "Une erreur est survenue.";
      const rd = error.response?.data;

      if (rd) {
        if (rd.errors) {
          // Format validation errors
          errorMessage = Object.entries(rd.errors)
            .map(([field, msgs]) => `${field}: ${msgs.join(', ')}`)
            .join('\n');
        } else if (rd.message) {
          errorMessage = rd.message;
        }
      }

      notifyError("Erreur lors de l'ajout", errorMessage);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white flex flex-col font-nunito">
      <h1 className="text-[24px] font-bold text-[#333] mb-6">Gestion des Enseignants</h1>

      <FilterBarTeachers
        search={search}
        onSearchChange={(e) => { setSearch(e.target.value); setPage(1); }}
        statut={statut}
        onStatutChange={(e) => { setStatut(e.target.value); setPage(1); }}
        onAdd={handleAdd}
      />

      <TeacherTable
        teachers={displayTeachers}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <PaginationStudents
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage(p => Math.max(1, p - 1))}
        onNext={() => setPage(p => Math.min(totalPages, p + 1))}
        onGoto={(p) => setPage(p)}
      />

      <ModalCreateTeacher
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initial={currentTeacher}
      />
    </div>
  );
};

export default GestionEnseignants;