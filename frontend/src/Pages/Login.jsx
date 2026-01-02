// src/Pages/Login.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const initialValues = { username: "", password: "", remember: false };
  const [values, setValues] = useState(initialValues);
  const [error, setError] = useState(null); // { field?, code, message }
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  // Rediriger si déjà connecté
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    const remembered = localStorage.getItem("remembered_username");
    if (remembered) setValues((v) => ({ ...v, username: remembered, remember: true }));
  }, []);

  const isEmail = (s = "") => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());
  const isUsername = (s = "") => /^[a-zA-Z0-9._-]{3,}$/.test(String(s).trim());
  const validPassword = (p = "") => typeof p === "string" && p.length >= 6;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const identifier = values.username;
    const password = values.password;

    // Validation côté client
    if (!identifier || (!isEmail(identifier) && !isUsername(identifier))) {
      setError({ code: "pattern", message: "Identifiant invalide — entrez un email ou un username (3+ caractères)." });
      return;
    }

    if (!validPassword(password)) {
      setError({ code: "password", message: "Mot de passe invalide — minimum 6 caractères." });
      return;
    }

    setLoading(true);

    try {
      // Préparer les credentials pour l'API
      const credentials = {
        password: password,
      };

      // Déterminer si c'est un email ou un username
      if (isEmail(identifier)) {
        credentials.email = identifier;
      } else {
        credentials.username = identifier;
      }

      // Appeler l'API Laravel via AuthContext
      const result = await login(credentials);

      if (result.success) {
        // Remember me
        if (values.remember) {
          localStorage.setItem("remembered_username", result.user.email || result.user.username);
        } else {
          localStorage.removeItem("remembered_username");
        }

        // Redirection vers le dashboard approprié
        setTimeout(() => {
          navigate("/dashboard");
        }, 700);
      } else {
        // Gérer les erreurs de connexion
        setLoading(false);
        if (result.error.includes('Invalid credentials') || result.error.includes('Identifiants')) {
          setError({ code: "bad_credentials", message: "Identifiants incorrects." });
        } else {
          setError({ code: "server_error", message: result.error || "Erreur de connexion au serveur." });
        }
      }
    } catch (err) {
      setLoading(false);
      console.error("Login error:", err);
      setError({
        code: "server_error",
        message: "Impossible de se connecter au serveur. Vérifiez que le serveur Laravel est démarré."
      });
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-around bg-[#e3f0ff]">
      <div className="relative max-w-lg">
        <h1 className="text-black text-5xl uppercase mb-3">Connectez-Vous</h1>
        <span className="absolute w-2 h-25 bg-[#3a679b] rounded top-0 -left-7"></span>
        <h2 className="text-gray-400 text-3xl uppercase">Platform Gestion Des Examens</h2>
      </div>

      <div className="w-1/3 flex-col mx-10 bg-[#3a679b] p-10 text-3xl rounded-2xl relative">
        <img className="w-70 m-auto" src="/public/univ-logo.png" alt="univ-logo" />
        <h2 className="text-[#C3C3C3] font-medium mb-1 mt-5">Bienvenue au</h2>
        <h2 className="text-white uppercase mb-4">Département d'informatique</h2>

        <form onSubmit={handleSubmit} className="text-base" noValidate>
          <label className="text-sm text-gray-200 font-medium" htmlFor="username">Identifiant / Email :</label>
          <input
            onChange={handleChange}
            value={values.username}
            type="text"
            name="username"
            id="username"
            placeholder="Identifiant / Email"
            autoComplete="username"
            className="bg-white p-2 rounded block text-lg w-full mb-2"
            aria-invalid={error && error.code === "pattern" ? "true" : "false"}
            aria-describedby={error && error.code === "pattern" ? "err-username" : undefined}
          />
          {error && error.code === "pattern" && <div id="err-username" className="text-sm text-yellow-200 mb-2">{error.message}</div>}

          <label htmlFor="password" className="text-sm text-gray-200 font-medium">Mot de passe :</label>
          <input
            onChange={handleChange}
            value={values.password}
            type="password"
            name="password"
            id="password"
            placeholder="Mot de passe"
            autoComplete="current-password"
            className="bg-white p-2 rounded block text-lg w-full mb-2"
            aria-invalid={error && error.code === "password" ? "true" : "false"}
            aria-describedby={error && error.code === "password" ? "err-password" : undefined}
          />
          {error && error.code === "password" && <div id="err-password" className="text-sm text-yellow-200 mb-2">{error.message}</div>}

          {error && (error.code === "not_found" || error.code === "bad_credentials" || error.code === "server_error") && (
            <div className="text-sm text-red-300 mb-2">{error.message}</div>
          )}

          <div className="flex justify-between p-1 items-center">
            <div className="flex items-center">
              <input onChange={handleChange} checked={values.remember} type="checkbox" name="remember" id="remember" className="rounded w-4 h-4" />
              <label className="text-gray-300 text-base ml-2" htmlFor="remember">Se souvenir de moi</label>
            </div>

            <div>
              <button type="button" onClick={() => navigate("/forgot-password")} className="text-gray-300 text-base font-bold underline">
                Mot de passe oublié ?
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#051f61] p-1.5 my-4 w-full text-white rounded-md cursor-pointer uppercase flex items-center justify-center"
            aria-busy={loading}
          >
            {!loading ? (
              <>
                <svg className="w-5 h-5 inline mr-2" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd" />
                </svg>
                Connexion
              </>
            ) : (
              <div className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                Connexion...
              </div>
            )}
          </button>
        </form>

        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.45)] rounded-2xl">
            <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3 w-80">
              <svg className="animate-spin h-12 w-12 text-[#071A83]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
              </svg>
              <div className="text-[#071A83] font-semibold">Connexion en cours</div>
              <div className="text-sm text-[#666]">Redirection vers votre tableau de bord…</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
