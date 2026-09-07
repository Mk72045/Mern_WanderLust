import api from "../../../api/axios";
import startButtonNavigation from "../../../constants/startNavigation.constant";
import useAuth from "../../../hooks/useAuth.hook";
import { NavLink, useNavigate } from "react-router-dom";
import useApiRequest from "../../../utils/useApiRequest";

function StartMenu({ linkStyle, activeStyle }) {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { request } = useApiRequest();

  async function logout() {
    await api.get("/user/logout");
    const { error } = await request(() => api.get("/user/logout"), {
      loadingMessage: "Logging out...",
      successMessage: "Logged out successfully",
    });

    if (error) return;

    setUser(null);

    navigate("/");
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
