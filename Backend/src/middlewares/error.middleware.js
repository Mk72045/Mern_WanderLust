// // middleware/errorMiddleware.js
// const errorHandler = (err, req, res, next) => {
//   console.error(err.stack); // full error logged on the server for debugging

//   const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

//   res.status(statusCode).json({
//     message: err.message || "Something went wrong on the server",
//   });
// };

// export default errorHandler;