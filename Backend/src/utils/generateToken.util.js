// // utils/generateToken.js
// import jwt from "jsonwebtoken";

// const generateToken = (adminId) => {
//   return jwt.sign(
//     { id: adminId }, // data stored inside the token
//     process.env.JWT_SECRET, // secret key that signs it, so it can't be faked
//     { expiresIn: "7d" } // token becomes invalid after 7 days, admin logs in again
//   );
// };

// export default generateToken;