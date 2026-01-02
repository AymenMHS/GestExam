import React from "react";
import RoomRow from "./RoomRow";

const RoomTable = ({ rooms, onEdit, onDelete }) => {
  return (
    <div className="table-rooms w-full border border-[#E0E0E0] rounded-[8px] overflow-hidden bg-white shadow-sm">
      {/* Header */}
      <div className="thead w-full flex items-center justify-between bg-[#E9EFFF] border-b border-[#E0E0E0] h-[45px]">
        <div className="th w-[15%] text-[14px] font-bold font-nunito text-[#333333] pl-4 text-left">Code</div>
        <div className="th w-[25%] text-[14px] font-bold font-nunito text-[#333333] text-left">Nom de la salle</div>
        <div className="th w-[20%] text-[14px] font-bold font-nunito text-[#333333] text-left">Type</div>
        <div className="th w-[20%] text-[14px] font-bold font-nunito text-[#333333] text-left pl-4">Capacité</div>
        <div className="th w-[20%] text-[14px] font-bold font-nunito text-[#333333] text-right pr-12"></div>
        {/* Empty header for actions, just spacing */}
      </div>

      {/* Body */}
      <div className="tbody w-full">
        {rooms.length === 0 ? (
          <div className="w-full h-[150px] flex flex-col items-center justify-center text-gray-500 font-nunito">
            <img src="/src/assets/icons/search.png" alt="" className="w-12 h-12 opacity-30 mb-2" />
            <p className="text-[16px]">Aucune salle ajoutée pour le moment.</p>
          </div>
        ) : (
          rooms.map((room, i) => (
            <RoomRow key={room.code || i} room={room} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default RoomTable;