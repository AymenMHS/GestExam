// src/components/gestReclamations/ReclamationsAdmin.jsx
import React, { useMemo, useState, useEffect } from "react";
import { getUserRole } from "../../utils/user";

/**
 * ReclamationsAdmin.jsx
 * - 2 modes (pour Responsable de planification) :
 *    - "enseignants" : UI existante (En attente / Acceptées / Refusées)
 *    - "chef"       : réclamations venant de la partie publications (chef département)
 *
 * Notes:
 * - Les réclamations "chef" sont simulées en localStorage sous la clé 'pubReclaims'
 *   (format: [{ id, lvlLabel, typeLabel, message, status }])
 * - Approve sur une réclamation "chef" passe son status à 'accepted' localement.
 */

// sample data (ids uniques) - réclamations enseignants (inchangées)
const INITIAL = [
  { id: 101, enseignant: "M. Enseignant", examen: "Algorithmique 1", date: "2025-11-18", heure: "08:30 - 10:00", statut: "pending", raison: "Maladie", message: "J'ai attrapé froid, je ne peux pas assurer la surveillance." },
  { id: 102, enseignant: "Mme Dupont", examen: "Algebre 1", date: "2025-11-20", heure: "13:30 - 15:00", statut: "accepted", raison: "Problème personnel", message: "Impossible d'être présent, demande acceptée." },
  { id: 103, enseignant: "M. Benamar", examen: "Physique 1", date: "2025-11-23", heure: "11:00 - 12:30", statut: "rejected", raison: "Non justifié", message: "Réclamation refusée car info manquante." },
  { id: 104, enseignant: "Mme K.", examen: "Réseaux", date: "2025-12-10", heure: "08:00 - 09:30", statut: "pending", raison: "Rendez-vous médical", message: "Hospitalisation programmée, justificatif disponible." },
];

// sample publication reclaims (used only if localStorage n'a rien)
const SAMPLE_PUB_RECLAIMS = [
  { id: "p-1", lvlLabel: "L3 - Informatique", typeLabel: "Contrôles Continus", message: "Le planning de CC chevauche d'autres matières, merci de vérifier.", status: "pending" },
  { id: "p-2", lvlLabel: "M1 - Génie Logiciel", typeLabel: "Examens", message: "Salle incorrecte pour l'examen projet, risque de surbooking.", status: "pending" },
];

const STATUS_LABEL = { pending: "En attente", accepted: "Accepté", rejected: "Refusé" };
const btnAnim = "transition-all duration-200 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]";

function TabButton({ label, active, onClick, count }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-2 rounded-md ${active ? "bg-[#bbccde] shadow-inner" : "hover:bg-gray-50"} text-sm flex items-center gap-2`}
    >
      <span>{label}</span>
      <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded-full">{count}</span>
    </button>
  );
}

function StatusPill({ statut }) {
  const map = { pending: "bg-[#9E9E9E]", accepted: "bg-[#1FA12B]", rejected: "bg-[#C02727]" };
  return <span className={`${map[statut]} text-white px-3 py-[6px] rounded-full text-sm`}>{STATUS_LABEL[statut]}</span>;
}

export default function ReclamationsAdmin() {
  const role = getUserRole() || localStorage.getItem("userRole") || "Etudiant";
  const allowed = ["Chef Département", "Responsable de planification"].includes(role);

  // top-level tab when responsable: 'enseignants' | 'chef'
  const [mainTab, setMainTab] = useState("enseignants");

  // enseignant states (existing)
  const [items, setItems] = useState(INITIAL);
  const [activeTab, setActiveTab] = useState("pending"); // pending | accepted | rejected
  const [query, setQuery] = useState("");
  const [teacherFilter, setTeacherFilter] = useState("all");
  const [expanded, setExpanded] = useState(null);

  // publication reclaims (chef) — loaded from localStorage or sample
  const [pubReclaims, setPubReclaims] = useState(() => {
    try {
      const raw = localStorage.getItem("pubReclaims");
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore parse error */ }
    return SAMPLE_PUB_RECLAIMS;
  });

  useEffect(() => {
    // persist pubReclaims to localStorage pour tests
    try { localStorage.setItem("pubReclaims", JSON.stringify(pubReclaims)); } catch (e) {}
  }, [pubReclaims]);

  if (!allowed) {
    return (
      <div className="w-full">
        <div className="bg-white rounded-md p-6 shadow-sm">
          <h2 className="font-bold text-lg">Accès refusé</h2>
          <p className="text-sm text-gray-500 mt-2">Seul le Chef de département et le Responsable de planification peuvent gérer les réclamations.</p>
        </div>
      </div>
    );
  }

  // --- enseignant helpers (sans notes d'administration) ---
  const teachers = useMemo(() => {
    const s = new Set(items.map((i) => i.enseignant));
    return ["all", ...Array.from(s)];
  }, [items]);

  const counts = useMemo(() => {
    return {
      pending: items.filter((i) => i.statut === "pending").length,
      accepted: items.filter((i) => i.statut === "accepted").length,
      rejected: items.filter((i) => i.statut === "rejected").length,
    };
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((i) => {
      if (activeTab && i.statut !== activeTab) return false;
      if (teacherFilter !== "all" && i.enseignant !== teacherFilter) return false;
      if (!q) return true;
      return (
        i.examen.toLowerCase().includes(q) ||
        (i.enseignant || "").toLowerCase().includes(q) ||
        (i.raison || "").toLowerCase().includes(q) ||
        (i.message || "").toLowerCase().includes(q)
      );
    });
  }, [items, activeTab, query, teacherFilter]);

  const setStatus = (id, statut) => {
    if (!window.confirm(`Confirmer: passer la réclamation #${id} à "${STATUS_LABEL[statut]}" ?`)) return;
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, statut } : p)));
  };

  // --- publication reclaims helpers (chef tab) ---
  const approvePubReclaim = (id) => {
    if (!window.confirm("Approuver cette réclamation du Chef Département ?")) return;
    setPubReclaims((prev) => prev.map((r) => (r.id === id ? { ...r, status: "accepted" } : r)));
  };

  // counts pour pubReclaims
  const pubCounts = useMemo(() => {
    return {
      pending: pubReclaims.filter((r) => r.status === "pending").length,
      accepted: pubReclaims.filter((r) => r.status === "accepted").length,
      rejected: pubReclaims.filter((r) => r.status === "rejected").length,
      total: pubReclaims.length,
    };
  }, [pubReclaims]);

  // --- Render ---
  return (
    <div className="w-full">
      <div className="bg-white rounded-[8px] p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-[20px] font-bold font-nunito">Gestion des réclamations</h1>
            <p className="text-sm text-gray-500 mt-1">Gérez les réclamations reçues — triez et traitez rapidement.</p>
          </div>

          {/* main tabs (visible pour Responsable de planification) */}
          {role === "Responsable de planification" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMainTab("enseignants")}
                className={`px-3 py-2 rounded-md ${mainTab === "enseignants" ? "bg-[#bbccde] shadow-inner" : "hover:bg-gray-50"} text-sm`}
              >
                Réclamations Enseignants
              </button>
              <button
                onClick={() => setMainTab("chef")}
                className={`px-3 py-2 rounded-md ${mainTab === "chef" ? "bg-[#bbccde] shadow-inner" : "hover:bg-gray-50"} text-sm`}
              >
                Réclamations Chef Département
              </button>
            </div>
          ) : ( null
          )}
        </div>

        {/* ---------------------------
            MAIN: RECLAMATIONS ENSEIGNANTS (sans notes d'administration)
           --------------------------- */}
        {mainTab === "enseignants" && (
          <>
            {/* search / filters */}
            <div className="flex items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-[560px]">
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher (examen / enseignant / raison)" className="h-9 rounded-md p-2 pl-10 w-full shadow-sm" />
                <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>

              <select value={teacherFilter} onChange={(e) => setTeacherFilter(e.target.value)} className="h-9 rounded-md border px-2 text-sm">
                {teachers.map((t) => <option key={t} value={t}>{t === "all" ? "Tous les enseignants" : t}</option>)}
              </select>

              <div className="ml-auto text-sm text-gray-500">
                Total: <b>{items.length}</b>
              </div>
            </div>

            {/* status tabs */}
            <div className="flex items-center gap-2 mb-4">
              <TabButton label="En attente" active={activeTab === "pending"} onClick={() => setActiveTab("pending")} count={counts.pending} />
              <TabButton label="Acceptées" active={activeTab === "accepted"} onClick={() => setActiveTab("accepted")} count={counts.accepted} />
              <TabButton label="Refusées" active={activeTab === "rejected"} onClick={() => setActiveTab("rejected")} count={counts.rejected} />
            </div>

            {/* list header */}
            <div className="w-full rounded-t-[6px] bg-[#E9EFFF] px-4 py-3 border border-[#E0E0E0] flex items-center font-semibold text-[#555555]">
              <div className="w-[22%]">Enseignant</div>
              <div className="w-[22%]">Examen</div>
              <div className="w-[14%]">Date</div>
              <div className="w-[14%]">Heure</div>
              <div className="w-[14%]">Statut</div>
              <div className="w-[14%] text-right">Actions</div>
            </div>

            {/* rows */}
            <div className="divide-y divide-[#E0E0E0]">
              {filtered.length === 0 && <div className="p-4 text-center text-sm text-gray-500">Aucune réclamation pour cet onglet / filtre.</div>}

              {filtered.map((r) => {
                const isExpanded = expanded === r.id;
                return (
                  <div key={r.id}>
                    <div className="w-full flex items-center px-4 py-3 hover:bg-white transition-all duration-150">
                      <div className="w-[22%] text-[14px] font-medium">{r.enseignant}</div>
                      <div className="w-[22%] text-[14px]">{r.examen}</div>
                      <div className="w-[14%] text-[14px]">{r.date}</div>
                      <div className="w-[14%] text-[14px]">{r.heure}</div>
                      <div className="w-[14%] flex items-center">{<StatusPill statut={r.statut} />}</div>
                      <div className="w-[14%] flex items-center justify-end gap-2">
                        {r.statut === "pending" && (
                          <>
                            <button onClick={() => setStatus(r.id, "accepted")} className={`px-2 py-1 rounded-md bg-green-600 text-white text-xs ${btnAnim}`}>Accepter</button>
                            <button onClick={() => setStatus(r.id, "rejected")} className={`px-2 py-1 rounded-md bg-red-600 text-white text-xs ${btnAnim}`}>Refuser</button>
                          </>
                        )}
                        <button onClick={() => setExpanded((p) => (p === r.id ? null : r.id))} className="w-9 h-9 rounded-md flex items-center justify-center hover:bg-gray-100">
                          {isExpanded ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" /></svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          )}
                        </button>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="px-6 py-4 bg-[#F7F7F7] border-b border-[#E0E0E0]">
                        <div className="bg-white rounded-md p-4 shadow-sm">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="text-xs text-gray-500">Raison</div>
                              <div className="font-medium">{r.raison}</div>
                            </div>
                            <div>
                              <div className="text-xs text-gray-500">Message</div>
                              <div className="text-sm leading-relaxed">{r.message}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* footer / pagination (placeholder) */}
            <div className="mt-4 flex justify-end">
              <div className="text-xs text-gray-500">Pagination: placeholder</div>
            </div>
          </>
        )}

        {/* ---------------------------
            MAIN: RECLAMATIONS CHEF (pour responsable)
           --------------------------- */}
        {mainTab === "chef" && (
          <div>
            <div className="mb-3 flex items-center justify-between">
              <div>
                <h3 className="font-nunito font-bold">Réclamations émises par le Chef Département</h3>
                <p className="text-xs text-gray-500">{pubCounts.total} réclamation(s)</p>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="text-xs text-gray-500">En attente: <b>{pubCounts.pending}</b></div>
                <div className="text-xs text-gray-500">Acceptées: <b>{pubCounts.accepted}</b></div>
                <div className="text-xs text-gray-500">Refusées: <b>{pubCounts.rejected}</b></div>
              </div>
            </div>

            <div className="space-y-3">
              {pubReclaims.length === 0 && <div className="p-4 text-sm text-gray-500">Aucune réclamation du chef département.</div>}

              {pubReclaims.map((p) => (
                <div key={p.id} className="bg-white p-4 rounded-md border shadow-sm flex items-center justify-between">
                  <div className="flex-1 pr-4">
                    <div className="text-sm font-semibold">{p.lvlLabel} • {p.typeLabel}</div>
                    <div className="text-xs text-gray-600 mt-1">{p.message}</div>
                    <div className="mt-2"><StatusPill statut={p.status} /></div>
                  </div>

                  <div className="flex items-center gap-2">
                    {p.status === "pending" && (
                      <button onClick={() => approvePubReclaim(p.id)} className={`px-3 py-2 rounded-md bg-green-600 text-white ${btnAnim}`}>Approuver</button>
                    )}

                    {p.status !== "pending" && (
                      <div className="text-xs text-gray-500">Traitée</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
