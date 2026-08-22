import useFetch from "../../../../hooks/useFetch.hook";
import ReviewForm from "./ReviewForm";
import useAuth from "../../../../hooks/useAuth.hook";
import ReviewCard from "./ReviewCard";
import { useParams } from "react-router-dom";
import { useState } from "react";

function ReviewHero() {
  const { listingId } = useParams();
  const [refresh, setRefresh] = useState(false);
  const { user = "not author" } = useAuth();

  const { data, loading, error } = useFetch(
    `/listings/${listingId}/reviews`,
    refresh,
  );

  if (loading) return <h1>Loading...</h1>;

  if (error) {
    console.log("reveiw error is: ", error);
    return <h2>Couldn't load the reviews</h2>;
  }

  return (
    <div>
      <ReviewForm setRefresh={setRefresh} />
      <div className="my-8 pl-1">
        <span>{data.allReviews.length} Comments</span>
        <hr className="mt-2" />
      </div>
      <div className="my-16">
        {data &&
          data.allReviews
            ?.slice()
            .reverse()
            .map((review) => (
              <ReviewCard
                key={review._id}
                review={review}
                // currentAuthor={user}
              />
            ))}
      </div>
    </div>
  );
}

export default ReviewHero;
