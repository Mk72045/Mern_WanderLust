import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinaryConfig.util.js";

const RootDirectory = "Mern_WanderLust";

const createCloudinaryStorage = (folder) => {
  return new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `${RootDirectory}/${folder}`,
      allowed_formats: ["pdf", "jpg", "jpeg", "png", "webp"],
    },
  });
};

const listingStorage = createCloudinaryStorage("listing");

export const uploadListingImage  = multer({
  storage: listingStorage,
});


