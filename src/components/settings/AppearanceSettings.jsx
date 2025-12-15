// src/components/settings/AppearanceSettings.jsx
import React, { useState, useEffect } from "react";
import Toggle from "./Toggle";

const btnAnim = "transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]";

const AppearanceSettings = () => {
  // local state (no persistence for now)
  const [theme, setTheme] = useState("clair"); // 'clair' | 'sombre' | 'auto'
  const [lang, setLang] = useState("fr");
  const [mute, setMute] = useState(false);
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    // optional: apply theme class on body for quick visual feedback
    document.documentElement.classList.remove("theme-clair", "theme-sombre");
    if (theme === "sombre") document.documentElement.classList.add("theme-sombre");
    if (theme === "clair") document.documentElement.classList.add("theme-clair");
  }, [theme]);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-[#f9f9fb] rounded-md p-4 shadow-sm">
        <h3 className="font-nunito font-bold text-[16px] mb-2">Apparence</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
          <div>
            <label className="block text-xs text-gray-500 mb-1">Thème</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme("clair")}
                className={`px-3 py-1 rounded-md ${theme === "clair" ? "bg-[#071A83] text-white" : "bg-white"} ${btnAnim}`}
              >
                Clair
              </button>
              <button
                onClick={() => setTheme("sombre")}
                className={`px-3 py-1 rounded-md ${theme === "sombre" ? "bg-[#071A83] text-white" : "bg-white"} ${btnAnim}`}
              >
                Sombre
              </button>
              <button
                onClick={() => setTheme("auto")}
                className={`px-3 py-1 rounded-md ${theme === "auto" ? "bg-[#071A83] text-white" : "bg-white"} ${btnAnim}`}
              >
                Auto
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">(sélection locale — n'affecte pas encore la base)</p>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Langue</label>
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="w-full max-w-[220px] h-[36px] rounded-md px-2 bg-white"
            >
              <option value="fr">Français</option>
              <option value="en">English</option>
              <option value="ar">العربية</option>
            </select>
            <p className="text-xs text-gray-400 mt-1">(ex. : interface, labels)</p>
          </div>

          <div>
            <label className="block text-xs text-gray-500 mb-1">Sourdine (sons UI)</label>
            <div className="flex items-center gap-3">
              <Toggle checked={mute} onChange={setMute} ariaLabel="Sourdine" />
              <span className="text-sm">{mute ? "Activée" : "Désactivée"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#f9f9fb] rounded-md p-4 shadow-sm flex items-center justify-between">
        <div>
          <h4 className="font-nunito font-bold text-[14px]">Mode compact (taille UI)</h4>
          <p className="text-xs text-gray-400">Réduit paddings et tailles des éléments (affichage serré).</p>
        </div>

        <div className="flex items-center gap-3">
          <Toggle checked={compact} onChange={setCompact} ariaLabel="Mode compact" />
        </div>
      </div>

      <div className="mt-auto text-right">
        <button className={`px-4 py-2 rounded-md bg-[#071A83] text-white ${btnAnim}`}>Enregistrer</button>
      </div>
    </div>
  );
};

export default AppearanceSettings;
