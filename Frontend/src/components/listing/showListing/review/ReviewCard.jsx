import Rating from "@mui/material/Rating";
import { GreenButton, RedButton } from "../../../ui/Button";
import api from "../../../../api/axios";
import { useParams } from "react-router-dom";

function ReviewCard({ review, currentAuthor = "not author", setRefresh }) {
  const { listingId } = useParams();

  function handleReviewDelete() {
    api.delete(`/listings/${listingId}/reviews/${review._id}`);
    setRefresh((pre) => !pre);
  }

  return (
    <>
      {review && (
        <div className="mb-8 shadow p-4 rounded-2xl ">
          <div className="mb-4 flex items-center">
            <span className="mr-8">@{currentAuthor}</span>
            <Rating name="rating" value={review.rating} readOnly />
          </div>
          {review.comment}

          <div className="text-right">
            <span className="mr-4">
              <GreenButton text="Edit" />
            </span>
            <span className="tt">
              <RedButton text="Delete" onClick ={handleReviewDelete} />{" "}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default ReviewCard;
