import ListingCard from "../listing/ListingCard";
import useFetch from "../../hooks/useFetch.hook";

function HomeHero() {
  const { data, loading, error } = useFetch("/listings");

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>Could not fetch listings</h1>;
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
