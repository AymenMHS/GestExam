import React, { useEffect, useState } from "react";

const EXAM_TYPES = [
  "Controle Continue",
  "Examen Final",
  "Test TP",
  "Examen Final Rattrapage",
  "Examen Final Remplacements",
  "Controle Continue Remplacements",
  "Test TP Remplacements",
];

const formatDateISO = (d) => {
  if (!d) return "";
  const dt = new Date(d);
  if (Number.isNaN(dt.getTime())) return "";
  return dt.toISOString().slice(0, 10);
};

const ModalAutoPlanExam = ({ isOpen, onClose, promo }) => {
  const [step, setStep] = useState(1);

  const [config, setConfig] = useState({
    startDate: "",
    endDate: "",
    type: "",
    gapDays: 1,
  });

  const [previewExams, setPreviewExams] = useState([]);
  const [warning, setWarning] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setPreviewExams([]);
      setConfig({
        startDate: "",
        endDate: "",
        type: "",
        gapDays: 1,
      });
      setWarning("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((c) => ({ ...c, [name]: value }));
  };

  const generatePreview = () => {
    setWarning("");
    if (!config.startDate || !config.endDate) {
      setWarning("Veuillez choisir la période (date début et date fin).");
      return;
    }
    if (!config.type) {
      setWarning("Veuillez choisir un type d'examen.");
      return;
    }

    const start = new Date(config.startDate);
    const end = new Date(config.endDate);
    if (start > end) {
      setWarning("La date de début doit être antérieure à la date de fin.");
      return;
    }

    const modules = [...(promo?.modulesS1 || []), ...(promo?.modulesS2 || [])];
    if (!modules.length) {
      setWarning("Aucun module disponible pour cette promotion.");
      return;
    }

    const exams = [];
    let currentDate = new Date(start);

    for (let i = 0; i < modules.length; i++) {
      // si la date dépasse end, on arrête la génération (pour éviter out-of-range)
      if (currentDate > end) break;

      exams.push({
        id: `ex-${i}-${currentDate.getTime()}`,
        type: config.type,
        niveau: promo?.title || "",
        module: modules[i].name,
        date: formatDateISO(currentDate),
        heure: "08:30",
        duree: "1h30",
        enseignant: "",
        salles: ["Salle A101 - Groupe 1 - Non affecté"],
      });

      // avancer la date
      currentDate = new Date(currentDate);
      currentDate.setDate(currentDate.getDate() + Number(config.gapDays || 1));
    }

    if (!exams.length) {
      setWarning("Impossible de générer des examens dans la période choisie (trop courte).");
      return;
    }

    setPreviewExams(exams);
    setStep(4);
  };

  const updateExam = (index, field, value) => {
    setPreviewExams((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const addSalleToExam = (index) => {
    setPreviewExams((prev) => {
      const copy = [...prev];
      const p = copy[index];
      p.salles = [...(p.salles || []), "Salle NNN - Non affecté"];
      return copy;
    });
  };

  const removeExam = (index) => {
    setPreviewExams((prev) => prev.filter((_, i) => i !== index));
  };

  const validatePlanification = () => {
    // Ici tu peux appeler ton API pour sauvegarder la planification
    // Pour l'instant on fermera le modal et on logue dans la console
    console.log("Planification validée : ", previewExams);
    onClose && onClose();
  };

  return (
    <div className="modal-autoPlan w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div
        className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0"
        onClick={onClose}
      ></div>

      <div className="modal-create w-[85vw] max-w-[1200px] h-[85vh] bg-white rounded-[12px] relative z-[1001] flex flex-col items-center overflow-hidden">
        {/* HEADER */}
        <div className="header-modal w-full h-[60px] flex justify-between items-center px-[24px]">
          <h2 className="text-[20px] font-bold font-nunito">Planification automatique des examens</h2>
          <button className="close-modal w-[36px] h-[36px] flex justify-center items-center hover:opacity-80" onClick={onClose}>
            <img src="/src/assets/icons/x.png" className="w-[20px] h-[20px]" alt="close" />
          </button>
        </div>

        {/* STEPS - Improved Wizard */}
        <div className="w-full flex justify-center items-center mt-4 mb-2">
        <div className="flex items-center justify-center gap-6">

            {[
            { id: 1, label: "Période" },
            { id: 2, label: "Type" },
            { id: 3, label: "Espacement" },
            { id: 4, label: "Prévisualisation" },
            ].map((item, index) => (
            <div key={item.id} className="flex items-center">

                {/* Step circle */}
                <div className="flex flex-col items-center gap-1">
                <div
                    className={`
                    w-[44px] h-[44px] rounded-full flex justify-center items-center 
                    font-nunito font-bold text-[14px] transition-all duration-300
                    ${
                        step === item.id
                        ? "bg-[#071A83] text-white shadow-lg scale-110"
                        : step > item.id
                        ? "bg-green-600 text-white shadow-md"
                        : "bg-[#E5E5E5] text-[#777]"
                    }
                    `}
                >
                    {step > item.id ? "✓" : item.id}
                </div>

                {/* Label */}
                <span
                    className={`
                    text-[11px] font-nunito font-semibold
                    ${step === item.id ? "text-[#071A83]" : "text-[#777]"}
                    `}
                >
                    {item.label}
                </span>
                </div>

                {/* Connector line */}
                {index !== 3 && (
                <div
                    className={`
                    w-[60px] h-[2px] mx-2 transition-all duration-300
                    ${step > item.id ? "bg-green-600" : "bg-[#E0E0E0]"}
                    `}
                ></div>
                )}
            </div>
            ))}
        </div>
        </div>


        {/* CONTENT (centered container) */}
        <div className="flex-1 w-full overflow-y-auto flex justify-center">
          <div className="w-full max-w-[1050px] p-6">
            {warning && <div className="mb-3 text-sm text-red-600 font-nunito">{warning}</div>}

            {/* STEP 1 */}
            {step === 1 && (
              <div className="flex flex-col items-center">
                <h3 className="font-nunito font-bold text-[16px] mb-3">Choisir la période</h3>
                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-start">
                    <label className="font-nunito font-semibold text-[14px]">Date début</label>
                    <input type="date" name="startDate" value={config.startDate} onChange={handleChange} className="w-[220px] h-[40px] bg-[#F2F2F2] rounded-[6px] pl-[10px]" />
                  </div>

                  <div className="flex flex-col items-start">
                    <label className="font-nunito font-semibold text-[14px]">Date fin</label>
                    <input type="date" name="endDate" value={config.endDate} onChange={handleChange} className="w-[220px] h-[40px] bg-[#F2F2F2] rounded-[6px] pl-[10px]" />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="flex flex-col items-center">
                <h3 className="font-nunito font-bold text-[16px] mb-3">Type d'examen</h3>
                <select name="type" value={config.type} onChange={handleChange} className="w-[340px] h-[40px] bg-[#F2F2F2] rounded-[6px] pl-[10px]">
                  <option value="">-- Choisir --</option>
                  {EXAM_TYPES.map((t, i) => <option key={i} value={t}>{t}</option>)}
                </select>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="flex flex-col items-center">
                <h3 className="font-nunito font-bold text-[16px] mb-3">Espacement entre les examens</h3>
                <select name="gapDays" value={config.gapDays} onChange={handleChange} className="w-[200px] h-[40px] bg-[#F2F2F2] rounded-[6px] pl-[10px]">
                  {[1, 2, 3, 4, 5, 7].map((d) => <option key={d} value={d}>{d} jour(s)</option>)}
                </select>
                <p className="mt-3 text-sm text-[#666] font-nunito max-w-[700px] text-center">
                  L'algorithme attribuera un examen par module dans l'ordre. Si la période est trop courte certains modules peuvent ne pas être programmés.
                </p>
              </div>
            )}

            {/* STEP 4 : PREVIEW (cards, centered, wrap) */}
            {step === 4 && (
              <div className="flex flex-col items-center">
                <h3 className="font-nunito font-bold text-[16px] mb-4">Prévisualisation & modification</h3>

                <div className="w-full flex flex-wrap justify-center gap-4">
                  {previewExams.map((ex, i) => (
                    <div key={ex.id} className="w-[300px] min-h-[180px] bg-white rounded-[10px] border shadow-sm p-4 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="text-xs text-[#888]">Module</p>
                            <p className="font-nunito font-semibold">{ex.module}</p>
                          </div>
                          <button onClick={() => removeExam(i)} title="Supprimer" className="w-7 h-7 rounded flex items-center justify-center hover:opacity-80">
                            <img src="/src/assets/icons/supprimer1.png" alt="del" className="w-4 h-4"/>
                          </button>
                        </div>

                        <div className="mb-2">
                          <p className="text-xs text-[#888]">Type</p>
                          <input value={ex.type} onChange={(e) => updateExam(i, "type", e.target.value)} className="w-full mt-1 p-2 rounded bg-[#F7F9FB] text-sm" />
                        </div>

                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <div>
                            <p className="text-xs text-[#888]">Date</p>
                            <input type="date" value={ex.date} onChange={(e) => updateExam(i, "date", e.target.value)} className="w-full mt-1 p-2 rounded bg-[#F7F9FB] text-sm" />
                          </div>
                          <div>
                            <p className="text-xs text-[#888]">Heure</p>
                            <input value={ex.heure} onChange={(e) => updateExam(i, "heure", e.target.value)} className="w-full mt-1 p-2 rounded bg-[#F7F9FB] text-sm" />
                          </div>
                        </div>

                        <div className="mb-1">
                          <p className="text-xs text-[#888]">Durée</p>
                          <select value={ex.duree} onChange={(e) => updateExam(i, "duree", e.target.value)} className="w-full mt-1 p-2 rounded bg-[#F7F9FB] text-sm">
                            <option>1h</option>
                            <option>1h30</option>
                            <option>2h</option>
                            <option>3h</option>
                          </select>
                        </div>

                        <div className="mb-1">
                          <p className="text-xs text-[#888]">Enseignant(e)</p>
                          <input value={ex.enseignant} onChange={(e) => updateExam(i, "enseignant", e.target.value)} className="w-full mt-1 p-2 rounded bg-[#F7F9FB] text-sm" placeholder="Non défini" />
                        </div>

                        <div>
                          <p className="text-xs text-[#888]">Salles</p>
                          <div className="mt-1 flex flex-col gap-1">
                            {(ex.salles || []).map((s, si) => (
                              <div key={si} className="w-full bg-[#F5F5F5] rounded p-1 text-sm flex justify-between items-center">
                                <input value={s} onChange={(e) => {
                                  const copy = [...(ex.salles || [])];
                                  copy[si] = e.target.value;
                                  updateExam(i, "salles", copy);
                                }} className="bg-transparent w-full text-sm" />
                                <button onClick={() => {
                                  const copy = [...(ex.salles || [])];
                                  copy.splice(si, 1);
                                  updateExam(i, "salles", copy);
                                }} className="ml-2">
                                  <img src="/src/assets/icons/supprimer1.png" className="w-4 h-4" alt="del" />
                                </button>
                              </div>
                            ))}
                          </div>
                          <button onClick={() => addSalleToExam(i)} className="mt-2 w-full h-8 rounded bg-[#071A83] text-white flex items-center justify-center text-sm gap-2">
                            <img src="/src/assets/icons/plus1.png" className="w-4 h-4" alt="add" /> Ajouter une salle
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex justify-between items-center">
                        <div className="text-xs text-[#666]">{ex.niveau}</div>
                        <div className="text-sm text-[#071A83] font-semibold">Module #{i + 1}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {previewExams.length === 0 && (
                  <div className="mt-4 text-sm text-[#666]">Aucune prévisualisation — génèrez d'abord les examens.</div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* FOOTER BUTTONS */}
        <div className="w-full border-t pt-3 pb-4 flex justify-between items-center px-6 gap-4">
          <div className="flex items-center gap-2">
            <button onClick={prevStep} className="BtnCancel w-[150px] h-[40px] rounded-[8px] bg-[rgb(102,102,102)] text-white font-nunito font-semibold flex items-center justify-center gap-2">
              <img src="/src/assets/icons/left-arrow.png" className="w-4 h-4" alt="prev" />
              Précédent
            </button>
          </div>

          <div className="flex items-center gap-3">
            {step < 3 && (
              <button onClick={nextStep} className="BtnSave w-[150px] h-[40px] rounded-[8px] bg-[#071A83] text-white font-nunito font-semibold flex items-center justify-center gap-2">
                Suivant
                <img src="/src/assets/icons/right-arrow.png" className="w-4 h-4" alt="next" />
              </button>
            )}

            {step === 3 && (
              <button onClick={generatePreview} className="BtnSave w-[220px] h-[40px] rounded-[8px] bg-[#071A83] text-white font-nunito font-semibold flex items-center justify-center gap-2">
                Générer les examens
                <img src="/src/assets/icons/verifier1.png" className="w-4 h-4" alt="gen" />
              </button>
            )}

            {step === 4 && (
              <button onClick={validatePlanification} className="BtnSave w-[220px] h-[40px] rounded-[8px] bg-[#071A83] text-white font-nunito font-semibold flex items-center justify-center gap-2">
                Valider la planification
                <img src="/src/assets/icons/sauvegarder.png" className="w-4 h-4" alt="save" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAutoPlanExam;
