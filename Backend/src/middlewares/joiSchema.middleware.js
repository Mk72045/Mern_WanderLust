import ExpressError from "../utils/expressError.util.js";
import {
  ListingSchema,
  ReviewSchema,
  UserSchema,
  OtpSchema,
} from "../utils/joiSchemaValidation.util.js";

export const joiListingValidation = (req, res, next) => {
  if (!req.body.Listing) {
    throw new ExpressError(400, "Listing data is required");
  }

  if (typeof req.body.Listing === "string") {
    try {
      req.body.Listing = JSON.parse(req.body.Listing);
    } catch (parseErr) {
      throw new ExpressError(400, "Invalid listing data format");
    }
  }

  const { error } = ListingSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errorMessage);
  } else next();
};

export const joiReviewValidation = (req, res, next) => {
  let { error } = ReviewSchema.validate(req.body);

  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(", ");
    next(new ExpressError(400, errorMessage));
  }

  next();
};

export const joiUserValidation = (req, res, next) => {
  if (!req.body) {
    throw new ExpressError(400, "Request body is required");
  }

  const { error } = UserSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errorMessage);
  }

  next();
};

export const joiOtpValidation = (req, res, next) => {
  if (!req.body) {
    throw new ExpressError(400, "Request body is required");
  }

  const { error } = OtpSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details.map((el) => el.message).join(", ");
    throw new ExpressError(400, errorMessage);
  }

  next();
};
