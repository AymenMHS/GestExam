import React from "react";
import TeacherRow from "./TeacherRow";

const TeacherTable = ({ teachers, onEdit, onDelete }) => {
  return (
    <div className="table-teacher w-full border border-[#E0E0E0] rounded-[8px] overflow-hidden">
      {/* Header */}
      <div className="thead w-full flex items-center justify-between bg-[#E9EFFF] border-b border-[#E0E0E0] h-[45px]">
        <div className="th w-[12%] text-[14px] font-bold font-nunito text-[#333333] pl-4 text-left">Code</div>
        <div className="th w-[15%] text-[14px] font-bold font-nunito text-[#333333] text-left">Nom</div>
        <div className="th w-[15%] text-[14px] font-bold font-nunito text-[#333333] text-left">Prénom</div>
        <div className="th w-[15%] text-[14px] font-bold font-nunito text-[#333333] text-left">Date Naissance</div>
        <div className="th w-[15%] text-[14px] font-bold font-nunito text-[#333333] text-left">Statut</div>
        <div className="th w-[15%] text-[14px] font-bold font-nunito text-[#333333] text-center">Surveillances max</div>
        <div className="th w-[13%] text-[14px] font-bold font-nunito text-[#333333] text-center pr-2">Actions</div>
      </div>

      {/* Body */}
      <div className="tbody w-full">
        {teachers.length === 0 ? (
          <div className="w-full h-[150px] flex flex-col items-center justify-center text-gray-500 font-nunito">
            <img src="/src/assets/icons/search.png" alt="" className="w-12 h-12 opacity-30 mb-2" />
            <p className="text-[16px]">Aucun enseignant rajouté pour le moment.</p>
          </div>
        ) : (
          teachers.map((t, i) => (
            <TeacherRow key={t.code || i} teacher={t} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default TeacherTable;