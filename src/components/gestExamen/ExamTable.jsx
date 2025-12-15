import React from "react";
import ExamRow from "./ExamRow";

const ExamTable = ({ examens, onView, onEdit }) => {
  return (
    <div className="table-exam w-full">
      <div className="tr-table w-full flex items-center justify-between border-b border-[#E0E0E0] bg-[#E9EFFF] rounded-t-[8px]">
        <div className="th-table w-[12%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Code</div>
        <div className="th-table w-[24%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Niveau</div>
        <div className="th-table w-[18%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Module</div>
        <div className="th-table w-[14%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Type</div>
        <div className="th-table w-[10%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Date</div>
        <div className="th-table w-[10%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Horaire</div>

        {/* Nouvelle colonne Statut */}
        <div className="th-table w-[8%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Statut</div>

        <div className="th-table w-[12%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Actions</div>
      </div>

      {examens.map((examen, i) => (
        <ExamRow
          key={`${examen.code ?? 'exam'}-${i}`}
          examen={examen}
          onView={() => onView(examen)}
          onEdit={() => onEdit(examen)}
        />
      ))}
    </div>
  );
};

export default ExamTable;
