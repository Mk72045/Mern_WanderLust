// import { NavLink } from "react-router-dom";

// import DesktopMenu from "./DesktopMenu";
// import Logo from "./Logo";

// function Navbar() {
//   return (
//     <nav className=" h-14 sticky top-0 bg-white shadow-md">
//       <div className=" flex max-w-full px-3 h-full">
//         <Logo />
//         {/* Main Container */}
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center py-2">
//           {/* Left Side */}
//           <div className=" hidden md:flex  md:flex-row md:items-center gap-3">
//             {/* Logo */}
//             <NavLink
//               to="/"
//               className="text-red-500 text-3xl text-center md:text-left"
//             >
//               <i className="fa-regular fa-compass"></i>
//             </NavLink>

//             {/* Navigation Links */}
//             <DesktopMenu linkStyle={linkStyle} activeStyle={activeStyle} />
//           </div>

//           {/* Right Side */}
//           <ul className="flex justify-center gap-2 mt-3 md:mt-0">
//             <li>
//               <NavLink
//                 to="/signup"
//                 className={({ isActive }) =>
//                   `${linkStyle} ${isActive ? activeStyle : ""}`
//                 }
//               >
//                 Signup
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/login"
//                 className={({ isActive }) =>
//                   `${linkStyle} ${isActive ? activeStyle : ""}`
//                 }
//               >
//                 Login
//               </NavLink>
//             </li>

//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) =>
//                   `${linkStyle} ${isActive ? activeStyle : ""}`
//                 }
//               >
//                 Logout
//               </NavLink>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import { useState } from "react";

import DesktopNavbar from "./DesktopNavbar";
// import TabletNavbar from "./TabletNavbar";
import MobileNavbar from "./MobileNavbar";
import MobileDrawer from "./MobileDrawer";

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const linkStyle = "px-4 py-2 rounded-lg hover:bg-blue-100 ";
  const activeStyle = "px-4 py-2 rounded-lg bg-blue-100 text-blue-600";
  // const [search, setSearch] = useState("");

  // const products = [
  //   { id: 1, name: "SKF Bearing" },
  //   { id: 2, name: "Linear Bearing" },
  //   { id: 3, name: "Hydraulic Pump" },
  //   { id: 4, name: "Industrial Belt" },
  //   { id: 5, name: "Siemens PLC" },
  // ];

  // const filteredProducts = products.filter((item) =>
  //   item.name.toLowerCase().includes(search.toLowerCase()),
  // );

  return (
    <>
      <header className="sticky top-0 bg-white shadow z-50    self">
        <div className="max-w-384 mx-auto px-4 items-center h-16 ">
          <DesktopNavbar
            // search={search}
            // setSearch={setSearch}
            // filteredProducts={filteredProducts}
            linkStyle={linkStyle}
            activeStyle={activeStyle}
          />

          {/* <TabletNavbar
            // search={search}
            // setSearch={setSearch}
            // filteredProducts={filteredProducts}
            setDrawerOpen={setDrawerOpen}
          /> */}

          <MobileNavbar
            // search={search}
            // setSearch={setSearch}
            // filteredProducts={filteredProducts}
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
