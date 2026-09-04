import dns from "dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import data from "./data.js";
import Listing from "../models/listing.model.js";

const Mongo_Url = process.env.Mongo_Atlas_Url;

console.log("mogourl:", Mongo_Url);

const reInsertData = async () => {
  try {
    // First connect to MongoDB
    await mongoose.connect(Mongo_Url);

    console.log("Connected to MongoDB");

    // Delete existing listings
    await Listing.deleteMany({});

    // Add owner to every listing
    for (let i = 0; i < data.length; i++) {
      data[i].owner = "6a99011b3eb3c8cf157a0239";
    }

    // Insert new listings
    await Listing.insertMany(data);

    console.log("Data inserted successfully");

    // Close connection
    await mongoose.connection.close();

    console.log("MongoDB connection closed");
  } catch (error) {
    console.log("Error:", error);
  }
};

// reInsertData();