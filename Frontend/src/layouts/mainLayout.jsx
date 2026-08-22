import { Outlet } from "react-router-dom";

import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1 ">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
