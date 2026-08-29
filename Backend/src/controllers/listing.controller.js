import Listing from "../models/listing.model.js";
import ExpressError from "../utils/expressError.util.js";

export const showAllListings = async (req, res, next) => {
  const listings = await Listing.find({});

  if (listings.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No Listings Found",
    });
  }

  res.status(200).json({
    success: true,
    listings,
  });
};

export const addNewListing = async (req, res, next) => {
  const { title, description, price, location, country } = req.body.Listing;

  const image = req.file;

  const newListing = new Listing({
    title,
    description,
    price,
    location,
    country,
    image: {
      url: image
        ? image.path
        : "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201410201436324827-36f63773-bdc9-4e5c-baef-10cba1e4575d.jpg",
      filename: image ? image.filename : "default-file",
    },
  });

  await newListing.save();

  res.status(201).json({
    success: true,
    message: "Listing added successfully",
    listing: newListing,
  });
};

// export const editListingForm = async (req, res, next) => {};

export const editListing = async (req, res, next) => {
  const { listingId } = req.params;

  const { title, description, price, location, country } = req.body.Listing;

  const image = req.file;

  const upadatListing = {
    title,
    description,
    price,
    location,
    country,
  };

  if (image) {
    upadatListing.image = {
      url: image.path,
      filename: image.filename,
    };
  }

  const result = await Listing.findByIdAndUpdate(listingId, upadatListing);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "listing that you want to edit is not founnd",
    });
  }

  res.status(200).json({
    success: true,
    message: "listing is updated successfully",
  });
};

export const showListing = async (req, res, next) => {
  let { listingId } = req.params;
  let listing = await Listing.findById(listingId).populate("reviews");

  if (!listing) {
    return res.status(400).json({
      success: false,
      message: "listing is not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "listing is found out successfully",
    listing,
  });
};

export const deleteListing = async (req, res, next) => {
  let { listingId } = req.params;
  let listing = await Listing.findByIdAndDelete(listingId);

  if (!listing) {
    return res.status(400).json({
      success: false,
      message: "listing is not found",
    });
  }

  res.status(200).json({
    success: true,
    message: "listing is deleted successfully",
  });
};
