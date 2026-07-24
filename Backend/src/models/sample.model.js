// import {Schema, model} from "mongoose";

// const categorySchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Category name is required"],
//       trim: true, // removes accidental leading/trailing spaces
//     },
//     slug: {
//       type: String,
//       required: true,
//       unique: true, // no two categories can have the same slug
//       lowercase: true,
//     },
//     description: {
//       type: String,
//       default: "",
//     },
//     coverImage: {
//       type: String, // this will store the Cloudinary URL, not the actual image
//       default: "",
//     },
//   },
//   {
//     timestamps: true, // automatically adds createdAt and updatedAt fields
//   }
// );

// const Category = model("Category", categorySchema);

// export default Category;