// // src/context/AuthContext.jsx
// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   // Check localStorage on first load, so refreshing the page doesn't log you out
//   const [token, setToken] = useState(localStorage.getItem("adminToken"));
//   const [admin, setAdmin] = useState(
//     JSON.parse(localStorage.getItem("adminInfo")) || null
//   );

//   const login = (tokenValue, adminData) => {
//     localStorage.setItem("adminToken", tokenValue);
//     localStorage.setItem("adminInfo", JSON.stringify(adminData));
//     setToken(tokenValue);
//     setAdmin(adminData);
//   };

//   const logout = () => {
//     localStorage.removeItem("adminToken");
//     localStorage.removeItem("adminInfo");
//     setToken(null);
//     setAdmin(null);
//   };

//   return (
//     <AuthContext.Provider value={{ token, admin, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// // A small custom hook so other files can just write useAuth() instead of
// // importing useContext and AuthContext separately every time
// export function useAuth() {
//   return useContext(AuthContext);
// }

