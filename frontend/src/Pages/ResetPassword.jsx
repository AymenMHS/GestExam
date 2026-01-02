import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get("token"); // peut être null
  const navigate = useNavigate();

  const [pwd1, setPwd1] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pwd1 || !pwd2) {
      setError("Veuillez remplir les deux champs.");
      return;
    }
    if (pwd1 !== pwd2) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    if (pwd1.length < 6) {
      setError("Mot de passe trop court (min 6 caractères).");
      return;
    }

    // MODE TEST (pas de backend)
    setDone(true);
  };

  return (
    <div className="w-full h-screen flex items-center justify-around bg-[#e3f0ff]">
      <div className="w-1/3 flex-col mx-10 bg-[#3a679b] p-10 text-3xl rounded-2xl">
        <h2 className="text-white my-6 pl-3 font-medium">
          Réinitialiser votre mot de passe
        </h2>

        {!done ? (
          <form onSubmit={handleSubmit}>
            <label className="text-sm text-gray-200 font-medium">
              Nouveau mot de passe :
            </label>
            <input
              type="password"
              value={pwd1}
              onChange={(e) => setPwd1(e.target.value)}
              className="bg-white p-2 rounded block text-lg w-full mb-4"
            />

            <label className="text-sm text-gray-200 font-medium">
              Répéter le mot de passe :
            </label>
            <input
              type="password"
              value={pwd2}
              onChange={(e) => setPwd2(e.target.value)}
              className="bg-white p-2 rounded block text-lg w-full"
            />

            {error && (
              <p className="text-red-300 text-base my-2">{error}</p>
            )}

            <button
              type="submit"
              className="bg-[#051f61] p-2 my-6 w-full text-white rounded-md cursor-pointer"
            >
              Réinitialiser
            </button>

            {!token && (
              <p className="text-sm text-yellow-200 text-center">
                ⚠ Mode test : aucun token détecté.
              </p>
            )}
          </form>
        ) : (
          <div className="text-center text-white text-lg">
            ✅ Mot de passe réinitialisé avec succès !
            <button
              onClick={() => navigate("/login")}
              className="block bg-white text-[#051f61] p-2 mt-4 mx-auto rounded-md"
            >
              Retour à la connexion
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
