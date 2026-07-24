import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Show() {
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/show/${id}`)
      .then((res) => {
        setListing(res.data.listing);
      })
      .catch((err) => {
        console.log("error to fetch listing: ", err);
      });
  }, [id]);

  if (!listing) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      Params: {id}
      <div className="flex justify-center m-8">
        <img
          src={listing.image.url}
          alt={listing.image.filename}
          className="h-80 w-160 rounded-4xl"
        />
      </div>
      <div className="mt-8">
        <button
          className="px-4 py-1 text-red-400 rounded-xl border-2 border-red-400 mx-4"
          onClick={() =>
            navigate(`/show/${id}/edit`, { state: { listing: listing } })
          }
        >
          Edit
        </button>
      </div>
    </div>
  );
}

export default Show;
