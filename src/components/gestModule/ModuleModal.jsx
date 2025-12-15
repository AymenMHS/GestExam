// src/components/gestModule/ModuleModal.jsx
import React, { useEffect, useRef, useState } from "react";

const EXAM_TYPES = [
  "Controle Continue",
  "Examen Final",
  "Test TP",
  "Examen Final Rattrapage",
  "Examen Final Remplacements",
  "Controle Continue Remplacements",
  "Test TP Remplacements",
];

function ModuleModal({ isOpen, promo, onClose, onSave }) {
  const [local, setLocal] = useState(null);
  const [openModule, setOpenModule] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [uploadStatus, setUploadStatus] = useState(""); // messages d'upload / erreurs
  const fileInputS1 = useRef(null);
  const fileInputS2 = useRef(null);

  const normalizeModule = (m = {}) => ({
    name: m?.name ?? "",
    coef: m?.coef ?? 1,
    exams: Array.isArray(m?.exams) ? [...m.exams] : [],
    teacher: m?.teacher ?? "",
  });

  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        const base = promo || {
          id: Date.now(),
          label: "",
          title: "",
          specialty: "",
          academicYear: new Date().getFullYear(),
          modulesS1: [],
          modulesS2: [],
          modulesCount: 0,
          students: 0,
        };

        setLocal({
          ...base,
          modulesS1: (base.modulesS1 || []).map(normalizeModule),
          modulesS2: (base.modulesS2 || []).map(normalizeModule),
        });
        setOpenModule(null);
        setIsLoading(false);
        setUploadStatus("");
      }, 50);
      return () => clearTimeout(timer);
    } else {
      setLocal(null);
      setIsLoading(false);
      setUploadStatus("");
    }
  }, [isOpen, promo]);

  if (!isOpen) return null;

  /* ------------------- utilitaires parsing ------------------- */

  // Normalise la colonne semester vers 'modulesS1' ou 'modulesS2'
  const normalizeSemester = (s) => {
    if (!s && typeof s !== "string") return null;
    const low = String(s).toLowerCase();
    if (low.includes("1") || low.includes("s1") || low.includes("sem1") || low.includes("semestre 1")) return "modulesS1";
    if (low.includes("2") || low.includes("s2") || low.includes("sem2") || low.includes("semestre 2")) return "modulesS2";
    return null;
  };

  // Parser CSV simple mais robuste (gère champs entre guillemets et séparateurs)
  const parseCSVText = (text) => {
    const rows = [];
    let cur = "";
    let row = [];
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      const next = text[i + 1];
      if (ch === '"' ) {
        if (inQuotes && next === '"') {
          // échappement de quote double -> ajoute " et skip next
          cur += '"';
          i++; // skip next
        } else {
          inQuotes = !inQuotes;
        }
      } else if (!inQuotes && (ch === "," || ch === ";" )) {
        row.push(cur);
        cur = "";
      } else if (!inQuotes && (ch === "\n" || ch === "\r")) {
        // gérer CRLF
        if (ch === "\r" && next === "\n") { /* skip, handled on \n */ }
        // fin de ligne s'il y a du contenu ou si row non vide
        // push current field and row
        row.push(cur);
        cur = "";
        // skip additional \n or \r following (to avoid empty lines)
        rows.push(row);
        row = [];
        // skip possible \n if current was \r and next is \n
      } else {
        cur += ch;
      }
    }
    // push last field/row
    if (cur !== "" || row.length > 0) {
      row.push(cur);
      rows.push(row);
    }

    // normalize rows: remove entirely empty rows
    const cleaned = rows.map(r => r.map(cell => cell.trim())).filter(r => r.some(c => c !== ""));

    if (cleaned.length === 0) return [];

    // first row = headers
    const headers = cleaned[0].map(h => String(h || "").trim().toLowerCase());
    const data = cleaned.slice(1).map(r => {
      const obj = {};
      for (let i = 0; i < headers.length; i++) {
        obj[headers[i]] = r[i] !== undefined ? r[i] : "";
      }
      return obj;
    });
    return data;
  };

  // parse result from Excel (sheet_to_json) or csv parsed objects -> unify to our module shape
  const rowsToModules = (rows) => {
    // rows : array of objects with keys like semester, name, coef, exams, teacher (keys lowercase)
    const modulesToAdd = { modulesS1: [], modulesS2: [] };

    rows.forEach((r) => {
      // tolerate different header names
      const semesterRaw = r.semester ?? r.sem ?? r.s ?? r["semestre"] ?? r["annee"] ?? "";
      const name = r.name ?? r.nom ?? r.module ?? r["intitulé"] ?? "";
      const coefRaw = r.coef ?? r.coefficient ?? r["coefficient"] ?? r["coef"] ?? "";
      const examsRaw = r.exams ?? r.examens ?? r["types"] ?? r["examen"] ?? "";
      const teacher = r.teacher ?? r.enseignant ?? r.prof ?? r["responsable"] ?? "";

      const semesterKey = normalizeSemester(semesterRaw) || (local ? (local.modulesS1.includes ? "modulesS1" : "modulesS1") : "modulesS1");
      const coef = Number(String(coefRaw).replace(",", ".")) || 1;
      // split exams by ; or , and trim
      const exams = String(examsRaw || "")
        .split(/;|,/)
        .map((e) => e.trim())
        .filter((e) => e);

      const moduleObj = {
        name: String(name || "").trim(),
        coef,
        exams,
        teacher: String(teacher || "").trim(),
      };

      if (semesterKey === "modulesS1") modulesToAdd.modulesS1.push(moduleObj);
      else if (semesterKey === "modulesS2") modulesToAdd.modulesS2.push(moduleObj);
    });

    return modulesToAdd;
  };

  // Lecture du fichier uploadé (CSV ou Excel)
  const handleFileChange = async (e, targetSemester) => {
    setUploadStatus("");
    const file = e.target.files && e.target.files[0];
    if (!file) {
      setUploadStatus("Aucun fichier sélectionné.");
      return;
    }

    const name = file.name.toLowerCase();
    try {
      if (name.endsWith(".csv")) {
        const text = await file.text();
        const parsed = parseCSVText(text);
        if (!parsed.length) {
          setUploadStatus("Fichier CSV vide ou format invalide.");
          return;
        }
        const modulesToAdd = rowsToModules(parsed);
        applyImportedModules(modulesToAdd, targetSemester);
        setUploadStatus(`Import CSV terminé — ${modulesToAdd.modulesS1.length + modulesToAdd.modulesS2.length} module(s) ajoutés.`);
      } else if (name.endsWith(".xls") || name.endsWith(".xlsx")) {
        // tenter dynamic import de xlsx
        let XLSX = null;
        try {
          XLSX = await import(/* webpackIgnore: true */ "xlsx");
        } catch (err) {
          setUploadStatus("Le support Excel requiert la bibliothèque 'xlsx'. Installe-la (npm i xlsx) ou envoie un CSV.");
          return;
        }
        const arrayBuffer = await file.arrayBuffer();
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        const firstSheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[firstSheetName];
        // sheet_to_json avec header mapping (renvoie objets)
        const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });
        if (!rows || rows.length === 0) {
          setUploadStatus("Feuille Excel vide ou format invalide.");
          return;
        }
        // normaliser keys : lowercase
        const normalizedRows = rows.map((r) => {
          const obj = {};
          Object.keys(r).forEach((k) => {
            const key = String(k).trim().toLowerCase();
            obj[key] = r[k];
          });
          return obj;
        });
        const modulesToAdd = rowsToModules(normalizedRows);
        applyImportedModules(modulesToAdd, targetSemester);
        setUploadStatus(`Import Excel terminé — ${modulesToAdd.modulesS1.length + modulesToAdd.modulesS2.length} module(s) ajoutés.`);
      } else {
        setUploadStatus("Format non supporté. Utilise .csv, .xls ou .xlsx.");
      }
    } catch (err) {
      console.error("Import error:", err);
      setUploadStatus("Erreur lors de l'import. Vérifie le fichier.");
    } finally {
      // reset input value pour permettre ré-upload du même fichier si besoin
      e.target.value = "";
    }
  };

  // Ajoute les modules importés au local (option targetSemester pour forcer S1/S2)
  const applyImportedModules = (modulesToAdd, targetSemester) => {
    setLocal((prev) => {
      const copy = { ...(prev || {}) };
      const s1 = Array.isArray(copy.modulesS1) ? [...copy.modulesS1] : [];
      const s2 = Array.isArray(copy.modulesS2) ? [...copy.modulesS2] : [];

      // Si targetSemester fourni (S1 ou S2), on force tout dedans
      if (targetSemester === "modulesS1") {
        copy.modulesS1 = [...s1, ...modulesToAdd.modulesS1, ...modulesToAdd.modulesS2];
      } else if (targetSemester === "modulesS2") {
        copy.modulesS2 = [...s2, ...modulesToAdd.modulesS1, ...modulesToAdd.modulesS2];
      } else {
        copy.modulesS1 = [...s1, ...modulesToAdd.modulesS1];
        copy.modulesS2 = [...s2, ...modulesToAdd.modulesS2];
      }

      return copy;
    });
  };

  /* ------------------- fin utilitaires parsing ------------------- */

  const addModule = (semester) => {
    setLocal((prev) => {
      const prevSemester = Array.isArray(prev?.[semester]) ? [...prev[semester]] : [];
      return {
        ...prev,
        [semester]: [
          ...prevSemester,
          { name: "", coef: 1, exams: [], teacher: "" },
        ],
      };
    });
  };

  const removeModule = (semester, index) => {
    setLocal((prev) => {
      const prevSemester = Array.isArray(prev?.[semester]) ? [...prev[semester]] : [];
      const arr = [...prevSemester];
      if (index >= 0 && index < arr.length) arr.splice(index, 1);
      return { ...prev, [semester]: arr };
    });

    const moduleId = `${semester}-${index}`;
    if (openModule === moduleId) {
      setOpenModule(null);
    }
  };

  const updateModule = (semester, index, field, value) => {
    setLocal((prev) => {
      const prevSemester = Array.isArray(prev?.[semester]) ? [...prev[semester]] : [];
      const arr = [...prevSemester];
      if (!arr[index]) return prev;
      arr[index] = { ...arr[index], [field]: value };
      return { ...prev, [semester]: arr };
    });
  };

  const toggleExamType = (semester, index, examType) => {
    setLocal((prev) => {
      const prevSemester = Array.isArray(prev?.[semester]) ? [...prev[semester]] : [];
      const arr = [...prevSemester];
      if (!arr[index]) return prev;
      const currentExams = Array.isArray(arr[index].exams) ? [...arr[index].exams] : [];
      if (currentExams.includes(examType)) {
        arr[index].exams = currentExams.filter((e) => e !== examType);
      } else {
        arr[index].exams = [...currentExams, examType];
      }
      return { ...prev, [semester]: arr };
    });
  };

  const toggleModule = (semester, index) => {
    const moduleId = `${semester}-${index}`;
    setOpenModule((prev) => (prev === moduleId ? null : moduleId));
  };

  const handleSave = () => {
    if (!local) return;
    const modulesCount = (Array.isArray(local.modulesS1) ? local.modulesS1.length : 0) + (Array.isArray(local.modulesS2) ? local.modulesS2.length : 0);
    const payload = { ...local, modulesCount };
    onSave && onSave(payload);
  };

  const btnAnim =
    "transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[1px]";

  const renderModuleCard = (semester, module, idx) => {
    const moduleId = `${semester}-${idx}`;
    const isOpen = openModule === moduleId;
    const examsCount = Array.isArray(module?.exams) ? module.exams.length : 0;

    return (
      <div
        key={idx}
        className={`module-card bg-white rounded-[10px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] mb-4 border border-gray-200 overflow-hidden ${
          isOpen ? "max-h-[500px]" : "max-h-16"
        } transition-all duration-300`}
      >
        <div
          className="module-header w-full h-16 flex justify-between items-center px-4 cursor-pointer"
          onClick={() => toggleModule(semester, idx)}
        >
          <div className="flex items-center gap-3">
            <button
              className={`more-salle w-8 h-8 flex justify-center items-center hover:opacity-80 hover:bg-[#E0E0E0] hover:rounded-[5px] transition-all duration-300 ${btnAnim}`}
              onClick={(e) => {
                e.stopPropagation();
                toggleModule(semester, idx);
              }}
            >
              <img
                src="/src/assets/icons/arrow-down.png"
                alt="Détails"
                className={`w-5 h-5 ${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
              />
            </button>
            <div className="flex flex-col">
              <h4 className="text-base font-bold font-nunito text-gray-800">
                {module?.name || `Module ${idx + 1}`}
              </h4>
              {module?.name && (
                <p className="text-xs text-gray-500">
                  Coef: {module?.coef ?? 1} | Enseignant: {module?.teacher || "Non assigné"}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {examsCount > 0 && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                {examsCount} examen{examsCount > 1 ? "s" : ""}
              </span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                removeModule(semester, idx);
              }}
              className={`delete-btn w-8 h-8 flex justify-center items-center bg-[#990404] rounded-[5px] ${btnAnim}`}
            >
              <img src="/src/assets/icons/supprimer1.png" alt="delete" className="w-4 h-4" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="module-content p-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="blocInput flex flex-col">
                <label className="text-sm font-semibold font-nunito mb-2">Nom du module</label>
                <input
                  type="text"
                  value={module?.name ?? ""}
                  onChange={(e) => updateModule(semester, idx, "name", e.target.value)}
                  className="w-full h-10 bg-[#F2F2F2] rounded-[5px] pl-3 text-base font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none"
                  placeholder="Entrez le nom du module"
                />
              </div>

              <div className="blocInput flex flex-col">
                <label className="text-sm font-semibold font-nunito mb-2">Coefficient</label>
                <input
                  type="number"
                  value={module?.coef ?? 1}
                  onChange={(e) => updateModule(semester, idx, "coef", e.target.value)}
                  className="w-full h-10 bg-[#F2F2F2] rounded-[5px] pl-3 text-base font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none"
                  placeholder="Coefficient"
                  min="1"
                />
              </div>

              <div className="blocInput flex flex-col col-span-2">
                <label className="text-sm font-semibold font-nunito mb-2">Types d'examens</label>
                <div className="w-full bg-[#F2F2F2] rounded-[5px] p-4 shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                  <div className="grid grid-cols-2 gap-2">
                    {EXAM_TYPES.map((examType, i) => {
                      const checkboxId = `${moduleId}-exam-${i}`;
                      return (
                        <div key={i} className="flex items-center">
                          <input
                            type="checkbox"
                            id={checkboxId}
                            checked={Array.isArray(module?.exams) && module.exams.includes(examType)}
                            onChange={() => toggleExamType(semester, idx, examType)}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <label
                            htmlFor={checkboxId}
                            className="ml-2 text-sm font-nunito text-gray-700 cursor-pointer"
                          >
                            {examType}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {Array.isArray(module?.exams) && module.exams.length > 0
                    ? `Sélectionné(s): ${module.exams.join(", ")}`
                    : "Aucun type d'examen sélectionné"}
                </p>
              </div>

              <div className="blocInput flex flex-col col-span-2">
                <label className="text-sm font-semibold font-nunito mb-2">Enseignant Responsable</label>
                <input
                  type="text"
                  value={module?.teacher ?? ""}
                  onChange={(e) => updateModule(semester, idx, "teacher", e.target.value)}
                  className="w-full h-10 bg-[#F2F2F2] rounded-[5px] pl-3 text-base font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none"
                  placeholder="Nom de l'enseignant"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="modal-modules w-screen h-screen fixed inset-0 flex justify-center items-center z-[1000]">
      <div
        className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0"
        onClick={onClose}
      ></div>

      <div className="modal-content w-[90vw] max-w-[1200px] h-[85vh] bg-white rounded-[10px] relative z-[1001] flex flex-col overflow-hidden">
        <div className="header-modal w-full h-16 flex justify-between items-center px-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold font-nunito text-gray-800">
            {promo && promo.title ? "Gestion des modules - " : "Créer une nouvelle promo - "}
            <span className="text-[#071A83]">{promo?.title || ""}</span>
          </h2>
          <button
            onClick={onClose}
            className={`close-modal w-10 h-10 bg-transparent border-none cursor-pointer flex justify-center items-center ${btnAnim}`}
          >
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-6 h-6" />
          </button>
        </div>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#071A83] mb-4"></div>
              <p className="text-gray-600 font-nunito">Chargement des modules...</p>
            </div>
          </div>
        ) : !local ? (
          <div className="flex-1 flex flex-col items-center justify-center">
            <p className="text-gray-600 font-nunito mb-4">Aucune donnée disponible</p>
            <button
              onClick={onClose}
              className={`BtnCancel w-40 h-12 flex justify-center items-center gap-3 rounded-[10px] font-nunito text-base font-semibold cursor-pointer border-none bg-[#666666] text-white ${btnAnim}`}
            >
              Fermer
            </button>
          </div>
        ) : (
          <>
            {/* Top: promo basic info (name & specialty) */}
            <div className="p-6 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1">
                  <label className="block text-sm font-semibold mb-1">Nom de la promo</label>
                  <input
                    type="text"
                    value={local.title || ""}
                    onChange={(e) => setLocal((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full h-10 bg-[#F2F2F2] rounded-[6px] pl-3"
                    placeholder="Ex: Licence 1 - Informatique"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-semibold mb-1">Spécialité</label>
                  <input
                    type="text"
                    value={local.specialty || ""}
                    onChange={(e) => setLocal((prev) => ({ ...prev, specialty: e.target.value }))}
                    className="w-full h-10 bg-[#F2F2F2] rounded-[6px] pl-3"
                    placeholder="Ex: Informatique"
                  />
                </div>

                <div className="col-span-1">
                  <label className="block text-sm font-semibold mb-1">Année académique</label>
                  <input
                    type="number"
                    value={local.academicYear || new Date().getFullYear()}
                    onChange={(e) => setLocal((prev) => ({ ...prev, academicYear: Number(e.target.value) }))}
                    className="w-full h-10 bg-[#F2F2F2] rounded-[6px] pl-3"
                    placeholder="2025"
                    min="2000"
                  />
                </div>
              </div>
            </div>

            <div className="content-modal flex-1 overflow-hidden px-6 py-4 flex gap-6">
              <div className="semester-section flex-1 flex flex-col min-h-0">
                {/* SEMESTRE 1 header with inline "+" and Import */}
                <div className="semester-header bg-[#e5e5e5] rounded-[5px] py-3 px-4 mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-nunito text-black">
                      SEMESTRE 1
                      <span className="text-xs font-normal ml-2">
                        ({local.modulesS1.length} module{local.modulesS1.length !== 1 ? "s" : ""})
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Importer modules semestre 1"
                      onClick={(e) => { e.stopPropagation(); fileInputS1.current && fileInputS1.current.click(); }}
                      className="w-10 h-10 flex items-center justify-center rounded-[5px] bg-[#0b74ea] text-white hover:bg-white/20 transition text-2xl font-normal ml-2 cursor-pointer"
                      title="Importer modules (.csv, .xls, .xlsx)"
                    >
                      ⤓
                    </button>

                    <input
                      ref={fileInputS1}
                      type="file"
                      accept=".csv,.xls,.xlsx"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "modulesS1")}
                    />

                    <button
                      aria-label="Ajouter module semestre 1"
                      onClick={(e) => {
                        e.stopPropagation();
                        addModule("modulesS1");
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-[5px] bg-[#071A83] text-white hover:bg-white/20 transition text-3xl font-normal ml-2 cursor-pointer"
                      title="Ajouter un module"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="modules-list flex-1 overflow-y-auto pr-2">
                  {local.modulesS1.map((m, i) => renderModuleCard("modulesS1", m, i))}
                </div>
              </div>

              <div className="w-px bg-gray-300 mx-2"></div>

              <div className="semester-section flex-1 flex flex-col min-h-0">
                {/* SEMESTRE 2 header with inline "+" and Import */}
                <div className="semester-header bg-[#e5e5e5] rounded-[5px] py-3 px-4 mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold font-nunito text-black">
                      SEMESTRE 2
                      <span className="text-xs font-normal ml-2">
                        ({local.modulesS2.length} module{local.modulesS2.length !== 1 ? "s" : ""})
                      </span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Importer modules semestre 2"
                      onClick={(e) => { e.stopPropagation(); fileInputS2.current && fileInputS2.current.click(); }}
                      className="w-10 h-10 flex items-center justify-center rounded-[5px] bg-[#0b74ea] text-white hover:bg-white/20 transition text-2xl font-normal ml-2 cursor-pointer"
                      title="Importer modules (.csv, .xls, .xlsx)"
                    >
                      ⤓
                    </button>

                    <input
                      ref={fileInputS2}
                      type="file"
                      accept=".csv,.xls,.xlsx"
                      className="hidden"
                      onChange={(e) => handleFileChange(e, "modulesS2")}
                    />

                    <button
                      aria-label="Ajouter module semestre 2"
                      onClick={(e) => {
                        e.stopPropagation();
                        addModule("modulesS2");
                      }}
                      className="w-10 h-10 flex items-center justify-center rounded-[5px] bg-[#071A83] text-white hover:bg-white/20 transition text-3xl font-normal ml-2 cursor-pointer"
                      title="Ajouter un module"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="modules-list flex-1 overflow-y-auto pr-2">
                  {local.modulesS2.map((m, i) => renderModuleCard("modulesS2", m, i))}
                </div>
              </div>
            </div>

            {/* upload status */}
            {uploadStatus && (
              <div className="px-6 pb-2">
                <div className="text-sm text-[#333] bg-yellow-50 p-3 rounded">
                  {uploadStatus}
                </div>
              </div>
            )}

            <div className="footer-modal w-full h-20 flex justify-end items-center gap-4 px-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={onClose}
                className={`BtnCancel w-40 h-12 flex justify-center items-center gap-3 rounded-[10px] font-nunito text-base font-semibold cursor-pointer border-none bg-[#666666] text-white ${btnAnim}`}
              >
                <img src="/src/assets/icons/annuler-la-fleche.png" alt="Annuler" className="w-5 h-5" />
                Annuler
              </button>
              <button
                onClick={handleSave}
                className={`BtnSave w-40 h-12 flex justify-center items-center gap-3 rounded-[10px] font-nunito text-base font-semibold cursor-pointer border-none bg-[#071A83] text-white ${btnAnim}`}
              >
                <img src="/src/assets/icons/sauvegarder.png" alt="Enregistrer" className="w-5 h-5" />
                Sauvegarder
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ModuleModal;
