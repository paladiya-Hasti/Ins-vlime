const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const router = require("./router/auth");
const bcrypt=require ("bcrypt")
require("dotenv").config();
require("./models/model")

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json())
app.use("/router",router)
// MongoDB Connection
const mongoUrl =  process.env.MONGO_URI || "your_default_mongo_uri_here";

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
  // console.error("MongoDB connection error:", err);
});

// Example Data Endpoint
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});
console.log("Mongo URI:", process.env.MONGO_URI);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
