import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import Logo from "./Logo";
import StartMenu from "./StartMenu";

function MobileNavbar({ linkStyle, activeStyle, setDrawerOpen }) {
  return (
    <div className="lg:hidden h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setDrawerOpen(true)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <MenuRoundedIcon className="text-4xl!" />
        </button>

        <Logo setDrawerOpen={setDrawerOpen} />
      </div>

      <StartMenu linkStyle={linkStyle} activeStyle={activeStyle} />
    </div>
  );
}

export default MobileNavbar;
