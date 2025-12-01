// src/components/gestEtudiant/ModalImportStudents.jsx
import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";

/**
 * ModalImportStudents
 * - Accepte .csv et .xlsx
 * - Parse et normalise les en-têtes
 * - Affiche prévisualisation paginée + édition inline
 */

const perPageDefault = 8;

const ModalImportStudents = ({ isOpen, onClose, onImport }) => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage] = useState(perPageDefault);
  const [fileName, setFileName] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRows([]);
      setPage(1);
      setFileName("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // util - normaliser une clé (lowercase, sans espaces/accents simples)
  const norm = (s = "") => s.toString().toLowerCase().replace(/\s+/g, "").normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  // essayer de récupérer la valeur d'une ligne en testant plusieurs alias
  const valueFor = (row, aliases) => {
    const keys = Object.keys(row);
    for (const k of keys) {
      const kn = norm(k);
      for (const a of aliases) {
        if (kn === norm(a) || kn.includes(norm(a))) return row[k];
      }
    }
    return "";
  };

  const csvDetectDelimiter = (text) => {
    const firstLine = text.split(/\r?\n/)[0] || "";
    const commaCount = (firstLine.match(/,/g) || []).length;
    const semiCount = (firstLine.match(/;/g) || []).length;
    // si plus de ; on prend ;
    return semiCount > commaCount ? ";" : ",";
  };

  const parseCSV = (text) => {
    const delimiter = csvDetectDelimiter(text);
    const lines = text.split(/\r?\n/).filter(l => l.trim() !== "");
    if (lines.length === 0) return [];
    const headers = lines[0].split(delimiter).map(h => h.trim());
    const data = lines.slice(1).map(line => {
      const cols = line.split(delimiter).map(c => c.trim());
      const obj = {};
      headers.forEach((h, i) => obj[h || `col${i}`] = cols[i] ?? "");
      return obj;
    });
    // normaliser et mapper vers notre shape
    return data.map(r => ({
      code: valueFor(r, ["code","id","matricule"]) || "",
      nom: valueFor(r, ["nom","name","lastname","family"]) || "",
      prenom: valueFor(r, ["prenom","first","firstname","given"]) || "",
      dateNaissance: valueFor(r, ["datenaissance","date_naissance","date de naissance","birth","birthdate"]) || "",
      niveau: valueFor(r, ["niveau","level","classe"]) || "",
      groupe: valueFor(r, ["groupe","group","grp"]) || "",
      email: valueFor(r, ["email","mail"]) || "",
      identifiant: valueFor(r, ["identifiant","username","login"]) || "",
      password: valueFor(r, ["password","pwd"]) || ""
    }));
  };

  const handleFile = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFileName(f.name);

    const name = f.name.toLowerCase();
    const isXlsx = name.endsWith(".xlsx") || name.endsWith(".xls");
    const isCsv = name.endsWith(".csv") || f.type === "text/csv";

    if (isXlsx) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = new Uint8Array(ev.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          // Obtenir un array d'objets, chaque clé = en-tête de colonne
          const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
          // mapper / normaliser
          const parsed = json.map(r => ({
            code: valueFor(r, ["code","id","matricule"]) || "",
            nom: valueFor(r, ["nom","name","lastname","family"]) || "",
            prenom: valueFor(r, ["prenom","first","firstname","given"]) || "",
            dateNaissance: valueFor(r, ["datenaissance","date_naissance","date de naissance","birth","birthdate"]) || "",
            niveau: valueFor(r, ["niveau","level","classe"]) || "",
            groupe: valueFor(r, ["groupe","group","grp"]) || "",
            email: valueFor(r, ["email","mail"]) || "",
            identifiant: valueFor(r, ["identifiant","username","login"]) || "",
            password: valueFor(r, ["password","pwd"]) || ""
          }));
          setRows(parsed);
          setPage(1);
        } catch (err) {
          console.error(err);
          alert("Erreur lors de la lecture du fichier .xlsx");
        }
      };
      reader.readAsArrayBuffer(f);
      return;
    }

    if (isCsv) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const text = ev.target.result;
          const parsed = parseCSV(text);
          setRows(parsed);
          setPage(1);
        } catch (err) {
          console.error(err);
          alert("Erreur lors du parsing CSV");
        }
      };
      reader.readAsText(f, "UTF-8");
      return;
    }

    alert("Format non supporté. Utilise .csv ou .xlsx");
  };

  const handleCellChange = (idx, field, value) => {
    const copy = [...rows];
    copy[idx] = { ...copy[idx], [field]: value };
    setRows(copy);
  };

  const handleRemoveRow = (idx) => {
    const copy = [...rows];
    copy.splice(idx, 1);
    setRows(copy);
    // ajuster la page si nécessaire
    const totalPages = Math.max(1, Math.ceil(copy.length / perPage));
    if (page > totalPages) setPage(totalPages);
  };

  const handleImport = () => {
    if (rows.length === 0) {
      alert("Aucune ligne à importer.");
      return;
    }
    onImport(rows);
    onClose();
  };

  const totalPages = Math.max(1, Math.ceil(rows.length / perPage));
  const display = rows.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="modal-importStudent w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0" onClick={onClose}></div>
      <div className="modal-import w-[85vw] max-h-[85vh] bg-white rounded-[10px] relative z-[1001] flex flex-col justify-start items-center overflow-x-hidden">
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px]">
          <h2 className="text-[20px] font-bold font-nunito">Importer une liste d'étudiants</h2>
          <button className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300" onClick={onClose}>
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[20px] h-[20px]" />
          </button>
        </div>

        <div className="content-import w-full p-6 overflow-y-auto">
          <div className="w-full mb-4 flex items-center justify-between">
            <div>
              <input id="fileImport" type="file" accept=".csv,.xlsx" onChange={handleFile} className="hidden" />
              <label htmlFor="fileImport" className="cursor-pointer bg-[#3B679A] text-white px-4 py-2 rounded-[6px] inline-flex items-center gap-2 hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300">
                <img src="/src/assets/icons/plus1.png" alt="file" className="w-[16px] h-[16px]" />
                Charger fichier (.csv / .xlsx)
              </label>
              <span className="ml-3 text-sm text-[#666]">{fileName}</span>
            </div>

            <div className="flex items-center gap-2">
              <button className="bg-[#6B7280] text-white px-4 py-2 rounded-[6px] hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300" onClick={() => {
                // exemple CSV d'exemple
                const sample = `code,nom,prenom,dateNaissance,niveau,groupe,email,identifiant
S001,Doe,John,1999-01-01,L1,Groupe 1,john@example.com,john
S002,Smith,Anna,2000-05-20,L2,Groupe 2,anna@example.com,anna`;
                const parsed = parseCSV(sample);
                setRows(parsed);
                setFileName("exemple_generé.csv");
                setPage(1);
              }}>Exemple</button>

              <button className="bg-[rgb(7,26,131)] text-white px-4 py-2 rounded-[6px] hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300" onClick={handleImport} disabled={rows.length === 0}>
                Importer ({rows.length})
              </button>
            </div>
          </div>

          <div className="preview-table w-full bg-[#F9F9F9] rounded-lg p-2">
            <div className="tr-table w-full flex items-center justify-between border-b border-[#E0E0E0] bg-[#E9EFFF] rounded-t-[8px]">
              <div className="th w-[10%] text-[13px] font-bold text-center py-2">Code</div>
              <div className="th w-[15%] text-[13px] font-bold text-center py-2">Nom</div>
              <div className="th w-[15%] text-[13px] font-bold text-center py-2">Prénom</div>
              <div className="th w-[12%] text-[13px] font-bold text-center py-2">Date</div>
              <div className="th w-[12%] text-[13px] font-bold text-center py-2">Niveau</div>
              <div className="th w-[12%] text-[13px] font-bold text-center py-2">Groupe</div>
              <div className="th w-[12%] text-[13px] font-bold text-center py-2">Email</div>
              <div className="th w-[7%] text-[13px] font-bold text-center py-2">Action</div>
            </div>

            {display.map((r, idx) => {
              const realIdx = (page - 1) * perPage + idx;
              return (
                <div key={realIdx} className="tr-table w-full flex items-center justify-between border-b border-[#E0E0E0]">
                  <input value={r.code} onChange={(e) => handleCellChange(realIdx, "code", e.target.value)} className="w-[10%] text-[13px] px-2 py-1" />
                  <input value={r.nom} onChange={(e) => handleCellChange(realIdx, "nom", e.target.value)} className="w-[15%] text-[13px] px-2 py-1" />
                  <input value={r.prenom} onChange={(e) => handleCellChange(realIdx, "prenom", e.target.value)} className="w-[15%] text-[13px] px-2 py-1" />
                  <input value={r.dateNaissance} onChange={(e) => handleCellChange(realIdx, "dateNaissance", e.target.value)} className="w-[12%] text-[13px] px-2 py-1" />
                  <input value={r.niveau} onChange={(e) => handleCellChange(realIdx, "niveau", e.target.value)} className="w-[12%] text-[13px] px-2 py-1" />
                  <input value={r.groupe} onChange={(e) => handleCellChange(realIdx, "groupe", e.target.value)} className="w-[12%] text-[13px] px-2 py-1" />
                  <input value={r.email} onChange={(e) => handleCellChange(realIdx, "email", e.target.value)} className="w-[12%] text-[13px] px-2 py-1" />
                  <div className="w-[7%] flex items-center justify-center gap-2">
                    <button onClick={() => handleRemoveRow(realIdx)} className="w-[28px] h-[28px] bg-[#9c1d1d] text-white rounded-[6px] flex items-center justify-center hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300">
                      <img src="/src/assets/icons/supprimer1.png" alt="suppr" className="w-[14px] h-[14px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="w-full flex justify-end items-center gap-2 mt-3">
            <button className="navBtn w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300" onClick={() => setPage(p => Math.max(1, p - 1))}>‹</button>
            <div className="px-3 py-1 bg-[#ECF0FF] rounded-[6px] border-2 border-[#3B679A]">{page}</div>
            <button className="navBtn w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300" onClick={() => setPage(p => Math.min(totalPages, p + 1))}>›</button>
            <div className="ml-2 text-sm text-[#666]">Page {page} / {totalPages}</div>
          </div>
        </div>

        <div className="w-full flex justify-end gap-2 p-4">
          <button onClick={onClose} className="BtnCancel w-[150px] h-[40px] bg-[rgb(102,102,102)] text-white rounded-[10px] hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300">Annuler</button>
          <button onClick={handleImport} className="BtnSave w-[160px] h-[40px] bg-[rgb(7,26,131)] text-white rounded-[10px] hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300">Importer</button>
        </div>
      </div>
    </div>
  );
};

export default ModalImportStudents;
