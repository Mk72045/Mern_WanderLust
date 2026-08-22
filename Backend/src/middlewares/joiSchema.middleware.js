import ExpressError from "../utils/expressError.util.js";
import {
  ListingSchema,
  ReviewSchema,
  UserSchema,
  OtpSchema,
} from "../utils/joiSchemaValidation.util.js";

export const joiListingValidation = (req, res, next) => {
  let { error } = ListingSchema.validate(req.body);

  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(", ");
    next(new ExpressError(400, errorMessage));
  } else next();
};

export const joiReviewValidation = (req, res, next) => {
  console.log("kya hua");
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
