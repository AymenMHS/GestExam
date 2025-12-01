import { useState } from "react";

const Login = () => {
  let initialValues = {
    username: "",
    password: "",
  };
  const [values, setValues] = useState(initialValues);
  const [ErrorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  const rememberMe = (e) => {};

  const handleSubmit = (e) => {
    e.preventDefault();

    setErrorMessage(null);
    // Check if any field is empty
    for (let value in values) {
      if (value === "") {
        setErrorMessage("All fields must be filled out.");
        console.log(ErrorMessage);
        return;
      }
    }

    // Check if password more then 8 chaaracteres range
    if (values.password.length > 8) {
      setErrorMessage(
        "password number Not Allowed. must be more than  8 caractere"
      );
      console.log(ErrorMessage);
      return;
    }

    console.log(values); // Log the form values
  };

  return (
    <>
      <div className="w-full h-screen flex  items-center justify-around bg-[#e3f0ff]">
        <div className="relative">
          <h1 className="text-black text-5xl uppercase mb-3">Connectez-Vous</h1>
          <span className="absolute w-2 h-25 bg-[#3a679b] rounded top-0 -left-7"></span>
          <h2 className="text-gray-400 text-3xl uppercase">
            Platform Gestion Des Examens
          </h2>
        </div>
        <div className=" w-1/3 flex-col  mx-10 bg-[#3a679b] p-10 text-3xl rounded-2xl">
          <img
            className="w-70 m-auto"
            src="public/univ-logo.png"
            alt="univ-logo"
          />
          <h2 className="text-[#C3C3C3] font-medium mb-1 mt-5">Bienvenue au</h2>
          <h2 className="text-white uppercase">Département d'informatique</h2>
          <form onSubmit={handleSubmit}>
            <label
              className="text-sm text-gray-200 font-medium"
              htmlFor="username"
            >
              Identifiant / Email :{" "}
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="username"
              placeholder="Identifiant / Email"
              className="bg-white p-2 rounded block text-lg w-full"
            ></input>

            <label
              htmlFor="password"
              className="text-sm text-gray-200 font-medium"
            >
              Mot de passe :{" "}
            </label>
            <input
              onChange={handleChange}
              type="text"
              name="password"
              placeholder="Mot de passe"
              className="bg-white p-2 rounded block  text-lg w-full"
            ></input>

            <div className="flex justify-between p-1">
              <div>
                <input
                  onChange={rememberMe}
                  type="checkbox"
                  name="remember"
                  className="rounded w-4 h-4"
                ></input>
                <label
                  className="text-gray-300 text-base ml-2"
                  htmlFor="remember"
                >
                  Se souvenirs de moi
                </label>
              </div>
              <div>
                <a className="text-gray-300 text-base font-bold underline" href="">
                  Mot de passe oublié ?
                </a>
              </div>
            </div>

            <button
              type="submit"
              className="bg-[#051f61] p-1.5 my-4 w-full text-white rounded-md cursor-pointer uppercase"
            >
              <svg
                className="w-13 h-13 text-white inline mr-2 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z"
                  clipRule="evenodd"
                />
              </svg>
              Connexion
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
