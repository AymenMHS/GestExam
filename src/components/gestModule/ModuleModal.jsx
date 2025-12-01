// src/components/gestModule/ModuleModal.jsx
import React, { useEffect, useState } from "react";

function ModuleModal({ isOpen, promo, onClose, onSave }) {
  const [local, setLocal] = useState(null);
  const [inputName, setInputName] = useState("");
  const [inputCoef, setInputCoef] = useState("");

  useEffect(() => {
    if (promo) {
      setLocal({
        ...promo,
        modulesS1: promo.modulesS1 ? [...promo.modulesS1] : [],
        modulesS2: promo.modulesS2 ? [...promo.modulesS2] : [],
      });
    }
  }, [promo]);

  if (!isOpen || !local) return null;

  const addModule = (semester) => {
    if (!inputName) return;
    const newModule = { name: inputName, coef: Number(inputCoef) || 1 };
    setLocal(prev => ({ ...prev, [semester]: [...prev[semester], newModule] }));
    setInputName("");
    setInputCoef("");
  };

  const removeModule = (semester, index) => {
    setLocal(prev => {
      const arr = [...prev[semester]];
      arr.splice(index, 1);
      return { ...prev, [semester]: arr };
    });
  };

  const handleSave = () => {
    const modulesCount = (local.modulesS1?.length || 0) + (local.modulesS2?.length || 0);
    const updated = { ...local, modulesCount };
    onSave(updated);
  };

  // classe utilitaire pour les boutons (évite répétition)
  const btnAnim = "transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]";

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

      <div className="relative z-[1001] w-[70vw] h-[70vh] bg-white rounded-[10px] flex flex-col overflow-hidden">
        <div className="w-full h-[44px] flex justify-between items-center px-4">
          <h2 className="text-[18px] font-bold font-nunito">Modification modules</h2>
          <button
            className={`w-[28px] h-[28px] bg-transparent ${btnAnim}`}
            onClick={onClose}
            aria-label="fermer"
          >
            <img src="/src/assets/icons/x.png" alt="close" className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 p-3 overflow-auto">
          <div className="grid grid-cols-2 gap-3 h-full">
            {/* SEMESTRE 1 */}
            <div className="flex flex-col">
              <h1 className="w-full h-[40px] bg-[#CCCACA] rounded-md flex items-center justify-center font-nunito text-[16px]">SEMESTRE 1</h1>
              <div className="flex-1 mt-2 bg-[#E3E3E3] rounded-[8px] p-2 overflow-auto">
                <div className="flex items-end justify-between mb-2">
                  <div className="w-[56%]">
                    <label className="block font-nunito font-semibold mb-1 text-xs">Module</label>
                    <input className="w-full h-[36px] rounded-md p-2 text-sm shadow-sm" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Nom du module" />
                  </div>
                  <div className="w-[28%]">
                    <label className="block font-nunito font-semibold mb-1 text-xs">Coef</label>
                    <input type="number" className="w-full h-[36px] rounded-md p-2 text-sm shadow-sm" value={inputCoef} onChange={(e) => setInputCoef(e.target.value)} placeholder="Coefficient" />
                  </div>
                  <button
                    className={`w-[36px] h-[36px] bg-black rounded-md flex items-center justify-center ${btnAnim}`}
                    onClick={() => addModule("modulesS1")}
                    aria-label="ajouter module s1"
                  >
                    <img src="/src/assets/icons/plus1.png" alt="add" className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 text-sm">
                  {local.modulesS1.map((m, i) => (
                    <div key={i} className="flex justify-between items-center p-1">
                      <p className="font-nunito text-sm">{m.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="font-nunito text-sm">Coef : {m.coef}</p>
                        <button
                          className={`w-[26px] h-[26px] bg-red-600 rounded-md flex items-center justify-center ${btnAnim}`}
                          onClick={() => removeModule("modulesS1", i)}
                          aria-label={`supprimer module s1 ${i}`}
                        >
                          <img src="/src/assets/icons/supprimer1.png" alt="suppr" className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SEMESTRE 2 */}
            <div className="flex flex-col">
              <h1 className="w-full h-[40px] bg-[#CCCACA] rounded-md flex items-center justify-center font-nunito text-[16px]">SEMESTRE 2</h1>
              <div className="flex-1 mt-2 bg-[#E3E3E3] rounded-[8px] p-2 overflow-auto">
                <div className="flex items-end justify-between mb-2">
                  <div className="w-[56%]">
                    <label className="block font-nunito font-semibold mb-1 text-xs">Module</label>
                    <input className="w-full h-[36px] rounded-md p-2 text-sm shadow-sm" value={inputName} onChange={(e) => setInputName(e.target.value)} placeholder="Nom du module" />
                  </div>
                  <div className="w-[28%]">
                    <label className="block font-nunito font-semibold mb-1 text-xs">Coef</label>
                    <input type="number" className="w-full h-[36px] rounded-md p-2 text-sm shadow-sm" value={inputCoef} onChange={(e) => setInputCoef(e.target.value)} placeholder="Coefficient" />
                  </div>
                  <button
                    className={`w-[36px] h-[36px] bg-black rounded-md flex items-center justify-center ${btnAnim}`}
                    onClick={() => addModule("modulesS2")}
                    aria-label="ajouter module s2"
                  >
                    <img src="/src/assets/icons/plus1.png" alt="add" className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-1 text-sm">
                  {local.modulesS2.map((m, i) => (
                    <div key={i} className="flex justify-between items-center p-1">
                      <p className="font-nunito text-sm">{m.name}</p>
                      <div className="flex items-center gap-2">
                        <p className="font-nunito text-sm">Coef : {m.coef}</p>
                        <button
                          className={`w-[26px] h-[26px] bg-red-600 rounded-md flex items-center justify-center ${btnAnim}`}
                          onClick={() => removeModule("modulesS2", i)}
                          aria-label={`supprimer module s2 ${i}`}
                        >
                          <img src="/src/assets/icons/supprimer1.png" alt="suppr" className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full h-[52px] flex justify-end items-center gap-2 px-4 pb-3">
          <button
            onClick={onClose}
            className={`w-[120px] h-[36px] rounded-[8px] bg-[#666] text-white flex items-center justify-center gap-2 text-sm ${btnAnim}`}
          >
            <img src="/src/assets/icons/annuler-la-fleche.png" alt="annuler" className="w-4 h-4"/>
            Annuler
          </button>
          <button
            onClick={handleSave}
            className={`w-[120px] h-[36px] rounded-[8px] bg-[#071A83] text-white flex items-center justify-center gap-2 text-sm ${btnAnim}`}
          >
            <img src="/src/assets/icons/sauvegarder.png" alt="sauvegarder" className="w-4 h-4"/>
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModuleModal;
