// ========== import from packages ==========
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

// ========== components &
import {
  ErrorText,
  inputStyle,
  Label,
} from "../components/listing/NewListingHelper";
import { BlackButton, GreenButton } from "../components/ui/Button";
import { compressImageTo1MB } from "../components/listing/showListing/imageReducer.js";
import api from "../api/axios.js";

function NewListing() {
  const navigate = useNavigate();
  const initialState = {
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: null,
  };

  const [image, setImage] = useState({ url: null, filename: null });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isDirty },
  } = useForm({ defaultValues: initialState });

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      const Listing = {
        title: data.title,
        description: data.description,
        price: data.price,
        location: data.location,
        country: data.country,
      };

      formData.append("Listing", JSON.stringify(Listing));

      if (data.image instanceof File) {
        formData.append("image", data.image);
      }

      await api.post("/listings", formData);

      setImage({
        url: null,
        filename: null,
      });

      reset();
      navigate("/");
    } catch (e) {
      console.log("error at submission of newListing", e);
    }
  };

  async function handleImageChange(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    const image1mb = await compressImageTo1MB(file);

    const previewUrl = URL.createObjectURL(image1mb);

    setImage({ url: previewUrl, filename: image1mb.name });

    setValue("image", image1mb, { shouldDirty: true });
  }

  return (
    <div className="flex flex-col items-center w-full my-8">
      <h1 className="mb-8!">AddListing</h1>
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
            className={`${inputStyle} peer`}
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
            className={`${inputStyle} peer`}
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

        {image?.url && (
          <div className="w-full pl-2">
            <img
              src={image.url}
              alt={image.filename}
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
              title={image?.filename ? image.filename : ""}
            >
              {image?.filename ? image.filename : "No file choosen"}
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
            <GreenButton text="AddListing" type="Submit" style="ml-4" />
          )}
        </div>
      </form>
    </div>
  );
}

export default NewListing;
