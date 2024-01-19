import { stack as Menu } from "react-burger-menu";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { CrossIcon, CustomBurgerIcon } from "./CustomBurgerIcon";
import "./BurgerMenu.css";

export default function BurgerMenu({ navlinks, menuOpen, setMenuOpen }) {
  const setAuth = "";
  return (
    <div>
      {!setAuth === "" && (
        <Menu
          right
          width="100%"
          customBurgerIcon={<CustomBurgerIcon />}
          customCrossIcon={<CrossIcon />}
          noOverlay
          isOpen={menuOpen}
          onOpen={() => setMenuOpen(!menuOpen)}
          className="bg-white bg-opacity-90 h-[600px]"
        >
          <ul className="flex flex-col text-start ml-3 mb-20 text-slate-800 text-5xl">
            {navlinks.map((n) => (
              <li key={n.id} className="my-8">
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
            <button
              type="button"
              onClick={() => {
                // eslint-disable-next-line no-undef
                setAuth("");
                // eslint-disable-next-line no-undef
                navigate("/");
              }}
              className="text-2xl mt-20 bottom-0"
            >
              Deconnexion{" "}
            </button>
          </ul>
        </Menu>
      )}
    </div>
  );
}
BurgerMenu.propTypes = {
  navlinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};
