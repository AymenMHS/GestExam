import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { useNotifications } from "../ui/Notifications";
import FilterBarRooms from "./FilterBarRooms";
import RoomTable from "./RoomTable";
import ModalCreateRoom from "./ModalCreateRoom";
import PaginationStudents from "../gestEtudiant/PaginationStudents";
import ModalImportRooms from "./ModalImportRooms";

const GestionSalles = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [rooms, setRooms] = useState([]);
  const { notifySuccess, notifyError, notifyLoading, dismiss } = useNotifications();

  const itemsPerPage = 7;

  // Fetch Salles from API
  const fetchSalles = async () => {
    try {
      console.log("Fetching salles...");
      const response = await api.get('/salles');
      console.log("Salles response:", response.data);

      if (Array.isArray(response.data)) {
        const mapped = response.data.map(s => ({
          id: s.id, // Garder l'ID pour update/delete
          code: s.code_salle,
          nom: s.nom_salle,
          capacite: s.capacite,
          statut: s.statut,
          // Deviner le type pour l'UI si possible
          type: s.nom_salle && s.nom_salle.toLowerCase().includes('amphi') ? 'amphi' :
            s.nom_salle && s.nom_salle.toLowerCase().includes('labo') ? 'labo' : 'salle'
        }));

        // Tri du plus récent au plus ancien (ID décroissant)
        mapped.sort((a, b) => b.id - a.id);

        setRooms(mapped);
      } else {
        console.error("Format réponse API invalide (pas un tableau)", response.data);
        setRooms([]);
      }
    } catch (error) {
      console.error("Erreur fetch salles:", error);
      notifyError("Erreur lors du chargement des salles");
    }
  };

  useEffect(() => {
    fetchSalles();
  }, []);

  // Filter Logic
  const filteredRooms = rooms.filter(r => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      q === "" ||
      (r.nom && r.nom.toLowerCase().includes(q)) ||
      (r.code && r.code.toLowerCase().includes(q));
    const matchType = typeFilter ? r.type === typeFilter : true;
    return matchSearch && matchType;
  });

  const totalPages = Math.max(1, Math.ceil(filteredRooms.length / itemsPerPage));
  const displayRooms = filteredRooms.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  // Handlers
  const handleAdd = () => {
    setCurrentRoom(null);
    setIsModalOpen(true);
  };

  const handleEdit = (room) => {
    setCurrentRoom(room);
    setIsModalOpen(true);
  };

  const handleDelete = async (room) => {
    if (window.confirm(`Voulez-vous vraiment supprimer la salle ${room.nom} ?`)) {
      try {
        if (room.id) {
          await api.delete(`/salles/${room.id}`);
          notifySuccess("Salle supprimée");
          fetchSalles();
        }
      } catch (error) {
        notifyError("Erreur supression");
      }
    }
  };

  const handleSave = async (formData) => {
    try {
      // Mapping UI -> API
      const payload = {
        // Si CREATE, générer code
        code_salle: currentRoom ? currentRoom.code : `E-${Math.floor(Math.random() * 1000000)}`,
        nom_salle: formData.nom,
        capacite: parseInt(formData.capacite, 10),
        statut: 'disponible', // Defaut
      };

      if (currentRoom && currentRoom.id) {
        // Update
        await api.put(`/salles/${currentRoom.id}`, payload);
        notifySuccess("Salle modifiée");
      } else {
        // Create
        await api.post('/salles', payload);
        notifySuccess("Salle ajoutée");
      }
      fetchSalles();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
      notifyError("Erreur lors de l'enregistrement", error.response?.data?.message || "");
    }
  };

  // Import logic
  const handleImport = async (importedRows) => {
    setIsImportOpen(false);

    const loadingId = notifyLoading("Importation en cours", "Traitement des fichiers...");

    let successCount = 0;
    let failCount = 0;

    for (const row of importedRows) {
      try {
        const payload = {
          // Mapping des données Excel -> API
          code_salle: row.code || `E-${Math.floor(Math.random() * 1000000)}`,
          nom_salle: row.nom || "Salle Importée",
          capacite: parseInt(row.capacite, 10) || 0,
          statut: 'disponible' // Par défaut
        };

        await api.post('/salles', payload);
        successCount++;
      } catch (error) {
        console.error("Erreur import ligne:", row, error);
        failCount++;
      }
    }

    // Fermer le loading
    dismiss(loadingId);

    fetchSalles();

    if (successCount > 0) {
      notifySuccess("Terminé", `${successCount} salle(s) importée(s).`);
    }
    if (failCount > 0) {
      notifyError("Echec partiel", `${failCount} ligne(s) ignorée(s).`);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white flex flex-col font-nunito">
      <h1 className="text-[24px] font-bold text-[#333] mb-6">Gestion des Salles</h1>

      <FilterBarRooms
        search={search}
        onSearchChange={(e) => { setSearch(e.target.value); setPage(1); }}
        type={typeFilter}
        onTypeChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
        onAdd={handleAdd}
        onImportClick={() => setIsImportOpen(true)}
      />

      <RoomTable
        rooms={displayRooms}
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

      <ModalCreateRoom
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initial={currentRoom}
      />

      <ModalImportRooms
        isOpen={isImportOpen}
        onClose={() => setIsImportOpen(false)}
        onImport={(rows) => handleImport(rows)}
      />
    </div>
  );
};

export default GestionSalles;
