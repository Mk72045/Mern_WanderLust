// // utils/asyncHandler.js
// // Wraps an async route function so we don't need try/catch in every controller.
// // If the wrapped function throws an error, this automatically passes it to
// // Express's error-handling middleware via next(error).
// const asyncHandler = (fn) => (req, res, next) => {
//   Promise.resolve(fn(req, res, next)).catch(next);
// };

// export default asyncHandler;