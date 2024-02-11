import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import BurgerMenu from "./BurgerMenu";
import logoblack from "../../assets/logo-black.png";
import logowhite from "../../assets/logo-white.png";

export default function Navbar({ auth, setAuth }) {
  // remplir ce tableau pour compléter la navbar (le 1er est un exemple)
  const navlinks = [
    {
      id: 1,
      path: `/${auth?.id}`,
      name: "Skincare",
    },
    {
      id: 2,
      path: `/user/${auth?.id}`,
      name: "Profil",
    },
    {
      id: 3,
      path: "/basket",
      name: "Cart",
    },
    {
      id: 4,
      path: "/chatbot",
      name: "Emma",
    },
  ];
  const [menuOpen, setMenuOpen] = useState(false);
  const [whiteColor, setWhiteColor] = useState(false);
  const navigate = useNavigate();
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
  return (
    <nav>
      {auth?.id ? (
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
          <BurgerMenu
            auth={auth}
            setAuth={setAuth}
            navlinks={navlinks}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </nav>
      ) : (
        <nav className="bg-black pt-8 pb-7 w-full flex justify-center flex-row fixed top-0">
          <nav className=" flex flex-col justify-between  ">
            <img alt="logo" src={logowhite} className="h-10" />
          </nav>
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-black bg-white px-3 ml-7 border border-neutral-700 "
          >
            Log in
          </button>
        </nav>
      )}
    </nav>
  );
}

Navbar.propTypes = {
  auth: PropTypes.shape().isRequired,
  setAuth: PropTypes.func.isRequired,
};
