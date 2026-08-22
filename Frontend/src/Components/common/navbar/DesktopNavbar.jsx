import Logo from "./Logo";
// import SearchBox from "./searchBox";
// import SearchDropdown from "./searchDropdown";
import DesktopMenu from "./DesktopMenu";

import StartMenu from "./StartMenu";

function DesktopNavbar({ linkStyle, activeStyle }) {
  return (
    <div className="hidden lg:flex items-center justify-between self-center h-16">
      <div className="grow-3">
        <Logo />
      </div>
      {/* <div className="flex justify-center flex-1 px-10">
        <div className="relative w-full max-w-125">
          <SearchBox
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search && <SearchDropdown products={filteredProducts} />}
        </div>
      </div> */}
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
