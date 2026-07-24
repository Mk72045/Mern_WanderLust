// importing packages
import { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
import api from "../../assets/axios.js";
import { NavLink } from "react-router-dom";

// importin Files

// import Show from "./Show";
// import Flash from "../layouts/Flash";
import ListingCard from "./ListingCard";

function Dasboard() {
  const [allListings, setAllListings] = useState([]);

  useEffect(() => {
    api
      .get("/api/listings")
      .then((res) => {
        // console.log("Response:", res);
        // console.log("Data:", res.data);
        // console.log("Is array?", Array.isArray(res.data));
        setAllListings(res.data);
      })
      .catch((err) => {
        console.log("there is not data", err);
      });
  }, []);

  // useEffect(() => {
  //   console.log("allListings:", allListings);
  // }, [allListings]);

  return (
    <div className="flex flex-wrap p-8 gap-8 justify-center">
      {allListings &&
        allListings.map((el) => (
          <NavLink to={`show/${el._id}`} key={el._id} state={{ listing: el }}>
            <ListingCard listing={el} />
          </NavLink>
        ))}
    </div>
  );
}

export default Dasboard;
