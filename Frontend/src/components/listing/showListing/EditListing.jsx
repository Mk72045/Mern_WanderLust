import { useForm } from "react-hook-form";
import useFetch from "../../../hooks/useFetch.hook";
import { H1CenterText } from "../../ui/Texts";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { ErrorText, inputStyle, Label } from "../NewListingHelper";
import Button from "@mui/material/Button";
import { BlackButton, GreenButton } from "../../ui/Button";
import { compressImageTo1MB } from "./imageReducer";
import api from "../../../api/axios";

function EditListing() {
  const { listingId } = useParams();
  const [preview, setPreview] = useState({
    url: null,
    filename: null,
  });

  const navigate = useNavigate();
  const {
    data,
    loading,
    error: fetchError,
  } = useFetch(`/listings/${listingId}`);

  const initialState = {
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: null,
  };

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: initialState });

  useEffect(() => {
    if (!data?.listing) return;

    setPreview(data.listing.image);

    // Fill form with existing listing data
    reset({
      title: data.listing.title,
      description: data.listing.description,
      price: data.listing.price,
      location: data.listing.location,
      country: data.listing.country,
      image: null,
    });
  }, [data, reset]);

  if (loading) {
    return <H1CenterText text="Loading..." />;
  }

  if (fetchError) {
    console.log("error in EditListing is: ", fetchError);
    return <H1CenterText text="Listing not found" />;
  }

  async function onSubmit(formData) {
    try {
      const sendFormData = new FormData();

      const Listing = {
        title: formData.title,
        description: formData.description,
        price: formData.price,
        location: formData.location,
        country: formData.country,
      };

      sendFormData.append("Listing", JSON.stringify(Listing));

      // Only send image if a new image was selected
      if (formData.image instanceof File) {
        sendFormData.append("image", formData.image);
      }

      await api.put(`/listings/${listingId}`, sendFormData);

      reset();
      navigate(`/listings/${listingId}`);
    } catch (error) {
      console.error("Update listing failed error in EditListing.jsx: ", error);
    }
  }

  async function handleImageChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    const image1mb = await compressImageTo1MB(file);
    const previewUrl = URL.createObjectURL(image1mb);

    setPreview({ url: previewUrl, filename: image1mb.name });
    setValue("image", image1mb, {
      shouldDirty: true,
    });
  }

  return (
    <div className="flex flex-col items-center w-full my-8">
      <h1 className="mb-8!">Edit Listing </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 flex flex-col gap-10 w-[80%] min-w-85 max-w-200"
      >
        <div className="relative w-full">
          <input
            id="title"
            type="text"
            {...register("title", {
              required: "Title is required",
            })}
            placeholder=" "
            className={`${inputStyle}`}
          />

          <Label inputId="title" text="Title" />
          <ErrorText
            condition={errors?.title}
            message={errors?.title?.message}
          />
        </div>

        <div className="relative w-full">
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            placeholder=" "
            className={`${inputStyle} overflow-hidden flex justify-center  `}
            rows={1}
          />

          <Label inputId="description" text="Description" />
          <ErrorText
            condition={errors?.description}
            message={errors?.description?.message}
          />
        </div>

        <div className="relative w-full">
          <input
            type="number"
            id="price"
            {...register("price", {
              required: "Price is required",
            })}
            placeholder=" "
            className={`${inputStyle}`}
          />

          <Label inputId="price" text="Price" />
          <ErrorText
            condition={errors?.price}
            message={errors?.price?.message}
          />
        </div>

        <div className="relative w-full">
          <input
            type="text"
            id="location"
            {...register("location", {
              required: "Location is required",
            })}
            placeholder=" "
            className={inputStyle}
          />

          <Label inputId="location" text="Location" />
          <ErrorText
            condition={errors?.location}
            message={errors?.location?.message}
          />
        </div>

        <div className="relative w-full">
          <input
            type="text"
            id="country"
            {...register("country", {
              required: "Country is required",
            })}
            placeholder=" "
            className={inputStyle}
          />

          <Label inputId="country" text="Country" />
          <ErrorText
            condition={errors?.country}
            message={errors?.country?.message}
          />
        </div>

        {data?.listing?.image && (
          <div className="w-full pl-2">
            <img
              src={preview.url}
              alt={preview.filename}
              className="rounded-xl h-60 w-[80%] min-w-60 max-w-100 opacity-70"
            />
          </div>
        )}

        <Button
          variant="outlined"
          component="label"
          className="p-0! rounded-xl! h-14! w-full! overflow-hidden!"
        >
          {/* Choose Image */}
          <span
            className="
              shrink-0
              w-34
              h-full
              px-2
              border
              rounded-l-xl
              bg-gray-200
              flex
              items-center
              justify-center
              text-md
            "
          >
            Choose Image
          </span>

          {/* Filename */}
          <div className="min-w-0 flex-1 w-0 overflow-hidden">
            <span
              className="
                block
                w-full
                px-3
                py-3
                text-gray-600
                
                truncate
                whitespace-nowrap
              "
              title={preview?.filename ? preview.filename : ""}
            >
              {preview?.filename ? preview.filename : "No file choosen"}
            </span>
          </div>

          <input
            {...register("image")}
            id="image-upload"
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>

        <div className="text-right pr-2">
          <BlackButton text="Cancle" onClick={() => navigate("/")} />

          {isDirty && (
            <GreenButton text="Edit Listing" type="submit" style="ml-4" />
          )}
        </div>
      </form>
    </div>
  );
}

export default EditListing;
