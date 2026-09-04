import { useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileDrawer from "./MobileDrawer";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const linkStyle = "px-4 py-2 rounded-lg hover:bg-blue-100 ";
  const activeStyle = "px-4 py-2 rounded-lg bg-blue-100 text-blue-600";

  return (
    <>
      <header className="sticky top-0 bg-white shadow z-50    self">
        <div className="max-w-384 mx-auto px-4 items-center h-16 ">
          <DesktopNavbar linkStyle={linkStyle} activeStyle={activeStyle} />

          <MobileNavbar
            setDrawerOpen={setDrawerOpen}
            linkStyle={linkStyle}
            activeStyle={activeStyle}
          />
        </div>
      </header>

      <MobileDrawer open={drawerOpen} setOpen={setDrawerOpen} />
    </>
  );
}

export default Navbar;
