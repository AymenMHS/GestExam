import React from "react";

const PaginationStudents = ({ page, totalPages, onPrev, onNext, onGoto }) => {
  const pages = [];
  for (let i = 1; i <= Math.min(5, totalPages); i++) pages.push(i);
  return (
    <div className="pagination-student w-full flex items-center justify-end gap-2 bg-[#F2F2F2] rounded-[8px] p-2 mt-3">
      <button onClick={onPrev} className="navBtn w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] flex items-center justify-center hover:opacity-80 hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300">
        <img src="/src/assets/icons/left-arrow.png" alt="Précédent" className="w-[12px] h-[12px]" />
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onGoto(p)}
          className={`w-[34px] h-[34px] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm ${p === page ? "bg-[#ECF0FF] border-2 border-[#3B679A]" : "bg-white"} hover:opacity-80 hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300`}
        >
          {p}
        </button>
      ))}

      {totalPages > 5 && <p className="mx-1 text-[13px]">...</p>}

      {totalPages > 5 && (
        <button onClick={() => onGoto(totalPages)} className="w-[34px] h-[34px] bg-white rounded-[6px] flex items-center justify-center shadow-sm hover:opacity-80 hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300">{totalPages}</button>
      )}

      <button onClick={onNext} className="navBtn w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] flex items-center justify-center hover:opacity-80 hover:-translate-y-1 transition-all duration-300 active:translate-y-1 transition-all duration-300">
        <img src="/src/assets/icons/right-arrow.png" alt="Suivant" className="w-[12px] h-[12px]" />
      </button>
    </div>
  );
};

export default PaginationStudents;
