import navigationLinks from "../../../constants/navigation.constant";
import { NavLink } from "react-router-dom";

function DesktopMenu({ linkStyle, activeStyle }) {
  return (
    <ul className="flex justify-center gap-2">
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
  );
}

export default DesktopMenu;