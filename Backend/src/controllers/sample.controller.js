// // controllers/categoryController.js
// import Category from "../models/Category.js";
// import asyncHandler from "../utils/asyncHandler.js";

// // Small helper: converts "Cutting Tools" → "cutting-tools"
// const generateSlug = (name) => {
//   return name
//     .toLowerCase()
//     .trim()
//     .replace(/[^a-z0-9\s-]/g, "") // remove special characters
//     .replace(/\s+/g, "-"); // replace spaces with hyphens
// };

// // @route   GET /api/categories
// // @desc    Get all categories
// export const getCategories = asyncHandler(async (req, res) => {
//   const categories = await Category.find().sort({ createdAt: -1 });
//   res.json(categories);
// });

// // @route   GET /api/categories/:slug
// // @desc    Get a single category by its slug (used on the category detail page)
// export const getCategoryBySlug = asyncHandler(async (req, res) => {
//   const category = await Category.findOne({ slug: req.params.slug });

//   if (!category) {
//     return res.status(404).json({ message: "Category not found" });
//   }

//   res.json(category);
// });

// // @route   POST /api/categories
// // @desc    Create a new category (admin only — we'll protect this route later)
// export const createCategory = asyncHandler(async (req, res) => {
//   const { name, description, coverImage } = req.body;

//   if (!name) {
//     return res.status(400).json({ message: "Category name is required" });
//   }

//   const slug = generateSlug(name);

//   // Check if a category with this slug already exists
//   const existing = await Category.findOne({ slug });
//   if (existing) {
//     return res.status(400).json({ message: "This category already exists" });
//   }

//   const category = await Category.create({
//     name,
//     slug,
//     description,
//     coverImage,
//   });

//   res.status(201).json(category);
// });

// // @route   PUT /api/categories/:id
// // @desc    Update a category (admin only)
// export const updateCategory = asyncHandler(async (req, res) => {
//   const { name, description, coverImage } = req.body;

//   const category = await Category.findById(req.params.id);
//   if (!category) {
//     return res.status(404).json({ message: "Category not found" });
//   }

//   // Only regenerate the slug if the name actually changed
//   if (name && name !== category.name) {
//     category.slug = generateSlug(name);
//     category.name = name;
//   }

//   if (description !== undefined) category.description = description;
//   if (coverImage !== undefined) category.coverImage = coverImage;

//   const updated = await category.save();
//   res.json(updated);
// });

// // @route   DELETE /api/categories/:id
// // @desc    Delete a category (admin only)
// export const deleteCategory = asyncHandler(async (req, res) => {
//   const category = await Category.findById(req.params.id);
//   if (!category) {
//     return res.status(404).json({ message: "Category not found" });
//   }

//   await category.deleteOne();
//   res.json({ message: "Category deleted successfully" });
// });
