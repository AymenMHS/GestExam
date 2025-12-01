import React from 'react';

const ModalMoreInfoExam = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-moreInfoExam w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-[1000]">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0" onClick={onClose}></div>
      <div className="modal-InfoExam w-[80vw] h-[80vh] bg-white rounded-[10px] relative z-[1001] flex flex-col justify-start items-center overflow-x-hidden">
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-[20px]">
          <h2 className="text-[20px] font-bold font-nunito">Details de l'examen</h2>
          <button className="close-modal w-[30px] h-[30px] bg-transparent border-none cursor-pointer flex justify-center items-center hover:opacity-80 hover:transform hover:translate-y-[-1px] transition-all duration-300 active:transform active:translate-y-[2px]" onClick={onClose}>
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="content-modal w-full h-[calc(100%-100px)] p-[20px] overflow-y-auto overflow-x-hidden">
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Type d'examen</h2>
            <p className="text-[14px] font-semibold font-nunito">Examen Final</p>
          </div>
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Niveau</h2>
            <p className="text-[14px] font-semibold font-nunito">Licence 1 - Informatique</p>
          </div>
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Module</h2>
            <p className="text-[14px] font-semibold font-nunito">Algorithmique 1</p>
          </div>
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Date - Heure de l'examen</h2>
            <p className="text-[14px] font-semibold font-nunito">18/11/2025 - 8h30</p>
          </div>
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Durée de l'examen</h2>
            <p className="text-[14px] font-semibold font-nunito">1h30</p>
          </div>
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Enseignant(e) responsable</h2>
            <p className="text-[14px] font-semibold font-nunito">Mme Kazi</p>
          </div>
          <div className="ligne-details w-full h-auto flex justify-start mb-[5px] ml-[100px]">
            <h2 className="text-[15px] font-normal font-nunito w-[300px] text-[#838383]">Salles - Groupes - Surveillant(e)s</h2>
            <div>
              <p className="text-[14px] font-semibold font-nunito">Salle A101 - Groupe 1 - M. Ahmed / P. Omar</p>
              <p className="text-[14px] font-semibold font-nunito">Salle A102 - Groupe 2 - Mme Sara / K. Yassine</p>
              <p className="text-[14px] font-semibold font-nunito">Salle A103 - Groupe 3 - M. Youssef / M. Sara</p>
            </div>
          </div>
        </div>
        <div className="BtnSaveCancel w-[90%] h-[40px] flex justify-end items-center gap-[10px] mt-[10px] mb-[10px]">
          <button className="BtnSave w-[200px] h-[40px] flex justify-center items-center gap-[10px] rounded-[10px] font-nunito text-[16px] font-semibold cursor-pointer border-none bg-[rgb(7,26,131)] text-white hover:opacity-80 hover:transform hover:translate-y-[-1px] transition-all duration-300 active:transform active:translate-y-[2px]">
            <img src="/src/assets/icons/editer1.png" alt="Modifier" className="w-[20px] h-[20px]" />
            Modifier l'examen
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMoreInfoExam;