import React, { useState } from "react";
import FilterBar from "/src/components/gestExamen/FilterBar";
import ExamTable from "/src/components/gestExamen/ExamTable";
import Pagination from "/src/components/gestExamen/Pagination";
import ModalCreateExam from "/src/components/gestExamen/ModalCreateExam";
import ModalMoreInfoExam from "/src/components/gestExamen/ModalMoreInfoExam";

const GestExamen = () => {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const examens = [
    { code: "EX123", niveau: "M1 - Intelligence Artificielle", module: "Algorithmique", type: "Examen Final", date: "15/06/2024", horaire: "10:00 - 12:00" },
    { code: "EX124", niveau: "L2 - Informatique", module: "Algorithmique", type: "Examen Final", date: "15/06/2024", horaire: "10:00 - 12:00" },
    { code: "EX125", niveau: "L2 - Informatique", module: "Algorithmique", type: "Examen Final", date: "15/06/2024", horaire: "10:00 - 12:00" },
    { code: "EX126", niveau: "L2 - Informatique", module: "Algorithmique", type: "Examen Final", date: "15/06/2024", horaire: "10:00 - 12:00" },
    { code: "EX127", niveau: "L2 - Informatique", module: "Algorithmique", type: "Examen Final", date: "15/06/2024", horaire: "10:00 - 12:00" },
    { code: "EX128", niveau: "L2 - Informatique", module: "Algorithmique", type: "Examen Final", date: "15/06/2024", horaire: "10:00 - 12:00" }
  ];

  const handleView = (exam) => {
    setSelectedExam(exam);
    setShowMoreInfoModal(true);
  };

  // ouvre modal de creation/edition
  const handleEdit = (exam) => {
    setSelectedExam(exam);
    setShowCreateModal(true);
  };

  return (
    <div className="flex justify-center items-start w-full min-h-[60vh] bg-[#E3F0FF] p-5">
      <div className="w-full max-w-[1200px]">
        <div className="gestExamen w-full bg-white rounded-lg p-3 flex flex-col items-center gap-2">
          <h1 className="text-[20px] font-bold w-full font-nunito">Gestion des examens</h1>

          <FilterBar onAdd={() => setShowCreateModal(true)} />

          <div className="container-exam w-full bg-[#F9F9F9] rounded-lg p-2 overflow-visible">
            <ExamTable examens={examens} onView={handleView} onEdit={handleEdit} />
          </div>

          <Pagination />

        </div>
      </div>

      <ModalMoreInfoExam
        isOpen={showMoreInfoModal}
        onClose={() => setShowMoreInfoModal(false)}
        exam={selectedExam}
      />

      <ModalCreateExam
        isOpen={showCreateModal}
        onClose={() => {
          setShowCreateModal(false);
          setSelectedExam(null);
        }}
        exam={selectedExam}
      />
    </div>
  );
};

export default GestExamen;
