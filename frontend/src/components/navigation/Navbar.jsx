import { NavLink } from "react-router-dom";
import logoWhite from "../../assets/logo-white.png";

export default function Navbar() {
  // remplir ce tableau pour compléter la navbar (le 1er est un exemple)
  const navlinks = [
    {
      id: 1,
      path: "/",
      name: "Home",
    },
    {
      id: 2,
      path: "/contact",
      name: "Contact",
    },
  ];

  return (
    <nav className="text-4xl bg-mineShaft flex flex-row justify-around items-center p-4">
      {/* pour le logo */}
      <NavLink to="/">
        <img src={logoWhite} alt="logo" className="h-16" />
      </NavLink>

      <h1>Le Nom du fabuleux Projet</h1>
      <div className="flex flex-col gap-4">
        {navlinks.map((n) => (
          <NavLink to={n.path} key={n.id}>
            {n.name}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
