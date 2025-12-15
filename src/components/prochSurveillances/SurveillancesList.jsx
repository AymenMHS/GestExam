// src/components/gestReclamations/ProchSurveillances.jsx
import React, { useState } from "react";

/* -------------------- Sample data (avec statut par défaut) -------------------- */
const sampleReclamations = [
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
    surveillants: ["M. Habchi (vous)", "A. Amraoui", "M. Belbachir"],
    statut: "En Attente",
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
    surveillants: ["S. Ali", "K. Yassine"],
    statut: "En Attente",
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
    surveillants: ["M. Youssef", "M. Sara"],
    statut: "En Attente",
  },
];

/* -------------------- Helpers -------------------- */
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

/* -------------------- Modal Component (inchangé) -------------------- */
const ReclaimModal = ({ isOpen, onClose, exam, onSend }) => {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sentOk, setSentOk] = useState(false);

  if (!isOpen || !exam) return null;

  const reasons = [
    "-- Sélectionnez une raison --",
    "Changement de salle",
    "Conflit d'horaire",
    "Erreur de planning",
    "Problème de surveillance",
    "Autre",
  ];

  const handleSend = () => {
    if (!reason || reason === reasons[0]) {
      alert("Veuillez sélectionner une raison.");
      return;
    }
    if (message.trim().length < 5) {
      alert("Veuillez ajouter un message (min 5 caractères).");
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentOk(true);
      onSend?.(exam.id, { reason, message });
      setTimeout(() => {
        setSentOk(false);
        onClose();
      }, 900);
    }, 800);
  };

  return (
    <div className="modal-reclaim w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1100]">
      <div
        className="overlay w-full h-full bg-[rgba(0,0,0,0.6)] backdrop-blur-[2px] absolute top-0 left-0"
        onClick={onClose}
      />
      <div className="modal-content w-[88vw] max-w-[900px] bg-white rounded-[10px] relative z-[1101] flex flex-col">
        <div className="header-modal w-full h-[56px] flex justify-between items-center px-6 border-b border-[#eee]">
          <h2 className="text-[18px] font-bold font-nunito">Détail de l'examen</h2>
          <button
            className="close-modal w-[36px] h-[36px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:opacity-80 transition-all duration-300"
            onClick={onClose}
            title="Fermer"
          >
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[18px] h-[18px]" />
          </button>
        </div>

        <div className="content-modal p-6 overflow-y-auto">
          <div className="grid grid-cols-2 gap-x-6 gap-y-3">
            <div className="flex items-start gap-4">
              <h3 className="w-[160px] text-[14px] font-normal text-[#6b6b6b]">Type d'examen</h3>
              <p className="text-[14px] font-semibold">{exam.type}</p>
            </div>

            <div className="flex items-start gap-4">
              <h3 className="w-[160px] text-[14px] font-normal text-[#6b6b6b]">Niveau</h3>
              <p className="text-[14px] font-semibold">{exam.niveau}</p>
            </div>

            <div className="flex items-start gap-4">
              <h3 className="w-[160px] text-[14px] font-normal text-[#6b6b6b]">Module</h3>
              <p className="text-[14px] font-semibold">{exam.module}</p>
            </div>

            <div className="flex items-start gap-4">
              <h3 className="w-[160px] text-[14px] font-normal text-[#6b6b6b]">Date - Heure</h3>
              <p className="text-[14px] font-semibold">{`${formatDate(exam.date_iso)} - ${formatTime(exam.date_iso)}`}</p>
            </div>

            <div className="flex items-start gap-4">
              <h3 className="w-[160px] text-[14px] font-normal text-[#6b6b6b]">Durée</h3>
              <p className="text-[14px] font-semibold">{exam.duree}</p>
            </div>

            <div className="flex items-start gap-4">
              <h3 className="w-[160px] text-[14px] font-normal text-[#6b6b6b]">Enseignant(e)</h3>
              <p className="text-[14px] font-semibold">{exam.enseignant}</p>
            </div>

            <div className="col-span-2 flex items-start gap-4">
              <h3 className="w-[160px] text-[14px] font-normal text-[#6b6b6b]">Salles - Groupes - Surveillants</h3>
              <div>
                <p className="text-[14px] font-semibold">{exam.salle} - {exam.horaire}</p>
                <p className="text-[14px] font-semibold">{exam.surveillants.join(" / ")}</p>
              </div>
            </div>

            <div className="col-span-2 mt-2">
              <h3 className="text-[14px] font-normal text-[#6b6b6b] mb-2">Raison</h3>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-[#F2F2F2] rounded-[8px] pl-3 pr-3 py-2 text-[14px] font-nunito shadow-sm"
              >
                {reasons.map((r, idx) => (
                  <option key={idx} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-span-2 mt-3">
              <h3 className="text-[14px] font-normal text-[#6b6b6b] mb-2">Message</h3>
              <textarea
                placeholder="Votre message de réclamation..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full min-h-[100px] bg-[#fafafa] rounded-[8px] p-3 text-[14px] font-nunito border border-[#e8e8e8] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 pt-2 flex justify-end items-center gap-3 border-t border-[#eee]">
          <button
            onClick={onClose}
            className="w-[140px] h-[38px] bg-[#D2D2D2] rounded-[8px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
          >
            Annuler
          </button>

          <button
            onClick={handleSend}
            disabled={sending}
            className="w-[160px] h-[38px] flex items-center justify-center gap-2 rounded-[8px] font-nunito text-[14px] font-semibold cursor-pointer border-none bg-[#9c1d1d] text-white hover:opacity-90 hover:-translate-y-1 transition-all duration-300"
          >
            {sending ? "Envoi..." : sentOk ? "Envoyé ✓" : "Envoyer"}
          </button>
        </div>
      </div>
    </div>
  );
};

/* -------------------- Row Component (ajout statut + accepter) -------------------- */
const ReclaimRow = ({ item, onReclaim, onAccept }) => {
  return (
    <div className="tr-table w-full flex items-center justify-between border-b border-[#E0E0E0] group hover:bg-white hover:shadow-sm transition-all duration-200">
      <div className="td-table w-[16%] text-[14px] font-medium font-nunito text-[#333333] text-left py-3 pl-4">
        {formatDate(item.date_iso)}
      </div>

      <div className="td-table w-[12%] text-[14px] font-medium font-nunito text-[#333333] text-left py-3">
        {formatTime(item.date_iso)}
      </div>

      <div className="td-table w-[24%] text-[14px] font-medium font-nunito text-[#333333] text-left py-3">
        {item.module}
      </div>

      <div className="td-table w-[16%] text-[14px] font-medium font-nunito text-[#333333] text-left py-3">
        {item.salle}
      </div>

      {/* statut */}
      <div className="td-table w-[10%] text-[14px] font-medium font-nunito text-[#333333] text-center py-3">
        <span
          className={`inline-block px-3 py-1 rounded-full text-xs ${
            item.statut === "Accepté" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}
        >
          {item.statut}
        </span>
      </div>

      {/* actions */}
      <div className="td-table w-[22%] text-[14px] font-medium font-nunito text-[#333333] text-center py-3 flex items-center justify-center gap-2 pr-4">
        {/* Accepter */}
        <button
          onClick={() => onAccept(item)}
          className={`w-[100px] h-[34px] rounded-[8px] text-white text-[14px] font-nunito shadow-sm flex justify-center items-center ${
            item.statut === "Accepté" ? "bg-gray-400 cursor-default" : "bg-[#0b74ea] hover:opacity-90"
          }`}
          disabled={item.statut === "Accepté"}
          title={item.statut === "Accepté" ? "Déjà accepté" : "Accepter la surveillance"}
        >
          {item.statut === "Accepté" ? "Accepté ✓" : "Accepter"}
        </button>

        {/* Réclamer */}
        <button
          onClick={() => onReclaim(item)}
          className="w-[100px] h-[34px] rounded-[8px] text-white text-[14px] font-nunito shadow-sm border-none flex justify-center items-center bg-[#9c1d1d] cursor-pointer hover:opacity-80"
        >
          Réclamer
        </button>
      </div>
    </div>
  );
};

/* -------------------- Table Header (ajout Statut) -------------------- */
const ReclaimTableHeader = () => (
  <div className="tr-table w-full flex items-center justify-between border-b border-[#E0E0E0] bg-[#E9EFFF] rounded-t-[8px]">
    <div className="th-table w-[16%] text-[14px] font-bold font-nunito text-[#555555] text-left py-3 pl-4">Date</div>
    <div className="th-table w-[12%] text-[14px] font-bold font-nunito text-[#555555] text-left py-3">Heure</div>
    <div className="th-table w-[24%] text-[14px] font-bold font-nunito text-[#555555] text-left py-3">Examen</div>
    <div className="th-table w-[16%] text-[14px] font-bold font-nunito text-[#555555] text-left py-3">Salle</div>
    <div className="th-table w-[10%] text-[14px] font-bold font-nunito text-[#555555] text-center py-3">Statut</div>
    <div className="th-table w-[22%] text-[14px] font-bold font-nunito text-[#555555] text-center py-3 pr-4">Actions</div>
  </div>
);

/* -------------------- Main Component -------------------- */
const ProchSurveillances = () => {
  const [items, setItems] = useState(sampleReclamations);
  const [selectedExam, setSelectedExam] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleReclaimClick = (exam) => {
    setSelectedExam(exam);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedExam(null);
  };

  const handleSendReclamation = (examId, payload) => {
    console.log("Envoi réclamation pour exam", examId, payload);
    // ici tu peux mettre à jour l'état pour marquer que la réclamation a été envoyée
  };

  // Accepter la surveillance -> met à jour le statut
  const handleAccept = (exam) => {
    setItems((prev) => prev.map((it) => (it.id === exam.id ? { ...it, statut: "Accepté" } : it)));
  };

  // Téléchargement planning (CSV) — génère un CSV simple et lance le download
  const downloadPlanningCSV = () => {
    const headers = ["code", "niveau", "module", "type", "date", "heure", "salle", "duree", "enseignant", "surveillants", "statut"];
    const rows = items.map((it) => [
      it.code || "",
      it.niveau || "",
      it.module || "",
      it.type || "",
      formatDate(it.date_iso),
      formatTime(it.date_iso),
      it.salle || "",
      it.duree || "",
      it.enseignant || "",
      (it.surveillants || []).join(" / "),
      it.statut || "En Attente",
    ]);

    const csvContent =
      [headers, ...rows]
        .map((r) =>
          r
            .map((cell) => {
              if (typeof cell === "string" && (cell.includes(",") || cell.includes('"') || cell.includes("\n"))) {
                return `"${cell.replace(/"/g, '""')}"`;
              }
              return cell;
            })
            .join(",")
        )
        .join("\r\n") + "\r\n";

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `planning_surveillances_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="reclamation-list w-full p-4 bg-white rounded-[8px] shadow-sm">
      <div className="header-list flex items-center justify-between mb-4">
        <div>
          <h2 className="text-[18px] font-bold font-nunito">Mes prochaines surveillances</h2>
          <p className="text-[13px] text-[#8b96a6] mt-1">{items.length} Examens planifiés</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={downloadPlanningCSV}
            className="min-w-[240px] bg-[#2f5fa3] rounded-[8px] text-white text-[14px] font-nunito flex items-center justify-center gap-2 py-2 px-3 shadow-sm cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
          >
            <img src="/src/assets/icons/telechargements.png" alt="dl" className="w-[16px] h-[16px]" />
            Télécharger le planning des surveillances
          </button>

          <button className="min-w-[140px] bg-[#3B679A] rounded-[8px] text-white text-[14px] font-nunito flex items-center justify-center gap-2 py-2 px-3 shadow-sm cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300">
            <img src="/src/assets/icons/calendrier.png" alt="cal" className="w-[16px] h-[16px]" />
            Voir calendrier
          </button>
        </div>
      </div>

      <div className="table-reclaim w-full border border-[#E0E0E0] rounded-[8px] overflow-hidden">
        <ReclaimTableHeader />
        <div className="divide-y divide-[#E0E0E0]">
          {items.map((it) => (
            <ReclaimRow key={it.id} item={it} onReclaim={handleReclaimClick} onAccept={handleAccept} />
          ))}
        </div>
      </div>

      {/* Pagination (inchangée) */}
      <div className="mt-4 flex justify-end">
        <div className="pagination-exam flex items-center gap-2">
          <button className="w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 transition-all duration-300 cursor-pointer">
            <img src="/src/assets/icons/left-arrow.png" alt="prev" className="w-[12px] h-[12px]" />
          </button>
          <button className="w-[34px] h-[34px] bg-[#ECF0FF] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm border-2 border-[#3B679A]">1</button>
          <button className="w-[34px] h-[34px] bg-white rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 transition-all duration-300 cursor-pointer">2</button>
          <button className="w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 transition-all duration-300 cursor-pointer">
            <img src="/src/assets/icons/right-arrow.png" alt="next" className="w-[12px] h-[12px]" />
          </button>
        </div>
      </div>

      {/* Modal */}
      <ReclaimModal isOpen={isModalOpen} onClose={handleModalClose} exam={selectedExam} onSend={handleSendReclamation} />
    </div>
  );
};

export default ProchSurveillances;
