import React, { useState, useMemo } from "react";

/**
 * Props:
 * - students, setStudents
 * - groups, setGroups
 * - MAX_CAPACITY (optional; default 22)
 */
const GroupsView = ({ students, setStudents, groups, setGroups, MAX_CAPACITY = 22 }) => {
    const [niveau, setNiveau] = useState("");

    // groupes pour le niveau sélectionné
    const levelGroups = useMemo(() => groups.filter(g => g.niveau === niveau), [groups, niveau]);

    // étudiants du niveau
    const studentsOfLevel = useMemo(() => students.filter(s => s.niveau === niveau), [students, niveau]);

    function nextGroupNumberForLevel(n) {
        const nums = groups
            .filter(g => g.niveau === n)
            .map(g => {
                const m = g.name.match(/Groupe\s*(\d+)$/i);
                return m ? parseInt(m[1], 10) : 0;
            });
        const max = nums.length ? Math.max(...nums) : 0;
        return max + 1;
    }

    function createGroup(n) {
        if (!n) return;
        const num = nextGroupNumberForLevel(n);
        const name = `Groupe ${num}`;
        setGroups(prev => [...prev, { name, niveau: n, capacity: MAX_CAPACITY }]);
    }

    function deleteGroup(groupName) {
        if (!confirm(`Supprimer ${groupName} ? Les étudiants seront non-affiliés.`)) return;
        // désaffecter étudiants
        setStudents(prev => prev.map(s => (s.groupe === groupName ? { ...s, groupe: "" } : s)));
        setGroups(prev => prev.filter(g => g.name !== groupName));
    }

    function assignStudentToGroup(studentCode, groupName) {
        // vérifie capacité
        const count = students.filter(s => s.groupe === groupName).length;
        const group = groups.find(g => g.name === groupName);
        if (group && count >= group.capacity) {
            alert(`${groupName} est plein (${group.capacity})`);
            return;
        }
        setStudents(prev => prev.map(s => (s.code === studentCode ? { ...s, groupe: groupName } : s)));
    }

    function unassignStudent(studentCode) {
        setStudents(prev => prev.map(s => (s.code === studentCode ? { ...s, groupe: "" } : s)));
    }

    function autoDistribute() {
        if (!niveau) { alert("Sélectionner d'abord un niveau."); return; }
        const N = studentsOfLevel.length;
        if (N === 0) { alert("Aucun étudiant pour ce niveau"); return; }

        const max = MAX_CAPACITY;
        const groupesCount = Math.ceil(N / max);
        const tailleDeBase = Math.floor(N / groupesCount);
        const reste = N % groupesCount;

        if (!confirm(`Répartir automatiquement ${N} étudiants en ${groupesCount} groupes ? (max ${max})`)) return;

        // supprimer groupes existants de ce niveau
        setGroups(prev => prev.filter(g => g.niveau !== niveau));
        // créer groupesCount groupes
        const newGroups = [];
        for (let i = 1; i <= groupesCount; i++) {
            // num = nextGroupNumberForLevel? ici on veut repartir à partir de 1 pour rendre cohérent
            newGroups.push({ name: `Groupe ${i}`, niveau, capacity: max });
        }
        // assigner
        const targetSizes = [];
        for (let i = 1; i <= groupesCount; i++) {
            if (i <= reste) targetSizes.push(tailleDeBase + 1);
            else targetSizes.push(tailleDeBase);
        }

        // students list (stable order: current order)
        const codes = studentsOfLevel.map(s => s.code);
        const assignments = {}; // groupName -> [codes]

        let idxGroup = 0;
        for (const code of codes) {
            // trouver groupe courant qui n'a pas atteint targetSizes[idxGroup]
            while ((assignments[`Groupe ${idxGroup + 1}`] || []).length >= targetSizes[idxGroup]) {
                idxGroup++;
                if (idxGroup >= groupesCount) { idxGroup = groupesCount - 1; break; }
            }
            const gName = `Groupe ${idxGroup + 1}`;
            assignments[gName] = assignments[gName] || [];
            assignments[gName].push(code);
        }

        // appliquer changements : 1) ajouter groups, 2) mettre à jour students.groupe
        setGroups(prev => [...prev, ...newGroups]);
        setStudents(prev => prev.map(s => {
            if (s.niveau !== niveau) return s;
            // trouver groupe contenant s.code
            for (const [gName, arr] of Object.entries(assignments)) {
                if (arr.includes(s.code)) return { ...s, groupe: gName };
            }
            return { ...s, groupe: "" };
        }));

        alert(`Répartition terminée : ${groupesCount} groupes créés pour ${niveau}.`);
    }

    return (
        <div className="groups-view w-full">
            <div className="flex items-center gap-3 mb-3">
                <label className="min-w-[140px]">Choisir le niveau :</label>
                <select value={niveau} onChange={(e) => setNiveau(e.target.value)} className="min-w-[200px] bg-[#F2F2F2] rounded-[8px] pl-2 pr-2 py-1">
                    <option value="">-- Sélectionner --</option>
                    <option value="L1">L1</option>
                    <option value="L2">L2</option>
                    <option value="L3">L3</option>
                    <option value="M1">M1</option>
                    <option value="M2">M2</option>
                </select>

                <div className="flex items-center gap-2 ml-auto">
                    <button onClick={autoDistribute} disabled={!niveau} className="min-w-[160px] bg-[#3B679A] text-white rounded-[8px] px-3 py-1">Répartir automatiquement</button>
                    <button onClick={() => createGroup(niveau)} disabled={!niveau} className="min-w-[160px] bg-[#6B7280] text-white rounded-[8px] px-3 py-1">Créer un nouveau groupe</button>
                </div>
            </div>

            <div className="groups-list flex flex-col gap-3">
                {!niveau && <div className="text-sm text-[#666]">Sélectionner un niveau pour afficher les groupes.</div>}

                {niveau && (
                    <>
                        {/* groupes existants */}
                        {levelGroups.length === 0 && <div className="text-sm text-[#666]">Aucun groupe pour ce niveau.</div>}

                        {levelGroups.map((g, idx) => {
                            const members = students.filter(s => s.groupe === g.name && s.niveau === niveau);
                            return (
                                <div key={g.name} className="group-card border rounded-md overflow-hidden">
                                    <div className="p-3 bg-[#F3F6FB] flex items-center justify-between cursor-pointer">
                                        <div><strong>{g.name}</strong> <span className="text-sm text-[#666]">({members.length}/{g.capacity})</span></div>
                                        <div className="flex items-center gap-2">
                                            <button onClick={() => deleteGroup(g.name)} className="px-2 py-1 rounded bg-[#E96B6B] text-white">Suppr</button>
                                        </div>
                                    </div>

                                    <div className="p-3">
                                        {/* tableau simple */}
                                        <div className="w-full overflow-x-auto">
                                            <table className="w-full">
                                                <thead>
                                                    <tr className="text-left text-sm text-[#666]">
                                                        <th className="py-2">Code</th>
                                                        <th>Nom</th>
                                                        <th>Prénom</th>
                                                        <th>Niveau</th>
                                                        <th>Affecter</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {members.map(m => (
                                                        <tr key={m.code} className="border-t">
                                                            <td className="py-2">{m.code}</td>
                                                            <td>{m.nom}</td>
                                                            <td>{m.prenom}</td>
                                                            <td>{m.niveau}</td>
                                                            <td>
                                                                <select value={m.groupe || ""} onChange={(e) => {
                                                                    const val = e.target.value;
                                                                    if (val === "") unassignStudent(m.code);
                                                                    else assignStudentToGroup(m.code, val);
                                                                }}>
                                                                    <option value={g.name}>{g.name}</option>
                                                                    {levelGroups.filter(x => x.name !== g.name).map(x => <option key={x.name} value={x.name}>{x.name}</option>)}
                                                                    <option value="">Retirer</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                        {/* Card Sans groupe */}
                        <div className="group-card border rounded-md overflow-hidden">
                            <div className="p-3 bg-[#FFF7E6] flex items-center justify-between">
                                <div><strong>Sans groupe</strong> <span className="text-sm text-[#666]">({studentsOfLevel.filter(s => !s.groupe).length})</span></div>
                            </div>
                            <div className="p-3">
                                <div className="w-full overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="text-left text-sm text-[#666]">
                                                <th className="py-2">Code</th>
                                                <th>Nom</th>
                                                <th>Prénom</th>
                                                <th>Niveau</th>
                                                <th>Affecter</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {studentsOfLevel.filter(s => !s.groupe).map(m => (
                                                <tr key={m.code} className="border-t">
                                                    <td className="py-2">{m.code}</td>
                                                    <td>{m.nom}</td>
                                                    <td>{m.prenom}</td>
                                                    <td>{m.niveau}</td>
                                                    <td>
                                                        <select value={m.groupe || ""} onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (val === "") unassignStudent(m.code);
                                                            else assignStudentToGroup(m.code, val);
                                                        }}>
                                                            <option value="">Affecter à...</option>
                                                            {levelGroups.map(x => <option key={x.name} value={x.name}>{x.name}</option>)}
                                                        </select>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default GroupsView;
