// src/components/gestExamen/ModalMoreInfoExam.jsx
import React from 'react';

const ModalMoreInfoExam = ({ isOpen, onClose, exam }) => {
  if (!isOpen) return null;

  // Helpers
  const formatDateTime = (iso) => {
    if (!iso) return "18/11/2025 - 8h30";
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    const h = d.getHours();
    const min = d.getMinutes();
    const timeStr = `${h}h${min === 0 ? '00' : String(min).padStart(2,'0')}`;
    return `${dd}/${mm}/${yyyy} - ${timeStr}`;
  };

  const computeDuration = (startIso, endIso) => {
    if (!startIso || !endIso) return "1h30";
    const s = new Date(startIso);
    const e = new Date(endIso);
    const mins = Math.round((e - s) / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    if (h === 0) return `${m}min`;
    return m === 0 ? `${h}h` : `${h}h${String(m).padStart(2,'0')}`;
  };

  // Fallback values
  const typeText = exam?.type || "Examen Final";
  const levelText = exam?.level || "Licence 1 - Informatique";
  const moduleText = exam?.title || "Algorithmique 1";
  const dateTimeText = formatDateTime(exam?.start);
  const durationText = computeDuration(exam?.start, exam?.end);
  const teacherText = exam?.teacher || "Mme Kazi";

  // salles / locations (strings)
  const salleLines = (() => {
    if (Array.isArray(exam?.locations) && exam.locations.length) return exam.locations;
    return [
      "Salle A101 - Groupe 1 - M. Ahmed / P. Omar",
      "Salle A102 - Groupe 2 - Mme Sara / K. Yassine",
      "Salle A103 - Groupe 3 - M. Youssef / M. Sara"
    ];
  })();

  // Try to build a surveillants list:
  //  - prefer exam.surveillants as array (strings or {name, statut})
  //  - otherwise extract from salleLines after the 2nd '-' and split by '/'
  const extractFromSalleLines = (lines = []) => {
    const arr = [];
    lines.forEach((ln) => {
      if (typeof ln !== 'string') return;
      // Split on '-' and take everything after the second dash
      const parts = ln.split('-').map(p => p.trim());
      if (parts.length >= 3) {
        const surveillantsPart = parts.slice(2).join(' - '); // join in case there are extra '-'
        surveillantsPart.split('/').forEach(s => {
          const name = s.trim();
          if (name) arr.push({ name, statut: "En Attente" });
        });
      } else {
        // fallback: try splitting whole line by '/'
        ln.split('/').forEach(s => {
          const name = s.trim();
          if (name && !name.toLowerCase().includes('salle') && !name.toLowerCase().includes('groupe')) {
            arr.push({ name, statut: "En Attente" });
          }
        });
      }
    });
    return arr;
  };

  const surveillantsList = (() => {
    if (Array.isArray(exam?.surveillants) && exam.surveillants.length) {
      return exam.surveillants.map(s =>
        typeof s === 'string'
          ? // try to parse status from string "Name (Status)" else default
            (() => {
              const m = s.match(/^(.*)\s*\((.*)\)\s*$/);
              if (m) return { name: m[1].trim(), statut: m[2].trim() || "En Attente" };
              return { name: s.trim(), statut: "En Attente" };
            })()
          : // object { name, statut }
            { name: s.name || "", statut: s.statut || s.status || "En Attente" }
      );
    }
    // fallback: extract from salleLines
    return extractFromSalleLines(salleLines);
  })();

  const statusBadgeClass = (statut) => {
    const s = (statut || "").toString().toLowerCase();
    if (["accepté", "accept", "accepted", "accepte"].includes(s)) return "bg-green-100 text-green-800";
    if (["refusé", "refuse", "refused", "refus"].includes(s)) return "bg-red-100 text-red-800";
    return "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="modal-moreInfoExam w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0" onClick={onClose}></div>

      <div className="modal-InfoExam w-[80vw] h-[80vh] bg-white rounded-[10px] relative z-[1001] flex flex-col justify-start items-center overflow-x-hidden">
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px]">
          <h2 className="text-[20px] font-bold font-nunito">Details de l'examen</h2>
          <button className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:opacity-80 transition-all duration-300" onClick={onClose}>
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div className="content-modal w-full h-[calc(100%-100px)] p-[20px] overflow-y-auto overflow-x-hidden">
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Type d'examen</h2>
            <p className="text-[14px] font-semibold font-nunito">{typeText}</p>
          </div>

          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Niveau</h2>
            <p className="text-[14px] font-semibold font-nunito">{levelText}</p>
          </div>

          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Module</h2>
            <p className="text-[14px] font-semibold font-nunito">{moduleText}</p>
          </div>

          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Date - Heure de l'examen</h2>
            <p className="text-[14px] font-semibold font-nunito">{dateTimeText}</p>
          </div>

          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Durée de l'examen</h2>
            <p className="text-[14px] font-semibold font-nunito">{durationText}</p>
          </div>

          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Enseignant(e) responsable</h2>
            <p className="text-[14px] font-semibold font-nunito">{teacherText}</p>
          </div>

          {/* Salles */}
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Salles - Groupes - Surveillant(e)s</h2>
            <div>
              {salleLines.map((line, idx) => (
                <p key={idx} className="text-[14px] font-semibold font-nunito">{line}</p>
              ))}
            </div>
          </div>

          {/* Surveillants (avec statut) */}
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Statut Surveillant(e)s</h2>
            <div className="flex flex-col gap-2">
              {surveillantsList.length === 0 && <p className="text-[14px] text-[#6b6b6b]">Aucun surveillant renseigné</p>}
              {surveillantsList.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <p className="text-[14px] font-semibold font-nunito">{s.name}</p>
                  <span className={`inline-block px-3 py-1 rounded-full text-xs ${statusBadgeClass(s.statut)}`}>
                    {s.statut}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="BtnSaveCancel w-[90%] h-[40px] flex justify-end items-center gap-[10px] mt-[10px] mb-[10px]">
          <button className="BtnSave w-[200px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] font-nunito text-[16px] font-semibold cursor-pointer border-none bg-[rgb(7,26,131)] text-white hover:opacity-80 transition-all duration-300">
            <img src="/src/assets/icons/editer1.png" alt="Modifier" className="w-[20px] h-[20px]" />
            Modifier l'examen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMoreInfoExam;
