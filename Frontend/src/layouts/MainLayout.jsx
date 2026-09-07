import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

import Navbar from "../components/common/navbar";
import Footer from "../components/common/footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar />
      <main className="flex-1 ">
        <Toaster position="top-right" richColors />
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
