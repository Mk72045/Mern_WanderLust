//rfce

// ============ packages ==========
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==========  layout & file ==========
import "./App.css";
import MainLayout from "./layouts/MainLayout";

// ==========  route files ==========
import Home from "./pages/Home";
import ShowListing from "./components/listing/showListing";
import EditListing from "./components/listing/showListing/EditListing";
import NewListing from "./pages/NewListing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          // ===== Home Page & Related Route =====
          <Route path="/" element={<Home />} />
          <Route path="/listings/:listingId" element={<ShowListing />} />
          <Route
            path="/listings/:listingId/editListing"
            element={<EditListing />}
          />
          // ===== Other Pages Routes =====
          <Route path="/newListing" element={<NewListing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
