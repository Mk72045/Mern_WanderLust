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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/listings/:listingId" element={<ShowListing />} />
          <Route
            path="/listings/:listingId/editListing"
            element={<EditListing />}
          />
          <Route path="/newListing" element={<NewListing />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
