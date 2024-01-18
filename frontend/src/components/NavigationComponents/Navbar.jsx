import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import logoblack from "../../assets/logo-black.png";
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
      path: "/profile",
      name: "Profile",
    },
    {
      id: 3,
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
  return (
    <nav>
      <nav
        className={`${
          whiteColor
            ? "bg-white shadow-md shadow-stone-600"
            : "bg-gradient-to-b from-transparent via-transparent via-85% to-stone-600 to-95%"
        }  h-20 flex flex-row justify-center fixed top-0 transition-colors ease-in-out`}
      >
        <nav className="mx-24 flex flex-col justify-center">
          <img alt="logo" src={logoblack} width={500} />
        </nav>
        <div className="md:flex flex-col gap-4 hidden">
          {navlinks.map((n) => (
            <NavLink to={n.path} key={n.id}>
              {n.name}
            </NavLink>
          ))}
        </div>
        <BurgerMenu
          navlinks={navlinks}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </nav>
    </nav>
  );
}
