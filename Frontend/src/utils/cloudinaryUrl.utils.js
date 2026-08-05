// // src/utils/cloudinaryUrl.js
// // Inserts a Cloudinary transformation into an existing Cloudinary URL,
// // so we get a nicely-cropped, right-sized thumbnail instead of asking
// // the browser to squeeze/crop a full-resolution image with plain CSS.
// export const getThumbnail = (url, width = 400, height = 300) => {
//   if (!url || !url.includes("/upload/")) return url;

//   return url.replace(
//     "/upload/",
//     `/upload/w_${width},h_${height},c_fill,g_auto/`
//   );
// };