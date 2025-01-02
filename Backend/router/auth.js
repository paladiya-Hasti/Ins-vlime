const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const router = express.Router();

const User=require("../models/model")

// Routes
router.get("/", (req, res) => {
  res.send("Hello, world!");
});

router.post("/signup", async (req, res) => {
  console.log("Request Body:", req.body); // Debug log for request body
  const { name, username, email, password } = req.body;

  // Validate input
  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  if (!name.trim() || !username.trim() || !email.trim() || !password.trim()) {
    return res.status(400).json({ error: "All fields must be non-empty" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name: name.trim(),
      username: username.trim(),
      email: email.trim(),
      password: hashedPassword,
    });

    console.log("Saving user to the database...");
    await user.save();
    console.log("User saved successfully");
    res.json({ message: "User saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save user" });
  }
});

module.exports = router;
