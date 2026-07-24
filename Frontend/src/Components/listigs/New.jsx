import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function New() {
  async function mySubmitHandler(data) {
    await axios.post("/api/newListing", {
      title: data.title,
      description: data.description,
      price: data.price,
      location: data.location,
      country: data.country,
      url: data.image,
    });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log("form is submitted", data);
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(mySubmitHandler)}
        className="w-full max-w-md bg-white p-6 rounded-xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Add New Listing</h2>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block mb-1 font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("title", {
              required: "Title is required",
            })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block mb-1 font-medium">
            Description
          </label>
          <input
            id="description"
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block mb-1 font-medium">
            Price
          </label>
          <input
            id="price"
            type="number"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("price", {
              required: "Price is required",
              min: {
                value: 1,
                message: "Price must be greater than 0",
              },
            })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm mt-1">{errors.price.message}</p>
          )}
        </div>

        {/* Location */}
        <div className="mb-4">
          <label htmlFor="location" className="block mb-1 font-medium">
            Location
          </label>
          <input
            id="location"
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("location", {
              required: "Location is required",
            })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">
              {errors.location.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div className="mb-4">
          <label htmlFor="country" className="block mb-1 font-medium">
            Country
          </label>
          <input
            id="country"
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("country", {
              required: "Country is required",
            })}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label htmlFor="image" className="block mb-1 font-medium">
            Image URL
          </label>
          <input
            id="image"
            type="text"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("image", {
              required: "Image URL is required",
            })}
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-2 rounded-lg text-white font-medium transition ${
            isSubmitting
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default New;
