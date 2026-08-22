import Rating from "@mui/material/Rating";

function ReviewCard({ review, currentAuthor = "not author" }) {
  return (
    <div>
      {" "}
      {review && (
        <div className="mb-8">
          <div className="mb-4 flex items-center">
            <span className="mr-8">{currentAuthor}</span>
            <Rating name="rating" value={review.rating} readOnly />
          </div>
          {review.comment}
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
