import Listing from "../models/listing.model.js";
import User from "../models/user.model.js";

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
  const { id: userId } = req.User;

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
    owner: userId,
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
  const { id: userId } = req.User;

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

  const result = await Listing.findOneAndUpdate(
    {
      _id: listingId,
      owner: userId,
    },
    upadatListing,
    { new: true }
  );

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Listing not found or you are not authorized to update it",
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
  const { listingId } = req.params;
  const { id: userId } = req.User;

  const listing = await Listing.findOneAndDelete({
    _id: listingId,
    owner: userId,
  });

  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found or you are not authorized",
    });
  }

  res.status(200).json({
    success: true,
    message: "listing is deleted successfully",
  });
};
