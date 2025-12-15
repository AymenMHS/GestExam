import React from "react";
import * as userUtils from "../utils/user";
import { useNotifications } from "./ui/Notifications";

const roles = [
  "Etudiant",
  "Enseignant",
  "Chef Département",
  "Responsable de planification"
];

export default function RoleDebugSwitch() {
  const { notifySuccess, notifyError, confirm } = useNotifications();

  const setRole = (role) => {
    if (typeof userUtils.setUserRole === "function") {
      const ok = userUtils.setUserRole(role);
      if (ok) window.location.reload();
      else alert("Rôle invalide (voir console)");
    } else {
      localStorage.setItem("userRole", role);
      window.location.reload();
    }
  };

  const onDebugSuccess = () => {
    notifySuccess("Succès", "Action de debug effectuée avec succès.");
  };
  const onDebugError = () => {
    notifyError("Erreur", "Une erreur de test est survenue — vérifiez la configuration.");
  };

  const onDebugConfirm = async () => {
    const ok = await confirm({ title: "Confirmer l'action ?", message: "Voulez-vous vraiment appliquer ce changement de test ?" });
    if (ok) notifySuccess("Confirmé", "Tu as approuvé l'action de test.");
    else notifyError("Annulé", "Action annulée par l'utilisateur.");
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "18px",
        right: "18px",
        display: "flex",
        gap: "8px",
        zIndex: 999999
      }}
      aria-hidden={!import.meta.env.DEV}
    >
      {roles.map((r) => (
        <button
          key={r}
          onClick={() => setRole(r)}
          style={{
            background: "#000000ff",
            color: "white",
            padding: "5px 8px",
            borderRadius: "8px",
            fontSize: "13px",
            cursor: "pointer",
            border: "none",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)"
          }}
        >
          {r}
        </button>
      ))}

      {/* debug buttons */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        <button onClick={onDebugSuccess} title="Debug success" style={{ background: "#16a34a", color: "white", padding: "6px 8px", borderRadius: 8, border: "none" }}>✅ Success</button>
        <button onClick={onDebugError} title="Debug error" style={{ background: "#dc2626", color: "white", padding: "6px 8px", borderRadius: 8, border: "none" }}>⛔ Error</button>
        <button onClick={onDebugConfirm} title="Debug confirm" style={{ background: "#f59e0b", color: "white", padding: "6px 8px", borderRadius: 8, border: "none" }}>❗Confirm</button>
      </div>
    </div>
  );
}

// End of file