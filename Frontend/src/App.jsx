//rfce
// import packages
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// importing files
// import Footer from "./Components/layouts/Footer";
// import Navbar from "./Components/layouts/Navbar";
import Dashboard from "./Components/listigs/Dashboard";

// importin Files
import Edit from "./Components/listigs/Edit";
import Error from "./Components/listigs/Error";
import New from "./Components/listigs/New";
import Show from "./Components/listigs/Show";
// import Flash from "./Components/layouts/Flash";
import Login from "./Components/user/Login";
import SignUp from "./Components/user/Signup";
import Layout from "./Components/layouts/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "show/:id",
        element: <Show />,
      },
      {
        path: "show/:id/edit",
        element: <Edit />,
      },
      {
        path: "/new",
        element: <New />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
