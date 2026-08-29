import ExpressError from "../utils/expressError.util.js";
import {
  ListingSchema,
  ReviewSchema,
  UserSchema,
  OtpSchema,
} from "../utils/joiSchemaValidation.util.js";

export const joiListingValidation = (req, res, next) => {
  // console.log("you are at the joi listing file inside hoiSchema.middleware file");

  // console.log("body check at joiLisitng schema", req.body);

  if (typeof req.body.Listing === "string") {
    req.body.Listing = JSON.parse(req.body.Listing);
  }

  // console.log("after type check");

  let { error } = ListingSchema.validate(req.body);

  if (error) {
    // console.log("error happens in listing validation");

    let errorMessage = error.details.map((el) => el.message).join(", ");
    next(new ExpressError(400, errorMessage));
  } else {
    // console.log("move further");
    next();
  }
};

export const joiReviewValidation = (req, res, next) => {
  let { error } = ReviewSchema.validate(req.body);

  if (error) {
    let errorMessage = error.detail.map((el) => el.message).join(", ");
    next(new ExpressError(400, errorMessage));
  } else next();
};

export const joiUserValidation = (req, res, next) => {
  let { error } = UserSchema.validate(req.body);

  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(", ");
    next(new ExpressError(400, errorMessage));
  } else next();
};

export const joiOtpValidation = (req, res, next) => {
  let { error } = OtpSchema.validate(req.body);

  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(", ");
    next(new ExpressError(400, errorMessage));
  } else next();
};
