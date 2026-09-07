import { useEffect } from "react";
import api from "../api/axios";
import UserContext from "./UserContext";

import { useState } from "react";
import useApiRequest from "../utils/useApiRequest";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const { request } = useApiRequest();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: result, error } = await request(() => api.get("/user"), {
        silent: true,
      });

      if (error || !result?.user) {
        setUser(null);
        return;
      }
      setUser({
        id: result.user._id,
        username: result.user.username,
      });
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
