import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import useApiRequest from "../../../utils/useApiRequest";
import api from "../../../api/axios";
import Popup from "../../ui/Popup";
import useAuth from "../../../hooks/useAuth.hook";

const DeleteAccount = ({ style = "" }) => {
  const [openPopup, setOpenPopup] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const { request } = useApiRequest();

  const handleDelete = async () => {
    const { error } = await request(() => api.delete("/user/delete"), {
      loadingMessage: "Deleting account...",
      successMessage: "Account deleted successfully",
    });

    if (error) return;

    setUser(null);
    localStorage.removeItem("token");

    navigate("/");
  };

  return (
    <>
      <Popup
        open={openPopup}
        onClose={() => setOpenPopup(false)}
        apiCall={handleDelete}
        message="Your releated listings and reviews will be deleted. Do you want to delete your Account?"
        focus="delete"
      />

      <NavLink className={style} onClick={() => setOpenPopup(true)}>
        Delete Account
      </NavLink>
    </>
  );
};

export default DeleteAccount;
