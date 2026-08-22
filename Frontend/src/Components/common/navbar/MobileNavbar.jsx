// import { useState } from "react";

import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
// import SearchIcon from "@mui/icons-material/Search";

import Logo from "./Logo";

import StartMenu from "./StartMenu";
// import MobileSearch from "./mobileSearch";

function MobileNavbar({ linkStyle, activeStyle, setDrawerOpen }) {
  // const [openSearch, setOpenSearch] = useState(false);

  // if (openSearch) {
  //   return (
  //     <div className="md:hidden py-3">
  //       <MobileSearch
  //         value={search}
  //         onChange={(e) => setSearch(e.target.value)}
  //         products={filteredProducts}
  //         onClose={() => {
  //           setSearch("");
  //           setOpenSearch(false);
  //         }}
  //       />
  //     </div>
  //   );
  // }

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

      {/* <button
        onClick={() => setOpenSearch(true)}
        className="p-2 rounded-lg hover:bg-gray-100"
      >
        <SearchIcon />
      </button> */}

      <StartMenu linkStyle={linkStyle} activeStyle={activeStyle} />
    </div>
  );
}

export default MobileNavbar;
