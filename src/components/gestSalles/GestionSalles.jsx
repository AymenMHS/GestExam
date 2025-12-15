import React, { useState } from "react";
import FilterBarRooms from "./FilterBarRooms";
import RoomTable from "./RoomTable";
import ModalCreateRoom from "./ModalCreateRoom";
import PaginationStudents from "../gestEtudiant/PaginationStudents"; // Reuse your existing pagination
import ModalImportRooms from "./ModalImportRooms"; // nouveau modal d'import

const GestionSalles = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [isImportOpen, setIsImportOpen] = useState(false);

  // Mock Data
  const [rooms, setRooms] = useState([
    { code: "E-37011453", nom: "Amphi 4", type: "amphi", capacite: 4 },
    { code: "E-37011454", nom: "N101", type: "salle", capacite: 5 },
    { code: "E-37011455", nom: "N102", type: "salle", capacite: 2 },
    { code: "E-37011456", nom: "L001", type: "labo", capacite: 3 },
    { code: "E-37011457", nom: "S202", type: "salle", capacite: 4 },
    { code: "E-37011458", nom: "L203", type: "labo", capacite: 4 },
    { code: "E-37011459", nom: "N103", type: "salle", capacite: 3 },
    { code: "E-37011460", nom: "N104", type: "salle", capacite: 5 },
  ]);

  const itemsPerPage = 7;

  // Filter Logic
  const filteredRooms = rooms.filter(r => {
    const q = search.trim().toLowerCase();
    const matchSearch =
      q === "" ||
      r.nom.toLowerCase().includes(q) ||
      (r.code || "").toLowerCase().includes(q);
    const matchType = typeFilter ? r.type === typeFilter : true;
    return matchSearch && matchType;
  });

  // Pagination Logic
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

  const handleDelete = (room) => {
    if (window.confirm(`Voulez-vous vraiment supprimer la salle ${room.nom} ?`)) {
      setRooms(prev => prev.filter(r => r !== room));
      // éventuelle correction de la page
      setPage(p => Math.min(p, Math.max(1, Math.ceil((filteredRooms.length - 1) / itemsPerPage))));
    }
  };

  const handleSave = (formData) => {
    if (currentRoom) {
      // Update
      setRooms(prev => prev.map(r => (r === currentRoom ? { ...r, ...formData } : r)));
    } else {
      // Create (ajout à la fin)
      setRooms(prev => [...prev, { ...formData, code: "E-" + Math.floor(Math.random() * 100000000) }]);
    }
  };

  // Assure l'unicité des codes (si doublon, ajoute -1, -2, ...)
  const ensureUniqueCode = (baseCode, existingSet) => {
    let code = baseCode || `E-${Math.floor(Math.random() * 100000000)}`;
    code = code.toString();
    if (!existingSet.has(code)) {
      existingSet.add(code);
      return code;
    }
    let suffix = 1;
    while (existingSet.has(`${code}-${suffix}`)) suffix++;
    const newCode = `${code}-${suffix}`;
    existingSet.add(newCode);
    return newCode;
  };

  // Import rows: rows = [{code, nom, type, capacite}, ...]
  const handleImport = (importedRows) => {
    if (!Array.isArray(importedRows) || importedRows.length === 0) return;

    // construire set des codes existants
    const existing = new Set(rooms.map(r => (r.code || "").toString()));

    const prepared = importedRows.map(r => {
      const base = (r.code || "").toString().trim();
      const code = ensureUniqueCode(base || null, existing);
      return {
        code,
        nom: (r.nom || "Salle").toString(),
        type: (r.type || "salle").toString(),
        capacite: Number(r.capacite) || 0,
      };
    });

    // insérer en tête pour visibilité immédiate
    setRooms(prev => [...prepared, ...prev]);
    setIsImportOpen(false);
    // afficher la 1ère page
    setPage(1);
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
