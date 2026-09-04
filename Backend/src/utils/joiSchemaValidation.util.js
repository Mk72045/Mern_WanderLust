import Joi from "joi";

export const ListingSchema = Joi.object({
  Listing: Joi.object({
    title: Joi.string().trim().required().messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),

    description: Joi.string().trim().required().messages({
      "string.empty": "Description is required",
      "any.required": "Description is required",
    }),

    price: Joi.number().min(0).default(0).messages({
      "number.base": "Price must be a number",
      "number.min": "Price cannot be negative",
    }),

    location: Joi.string().trim().required().messages({
      "string.empty": "Location is required",
      "any.required": "Location is required",
    }),

    country: Joi.string().trim().required().messages({
      "string.empty": "Country is required",
      "any.required": "Country is required",
    }),
  }).required(),
  image: Joi.object().optional(),
});

export const ReviewSchema = Joi.object({
  Review: Joi.object({
    rating: Joi.number().min(1).max(5).required().messages({
      "number.base": "Rating must be a number",
      "number.min": "Rating must be at least 1",
      "number.max": "Rating cannot be more than 5",
      "any.required": "Rating is required",
    }),

    comment: Joi.string().trim().required().messages({
      "string.empty": "Comment is required",
      "any.required": "Comment is required",
    }),
  }).required(),
});

export const UserSchema = Joi.object({
  User: Joi.object({
    

    username: Joi.string()
      .trim()
      .email({
        tlds: { allow: false }, // Allows .com, .in, .dev, etc.
      })
      .required()
      .messages({
        "string.email": "Please enter a valid email address",
        "string.empty": "Email is required",
      }),

    password: Joi.string()
      .trim()
      .min(8)
      .max(30)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_+\-=[\]{};':"\\|,.<>/?]).+$/)
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.max": "Password cannot exceed 30 characters",
        "string.pattern.base":
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
        "string.empty": "Password is required",
      }),
  }).required(),
});

export const OtpSchema = Joi.object({
  OTP: Joi.object({
    username: Joi.string()
      .trim()
      .lowercase()
      .email({ tlds: { allow: false } })
      .required()
      .messages({
        "string.email": "Please enter a valid email address",
        "any.required": "Email is required",
        "string.empty": "Email is required",
      }),

    otp: Joi.string()
      .trim()
      .pattern(/^[0-9]{6}$/)
      .required()
      .messages({
        "string.pattern.base": "OTP must be exactly 6 digits",
        "any.required": "OTP is required",
        "string.empty": "OTP is required",
      }),
  }).required(),
});
