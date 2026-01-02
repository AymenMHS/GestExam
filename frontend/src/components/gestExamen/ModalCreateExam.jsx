import { useState } from 'react';

const ModalCreateExam = ({ isOpen, onClose }) => {
  const [salles, setSalles] = useState([
    { id: 1, nom: "Salle N101", ouvert: false },
    { id: 2, nom: "Salle N101", ouvert: true }
  ]);

  const toggleSalle = (id) => {
    setSalles(salles.map(salle => 
      salle.id === id ? { ...salle, ouvert: !salle.ouvert } : salle
    ));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-createExam w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-1000">
      <div className="overlay w-full h-full bg-[rgba(0,0,0,0.8)] backdrop-blur-[3px] absolute top-0 left-0" onClick={onClose}></div>
      <div className="modal-create w-[80vw] h-[80vh] bg-white rounded-[10px] relative z-1001 flex flex-col justify-start items-center overflow-x-hidden">
        <div className="header-modal w-full h-[50px] flex justify-between items-center px-5">
          <h2 className="text-[20px] font-bold font-nunito">Ajouter un examen</h2>
          <button className="close-modal w-7 h-7 bg-transparent border-none cursor-pointer flex justify-center items-center hover:opacity-80 hover:transform hover:-translate-y-px transition-all duration-300 active:transform active:translate-y-0.5" onClick={onClose}>
            <img src="/src/assets/icons/x.png" alt="Fermer" className="w-5 h-5" />
          </button>
        </div>
        
        <div className="content-createModal flex flex-col items-center justify-start w-full h-[calc(100%-100px)] overflow-y-auto">
          {/* Ligne 1 */}
          <div className="ligneInput w-[90%] h-auto flex justify-between">
            <div className="blocInput flex flex-col justify-start mt-2.5 mb-2.5 w-[48%]">
              <label className="text-[14px] font-semibold font-nunito">Niveau d'étude</label>
              <select className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                <option className="text-[rgb(180,180,180)]">--Niveau d'etude--</option>
                <option>Licence 1</option>
                <option>Licence 2</option>
                <option>Licence 3</option>
                <option>Master 1</option>
                <option>Master 2</option>
              </select>
            </div>
            <div className="blocInput flex flex-col justify-start mt-[10px] mb-[10px] w-[48%]">
              <label className="text-[14px] font-semibold font-nunito">Spécialité</label>
              <select data-niv="licence" className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none hidden">
                <option className="text-[rgb(180,180,180)]">--Spécialité--</option>
                <option>Informatique</option>
              </select>
              <select data-niv="master" className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                <option className="text-[rgb(180,180,180)]">--Spécialité--</option>
                <option>Genie logiciel</option>
                <option>Intelligence Artificielle</option>
                <option>Reseaux</option>
                <option>System d'information</option>
              </select>
            </div>
          </div>

          {/* Ligne 2 */}
          <div className="ligneInput w-[90%] h-auto flex justify-between">
            <div className="blocInput flex flex-col justify-start mt-[10px] mb-[10px] w-[48%]">
              <label className="text-[14px] font-semibold font-nunito">Type d'examen</label>
              <select className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-[10px] text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                <option className="text-[rgb(180,180,180)]">--Type d'examen--</option>
                <option>Controle Continu</option>
                <option>Remplacement CC</option>
                <option>Test TP</option>
                <option>Examen Final</option>
                <option>Remplacement Examen</option>
                <option>Rattrapage</option>
              </select>
            </div>
            <div className="blocInput flex flex-col justify-start mt-[10px] mb-[10px] w-[48%]">
              <label className="text-[14px] font-semibold font-nunito">Date de l'examen</label>
              <input type="date" className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none" />
            </div>
            <div className="blocInput flex flex-wrap flex-row justify-start mt-2.5 mb-2.5 w-[48%]">
              <label className="text-[14px] font-semibold font-nunito">Horaire de l'examen</label>
              <select className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-[10px] text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                <option>--Selectionnez Horaire--</option>
                <option>08h30</option>
                <option>09h00</option>
                <option>09h30</option>
                <option>10h00</option>
                <option>10h30</option>
                <option>11h00</option>
                <option>11h30</option>
                <option>12h00</option>
                <option>12h30</option>
                <option>13h30</option>
                <option>14h00</option>
                <option>14h30</option>
                <option>15h00</option>
                <option>15h30</option>
                <option>16h00</option>
              </select>
            </div>
            <div className="blocInput flex flex-col justify-start mt-[10px] mb-[10px] w-[48%]">
              <label className="text-[14px] font-semibold font-nunito">Durée de l'examen</label>
              <select className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-[10px] text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                <option className="text-[rgb(180,180,180)]">--Durée--</option>
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>1 heure</option>
                <option>1 heure 30 minutes</option>
                <option>2 heures</option>
                <option>2 heures 30 minutes</option>
                <option>3 heures</option>
              </select>
            </div>
          </div>

          {/* Ligne 3 */}
          <div className="ligneInput w-[90%] h-auto flex justify-between">
            <div className="blocInput flex flex-col justify-start mt-[10px] mb-[10px] w-[48%]">
              <label className="text-[14px] font-semibold font-nunito">Module</label>
              <select data-nivSpec="Master 1 - Genie Logiciel" className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                <option className="text-[rgb(180,180,180)]">--Module--</option>
                <option>Intelligence Artificielle</option>
                <option>Web Avancé</option>
                <option>Architecture des entreprise</option>
                <option>Exigence</option>
                <option>UI / UX</option>
                <option>Managements</option>
                <option>Anglais</option>
                <option>Calcul Performance</option>
              </select>
              <select data-nivSpec="Licence 2 - Informatique" className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none hidden">
                <option className="text-[rgb(180,180,180)]">--Module--</option>
                <option>Algorithmique 2</option>
                <option>Structures de données</option>
                <option>Base de données</option>
                <option>Systèmes d'exploitation</option>
                <option>Réseaux informatiques</option>
                <option>Programmation web</option>
                <option>Intelligence artificielle</option>
              </select>
            </div>
            <div className="blocInput flex flex-col justify-start mt-[10px] mb-[10px] w-[48%]">
              <label className="text-[14px] font-semibold font-nunito">Enseignant(e) responsable</label>
              <select className="w-[90%] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-[10px] text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                <option className="text-[rgb(180,180,180)]">--Enseignant(e)--</option>
                <option>M. Ahmed</option>
                <option>Mme Sara</option>
                <option>M. Youssef</option>
                <option>Mme Kazi</option>
                <option>M. Omar</option>
                <option>Mme Lina</option>
              </select>
            </div>
          </div>

          {/* Section Salles */}
          <div className="ligneInput w-[90%] h-auto flex justify-between">
            <div className="blocInput blocSalles flex flex-col justify-start mt-2.5 mb-2.5 w-full">
              <label className="text-[14px] font-semibold font-nunito">Salles</label>
              <div className="salles w-full bg-[#E5E5E5] rounded-[10px] p-2.5">
                <div className="addSalle w-full h-10 flex justify-between items-center">
                  <select className="w-[50%] h-[30px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                    <option className="text-[rgb(180,180,180)]">--Salle--</option>
                    <option>N101</option>
                    <option>N102</option>
                    <option>N103</option>
                    <option>N104</option>
                    <option>N105</option>
                    <option>N106</option>
                  </select>
                  <button className="addBtn w-[30px] h-[30px] flex justify-center items-center bg-black rounded-[5px] hover:opacity-80 hover:transform hover:-translate-y-px transition-all duration-300 active:transform active:translate-y-0.5 cursor-pointer">
                    <img src="/src/assets/icons/plus1.png" alt="Ajouter" className="w-5 h-5" />
                  </button>
                  <button className="autoRep w-[calc(50%-40px)] h-[30px] flex justify-center items-center bg-[rgb(7,26,131)] text-white font-nunito rounded-[5px] hover:opacity-80 hover:transform hover:-translate-y-px transition-all duration-300 active:transform active:translate-y-0.5 cursor-pointer">
                    Repartir Auto
                  </button>
                </div>

                {salles.map((salle) => (
                  <div key={salle.id} className={`salle ${salle.ouvert ? 'ouvert' : 'fermer'} w-full h-10 bg-white rounded-[5px] flex justify-between items-center flex-wrap mt-2.5 px-2.5 cursor-pointer ${salle.ouvert ? 'h-auto' : ''}`}>
                    <p className="p-title w-[calc(100%-80px)] h-10 flex justify-start items-center">{salle.nom}</p>
                    <button className="delete-salle w-[30px] h-[30px] flex justify-center items-center bg-[rgb(153,4,4)] rounded-[5px] hover:opacity-80 hover:transform hover:-translate-y-px transition-all duration-300 active:transform active:translate-y-0.5">
                      <img src="/src/assets/icons/supprimer1.png" alt="Supprimer" className="w-5 h-5" />
                    </button>
                    <button 
                      className="more-salle w-[30px] h-[30px] flex justify-center items-center hover:opacity-80 hover:bg-[#E0E0E0] hover:rounded-[5px] transition-all duration-300"
                      onClick={() => toggleSalle(salle.id)}
                    >
                      <img 
                        src="/src/assets/icons/arrow-down.png" 
                        alt="Détails" 
                        className={`w-[20px] h-[20px] ${salle.ouvert ? 'rotate-180' : ''}`} 
                      />
                    </button>

                    {salle.ouvert && (
                      <div className="moreSalle flex justify-between w-full mt-2.5 border-t border-[#E0E0E0] pt-2.5">
                        <div className="blocSalle Gr w-[48%] h-[60px] bg-[#EBEBEB] rounded-[10px] flex justify-center items-center flex-col mb-2.5 p-[5px]">
                          <select data-promo="Licence 2 - Informatique" className="w-full h-[35px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                            <option className="text-[rgb(180,180,180)]">--Groupe--</option>
                            <option>Groupe 1</option>
                            <option>Groupe 2</option>
                            <option>Groupe 3</option>
                            <option>Groupe 4</option>
                          </select>
                        </div>
                        <div className="blocSalle w-[48%] h-auto bg-[#EBEBEB] rounded-[10px] flex justify-center items-center flex-col mb-2.5 p-[5px]">
                          <div className="ligneBlocSalle w-full h-10 flex justify-between items-center">
                            <select className="w-[calc(100%-45px)] h-[35px] bg-[#F2F2F2] rounded-[5px] pl-2.5 text-[16px] font-nunito shadow-[0_4px_4px_rgba(0,0,0,0.25)] border-none">
                              <option className="text-[rgb(180,180,180)]">--Surveillant(e)--</option>
                              <option>M. Ahmed</option>
                              <option>Mme Sara</option>
                              <option>M. Youssef</option>
                              <option>Mme Kazi</option>
                              <option>M. Omar</option>
                              <option>Mme Lina</option>
                            </select>
                            <button className="w-[35px] h-[35px] flex justify-center items-center bg-black ml-2.5 rounded-[5px] hover:opacity-80 hover:transform hover:-translate-y-px transition-all duration-300 active:transform active:translate-y-0.5">
                              <img src="/src/assets/icons/plus1.png" alt="Ajouter" className="w-[20px] h-[20px]" />
                            </button>
                          </div>
                          <p className="w-full h-[30px] bg-white rounded-[5px] flex justify-between items-center px-2.5 mt-[5px]">
                            M. Ahmed
                            <button className="w-[25px] h-[25px] flex justify-center items-center bg-[rgb(153,4,4)] rounded-[5px] hover:opacity-80 hover:transform hover:-translate-y-px transition-all duration-300 active:transform active:translate-y-0.5">
                              <img src="/src/assets/icons/supprimer1.png" alt="Supprimer" className="w-[15px] h-[15px]" />
                            </button>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="BtnSaveCancel w-[90%] h-10 flex justify-end items-center gap-2.5 mt-2.5 mb-2.5">
          <button className="BtnCancel w-[150px] h-10 flex justify-center items-center gap-2.5 rounded-[10px] font-nunito text-[16px] font-semibold cursor-pointer border-none bg-[rgb(102,102,102)] text-white hover:opacity-80 hover:transform hover:-translate-y-px transition-all duration-300 active:transform active:translate-y-0.5" onClick={onClose}>
            <img src="/src/assets/icons/annuler-la-fleche.png" alt="Annuler" className="w-5 h-5" />
            Annuler
          </button>
          <button className="BtnSave w-[150px] h-10 flex justify-center items-center gap-2.5 rounded-[10px] font-nunito text-[16px] font-semibold cursor-pointer border-none bg-[rgb(7,26,131)] text-white hover:opacity-80 hover:transform hover:-translate-y-px transition-all duration-300 active:transform active:translate-y-0.5">
            <img src="/src/assets/icons/sauvegarder.png" alt="Enregistrer" className="w-5 h-5" />
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCreateExam;