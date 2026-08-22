import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { NavLink } from "react-router-dom";

function Logo({ setDrawerOpen }) {
  return (
    <NavLink to="/" onClick={() => setDrawerOpen(false)}>
      <div className="flex justify-center items-center w-12  ">
        <ExploreOutlinedIcon className="text-blue-500 text-4xl!" />
      </div>
    </NavLink>
  );
}

export default Logo;
