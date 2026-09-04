import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Logo from "./Logo";
import { NavLink } from "react-router-dom";

function TabletNavbar({ setDrawerOpen }) {
  return (
    <div className="md:hidden h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <MenuRoundedIcon className="text-4xl!" />
        </button>

        <Logo setDrawerOpen={setDrawerOpen} />
      </div>

      <div className="flex gap-3">
        <NavLink to="/">
          <button
            onClick={() => {}}
            className={`py-1 px-2 rounded-2xl border hover:bg-blue-300 hover:text-white`}
          >
            Login
          </button>
        </NavLink>
        <NavLink to="/">
          <button
            onClick={() => {}}
            className={`py-1 px-2 rounded-2xl border hover:bg-blue-300 hover:text-white`}
          >
            Signup
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default TabletNavbar;
