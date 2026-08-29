import startButtonNavigation from "./startButtonNavigation";
import useAuth from "../../../hooks/useAuth.hook";
import { NavLink } from "react-router-dom";

function StartMenu({ linkStyle, activeStyle }) {
  const { user } = useAuth();
  return (
    <div className="flex gap-3 xl:gap-6 ">
      {startButtonNavigation.map((link) => {
        if (!user && link.name === "Logout") return null;
        if (user && link.name !== "Logout") return null;

        return (
          <NavLink
            to={link.path}
            key={link.name}
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            <button>{link.name}</button>
          </NavLink>
        );
      })}
    </div>
  );
}

export default StartMenu;