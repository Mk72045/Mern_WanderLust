import useFetch from "../../../hooks/useFetch.hook";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ReviewHero from "./review";
import { H1CenterText } from "../../ui/Texts";
import { BlackButton, GreenButton, RedButton } from "../../ui/Button";
import api from "../../../api/axios";
import useAuth from "../../../hooks/useAuth.hook";

function ShowListing() {
  const { user } = useAuth();
  const { listingId } = useParams();
  const navigation = useNavigate();
  const location = useLocation();

  const { data, loading, error } = useFetch(
    `/listings/${listingId}`,
    location.state?.update,
  );

  if (loading) {
    return <H1CenterText text="Loading..." />;
  }

  if (error) {
    console.log("error in showListingHero is: ", error);
    return <H1CenterText text="Listing not found" />;
  }

  function handleListingEdit() {
    navigation(`/listings/${listingId}/editListing`);
  }

  async function handleListingDelete() {
    await api.delete(`/listings/${listingId}`);

    navigation("/", {
      state: {
        update: Date.now(),
      },
    });
  }

  function handleBack() {
    navigation("/");
  }

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
              <b>Price: </b> &#8377;{data.listing.price}
            </p>
            <p className="font-semibold py-1">
              <b>Country: </b> {data.listing.country}
            </p>
            <p className="font-semibold py-1">
              <b>Location: </b> {data.listing.location}
            </p>
          </div>

          <div className="flex justify-between  p-2 mb-8">
            <div className="tt">
              <BlackButton text="Back" onClick={handleBack} style="mr-4" />
            </div>

            {user?.id === data?.listing?.owner && (
              <div className="tt">
                <GreenButton
                  text="Edit"
                  onClick={handleListingEdit}
                  style="mr-4"
                />

                <RedButton text="Delete" onClick={handleListingDelete} />
              </div>
            )}
          </div>

          <ReviewHero />
        </div>
      )}
    </>
  );
}

export default ShowListing;
