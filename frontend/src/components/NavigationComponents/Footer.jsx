import { NavLink } from "react-router-dom";

export default function Footer() {
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
    <footer className="bg-slate-500 md:flex flex-col gap-4 text-xl hidden p-4">
      {/* à modifier en fonction des besoin du projet */}
      {navlinks.map((n) => (
        <NavLink to={n.path} key={n.id}>
          {n.name}
        </NavLink>
      ))}
    </footer>
  );
}
