import React from 'react';

const Header = () => {
    return (
        <header className=" p-1 border-b-2 border-[#003a75] top-0 bg-[#b8d4e8] z-10 ">
            <div className="flex justify-between items-center mx-auto w-5/6  p-2"> 
                <img
                    className="w-40 h-17 "
                    src="/src/assets/univLogoDark.png"
                    alt="univ-logo"
                />
                <button
                    type="submit"
                    className="bg-[#051f61] h-min p-3 text-white rounded-md cursor-pointer text-xl mt-7 w-40 items-center"
                >
                    <img
                        className="w-6 h-6 text-white inline mr-2"
                        src="/src/assets/icons/utilisateur.png"
                        alt=""
                    />
                    Connexion
                </button>
            </div>
        </header>
    );
};

export default Header;