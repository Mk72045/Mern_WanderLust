import useFetch from "../../../hooks/useFetch.hook";
import { useParams } from "react-router-dom";
import ReviewHero from "./review";


function ShowListing() {
  const { listingId } = useParams();

  const { data, loading, error } = useFetch(`/listings/${listingId}`);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Listing not found</h1>;
  }

  // console.log(data.listing);
  return (
    <>
      {data?.listing && (
        <div className="flex flex-col w-[80%] min-w-70 max-w-200 mx-auto ">
          <img
            src={data.listing.image?.url}
            alt={data.listing.image?.filename}
            className="h-75 rounded-xl object-cover  my-8 md:h-80 w-full "
          />

          <div className="flex flex-col pl-1 p-4">
            <h2 className="py-2">{data.listing.title}</h2>
            <p className="font-semibold py-1">
              <b>Description:</b> {data.listing.description}
            </p>
            <p className="font-semibold py-1">
              <b>Price: </b> {data.listing.price}
            </p>
            <p className="font-semibold py-1">
              <b>Country: </b> {data.listing.country}
            </p>
            <p className="font-semibold py-1">
              <b>Location: </b> {data.listing.location}
            </p>
          </div>

          <ReviewHero />
        </div>
      )}
    </>
  );
}

export default ShowListing;
