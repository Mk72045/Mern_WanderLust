import api from "../../../api/axios";
import startButtonNavigation from "../../../constants/startNavigation.constant";
import useAuth from "../../../hooks/useAuth.hook";
import { NavLink, useNavigate } from "react-router-dom";

function StartMenu({ linkStyle, activeStyle }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    try {
      await api.get("/user/logout");
      setUser(null);

      navigate("/");
    } catch (error) {
      console.log("error at logout button ", error);
    }
  }

  return (
    <div className="flex gap-3 xl:gap-6 ">
      {startButtonNavigation.map((link) => {
        if (!user && link.name === "Logout") return null;
        if (user && link.name !== "Logout") return null;

        if (link.name === "Logout") {
          return (
            <button key={link.name} onClick={logout} className={linkStyle}>
              {link.name}
            </button>
          );
        }

        return (
          <NavLink
            to={link.path}
            key={link.name}
            className={({ isActive }) => (isActive ? activeStyle : linkStyle)}
          >
            {link.name}
          </NavLink>
        );
      })}
    </div>
  );
}

export default StartMenu;
