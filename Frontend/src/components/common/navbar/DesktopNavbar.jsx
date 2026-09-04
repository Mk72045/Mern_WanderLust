import Logo from "./Logo";
import DesktopMenu from "./DesktopMenu";
import StartMenu from "./StartMenu";

function DesktopNavbar({ linkStyle, activeStyle }) {
  return (
    <div className="hidden lg:flex items-center justify-between self-center h-16">
      <div className="grow-3">
        <Logo />
      </div>

      <div className="flex w-[70%] max-w-180 justify-between ">
        <div className="flex self-center">
          <DesktopMenu linkStyle={linkStyle} activeStyle={activeStyle} />
        </div>
        <StartMenu linkStyle={linkStyle} activeStyle={activeStyle} />
      </div>
    </div>
  );
}

export default DesktopNavbar;
