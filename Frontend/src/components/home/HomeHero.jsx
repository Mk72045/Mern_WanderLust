import ListingCard from "../listing/ListingCard";
import useFetch from "../../hooks/useFetch.hook";
import { H1CenterText } from "../ui/Texts";
// import { useState } from "react";
import { useLocation } from "react-router-dom";

function HomeHero() {
  const location = useLocation();

  const { data, loading, error } = useFetch(
    "/listings",
    location.state?.update,
  );

  if (loading) return <H1CenterText text="Loading..." />;

  if (error) {
    console.log("error in HomeHero is: ", error);
    return <H1CenterText text="Couldn't load the listings" />;
  }

  return (
    <>
      {data && (
        <div className="flex flex-wrap w-full mt-4 mb-8 justify-center overflow-hidden basis-full sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
          {data.listings?.map(
            (listing) =>
              listing && <ListingCard key={listing._id} listing={listing} />,
          )}
        </div>
      )}
    </>
  );
}

export default HomeHero;
