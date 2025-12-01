import React, { useState } from "react";
import FilterBarRooms from "./FilterBarRooms";
import RoomTable from "./RoomTable";
import ModalCreateRoom from "./ModalCreateRoom";
import PaginationStudents from "../gestEtudiant/PaginationStudents"; // Reuse your existing pagination

const GestionSalles = () => {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);

  // Mock Data based on Screenshot 2 & 3
  const [rooms, setRooms] = useState([
    { code: "E-37011453", nom: "Amphi 4", type: "amphi", capacite: 4 },
    { code: "E-37011453", nom: "N101", type: "salle", capacite: 5 },
    { code: "E-37011453", nom: "N102", type: "salle", capacite: 2 },
    { code: "E-37011453", nom: "L001", type: "labo", capacite: 3 },
    { code: "E-37011453", nom: "S202", type: "salle", capacite: 4 },
    { code: "E-37011453", nom: "L203", type: "labo", capacite: 4 },
    { code: "E-37011453", nom: "N103", type: "salle", capacite: 3 },
    { code: "E-37011453", nom: "N104", type: "salle", capacite: 5 },
  ]);

  const itemsPerPage = 7;

  // Filter Logic
  const filteredRooms = rooms.filter(r => {
    const matchSearch = r.nom.toLowerCase().includes(search.toLowerCase()) || r.code.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter ? r.type === typeFilter : true;
    return matchSearch && matchType;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
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
      setRooms(rooms.filter(r => r !== room));
    }
  };

  const handleSave = (formData) => {
    if (currentRoom) {
      // Update
      setRooms(rooms.map(r => r === currentRoom ? { ...r, ...formData } : r));
    } else {
      // Create
      setRooms([...rooms, { ...formData, code: "E-" + Math.floor(Math.random() * 100000000) }]);
    }
  };

  return (
    <div className="w-full h-full p-6 bg-white flex flex-col font-nunito">
      <h1 className="text-[24px] font-bold text-[#333] mb-6">Gestion des Salles</h1>

      <FilterBarRooms
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        type={typeFilter}
        onTypeChange={(e) => setTypeFilter(e.target.value)}
        onAdd={handleAdd}
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
    </div>
  );
};

export default GestionSalles;