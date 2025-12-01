import React from "react";
import ModuleList from "../components/gestModule/ModuleList";

const GestModule = () => {
  return (
    <div className="flex justify-center items-start w-full h-full min-h-0 bg-[#E3F0FF] p-4">
      <div className="w-full max-w-[1200px] h-full">
        <div className="gestModule w-full bg-white rounded-[8px] p-3 flex flex-col items-center gap-2 h-full">
          <ModuleList />
        </div>
      </div>
    </div>
  );
};

export default GestModule;
