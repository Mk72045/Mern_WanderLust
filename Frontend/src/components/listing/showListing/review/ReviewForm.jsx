import { useState } from "react";
import { GreenButton } from "../../../ui/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import api from "../../../../api/axios";
import { useParams } from "react-router-dom";

function ReviewForm({ setRefresh }) {
  const [comment, setComment] = useState("");
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [rating, setRating] = useState(2);
  const [submit, setSubmit] = useState(false);

  const { listingId } = useParams();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!comment.trim()) {
      setError(true);
      setErrorText("you need to write your comment first");
      return;
    }

    try {
      await api.post(`/listings/${listingId}/reviews`, {
        Review: {
          comment,
          rating,
        },
      });

      setComment("");
      setError(false);
      setErrorText("");
      setRating(2);

      setRefresh((pre) => !pre);
    } catch (error) {
      console.log("Something went wrong", error);
    }

    // console.log(comment);
  }
  return (
    <div className="pl-1 mt-10">
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-4">
          <Box sx={{ width: "100%" }}>
            <TextField
              minRows={1}
              multiline
              error={error}
              fullWidth
              id="standard-error-helper-text"
              label="Add Comment: "
              variant="standard"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              onFocus={() => setSubmit(true)}
              onBlur={() => {
                if (!comment.trim()) {
                  setSubmit(false);
                }
              }}
              placeholder="Write your comment Here!"
              helperText={errorText}
            />
          </Box>

          <div className="mt-8 mb-4 flex items-center">
            Rating: &nbsp;
            <Rating
              name="rating"
              precision={1}
              value={rating}
              onChange={(e, newValue) => setRating(newValue)}
            />
          </div>
        </div>

        <div className="text-right p-2">
          <GreenButton
            style={!submit && "opacity-0 pointer-events-none"}
            type={"submit"}
            text="Add"
          />
        </div>
      </form>
    </div>
  );
}

export default ReviewForm;
