import React from "react";

const TeacherRow = ({ teacher, onEdit, onDelete }) => {
  
  // Helper for status styling
  const getStatusStyle = (statut) => {
    switch(statut) {
      case 'Actif': return 'text-[#289c1d]';
      case 'En congé': return 'text-[#d97706]';
      case 'Inactif': return 'text-[#dc2626]';
      default: return 'text-gray-500';
    }
  };

  const getStatusDot = (statut) => {
    switch(statut) {
      case 'Actif': return 'bg-[#289c1d]';
      case 'En congé': return 'bg-[#d97706]';
      case 'Inactif': return 'bg-[#dc2626]';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="tr-table w-full flex items-center justify-between border-b border-[#E0E0E0] h-[50px] bg-white hover:bg-gray-50 transition-colors">
      <div className="td-table w-[12%] text-[13px] font-medium font-nunito text-[#333333] pl-4">{teacher.code}</div>
      <div className="td-table w-[15%] text-[13px] font-medium font-nunito text-[#333333]">{teacher.nom}</div>
      <div className="td-table w-[15%] text-[13px] font-medium font-nunito text-[#333333]">{teacher.prenom}</div>
      <div className="td-table w-[15%] text-[13px] font-medium font-nunito text-[#333333]">{teacher.dateNaissance}</div>
      
      {/* Status Column with Dot */}
      <div className="td-table w-[15%] text-[13px] font-medium font-nunito flex items-center gap-2">
         <span className={`w-2 h-2 rounded-full ${getStatusDot(teacher.statut)}`}></span>
         <span className={getStatusStyle(teacher.statut)}>{teacher.statut}</span>
      </div>

      <div className="td-table w-[15%] text-[13px] font-medium font-nunito text-[#333333] text-center">{teacher.surveillancesMax}</div>
      
      <div className="td-table w-[13%] flex items-center justify-center gap-2 pr-2">
        {/* Edit Button - Light green background style per screenshot hint, or keeping consistent with student row */}
        <button
          onClick={() => onEdit(teacher)}
          className="w-[30px] h-[30px] rounded-[6px] bg-[#2ba059] flex justify-center items-center cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
          title="Éditer"
        >
          <img src="/src/assets/icons/editer1.png" alt="Edit" className="w-[14px] h-[14px] opacity-80" />
        </button>

        {/* Delete Button - Light red background style */}
        <button
          onClick={() => onDelete(teacher)}
          className="w-[30px] h-[30px] rounded-[6px] bg-[#c75252] flex justify-center items-center cursor-pointer hover:opacity-80 hover:-translate-y-1 transition-all duration-300"
          title="Supprimer"
        >
          <img src="/src/assets/icons/supprimer1.png" alt="Delete" className="w-[14px] h-[14px] opacity-80" />
        </button>
      </div>
    </div>
  );
};

export default TeacherRow;