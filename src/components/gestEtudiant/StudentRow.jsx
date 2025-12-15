import React from "react";

const StudentRow = ({ student, onEdit, onDelete, showGroupColumn = true }) => {
  return (
    <div className="tr-table w-full h-[30px] flex items-center justify-between border-b border-[#E0E0E0]">
      <div className="td-table w-[12%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{student.code}</div>
      <div className="td-table w-[18%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{student.nom}</div>
      <div className="td-table w-[18%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{student.prenom}</div>
      <div className="td-table w-[16%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{student.dateNaissance}</div>
      <div className="td-table w-[12%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{student.niveau}</div>

      {showGroupColumn && (
        <div className="td-table w-[12%] text-[12px] font-medium font-nunito text-[#333333] text-center py-2">{student.groupe || ""}</div>
      )}

      <div className={`td-table ${showGroupColumn ? "w-[12%]" : "w-[12%]"} text-[12px] font-medium font-nunito text-[#333333] text-center py-2 flex items-center justify-center gap-1`}>
        <button
          onClick={() => onEdit(student)}
          className="w-[26px] h-[26px] rounded-[6px] text-white text-[11px] font-nunito shadow-sm border-none flex justify-center items-center bg-[#289c1d] cursor-pointer hover:opacity-80 hover:-translate-y-1 active:translate-y-1 transition-all duration-300"
          title="Éditer"
        >
          <img src="/src/assets/icons/editer1.png" alt="Éditer" className="w-[12px] h-[12px]" />
        </button>

        <button
          onClick={() => onDelete(student)}
          className="w-[26px] h-[26px] rounded-[6px] text-white text-[11px] font-nunito shadow-sm border-none flex justify-center items-center bg-[#9c1d1d] cursor-pointer hover:opacity-80 hover:-translate-y-1 active:translate-y-1 transition-all duration-300"
          title="Supprimer"
        >
          <img src="/src/assets/icons/supprimer1.png" alt="Supprimer" className="w-[12px] h-[12px]" />
        </button>
      </div>
    </div>
  );
};

export default StudentRow;
