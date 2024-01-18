import { stack as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { CrossIcon, CustomBurgerIcon } from "./CustomBurgerIcon";
import "./BurgerMenu.css";

export default function BurgerMenu({ navlinks, menuOpen, setMenuOpen }) {
  return (
    <div>
      <Menu
        right
        width="100%"
        customBurgerIcon={<CustomBurgerIcon />}
        customCrossIcon={<CrossIcon />}
        noOverlay
        isOpen={menuOpen}
        onOpen={() => setMenuOpen(!menuOpen)}
        className="bg-white bg-opacity-90"
      >
        <ul className="flex flex-col text-center ml-3 justify-evenly p-20 text-slate-800 text-5xl">
          {navlinks.map((n) => (
            <li key={n.id} className="">
              <NavLink
                to={n.path}
                onClick={() => setMenuOpen(false)}
                className=""
              >
                {" "}
                {n.name}{" "}
              </NavLink>
            </li>
          ))}
        </ul>
      </Menu>
    </div>
  );
}
BurgerMenu.propTypes = {
  navlinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};
