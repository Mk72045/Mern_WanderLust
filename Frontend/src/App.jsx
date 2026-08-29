//rfce
import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";

// importing files
// import Footer from "./Components/layouts/Footer";
// import Navbar from "./Components/layouts/Navbar";
// import Dashboard from "./Components/listigs/Dashboard";

// importin Files
// import Edit from "./Components/listigs/Edit";
// import Error from "./Components/listigs/Error";
// import New from "./Components/listigs/New";
// import Show from "./Components/listigs/Show";
// // import Flash from "./Components/layouts/Flash";
// import Login from "./Components/user/Login";
// import SignUp from "./Components/user/Signup";
// import Layout from "./Components/layouts/layout";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true,
//         element: <Dashboard />,
//       },
//       {
//         path: "show/:id",
//         element: <Show />,
//       },
//       {
//         path: "show/:id/edit",
//         element: <Edit />,
//       },
//       {
//         path: "/new",
//         element: <New />,
//       },
//       {
//         path: "/signup",
//         element: <SignUp />,
//       },
//       {
//         path: "/login",
//         element: <Login />,
//       },
//       {
//         path: "*",
//         element: <Error />,
//       },
//     ],
//   },
// ]);

// function App() {
//   // return <RouterProvider router={router} />;
// }

// export default App;

// ============ packages ==========
import { BrowserRouter, Routes, Route } from "react-router-dom";

// ==========  layout file ==========
import MainLayout from "./layouts/MainLayout";

// ==========  route files ==========
import Home from "./pages/Home";
import ShowListing from "./components/listing/showListing";
import EditListing from "./components/listing/showListing/EditListing";
import NewListing from "./components/listing/NewListing";

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
