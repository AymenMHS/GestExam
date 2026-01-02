import React, { useEffect, useMemo, useState } from "react";


const EXAM_TYPES = [
  "Controle continue",
  "Examen final",
  "Test TP",
  "Examen Final Rattrapage",
  "Examen final Remplacements",
  "Controle Continue Remplacements",
  "Test TP Remplacements",
];

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function formatDate(d) {
  if (!d) return "";
  const dt = new Date(d);
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = dt.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function timeStringToParts(t = "08:30") {
  const [hh, mm] = t.split(":").map((x) => Number(x));
  return { hh, mm };
}

const ExamEditModal = ({ isOpen, exam, onClose, onSave }) => {
  const [local, setLocal] = useState(exam || {});

  useEffect(() => setLocal(exam || {}), [exam]);

  if (!isOpen || !exam) return null;

  return (
    <div className="modal-editExam w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0" onClick={onClose}></div>

      <div className="modal-create w-[60vw] max-h-[80vh] bg-white rounded-[10px] relative z-[1001] flex flex-col items-center overflow-x-hidden">
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px]">
          <h2 className="text-[20px] font-bold font-nunito">Modifier l'examen</h2>
          <button className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:opacity-80 transition-all duration-300" onClick={onClose}>
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div className="content-modal w-full p-[20px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[14px] font-nunito font-semibold">Type d'examen</label>
              <select
                value={local.type || ""}
                onChange={(e) => setLocal({ ...local, type: e.target.value })}
                className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-1"
              >
                {EXAM_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-[14px] font-nunito font-semibold">Date</label>
              <input
                type="date"
                value={local.date ? new Date(local.date).toISOString().slice(0, 10) : ""}
                onChange={(e) => setLocal({ ...local, date: e.target.value ? new Date(e.target.value).toISOString() : "" })}
                className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-1"
              />
            </div>

            <div>
              <label className="text-[14px] font-nunito font-semibold">Heure</label>
              <input
                type="time"
                value={local.time || "08:30"}
                onChange={(e) => setLocal({ ...local, time: e.target.value })}
                className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-1"
              />
            </div>

            <div>
              <label className="text-[14px] font-nunito font-semibold">Durée (minutes)</label>
              <input
                type="number"
                min={15}
                step={15}
                value={local.durationMinutes || 90}
                onChange={(e) => setLocal({ ...local, durationMinutes: Number(e.target.value) })}
                className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[14px] font-nunito font-semibold">Enseignant(e) responsable</label>
              <input
                type="text"
                value={local.teacher || ""}
                onChange={(e) => setLocal({ ...local, teacher: e.target.value })}
                className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-1"
                placeholder="Nom surveillant / professeur"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-[14px] font-nunito font-semibold">Salles / Groupes / Surveillants</label>
              <textarea
                value={local.roomsInfo || ""}
                onChange={(e) => setLocal({ ...local, roomsInfo: e.target.value })}
                className="w-full mt-1 bg-[#F2F2F2] rounded-[5px] p-2.5"
                placeholder="Ex: Salle A101 - Groupe 1 - M. Ahmed / P. Omar"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="BtnSaveCancel w-[90%] h-[60px] flex justify-end items-center gap-[10px] mt-[10px] mb-[10px]">
          <button className="BtnCancel w-[150px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] font-nunito text-[16px] font-semibold bg-[rgb(102,102,102)] text-white" onClick={onClose}>
            <img src="/src/assets/icons/annuler-la-fleche.png" alt="Annuler" className="w-[20px] h-[20px]" />
            Annuler
          </button>

          <button
            className="BtnSave w-[160px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] font-nunito text-[16px] font-semibold bg-[rgb(7,26,131)] text-white"
            onClick={() => onSave && onSave(local)}
          >
            <img src="/src/assets/icons/sauvegarder.png" alt="Enregistrer" className="w-[20px] h-[20px]" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default function AutoScheduleModal({ isOpen, onClose, promo, onSchedule }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [examType, setExamType] = useState(EXAM_TYPES[0]);
  const [separationDays, setSeparationDays] = useState(1);
  const [timeDefault, setTimeDefault] = useState("08:30");
  const [durationMinutes, setDurationMinutes] = useState(90);
  const [preview, setPreview] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showEdit, setShowEdit] = useState(false);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (!isOpen) {
      // reset local when closed
      setStartDate("");
      setEndDate("");
      setExamType(EXAM_TYPES[0]);
      setSeparationDays(1);
      setTimeDefault("08:30");
      setDurationMinutes(90);
      setPreview([]);
      setSelectedIdx(null);
      setShowEdit(false);
      setWarning("");
    }
  }, [isOpen]);

  const modulesList = useMemo(() => {
    if (!promo) return [];
    const s1 = Array.isArray(promo.modulesS1) ? promo.modulesS1 : [];
    const s2 = Array.isArray(promo.modulesS2) ? promo.modulesS2 : [];
    // flatten to list of module objects with name and coef
    return [...s1, ...s2].map((m) => ({ name: m.name || m.title || m, coef: m.coef || 1 }));
  }, [promo]);

  const generatePreview = () => {
    setWarning("");
    if (!startDate || !endDate) {
      setWarning("Choisissez une période valide.");
      return;
    }
    const sd = new Date(startDate);
    const ed = new Date(endDate);
    if (sd > ed) {
      setWarning("La date de début doit être avant la date de fin.");
      return;
    }
    if (modulesList.length === 0) {
      setWarning("Aucun module disponible pour cette promo.");
      return;
    }

    const exams = [];
    let i = 0;
    // index for step in days: modules assigned in order, each spaced by separationDays
    while (i < modulesList.length) {
      const examDate = addDays(sd, i * separationDays);
      if (examDate > ed) break;
      const hhmm = timeDefault || "08:30";
      exams.push({
        id: `${modulesList[i].name.replace(/\s+/g, "_")}_${i}`,
        module: modulesList[i].name,
        type: examType,
        level: promo.title,
        date: examDate.toISOString(),
        time: hhmm,
        durationMinutes,
        teacher: "",
        roomsInfo: "",
      });
      i++;
    }

    if (i < modulesList.length) {
      setWarning(
        `La période choisie ne suffit pas pour planifier tous les modules (${modulesList.length}). ${i} examens générés. Augmentez la période ou réduisez la séparation.`
      );
    } else {
      setWarning("");
    }
    setPreview(exams);
  };

  const openEdit = (idx) => {
    setSelectedIdx(idx);
    setShowEdit(true);
  };

  const saveEditedExam = (updatedExam) => {
    setPreview((prev) => prev.map((e, i) => (i === selectedIdx ? { ...e, ...updatedExam } : e)));
    setShowEdit(false);
  };

  const removeExam = (idx) => {
    setPreview((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSaveAll = () => {
    if (preview.length === 0) {
      setWarning("Aucune prévisualisation à sauvegarder.");
      return;
    }
    onSchedule && onSchedule(preview);
    onClose && onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-autoSchedule w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0" onClick={onClose}></div>

      <div className="modal-create w-[80vw] max-h-[90vh] bg-white rounded-[10px] relative z-[1001] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px]">
          <h2 className="text-[20px] font-bold font-nunito">Planification automatique des examens</h2>
          <button className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:opacity-80 transition-all duration-300" onClick={onClose}>
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Body */}
        <div className="content-createModal w-full flex gap-4 p-4 overflow-y-auto">
          {/* Left: controls */}
          <div className="w-[40%] min-h-[300px]">
            <div className="bg-[#F8F9FB] p-4 rounded-[8px]">
              <label className="text-[14px] font-nunito font-semibold">Période</label>
              <div className="flex gap-2 mt-2">
                <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-1/2 h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5" />
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-1/2 h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5" />
              </div>

              <label className="text-[14px] font-nunito font-semibold mt-3">Type d'examen</label>
              <select value={examType} onChange={(e) => setExamType(e.target.value)} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-2">
                {EXAM_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>

              <label className="text-[14px] font-nunito font-semibold mt-3">Séparation (jours)</label>
              <select value={separationDays} onChange={(e) => setSeparationDays(Number(e.target.value))} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-2">
                {Array.from({ length: 10 }, (_, i) => i+1).map((n) => <option key={n} value={n}>{n} jour(s)</option>)}
              </select>

              <div className="mt-3 grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[14px] font-nunito font-semibold">Heure par défaut</label>
                  <input type="time" value={timeDefault} onChange={(e) => setTimeDefault(e.target.value)} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-1" />
                </div>
                <div>
                  <label className="text-[14px] font-nunito font-semibold">Durée (min)</label>
                  <input type="number" min={15} step={15} value={durationMinutes} onChange={(e) => setDurationMinutes(Number(e.target.value))} className="w-full h-[36px] bg-[#F2F2F2] rounded-[5px] pl-2.5 mt-1" />
                </div>
              </div>

              <div className="mt-4 flex gap-2 justify-end">
                <button onClick={() => { setPreview([]); setWarning(""); }} className="w-[120px] h-[36px] rounded-[8px] bg-[#666] text-white flex items-center justify-center gap-2 text-sm">
                  Réinitialiser
                </button>
                <button onClick={generatePreview} className="w-[160px] h-[36px] rounded-[8px] bg-[#071A83] text-white flex items-center justify-center gap-2 text-sm">
                  Prévisualiser
                </button>
              </div>

              {warning && <p className="text-sm text-[#b35050] mt-3">{warning}</p>}
            </div>

            {/* quick info */}
            <div className="mt-3 p-3 bg-[#fff7e6] rounded-[8px]">
              <p className="text-sm"><b>Promo:</b> {promo?.title}</p>
              <p className="text-sm"><b>Modules détectés:</b> {modulesList.length}</p>
            </div>
          </div>

          {/* Right: preview list */}
          <div className="w-[60%]">
            <div className="bg-[#F8F9FB] rounded-[8px] p-3 max-h-[60vh] overflow-y-auto">
              <h3 className="font-nunito font-semibold mb-3">Prévisualisation des examens</h3>

              {preview.length === 0 && <p className="text-sm text-[#7b7b7b]">Aucune prévisualisation. Cliquez sur "Prévisualiser" pour générer.</p>}

              <ul className="space-y-2">
                {preview.map((ex, idx) => (
                  <li key={ex.id || idx} className="bg-white rounded-[8px] p-3 flex justify-between items-start shadow-sm">
                    <div className="flex-1">
                      <p className="font-nunito font-semibold">{ex.module}</p>
                      <p className="text-xs text-[#838383]">{ex.type} • {ex.level}</p>
                      <p className="text-sm mt-1">{formatDate(ex.date)} - {ex.time} • {ex.durationMinutes} min</p>
                      {ex.teacher && <p className="text-sm mt-1">Enseignant: {ex.teacher}</p>}
                      {ex.roomsInfo && <p className="text-sm mt-1">{ex.roomsInfo}</p>}
                    </div>

                    <div className="flex flex-col gap-2 items-end">
                      <button onClick={() => openEdit(idx)} className="w-[36px] h-[36px] bg-[#4c87af] rounded-[8px] flex items-center justify-center">
                        <img src="/src/assets/icons/editer1.png" alt="edit" className="w-4 h-4" />
                      </button>
                      <button onClick={() => removeExam(idx)} className="w-[36px] h-[36px] bg-[rgb(153,4,4)] rounded-[8px] flex items-center justify-center">
                        <img src="/src/assets/icons/supprimer1.png" alt="del" className="w-4 h-4" />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              {/* footer actions */}
              <div className="mt-4 flex justify-end gap-3">
                <button onClick={onClose} className="BtnCancel w-[150px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] bg-[rgb(102,102,102)] text-white">
                  <img src="/src/assets/icons/annuler-la-fleche.png" alt="Annuler" className="w-[20px] h-[20px]" />
                  Annuler
                </button>

                <button onClick={handleSaveAll} className="BtnSave w-[160px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] bg-[rgb(7,26,131)] text-white">
                  <img src="/src/assets/icons/sauvegarder.png" alt="Enregistrer" className="w-[20px] h-[20px]" />
                  Enregistrer
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* examen edit modal */}
        <ExamEditModal
          isOpen={showEdit}
          exam={preview[selectedIdx]}
          onClose={() => setShowEdit(false)}
          onSave={(updated) => saveEditedExam(updated)}
        />
      </div>
    </div>
  );
}
