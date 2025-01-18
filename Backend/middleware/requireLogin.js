// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const mongoose = require("mongoose");
// const USER = mongoose.model("USER");

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;
//   if (!authorization || !authorization.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "You must be logged in" });
//   }

//   const token = authorization.replace("Bearer ", "");
//   jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
//     if (err) {
//       console.error("JWT verification failed:", err.message);
//       return res.status(401).json({ error: "Invalid or expired token" });
//     }

//     const { _id } = payload;
//     USER.findById(_id)
//       .then((userData) => {
//         if (!userData) {
//           return res.status(404).json({ error: "User not found" });
//         }
//         req.user = userData;
//         next();
//       })
//       .catch((dbErr) => {
//         console.error("Database query error:", dbErr.message);
//         res.status(500).json({ error: "Database query failed" });
//       });
//   });
// };


const jwt = require("jsonwebtoken");
require("dotenv").config();
const mongoose = require("mongoose");
const USER = mongoose.model("USER");

module.exports = async (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return res.status(401).json({ error: "You must be logged in" });
    }

    const token = authorization.replace("Bearer ", "");

    // Verify the token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    if (!payload) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // Fetch user details
    const userData = await USER.findById(payload._id);
    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = userData;
    next();
  } catch (err) {
    console.error("Error in authentication middleware:", err.message);

    // Handle specific JWT errors
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Malformed or invalid token" });
    }
    

    // General error
    res.status(500).json({ error: "Internal server error" });
  }
};
