import { useState, useEffect } from "react";
import logoblack from "../../assets/logo-black.png";
import logowhite from "../../assets/logo-white.png";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  // remplir ce tableau pour compléter la navbar (le 1er est un exemple)
  const navlinks = [
    {
      id: 1,
      path: "/",
      name: "Skincare",
    },
    {
      id: 2,
      path: "/user/1",
      name: "Profil",
    },
    {
      id: 3,
      path: "/basket",
      name: "Basket",
    },
    {
      id: 4,
      path: "/chatbot",
      name: "Chatbot",
    },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [whiteColor, setWhiteColor] = useState(false);
  const switchColor = () => {
    if (window.scrollY >= 80) {
      setWhiteColor(true);
    } else {
      setWhiteColor(false);
    }
  };
  useEffect(() => {
    switchColor();
    window.addEventListener("scroll", switchColor);
  });
  const setAuth = "";
  return (
    <nav>
      {setAuth !== "" ? (
        <nav
          className={`${
            whiteColor
              ? "bg-white shadow-md shadow-stone-600"
              : "bg-gradient-to-b from-transparent via-transparent via-85% to-stone-200 to-95%"
          }  h-20 flex flex-row justify-center fixed top-0 transition-colors ease-in-out`}
        >
          <nav className="mx-24 flex flex-col justify-center">
            <img alt="logo" src={logoblack} width={500} />
          </nav>
        </nav>
      ) : (
        <nav className="bg-black pt-8 pb-7 w-full flex justify-center flex-row fixed top-0">
          <nav className=" flex flex-col justify-between  ">
            <img alt="logo" src={logowhite} className="h-10" />
          </nav>
          <button
            type="button"
            className="text-black bg-white px-3 ml-7 border border-neutral-700 "
          >
            {" "}
            Connexion{" "}
          </button>
        </nav>
      )}

      <BurgerMenu
        navlinks={navlinks}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />
    </nav>
  );
}
