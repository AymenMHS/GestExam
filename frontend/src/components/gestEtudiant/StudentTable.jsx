import React from "react";
import StudentRow from "./StudentRow";

const StudentTable = ({ students, onEdit, onDelete, showGroupColumn = true }) => {
  return (
    <div className="table-student w-full">
      <div className="tr-table w-full flex items-center justify-between border-b border-[#E0E0E0] bg-[#E9EFFF] rounded-t-[8px]">
        <div className="th-table w-[12%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Code</div>
        <div className="th-table w-[18%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Nom</div>
        <div className="th-table w-[18%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Prénom</div>
        <div className="th-table w-[16%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Date Naissance</div>
        <div className="th-table w-[12%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Niveau</div>
        {showGroupColumn && (
          <div className="th-table w-[12%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Groupe</div>
        )}
        <div className="th-table w-[12%] text-[14px] font-bold font-nunito text-[#555555] text-center py-2">Actions</div>
      </div>

      {students.map((s, i) => (
        <StudentRow key={`${s.code ?? 'student'}-${i}`} student={s} onEdit={onEdit} onDelete={onDelete} showGroupColumn={showGroupColumn} />
      ))}
    </div>
  );
};

export default StudentTable;
