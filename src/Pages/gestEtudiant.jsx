import React, { useState, useMemo } from "react";
import FilterBarStudents from "/src/components/gestEtudiant/FilterBarStudents";
import StudentTable from "/src/components/gestEtudiant/StudentTable";
import PaginationStudents from "/src/components/gestEtudiant/PaginationStudents";
import ModalCreateStudent from "/src/components/gestEtudiant/ModalCreateStudent";
import ModalImportStudents from "/src/components/gestEtudiant/ModalImportStudents";

const GestEtudiant = () => {
  // sample data
  const initialStudents = [
    { code: "S001", nom: "Bend", prenom: "Amir", dateNaissance: "2001-03-12", niveau: "L1", groupe: "Groupe 1", email: "amir@example.com", identifiant: "amir", password: "" },
    { code: "S002", nom: "Zitoun", prenom: "Sara", dateNaissance: "2000-07-22", niveau: "L2", groupe: "Groupe 2", email: "sara@example.com", identifiant: "sara", password: "" },
    { code: "S003", nom: "Kacem", prenom: "Omar", dateNaissance: "1999-11-02", niveau: "L2", groupe: "Groupe 1", email: "omar@example.com", identifiant: "omar", password: "" },
    { code: "S004", nom: "Ait", prenom: "Nadia", dateNaissance: "2002-01-15", niveau: "L3", groupe: "Groupe 3", email: "nadia@example.com", identifiant: "nadia", password: "" },
    { code: "S005", nom: "Haddad", prenom: "Yaseen", dateNaissance: "2001-09-02", niveau: "M1", groupe: "Groupe A", email: "yaseen@example.com", identifiant: "yaseen", password: "" },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [search, setSearch] = useState("");
  const [niveau, setNiveau] = useState("");
  const [groupe, setGroupe] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // pagination state
  const [page, setPage] = useState(1);
  const perPage = 8;

  // dynamic groups per niveau (sample)
  const groupsByNiveau = {
    L1: ["Groupe 1", "Groupe 2"],
    L2: ["Groupe 1", "Groupe 2", "Groupe 3"],
    L3: ["Groupe 1", "Groupe 2", "Groupe 3", "Groupe 4"],
    M1: ["Groupe A", "Groupe B"],
    M2: ["Groupe A", "Groupe B"],
  };

  // computed filtered students
  const filtered = useMemo(() => {
    return students.filter(s => {
      const q = search.trim().toLowerCase();
      if (q) {
        const match = (s.code + " " + s.nom + " " + s.prenom + " " + (s.email||"")).toLowerCase();
        if (!match.includes(q)) return false;
      }
      if (niveau && s.niveau !== niveau) return false;
      if (groupe && s.groupe !== groupe) return false;
      return true;
    });
  }, [students, search, niveau, groupe]);

  const onAdd = () => {
    setSelectedStudent(null);
    setShowCreateModal(true);
  };

  const onSaveStudent = (student) => {
    if (student && student.code && students.some(s => s.code === student.code)) {
      // update
      setStudents(prev => prev.map(s => (s.code === student.code ? student : s)));
    } else {
      // generate code if missing
      const code = student.code || `S${String(Math.floor(Math.random()*900)+100)}`;
      setStudents(prev => [{ ...student, code }, ...prev]);
    }
  };

  const onEdit = (student) => {
    setSelectedStudent(student);
    setShowCreateModal(true);
  };

  const onDelete = (student) => {
    if (confirm(`Supprimer ${student.nom} ${student.prenom} ?`)) {
      setStudents(prev => prev.filter(s => s.code !== student.code));
    }
  };

  const handleImport = (importedRows) => {
    const cleaned = importedRows.map(r => ({
      code: r.code || `S${Math.floor(Math.random()*900)+100}`,
      nom: r.nom || "",
      prenom: r.prenom || "",
      dateNaissance: r.dateNaissance || "",
      niveau: r.niveau || "",
      groupe: r.groupe || "",
      email: r.email || "",
      identifiant: r.identifiant || "",
      password: r.password || ""
    }));
    setStudents(prev => [...cleaned, ...prev]);
  };

  // pagination for filtered list
  const filteredTotalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const currentPage = Math.min(page, filteredTotalPages);
  const setPageSafe = (p) => setPage(Math.max(1, Math.min(p, filteredTotalPages)));
  const visibleStudents = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  // compute dynamic group options for select (the FilterBar select will be populated client-side if you adapt it; for now the select is static in the component)
  const groupesPourNiveau = groupsByNiveau[niveau] ?? [];

  return (
    <div className="flex justify-center items-start w-full min-h-[60vh] bg-[#E3F0FF] p-5">
      <div className="w-full max-w-[1200px]">
        <div className="gestEtudiant w-full bg-white rounded-lg p-3 flex flex-col items-center gap-2">
          <h1 className="text-[20px] font-bold w-full font-nunito">Gestion des étudiants</h1>

          <FilterBarStudents
            search={search}
            onSearchChange={(e) => { setSearch(e.target.value); setPage(1); }}
            niveau={niveau}
            onNiveauChange={(e) => { setNiveau(e.target.value); setGroupe(""); setPage(1); }}
            groupe={groupe}
            onGroupeChange={(e) => { setGroupe(e.target.value); setPage(1); }}
            onImport={() => setShowImportModal(true)}
            onAdd={onAdd}
          />

          <div className="container-student w-full bg-[#F9F9F9] rounded-lg p-2 overflow-visible">
            <StudentTable students={visibleStudents} onEdit={onEdit} onDelete={onDelete} />
          </div>

          <PaginationStudents
            page={currentPage}
            totalPages={filteredTotalPages}
            onPrev={() => setPageSafe(currentPage - 1)}
            onNext={() => setPageSafe(currentPage + 1)}
            onGoto={(p) => setPageSafe(p)}
          />
        </div>
      </div>

      <ModalCreateStudent
        isOpen={showCreateModal}
        onClose={() => { setShowCreateModal(false); setSelectedStudent(null); }}
        onSave={onSaveStudent}
        initial={selectedStudent}
      />

      <ModalImportStudents
        isOpen={showImportModal}
        onClose={() => setShowImportModal(false)}
        onImport={handleImport}
      />
    </div>
  );
};

export default GestEtudiant;
