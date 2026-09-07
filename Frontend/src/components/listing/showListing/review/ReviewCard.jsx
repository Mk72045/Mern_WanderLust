import Rating from "@mui/material/Rating";
import { RedButton } from "../../../ui/Button";
import api from "../../../../api/axios";
import { useParams } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth.hook";
import useApiRequest from "../../../../utils/useApiRequest.js";

function ReviewCard({ review, setRefresh }) {
  const { listingId } = useParams();
  const { user } = useAuth();
  const { request } = useApiRequest();

  async function handleReviewDelete() {
    // api.delete(`/listings/${listingId}/reviews/${review._id}`);

    const { error } = await request(
      () => api.delete(`/listings/${listingId}/reviews/${review._id}`),
      {
        loadingMessage: "Deleting review...",
        successMessage: "Review deleted successfully",
      },
    );

    if (error) return;

    setRefresh((pre) => !pre);
  }

  function getDisplayName(email) {
    return email.split("@")[0].slice(0, 10);
  }

  const author = getDisplayName(review?.author?.username);

  return (
    <>
      {review && (
        <div className="mb-8 shadow p-4 rounded-2xl ">
          <div className="mb-4 flex items-center">
            <span className="mr-8">@{author}</span>
            <Rating name="rating" value={review.rating} readOnly />
          </div>
          {review.comment}

          {user?.id === review?.author?._id && (
            <div className="text-right">
              <span className="tt">
                <RedButton text="Delete" onClick={handleReviewDelete} />{" "}
              </span>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ReviewCard;
