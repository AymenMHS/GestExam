// src/components/settings/UsersManagement.jsx
import React, { useState, useMemo } from "react";
import Toggle from "./Toggle";
import { getUserRole } from "../../utils/user";

/**
 * Gestion utilisateur local.
 * - visible seulement si role === 'Chef département' || 'Responsable de planification'
 * - role detection via getUserRole() (fallback debugRole)
 */

const btnAnim = "transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]";

const initialUsers = [
  { id: 1, name: "Matallah Hocine", email: "matallah@univ.dz", role: "Chef département", active: true },
  { id: 2, name: "Benomar Omar", email: "benomar@univ.dz", role: "Responsable de planification", active: true },
  { id: 3, name: "M. Enseignant", email: "enseignant@univ.dz", role: "Enseignant", active: true },
];

const UsersManagement = () => {
  const rawRole = localStorage.getItem("debugRole") || getUserRole();
  const role = (rawRole || "").toString();
  const roleLower = role.toLowerCase();

  const allowed = roleLower.includes("chef") || roleLower.includes("responsable");

  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ name: "", email: "", role: "Enseignant" });

  // NEW: recherche
  const [query, setQuery] = useState("");

  const addUser = () => {
    if (!form.name || !form.email) return;
    const newUser = { id: Date.now(), ...form, active: true };
    setUsers((s) => [newUser, ...s]);
    setForm({ name: "", email: "", role: "Enseignant" });
  };

  const toggleActive = (id) => setUsers((s) => s.map(u => u.id === id ? { ...u, active: !u.active } : u));
  const deleteUser = (id) => setUsers((s) => s.filter(u => u.id !== id));

  const counts = useMemo(() => ({
    total: users.length,
    active: users.filter(u => u.active).length,
  }), [users]);

  // filteredUsers: filtre par name / email / role (insensible à la casse)
  const filteredUsers = useMemo(() => {
    const q = (query || "").trim().toLowerCase();
    if (!q) return users;
    return users.filter(u =>
      (u.name || "").toLowerCase().includes(q) ||
      (u.email || "").toLowerCase().includes(q) ||
      (u.role || "").toLowerCase().includes(q)
    );
  }, [users, query]);

  if (!allowed) {
    return (
      <div className="bg-[#fff7f7] p-4 rounded-md">
        <h3 className="font-nunito font-bold text-[16px] mb-2">Comptes utilisateurs</h3>
        <p className="text-sm text-gray-600">Vous n'avez pas la permission pour gérer les comptes.</p>
        <p className="mt-2 text-xs text-gray-400">Accès réservé : Chef département / Responsable de planification.</p>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-[#f9f9fb] rounded-md p-3 shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-nunito font-bold text-[16px]">Comptes utilisateurs</h3>
            <p className="text-xs text-gray-400">Gérez les comptes et leurs statuts (local uniquement)</p>
          </div>
          <div className="text-right text-xs text-gray-500">
            <div>Total: <b>{counts.total}</b></div>
            <div>Actifs: <b>{counts.active}</b></div>
          </div>
        </div>

        {/* create user + search bar */}
        <div className="flex flex-col md:flex-row gap-2 items-end">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              placeholder="Nom complet"
              className="w-full h-9 rounded-md p-2"
            />
            <input
              value={form.email}
              onChange={e => setForm({...form, email: e.target.value})}
              placeholder="email@exemple"
              className="w-full h-9 rounded-md p-2"
            />
            <select
              value={form.role}
              onChange={e=>setForm({...form, role:e.target.value})}
              className="w-full h-9 rounded-md p-2"
            >
              <option>Enseignant</option>
              <option>Etudiant</option>
              <option>Responsable de planification</option>
              <option>Chef département</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <button onClick={addUser} className={`px-3 py-2 rounded-md bg-[#071A83] text-white ${btnAnim}`}>
              Ajouter
            </button>

            {/* Search input */}
            <div className="relative">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher nom / email / rôle..."
                className="h-9 rounded-md p-2 pl-10 w-64 shadow-sm"
                aria-label="Recherche utilisateurs"
              />
              {/* small magnifier icon (inline svg) */}
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="7"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>

              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-gray-500 hover:opacity-80"
                  aria-label="Effacer recherche"
                >
                  x
                </button>
              )}
            </div>
          </div>
        </div>

        {/* users list */}
        <div className="w-full border-t pt-3">
          <div className="flex flex-col gap-2">
            {filteredUsers.length === 0 ? (
              <div className="p-3 text-center text-sm text-gray-500">Aucun utilisateur correspondant.</div>
            ) : (
              filteredUsers.map(u => (
                <div key={u.id} className="flex items-center justify-between p-2 rounded-md bg-white shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#E3F0FF] rounded-full flex items-center justify-center font-nunito font-semibold">
                      {u.name.split(" ").map(s => s[0]).slice(0,2).join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-sm">{u.name}</div>
                      <div className="text-xs text-gray-400">{u.email} • <span className="text-[#234a78]">{u.role}</span></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">Actif</span>
                      <Toggle checked={u.active} onChange={() => toggleActive(u.id)} ariaLabel={`Activer ${u.name}`} />
                    </div>

                    <button onClick={() => deleteUser(u.id)} className={`w-[36px] h-[36px] bg-red-600 rounded-md flex items-center justify-center ${btnAnim}`} title="Supprimer">
                      <img src="/src/assets/icons/supprimer1.png" alt="del" className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      <div className="text-right">
        <button className={`px-4 py-2 rounded-md bg-[#071A83] text-white ${btnAnim}`}>Enregistrer</button>
      </div>
    </div>
  );
};

export default UsersManagement;
