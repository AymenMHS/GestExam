import React, { useState } from "react";
import TeacherTable from "./TeacherTable";
import FilterBarTeachers from "./FilterBarTeacher";
import ModalCreateTeacher from "./ModalCreateTeacher";
import PaginationStudents from "../gestEtudiant/PaginationStudents"; // Reusing the pagination from students

const GestionEnseignants = () => {
  const [search, setSearch] = useState("");
  const [statut, setStatut] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTeacher, setCurrentTeacher] = useState(null);

  // Mock Data based on the screenshot
  const [teachers, setTeachers] = useState([
    { code: "E-37011453", nom: "Hadj Slimane", prenom: "Mohammed Aymen", dateNaissance: "25/08/2002", statut: "Actif", surveillancesMax: 4 },
    { code: "E-37011453", nom: "Gourari", prenom: "Azem Soulyman", dateNaissance: "25/08/2002", statut: "Actif", surveillancesMax: 5 },
    { code: "E-37011453", nom: "Yahiaoui", prenom: "Djaber", dateNaissance: "25/08/2002", statut: "Actif", surveillancesMax: 2 },
    { code: "E-37011453", nom: "Mekidiche", prenom: "Mohamed Hichem", dateNaissance: "25/08/2002", statut: "Actif", surveillancesMax: 3 },
    { code: "E-37011453", nom: "Satha", prenom: "Zakarya", dateNaissance: "25/08/2002", statut: "En congé", surveillancesMax: 4 },
    { code: "E-37011453", nom: "Hadj Slimane", prenom: "Mohammed Aymen", dateNaissance: "25/08/2002", statut: "Inactif", surveillancesMax: 4 },
    { code: "E-37011453", nom: "Gourari", prenom: "Azem Soulyman", dateNaissance: "25/08/2002", statut: "Actif", surveillancesMax: 3 },
    { code: "E-37011453", nom: "Yahiaoui", prenom: "Djaber", dateNaissance: "25/08/2002", statut: "Actif", surveillancesMax: 5 },
  ]);

  const itemsPerPage = 8;

  // Filtering Logic
  const filteredTeachers = teachers.filter(t => {
    const matchSearch = (t.nom.toLowerCase().includes(search.toLowerCase()) || t.prenom.toLowerCase().includes(search.toLowerCase()));
    const matchStatut = statut ? t.statut === statut : true;
    return matchSearch && matchStatut;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);
  const displayTeachers = filteredTeachers.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleAdd = () => {
    setCurrentTeacher(null);
    setIsModalOpen(true);
  };

  const handleEdit = (teacher) => {
    setCurrentTeacher(teacher);
    setIsModalOpen(true);
  };

  const handleDelete = (teacher) => {
    if(window.confirm(`Supprimer ${teacher.nom} ?`)) {
        setTeachers(teachers.filter(t => t !== teacher));
    }
  };

  const handleSave = (formData) => {
    if (currentTeacher) {
      // Edit logic
      setTeachers(teachers.map(t => t === currentTeacher ? { ...t, ...formData } : t));
    } else {
      // Add logic
      setTeachers([...teachers, { ...formData, code: "E-" + Math.floor(Math.random()*10000000) }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="w-full h-full p-6 bg-white flex flex-col font-nunito">
      <h1 className="text-[24px] font-bold text-[#333] mb-6">Gestion des Enseignants</h1>

      <FilterBarTeachers 
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        statut={statut}
        onStatutChange={(e) => setStatut(e.target.value)}
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