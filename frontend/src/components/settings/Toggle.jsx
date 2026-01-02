// src/components/settings/Toggle.jsx
import React from "react";

/**
 * Toggle simple (controlled)
 * props:
 * - checked, onChange
 * - label (optional)
 */
const Toggle = ({ checked, onChange, ariaLabel }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`w-12 h-7 rounded-full p-1 flex items-center transition-all duration-200
        ${checked ? "bg-[#071A83]" : "bg-gray-300"}`}
    >
      <div className={`w-5 h-5 bg-white rounded-full shadow transform transition-transform ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
};

export default Toggle;
