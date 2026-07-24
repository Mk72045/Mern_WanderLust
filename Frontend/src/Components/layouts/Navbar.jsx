import { NavLink } from "react-router-dom";

const linkStyle = "px-4 py-2 rounded-lg";
const activeStyle = "bg-blue-100 text-blue-600";

function Navbar() {
  return (
    <nav className="sticky top-0 bg-white shadow-md">
      <div className="max-w-full  px-4">
        {/* Main Container */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3">
          {/* Left Side */}
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            {/* Logo */}
            <NavLink
              to="/"
              className="text-red-500 text-3xl text-center md:text-left"
            >
              <i className="fa-regular fa-compass"></i>
            </NavLink>

            {/* Navigation Links */}
            <ul className="flex flex-wrap justify-center gap-2">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/new"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : ""}`
                  }
                >
                  New
                </NavLink>
              </li>

              <li>
                <NavLink
                  to="/error"
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeStyle : ""}`
                  }
                >
                  Error
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right Side */}
          <ul className="flex justify-center gap-2 mt-3 md:mt-0">
            <li>
              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeStyle : ""}`
                }
              >
                Signup
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeStyle : ""}`
                }
              >
                Login
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `${linkStyle} ${isActive ? activeStyle : ""}`
                }
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
