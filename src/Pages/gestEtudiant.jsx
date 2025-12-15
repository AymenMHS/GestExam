import React, { useState, useMemo, useEffect } from "react";
import FilterBarStudents from "/src/components/gestEtudiant/FilterBarStudents";
import StudentTable from "/src/components/gestEtudiant/StudentTable";
import PaginationStudents from "/src/components/gestEtudiant/PaginationStudents";
import ModalCreateStudent from "/src/components/gestEtudiant/ModalCreateStudent";
import ModalImportStudents from "/src/components/gestEtudiant/ModalImportStudents";
import GroupsView from "/src/components/gestEtudiant/GroupsView";

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
  const [groups, setGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [niveau, setNiveau] = useState("");
  const [groupeFilter, setGroupeFilter] = useState("");
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // pagination state
  const [page, setPage] = useState(1);
  const perPage = 8;

  // onglet actif : 'all' | 'groups'
  const [activeTab, setActiveTab] = useState("all");

  // initialize groups from existing student.groupe (simple deduction)
  useEffect(() => {
    // construit la liste de groupes uniques par niveau à partir des étudiants (si groupe string présent)
    const map = {};
    students.forEach(s => {
      if (s.groupe && s.groupe.trim() !== "") {
        const key = `${s.groupe}__${s.niveau}`;
        map[key] = { name: s.groupe, niveau: s.niveau, capacity: 22 };
      }
    });
    const arr = Object.values(map);
    setGroups(prev => {
      // conserve les groupes existants qui ne viennent pas des students (si tu veux)
      // ici on remplace pour cohérence
      return arr;
    });
  }, []); // une seule fois au montage

  // computed filtered students
  const filtered = useMemo(() => {
    return students.filter(s => {
      const q = search.trim().toLowerCase();
      if (q) {
        const match = (s.code + " " + s.nom + " " + s.prenom + " " + (s.email || "")).toLowerCase();
        if (!match.includes(q)) return false;
      }
      if (niveau && s.niveau !== niveau) return false;
      if (groupeFilter && s.groupe !== groupeFilter) return false;
      return true;
    });
  }, [students, search, niveau, groupeFilter]);

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
      const code = student.code || `S${String(Math.floor(Math.random() * 900) + 100)}`;
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
      code: r.code || `S${Math.floor(Math.random() * 900) + 100}`,
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

  // compute dynamic group options for select
  const groupesPourNiveau = useMemo(() => {
    if (!niveau) return [];
    return groups.filter(g => g.niveau === niveau).map(g => g.name);
  }, [groups, niveau]);

  // --- helper pour assigner/retirer étudiants depuis la vue group (utilisée par GroupsView) ---
  function assignStudentToGroup(studentCode, groupName) {
    setStudents(prev => prev.map(s => (s.code === studentCode ? { ...s, groupe: groupName } : s)));
  }
  function unassignStudent(studentCode) {
    setStudents(prev => prev.map(s => (s.code === studentCode ? { ...s, groupe: "" } : s)));
  }

  return (
    <div className="flex justify-center items-start w-full min-h-[60vh] bg-[#E3F0FF] p-5">
      <div className="w-full max-w-[1200px]">
        <div className="gestEtudiant w-full bg-white rounded-lg p-3 flex flex-col items-center gap-2">
          <h1 className="text-[20px] font-bold w-full font-nunito">Gestion des étudiants</h1>

          {/* Tabs */}
          <div className="w-full flex gap-2">
            <button onClick={() => setActiveTab("all")} className={`px-3 py-1 rounded ${activeTab === "all" ? "bg-[#ECF0FF] border-2 border-[#3B679A]" : "bg-white"}`}>Tous les étudiants</button>
            <button onClick={() => setActiveTab("groups")} className={`px-3 py-1 rounded ${activeTab === "groups" ? "bg-[#ECF0FF] border-2 border-[#3B679A]" : "bg-white"}`}>Groupes</button>
          </div>

          {/* Tab panels */}
          {activeTab === "all" && (
            <>
              <FilterBarStudents
                search={search}
                onSearchChange={(e) => { setSearch(e.target.value); setPage(1); }}
                niveau={niveau}
                onNiveauChange={(e) => { setNiveau(e.target.value); setGroupeFilter(""); setPage(1); }}
                groupe={groupeFilter}
                onGroupeChange={(e) => { setGroupeFilter(e.target.value); setPage(1); }}
                onImport={() => setShowImportModal(true)}
                onAdd={onAdd}
                showGroupSelect={false} // <-- cacher le select 'filtrer par groupe' comme demandé
                groupesOptions={[]} // pas utilisé ici
              />

              <div className="container-student w-full bg-[#F9F9F9] rounded-lg p-2 overflow-visible">
                <StudentTable students={visibleStudents} onEdit={onEdit} onDelete={onDelete} showGroupColumn={false} />
              </div>

              <PaginationStudents
                page={currentPage}
                totalPages={filteredTotalPages}
                onPrev={() => setPageSafe(currentPage - 1)}
                onNext={() => setPageSafe(currentPage + 1)}
                onGoto={(p) => setPageSafe(p)}
              />
            </>
          )}

          {activeTab === "groups" && (
            <>
              <div className="w-full bg-[#F9F9F9] rounded-lg p-3">
                <GroupsView
                  students={students}
                  setStudents={setStudents}
                  groups={groups}
                  setGroups={setGroups}
                  MAX_CAPACITY={22}
                />
              </div>
            </>
          )}
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
