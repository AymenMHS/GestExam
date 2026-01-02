// src/components/settings/NotificationsSettings.jsx
import React, { useState } from "react";
import Toggle from "./Toggle";

const btnAnim = "transition-all duration-300 ease-in-out hover:opacity-80 hover:-translate-y-[1px] active:translate-y-[2px]";

const NotificationsSettings = () => {
  const [emailNotif, setEmailNotif] = useState(true);
  const [siteNotif, setSiteNotif] = useState(true);

  return (
    <div className="h-full flex flex-col gap-4">
      <div className="bg-[#f9f9fb] rounded-md p-4 shadow-sm">
        <h3 className="font-nunito font-bold text-[16px] mb-2">Notifications</h3>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Notifications par e-mail</p>
              <p className="text-xs text-gray-400">Envoi d'e-mails pour événements importants</p>
            </div>
            <Toggle checked={emailNotif} onChange={setEmailNotif} ariaLabel="Notifications email" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Notifications sur le site</p>
              <p className="text-xs text-gray-400">Bannières et alertes dans l'interface</p>
            </div>
            <Toggle checked={siteNotif} onChange={setSiteNotif} ariaLabel="Notifications site" />
          </div>
        </div>
      </div>

      <div className="mt-auto text-right">
        <button className={`px-4 py-2 rounded-md bg-[#071A83] text-white ${btnAnim}`}>Enregistrer</button>
      </div>
    </div>
  );
};

export default NotificationsSettings;
