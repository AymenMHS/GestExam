import React from "react";

const Pagination = () => {
  return (
    <div className="pagination-exam w-full flex items-center justify-end gap-2 bg-[#F2F2F2] rounded-[8px] p-2 mt-3">
      <button className="navBtn w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 hover:transform hover:translate-y-[-1px] transition-all duration-300 active:transform active:translate-y-[2px] cursor-pointer">
        <img src="/src/assets/icons/left-arrow.png" alt="Précédent" className="w-[12px] h-[12px]" />
      </button>
      <button className="selected w-[34px] h-[34px] bg-[#ECF0FF] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm border-2 border-[#3B679A] cursor-pointer hover:opacity-80 hover:transform hover:translate-y-[-1px] transition-all duration-300 active:transform active:translate-y-[2px]">1</button>
      <button className="w-[34px] h-[34px] bg-white rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 hover:transform hover:translate-y-[-1px] transition-all duration-300 active:transform active:translate-y-[2px] cursor-pointer">2</button>
      <button className="w-[34px] h-[34px] bg-white rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 hover:transform hover:translate-y-[-1px] transition-all duration-300 active:transform active:translate-y-[2px] cursor-pointer">3</button>
      <p className="mx-1 text-[13px]">...</p>
      <button className="w-[34px] h-[34px] bg-white rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 hover:transform hover:translate-y-[-1px] transition-all duration-300 active:transform active:translate-y-[2px] cursor-pointer">10</button>
      <button className="navBtn w-[34px] h-[34px] bg-[#D2D2D2] rounded-[6px] text-black text-[14px] font-nunito flex items-center justify-center shadow-sm hover:opacity-80 hover:transform hover:translate-y-[-1px] transition-all duration-300 active:transform active:translate-y-[2px] cursor-pointer">
        <img src="/src/assets/icons/right-arrow.png" alt="Suivant" className="w-[12px] h-[12px]" />
      </button>
    </div>
  );
};

export default Pagination;
