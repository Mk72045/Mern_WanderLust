import navigationLinks from "../../../constants/navigation.constant";
import { NavLink } from "react-router-dom";
import DeleteAccount from "./DeleteAccount";
import useAuth from "../../../hooks/useAuth.hook.js";

function DesktopMenu({ linkStyle, activeStyle }) {
  const { user } = useAuth();
  return (
    <>
      <ul className="flex justify-center gap-2 self-center">
        {navigationLinks.map((link) => (
          <li key={link.name}>
            {" "}
            <NavLink
              to={link.path}
              className={({ isActive }) =>
                `${linkStyle} ${isActive ? activeStyle : ""}`
              }
            >
              {link.name}
            </NavLink>{" "}
          </li>
        ))}
      </ul>
      {user && (
        <DeleteAccount style="hover:bg-red-600 hover:text-white px-4 py-2 rounded-lg ml-4 " />
      )}
    </>
  );
}

export default DesktopMenu;
