import { useEffect } from "react";
import api from "../api/axios";
import UserContext from "./UserContext";

import { useState } from "react";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/user");

        setUser(response?.data?.user);
      } catch (error) {
        setUser(null);
        console.log("error in UserPorvider.jsx file: ", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
