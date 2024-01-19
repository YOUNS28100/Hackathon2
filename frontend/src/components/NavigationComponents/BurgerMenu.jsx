import { stack as Menu } from "react-burger-menu";
import { NavLink, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { CrossIcon, CustomBurgerIcon } from "./CustomBurgerIcon";
import "./BurgerMenu.css";

export default function BurgerMenu({
  auth,
  setAuth,
  navlinks,
  menuOpen,
  setMenuOpen,
}) {
  const navigate = useNavigate();
  return (
    <div>
      {auth && (
        <Menu
          right
          width="100%"
          customBurgerIcon={<CustomBurgerIcon />}
          noOverlay
          customCrossIcon={<CrossIcon />}
          isOpen={menuOpen}
          onOpen={() => setMenuOpen(!menuOpen)}
          className="bg-white bg-opacity-90"
        >
          <ul className="flex flex-col text-start ml-3 mb-20 text-slate-800 text-5xl">
            {navlinks.map((n) => (
              <li key={n.id} className="my-3">
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
                setAuth({ id: "", email: "" });
                navigate("/");
              }}
              className="text-2xl mt-20 bottom-0 font-semibold"
            >
              Log out{" "}
            </button>
          </ul>
        </Menu>
      )}
    </div>
  );
}
BurgerMenu.propTypes = {
  auth: PropTypes.shape.isRequired,
  setAuth: PropTypes.func.isRequired,
  navlinks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
};
