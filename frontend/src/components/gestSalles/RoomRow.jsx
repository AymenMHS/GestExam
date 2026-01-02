import React, { useState } from "react";

const RoomRow = ({ room, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock schedule data for the expanded view (simulating what's in Screenshot 2)
  const exams = room.exams || [
    { level: "Examen - Licence 1", module: "Algorithmique 1", date: "18-11-2025", time: "13h30 jusqu'à 15h" },
    { level: "Examen - Licence 2", module: "POD", date: "19-11-2025", time: "10h jusqu'à 11h30" },
    { empty: true }, // Placeholders for gray boxes
    { empty: true },
    { empty: true },
    { empty: true },
  ];

  return (
    <>
      {/* Main Row */}
      <div className={`tr-table w-full flex items-center justify-between border-b border-[#E0E0E0] h-[55px] bg-white hover:bg-gray-50 transition-colors ${isExpanded ? 'border-b-0' : ''}`}>
        <div className="td-table w-[15%] text-[13px] font-medium font-nunito text-[#333] pl-4">{room.code}</div>
        <div className="td-table w-[25%] text-[13px] font-medium font-nunito text-[#333]">{room.nom}</div>
        <div className="td-table w-[20%] text-[13px] font-medium font-nunito text-[#333]">{room.type}</div>
        <div className="td-table w-[20%] text-[13px] font-medium font-nunito text-[#333] pl-4">{room.capacite}</div>
        
        <div className="td-table w-[20%] flex items-center justify-end gap-2 pr-6">
          <button onClick={() => onEdit(room)} className="w-[30px] h-[30px] rounded-[6px] bg-[#4ade80] flex justify-center items-center hover:-translate-y-1 transition-all duration-300">
            <img src="/src/assets/icons/editer1.png" alt="Edit" className="w-[14px] h-[14px]" />
          </button>
          
          <button onClick={() => onDelete(room)} className="w-[30px] h-[30px] rounded-[6px] bg-[#ef4444] flex justify-center items-center hover:-translate-y-1 transition-all duration-300">
            <img src="/src/assets/icons/supprimer1.png" alt="Delete" className="w-[14px] h-[14px]" />
          </button>

          {/* Expand Toggle */}
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="w-[30px] h-[30px] flex justify-center items-center transition-transform duration-300"
            style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            {/* Simple chevron icon representation */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Expanded Content (Schedule) */}
      {isExpanded && (
        <div className="w-full bg-[#F5F5F5] border-b border-[#E0E0E0] p-4 flex items-center justify-center">
          <div className="w-[95%] bg-[#F0F0F0] rounded-[10px] p-2 flex items-center gap-2 shadow-inner">
            
            {/* Left Nav Arrow */}
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>

            {/* Scrollable Container */}
            <div className="flex-1 overflow-x-auto flex gap-3 pb-2 pt-1 scrollbar-hide">
              {exams.map((exam, idx) => (
                <div key={idx} className={`min-w-[160px] h-[140px] rounded-[8px] flex flex-col items-center justify-center p-2 shadow-sm ${exam.empty ? 'bg-[#DADADA]' : 'bg-[#E0E0E0]'}`}>
                  {!exam.empty && (
                    <>
                      <div className="w-full bg-[#D1D1D1] rounded-[4px] py-1 text-center text-[11px] font-bold text-[#555] mb-2">
                        {exam.level}
                      </div>
                      <div className="w-full bg-[#F2F2F2] rounded-[4px] py-2 text-center text-[12px] font-bold text-[#333] mb-2 shadow-sm">
                        {exam.module}
                      </div>
                      <div className="text-[10px] text-center text-[#555] font-semibold leading-tight">
                        {exam.date}<br/>
                        {exam.time}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            {/* Right Nav Arrow */}
            <button className="p-2 hover:bg-gray-200 rounded-full">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default RoomRow;