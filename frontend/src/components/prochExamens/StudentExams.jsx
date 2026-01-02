// src/components/prochExamens/StudentExams.jsx
import React, { useState } from "react";

/**
 * StudentExams.jsx
 * - Liste des prochains examens pour un étudiant
 * - Affichage et style compatibles avec SurveillancesList (enseignant)
 * - Bouton "Voir" ouvre un modal avec le détail (dynamique)
 */

const sampleExams = [
  {
    id: 1,
    code: "EX-101",
    niveau: "Licence 1 - Informatique",
    module: "Algorithmique 1",
    type: "Examen Final",
    date_iso: "2025-11-18T08:30:00",
    horaire: "08:30 - 10:00",
    salle: "Salle N101",
    duree: "1h30",
    enseignant: "Mme Kazi",
  },
  {
    id: 2,
    code: "EX-112",
    niveau: "Licence 1 - Informatique",
    module: "Algebre 1",
    type: "Controle Continu",
    date_iso: "2025-11-20T13:30:00",
    horaire: "13:30 - 15:00",
    salle: "Salle N101",
    duree: "1h30",
    enseignant: "M. Ahmed",
  },
  {
    id: 3,
    code: "EX-137",
    niveau: "Licence 1 - Informatique",
    module: "Physique 1",
    type: "Test TP",
    date_iso: "2025-11-23T11:00:00",
    horaire: "11:00 - 12:30",
    salle: "Salle N101",
    duree: "1h30",
    enseignant: "M. Omar",
  },
];

const parseDateSafe = (input, assumeUTC = true) => {
  if (input instanceof Date) return new Date(input.getTime());
  if (typeof input === "number") return new Date(input);
  if (typeof input === "string") {
    const isoNoZone = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}$/;
    if (assumeUTC && isoNoZone.test(input)) return new Date(input + "Z");
    return new Date(input);
  }
  return null;
};

const formatDate = (iso) => {
  const d = parseDateSafe(iso);
  if (!d || isNaN(d.getTime())) return "";
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
};

const formatTime = (iso) => {
  const d = parseDateSafe(iso);
  if (!d || isNaN(d.getTime())) return "";
  return d.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
};

/* Modal simple pour afficher les details d'un examen (utilisé par l'étudiant) */
const ExamDetailModal = ({ isOpen, onClose, exam }) => {
  if (!isOpen || !exam) return null;

  return (
    <div className="modal-exam w-screen h-screen fixed top-0 left-0 flex items-center justify-center z-[1200]">
      <div
        className="overlay absolute inset-0 bg-[rgba(0,0,0,0.6)]"
        onClick={onClose}
      />
      <div className="z-[1201] w-[90vw] max-w-[820px] bg-white rounded-[10px] shadow-lg overflow-auto">
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <h2 className="text-[18px] font-bold">Détail de l'examen</h2>
          <button onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded hover:bg-gray-100">
            <img src="/src/assets/icons/x.png" alt="fermer" className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-y-3 gap-x-6">
            <div className="flex gap-4">
              <div className="w-[160px] text-[#6b6b6b]">Type d'examen</div>
              <div className="font-semibold">{exam.type}</div>
            </div>

            <div className="flex gap-4">
              <div className="w-[160px] text-[#6b6b6b]">Niveau</div>
              <div className="font-semibold">{exam.niveau}</div>
            </div>

            <div className="flex gap-4">
              <div className="w-[160px] text-[#6b6b6b]">Module</div>
              <div className="font-semibold">{exam.module}</div>
            </div>

            <div className="flex gap-4">
              <div className="w-[160px] text-[#6b6b6b]">Date - Heure</div>
              <div className="font-semibold">{`${formatDate(exam.date_iso)} - ${formatTime(exam.date_iso)}`}</div>
            </div>

            <div className="flex gap-4">
              <div className="w-[160px] text-[#6b6b6b]">Durée</div>
              <div className="font-semibold">{exam.duree}</div>
            </div>

            <div className="flex gap-4">
              <div className="w-[160px] text-[#6b6b6b]">Enseignant(e)</div>
              <div className="font-semibold">{exam.enseignant}</div>
            </div>

            <div className="col-span-2 mt-3">
              <div className="w-full bg-[#F7F7F7] rounded p-3">
                <div className="font-medium text-[#6b6b6b] mb-1">Salle</div>
                <div className="font-semibold">{exam.salle}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-[#D2D2D2] rounded hover:opacity-90">Fermer</button>
        </div>
      </div>
    </div>
  );
};

const StudentExams = () => {
  const [items] = useState(sampleExams);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
  };

  return (
    <div className="student-exams w-full p-4 bg-white rounded-[8px] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[18px] font-bold">Mes prochains examens</h2>
          <p className="text-[13px] text-[#8b96a6] mt-1">{items.length} examens planifiés</p>
        </div>

        <div>
          <button className="min-w-[140px] bg-[#3B679A] rounded-[8px] text-white text-[14px] flex items-center justify-center gap-2 py-2 px-3 shadow-sm hover:opacity-80">
            <img src="/src/assets/icons/calendrier.png" alt="cal" className="w-[16px] h-[16px]" />
            Voir calendrier
          </button>
        </div>
      </div>

      <div className="table w-full border border-[#E0E0E0] rounded-[8px] overflow-hidden">
        {/* header */}
        <div className="w-full flex items-center justify-between bg-[#E9EFFF] px-4 py-3 border-b font-semibold text-[#555555]">
          <div className="w-[18%]">Date</div>
          <div className="w-[14%]">Heure</div>
          <div className="w-[26%]">Examen</div>
          <div className="w-[20%]">Salle</div>
          <div className="w-[12%] text-center">Actions</div>
        </div>

        {/* rows */}
        <div className="divide-y divide-[#E0E0E0]">
          {items.map((it) => (
            <div key={it.id} className="w-full flex items-center justify-between px-4 py-3 hover:bg-white transition-all duration-150">
              <div className="w-[18%] text-[14px] font-medium">{formatDate(it.date_iso)}</div>
              <div className="w-[14%] text-[14px]">{formatTime(it.date_iso)}</div>
              <div className="w-[26%] text-[14px] font-medium">{it.module}</div>
              <div className="w-[20%] text-[14px]">{it.salle}</div>
              <div className="w-[12%] text-center">
                <button
                  onClick={() => handleView(it)}
                  className="w-[90px] h-[34px] bg-[#1d599c] text-white rounded-[8px] font-medium hover:opacity-90 transition-all duration-200"
                >
                  Voir
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* pagination (copié du style existant) */}
      <div className="mt-4 flex justify-end">
        <div className="pagination-exam flex items-center gap-2">
          <button className="w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] flex items-center justify-center"><img src="/src/assets/icons/left-arrow.png" alt="prev" className="w-[12px] h-[12px]" /></button>
          <button className="w-[34px] h-[34px] bg-[#ECF0FF] rounded-[6px] border-2 border-[#3B679A]">1</button>
          <button className="w-[34px] h-[34px] bg-white rounded-[6px]">2</button>
          <button className="w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] flex items-center justify-center"><img src="/src/assets/icons/right-arrow.png" alt="next" className="w-[12px] h-[12px]" /></button>
        </div>
      </div>

      <ExamDetailModal isOpen={isModalOpen} onClose={handleCloseModal} exam={selectedExam} />
    </div>
  );
};

export default StudentExams;