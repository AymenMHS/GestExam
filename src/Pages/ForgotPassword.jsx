// src/Pages/ForgotPassword.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // "idle" | "success" | "error"

  // Liste locale des emails acceptés (front-only mock)
  // Modifie/étends cette liste selon tes besoins de test
  const acceptedEmails = new Set([
    "alice@example.com",
    "bob@univ.edu",
    "student1@univ.edu",
    "kazi@univ.edu",
    "omar@univ.edu"
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = (email || "").trim().toLowerCase();

    // Si l'email est dans la liste -> succès, sinon erreur
    if (value && acceptedEmails.has(value)) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (status !== "idle") setStatus("idle");
  };

  return (
    <>
      <div className="w-full h-screen flex items-center justify-around bg-[#e3f0ff]">
        <div className="w-1/3 flex-col mx-10 bg-[#3a679b] p-10 text-3xl rounded-2xl">
          <img className="w-70 m-auto" src="public/univ-logo.png" alt="univ-logo" />
          <h2 className="text-white my-6 pl-3 font-medium ">Mot de passe oublié :</h2>

          <form onSubmit={handleSubmit}>
            <label className="text-sm text-gray-200 font-medium" htmlFor="email">
              Email :
            </label>
            <input
              value={email}
              onChange={handleChange}
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              className="bg-white p-2 rounded block text-lg w-full"
              aria-describedby="forgot-password-help"
            />

            <button
              type="submit"
              className="bg-[#051f61] p-1.5 my-6 mb-10 w-full text-white rounded-md cursor-pointer flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-10 mx-6 my-1.5"
              >
                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
              </svg>
              Envoyer votre email
            </button>

            {/* Success message (email présent dans acceptedEmails) */}
            {status === "success" && (
              <div
                className="text-lg w-11/12 bg-[#93c38b] m-auto p-6 my-1 rounded-xl"
                role="status"
                aria-live="polite"
              >
                <img src="public/emailTrue.svg" className="h-15 w-15 m-auto mb-4" alt="email sent" />
                <p className="mb-4">E-mail envoyé. Suivez les instructions dans votre boîte de réception pour réinitialiser votre mot de passe.</p>

                {/* Bouton de retour vers la page de connexion */}
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="mt-2 px-4 py-2 bg-white text-[#051f61] font-semibold rounded-md shadow-sm hover:opacity-90"
                  >
                    Retour à la connexion
                  </button>
                </div>
              </div>
            )}

            {/* Error message (email absent de acceptedEmails ou champ vide) */}
            {status === "error" && (
              <div
                className="text-lg w-11/12 bg-[#ffc4c4] m-auto p-6 my-1 rounded-xl"
                role="alert"
                aria-live="assertive"
              >
                <img src="public/emailFalse.svg" className="h-15 w-15 m-auto mb-4" alt="no account" />
                <p>
                  Aucun compte ne correspond à cet e-mail. Veuillez vérifier votre adresse ou contacter le chef de département pour obtenir de l’aide.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
