import dns from "dns";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

import dotenv from "dotenv";
dotenv.config({ path: "../../.env" });

const Mongo_Url = process.env.Mongo_Atlas_Url;

import data from "./data.js";
import mongoose from "mongoose";
import Listings from "../models/listings.js";

// console.log("data is ", data[0]);

// console.log("url is: ", Mongo_Url);

mongoose
  .connect(Mongo_Url)
  .then(() => console.log("connected to mongo"))
  .catch((err) => console.log("mongo connection failed, error : ", err));

const reInsertData = async () => {
  await Listings.deleteMany({});
  await Listings.insertMany(data);
};

// reInsertData();
