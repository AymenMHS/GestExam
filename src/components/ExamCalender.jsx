// src/components/ExamCalendar.jsx
import React, { useMemo, useState } from "react";
import calendrierIcon from '../assets/icons/calendrier1.png';
import ModalMoreInfoExam from './gestExamen/ModalMoreInfoExam'; // <-- import du modal

/**
 * ExamCalendar.jsx (amélioré & relié au modal)
 * - React + Tailwind CSS
 * - Compact layout full viewport, internal scroll in grid area
 * - Events format: { id, title, room, start: ISO, end: ISO, colorKey, ... }
 */

const SLOT_H_30 = 28; // px per 30min (compact)
const START_H = 8.5; // 08:30
const END_H = 16; // 16:00

const DEFAULT_EVENTS = [
  { id: 1, title: "Algorithmique 1", room: "Salle N110", start: "2025-11-18T09:00:00", end: "2025-11-18T11:00:00", colorKey: "rose" },
  { id: 2, title: "Analyse 1", room: "Salle N110", start: "2025-11-18T11:00:00", end: "2025-11-18T12:30:00", colorKey: "rose" },
  { id: 3, title: "Algèbre 1", room: "Salle N110", start: "2025-11-20T13:30:00", end: "2025-11-20T15:30:00", colorKey: "rose" },
  { id: 4, title: "Langues étrangères", room: "Salle N110", start: "2025-11-22T09:00:00", end: "2025-11-22T11:00:00", colorKey: "rose" },
  { id: 5, title: "Structure", room: "Salle N110", start: "2025-11-22T11:30:00", end: "2025-11-22T13:00:00", colorKey: "rose" },
  { id: 6, title: "Physique 1", room: "Salle N110", start: "2025-11-23T09:00:00", end: "2025-11-23T11:00:00", colorKey: "lime" },
  { id: 7, title: "Composant ord", room: "Salle N110", start: "2025-11-23T11:30:00", end: "2025-11-23T13:00:00", colorKey: "lime" },
  { id: 8, title: "Composant ord (après-midi)", room: "Salle N110", start: "2025-11-23T15:00:00", end: "2025-11-23T16:00:00", colorKey: "lime" }
];

const COLOR = {
  rose: { bg: "from-rose-500 to-rose-400", text: "text-white", ring: "ring-rose-300/40" },
  lime: { bg: "from-lime-300 to-lime-200", text: "text-gray-900", ring: "ring-lime-300/40" },
  sky: { bg: "from-sky-300 to-sky-200", text: "text-gray-900", ring: "ring-sky-300/30" }
};

/* utilities */
function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = (day === 0 ? -6 : 1 - day); // Monday start
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}
function addDays(d, n) { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
function fmtDayShort(d) { const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]; return days[d.getDay()]; }
function monthShort(d) { const m = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Aoû", "Sep", "Oct", "Nov", "Déc"]; return m[d.getMonth()]; }
function minutesBetween(a, b) { return Math.round((b.getTime() - a.getTime()) / 60000); }

/* computeDayLayouts unchanged (same collision algorithm as before) */
function computeDayLayouts(eventsForDay) {
  if (!eventsForDay || eventsForDay.length === 0) return {};
  const assignments = {};
  const evs = eventsForDay
    .map(ev => {
      const s = new Date(ev.start);
      const e = new Date(ev.end);
      return { ...ev, s, e, startM: s.getTime(), endM: e.getTime(), dur: e.getTime() - s.getTime() };
    })
    .sort((a, b) => a.startM - b.startM || b.dur - a.dur);

  let group = [];
  let activeEnds = [];
  const flushGroup = () => {
    if (group.length === 0) return;
    const groupSize = activeEnds.length;
    group.forEach(item => {
      assignments[item.id] = { col: item._colIndex, colsInGroup: groupSize };
    });
    group = [];
    activeEnds = [];
  };

  for (const ev of evs) {
    if (group.length === 0) {
      ev._colIndex = 0;
      group.push(ev);
      activeEnds = [ev.endM];
      continue;
    }

    const minActiveEnd = Math.min(...activeEnds);
    if (ev.startM >= minActiveEnd) {
      const maxActiveEnd = Math.max(...activeEnds);
      if (ev.startM >= maxActiveEnd) {
        flushGroup();
        ev._colIndex = 0;
        group.push(ev);
        activeEnds = [ev.endM];
        continue;
      }
    }

    let placed = false;
    for (let ci = 0; ci < activeEnds.length; ci++) {
      if (ev.startM >= activeEnds[ci]) {
        ev._colIndex = ci;
        activeEnds[ci] = ev.endM;
        placed = true;
        break;
      }
    }
    if (!placed) {
      ev._colIndex = activeEnds.length;
      activeEnds.push(ev.endM);
    }
    group.push(ev);
  }
  flushGroup();

  const layoutMap = {};
  for (const ev of evs) {
    const a = assignments[ev.id] || { col: 0, colsInGroup: 1 };
    const widthPercent = 100 / a.colsInGroup;
    const leftPercent = a.col * widthPercent;
    layoutMap[ev.id] = { leftPct: leftPercent, widthPct: widthPercent };
  }
  return layoutMap;
}

export default function ExamCalendar({ events = DEFAULT_EVENTS }) {
  const today = new Date();
  const [weekStart, setWeekStart] = useState(() => getWeekStart(new Date("2025-11-17")));
  const [level, setLevel] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("");
  const [roomFilter, setRoomFilter] = useState("all");

  // modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);

  const days = useMemo(() => Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i)), [weekStart]);

  const totalSlots = Math.ceil(((END_H - START_H) * 60) / 30);
  const gridPxHeight = totalSlots * SLOT_H_30;

  const weekLabel = (() => {
    const a = weekStart, b = addDays(weekStart, 6);
    return `${a.getDate()} ${monthShort(a)} — ${b.getDate()} ${monthShort(b)} ${a.getFullYear()}`;
  })();

  const visibleEvents = useMemo(() => {
    const start = weekStart;
    const end = addDays(weekStart, 7);
    return events.filter(ev => {
      const s = new Date(ev.start);
      if (!(s >= start && s < end)) return false;
      if (level !== "all" && ev.level && ev.level !== level) return false;
      if (moduleFilter && ev.title && !ev.title.toLowerCase().includes(moduleFilter.toLowerCase())) return false;
      if (roomFilter !== "all" && ev.room && ev.room !== roomFilter) return false;
      return true;
    });
  }, [events, weekStart, level, moduleFilter, roomFilter]);

  const layoutsByDay = useMemo(() => {
    const map = {};
    for (let i = 0; i < 7; i++) {
      const d = days[i];
      const evs = visibleEvents.filter(ev => {
        const s = new Date(ev.start);
        return s.getFullYear() === d.getFullYear() && s.getMonth() === d.getMonth() && s.getDate() === d.getDate();
      });
      map[i] = {
        events: evs,
        layout: computeDayLayouts(evs)
      };
    }
    return map;
  }, [visibleEvents, days]);

  function prevWeek() { setWeekStart(w => addDays(w, -7)); }
  function nextWeek() { setWeekStart(w => addDays(w, 7)); }
  function toToday() { setWeekStart(getWeekStart(new Date())); }

  function pos(ev) {
    const s = new Date(ev.start), e = new Date(ev.end);
    const startMin = ((s.getHours() + s.getMinutes() / 60) - START_H) * 60;
    const top = Math.max(0, startMin * (SLOT_H_30 / 30));
    const dur = Math.max(20, minutesBetween(s, e));
    const height = dur * (SLOT_H_30 / 30);
    return { top, height };
  }

  // open modal with exam data
  function openExamModal(ev) {
    setSelectedExam(ev);
    setModalOpen(true);
  }
  function closeExamModal() {
    setModalOpen(false);
    setSelectedExam(null);
  }

  return (
    <div className="h-screen w-full text-sm font-sans antialiased">
      <div className="h-full flex flex-col gap-3">
        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-md">
              <img src={calendrierIcon} alt="Calendrier" className="w-7 h-7" />
            </div>
            <div>
              <div className="text-xs text-gray-500">Calendrier d'examens</div>
              <div className="text-lg font-bold text-gray-900 -mt-0.5">{weekLabel}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-[100px] h-[50px] flex items-center justify-center bg-white rounded-[5px] shadow-sm overflow-hidden">
              <button
                onClick={prevWeek}
                className="p-4 hover:bg-gray-50 active:scale-95 transition-transform duration-150 text-gray-600 cursor-pointer"
                title="Semaine précédente"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <button
                onClick={nextWeek}
                className="p-4 hover:bg-gray-50 active:scale-95 transition-transform duration-150 text-gray-600 cursor-pointer"
                title="Semaine suivante"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2">
          <select value={level} onChange={e => setLevel(e.target.value)} className="text-xs px-3 py-2 rounded-[5px] bg-white shadow-sm">
            <option value="all">Tous les niveaux</option>
            <option value="L1">L1</option>
            <option value="L2">L2</option>
          </select>
          <input
            value={moduleFilter}
            onChange={e => setModuleFilter(e.target.value)}
            placeholder="Filtrer par module..."
            className="text-xs px-3 py-2 rounded-[5px] bg-white shadow-sm"
          />
          <select value={roomFilter} onChange={e => setRoomFilter(e.target.value)} className="text-xs px-3 py-2 rounded-[5px] bg-white shadow-sm">
            <option value="all">Toutes les salles</option>
            <option value="Salle N110">Salle N110</option>
          </select>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-2xl shadow-sm flex-1 flex flex-col overflow-hidden" style={{ minHeight: 0 }}>
          {/* Header row */}
          <div className="flex items-stretch border-b border-gray-100">
            <div className="w-20 min-w-[80px] bg-[#ECECEC] flex items-center justify-center border-r border-gray-100">
              <div className="text-xs text-gray-500">Heures</div>
            </div>

            <div className="flex-1 grid grid-cols-7 divide-x divide-gray-100">
              {days.map((d, idx) => {
                return (
                  <div key={idx} className={`py-3 px-3 text-center bg-[#ECECEC]`}>
                    <div className="text-[12px] text-gray-500">{fmtDayShort(d)}</div>
                    <div className="text-sm font-semibold text-gray-800">{d.getDate()} {monthShort(d)}</div>
                    <div className="text-[11px] text-gray-400 mt-1">{d.toLocaleDateString('fr-FR', { weekday: 'long' })}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Grid area */}
          <div className="flex-1 flex overflow-hidden" style={{ minHeight: 0 }}>
            {/* Time column */}
            <div className="w-20 min-w-[80px] border-r border-gray-100 bg-[#E5E5E5]">
              <div style={{ height: 12 }} />
              <div style={{ height: gridPxHeight }} className="relative">
                {Array.from({ length: totalSlots + 1 }).map((_, i) => {
                  const mins = i * 30;
                  const hf = START_H + mins / 60;
                  const h = Math.floor(hf);
                  const m = Math.round((hf - h) * 60);
                  const label = `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
                  return (
                    <div key={i} style={{ top: i * SLOT_H_30 }} className="absolute left-0 right-0 -translate-y-1/2 pr-2 text-right text-[16px] text-black">
                      <div className="pr-2">{label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Days grid with internal scroll */}
            <div className="flex-1 overflow-auto scrollbar-thin" style={{ minHeight: 0 }}>
              <div style={{ height: gridPxHeight }} className="grid grid-cols-7 relative">
                {/* horizontal grid lines */}
                {Array.from({ length: totalSlots }).map((_, i) => (
                  <div key={`h-${i}`} style={{ top: i * SLOT_H_30 }} className="absolute left-0 right-0 h-[1px] bg-gray-100" />
                ))}

                {/* day columns */}
                {Array.from({ length: 7 }).map((_, col) => {
                  const dayArea = layoutsByDay[col] || { events: [], layout: {} };
                  return (
                    <div key={`col-${col}`} className="relative">
                      {dayArea.events.map(ev => {
                        const { top, height } = pos(ev);
                        const st = COLOR[ev.colorKey] || COLOR.sky;
                        const layout = dayArea.layout[ev.id] || { leftPct: 0, widthPct: 100 };
                        const leftStyle = `${layout.leftPct}%`;
                        const widthStyle = `${layout.widthPct}%`;
                        return (
                          <div
                            key={ev.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => openExamModal(ev)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                openExamModal(ev);
                              }
                            }}
                            className={`absolute rounded-lg ${st.ring}`}
                            style={{
                              top: top + 2,
                              height: Math.max(28, height - 2),
                              left: `calc(${leftStyle} + 8px)`,
                              width: `calc(${widthStyle} - 16px)`,
                              cursor: 'pointer'
                            }}
                            title={`${ev.title} — ${ev.room}`}
                            aria-label={`${ev.title} en ${ev.room}`}
                          >
                            <div className={`h-full rounded-lg p-2 bg-gradient-to-br ${st.bg} flex flex-col justify-center border border-white/30 shadow-sm transform hover:scale-[1.01] transition`}>
                              <div className={`${st.text} text-[13px] font-semibold leading-tight truncate`}>{ev.title}</div>
                              <div className={`${st.text} text-[11px] opacity-90`}>{ev.room}</div>
                              <div className={`${st.text} text-[10px] opacity-80 mt-1`}>{new Date(ev.start).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })} — {new Date(ev.end).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal connecté — on lui passe selectedExam */}
      <ModalMoreInfoExam
        isOpen={modalOpen}
        onClose={closeExamModal}
        exam={selectedExam}
      />
    </div>
  );
}
