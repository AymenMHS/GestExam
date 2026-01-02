// ===============================
// FILE: src/components/ui/Notifications.jsx
// Single-file provider that exposes:
// - <NotificationProvider /> (wrap your app)
// - useNotifications() hook: { notifySuccess, notifyError, confirm }
// - Internal Toast container (top-right)
// ===============================

import React, { createContext, useContext, useCallback, useEffect, useRef, useState } from "react";

const NotificationContext = createContext(null);

let nextId = 1;

export function NotificationProvider({ children }) {
  const [toasts, setToasts] = useState([]); // {id, type, title, message, timeout}
  const [confirmState, setConfirmState] = useState(null); // {id, title, message, resolve}

  // add toast
  const notify = useCallback((type, title, message, opts = {}) => {
    const id = nextId++;
    const timeout = opts.timeout ?? 4500;
    setToasts((t) => [{ id, type, title, message, timeout }, ...t]);
    // auto remove
    if (timeout > 0) {
      setTimeout(() => {
        setToasts((t) => t.filter((x) => x.id !== id));
      }, timeout + 100); // small buffer
    }
    return id;
  }, []);

  const notifySuccess = useCallback((title, message, opts = {}) => notify("success", title, message, opts), [notify]);
  const notifyError = useCallback((title, message, opts = {}) => notify("error", title, message, opts), [notify]);
  const notifyLoading = useCallback((title, message, opts = {}) => notify("loading", title, message, { timeout: 0, ...opts }), [notify]); // Default timeout 0 (infinite)

  // dismiss manually
  const dismiss = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);

  // confirm returns a promise that resolves to true/false
  const confirm = useCallback(({ title = "Confirmer", message = "Êtes-vous sûr(e) ?", confirmLabel = "Oui", cancelLabel = "Annuler" } = {}) => {
    return new Promise((resolve) => {
      const id = `c-${Date.now()}`;
      setConfirmState({ id, title, message, confirmLabel, cancelLabel, resolve });
    });
  }, []);

  const handleConfirmClose = useCallback((result) => {
    if (confirmState && typeof confirmState.resolve === "function") {
      confirmState.resolve(result);
    }
    setConfirmState(null);
  }, [confirmState]);

  return (
    <NotificationContext.Provider value={{ notifySuccess, notifyError, notifyLoading, confirm, dismiss }}>
      {children}
      <_ToastContainer toasts={toasts} onDismiss={dismiss} />
      {confirmState && <_ConfirmDialog state={confirmState} onClose={handleConfirmClose} />}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationProvider");
  return ctx;
}

// ===============================
// Toast UI (top-right)
// ===============================
function _ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed top-[50px] right-4 z-[9000] flex flex-col gap-3 items-end max-w-[380px]">
      {toasts.map((t) => (
        <_Toast key={t.id} toast={t} onClose={() => onDismiss(t.id)} />
      ))}
    </div>
  );
}


function _Toast({ toast, onClose }) {
  const { id, type, title, message } = toast;

  let color = "bg-gray-800";
  let icon = null;

  if (type === "success") {
    color = "bg-emerald-600";
    icon = <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  } else if (type === "error") {
    color = "bg-red-600";
    icon = <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  } else if (type === "loading") {
    color = "bg-[#071A83]"; // Bleu foncé comme demandé souvent
    icon = (
      <svg className="animate-spin w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  }

  return (
    <div className={`w-full transform transition-all duration-300 shadow-lg rounded-lg overflow-hidden ${color} text-white`} role="status" aria-live="polite">
      <div className="flex items-start gap-3 p-3">
        <div className="pt-0.5">{icon}</div>
        <div className="flex-1">
          <div className="font-semibold text-sm">{title}</div>
          {message && <div className="text-xs opacity-90 mt-1 leading-snug">{message}</div>}
        </div>
        <button onClick={onClose} className="ml-3 p-1 rounded-md hover:bg-white/10">
          <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </button>
      </div>
    </div>
  );
}

// ===============================
// Confirmation dialog (modal)
// ===============================
function _ConfirmDialog({ state, onClose }) {
  const { title, message, confirmLabel, cancelLabel } = state;

  return (
    <div className="fixed inset-0 z-[9500] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => onClose(false)} />

      <div className="relative z-[9501] w-[92vw] max-w-[520px] bg-white rounded-lg shadow-lg p-5">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 rounded-full bg-[#FDE68A] flex items-center justify-center">
            <svg className="w-6 h-6 text-[#92400e]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{title}</h3>
            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-3">
          <button onClick={() => onClose(false)} className="px-4 py-2 rounded-md bg-gray-100 text-sm">{cancelLabel}</button>
          <button onClick={() => onClose(true)} className="px-4 py-2 rounded-md bg-[#071A83] text-white text-sm">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

// End of Notifications.jsx
