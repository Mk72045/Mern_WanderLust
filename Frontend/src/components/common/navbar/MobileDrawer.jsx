import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import navigationLinks from "../../../constants/navigation.constant";
import Logo from "./Logo";

function MobileDrawer({ open, setOpen }) {
  return (
    <>
      {/* Background Overlay */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      />

      <aside
        className={`fixed top-0 left-0 h-screen w-[60%] max-w-80 bg-white z-50 transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b h-16">
          <Logo />

          <button onClick={() => setOpen(false)}>
            <CloseIcon />
          </button>
        </div>

        {/* Navigation */}

        <nav className="flex flex-col mt-4 h-full px-4">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setOpen(false)}
              className="w-full px-6 py-4 hover:bg-blue-50 transition text-xl shadow-sm hover:shadow-md my-2 rounded-2xl"
            >
              {link.name}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
}

export default MobileDrawer;
