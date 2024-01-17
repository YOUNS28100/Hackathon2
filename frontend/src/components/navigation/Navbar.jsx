import { NavLink } from "react-router-dom";
import logoWhite from "../../assets/logo-white.png";

export default function Navbar() {
  return (
    <nav className="text-4xl bg-mineShaft flex flex-row justify-around items-center p-4">
      <NavLink to="/">
        <img src={logoWhite} alt="logo" className="h-16" />
      </NavLink>

      <div className="flex flex-col gap-4">
        <NavLink to="/user/1"> My Profil</NavLink>
      </div>
    </nav>
  );
}
