const express = require("express");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const router = express.Router();
const User=require("../models/model")
// console.log(User);

// Routes
router.get("/", (req, res) => {
  res.send("Hello, world!");
});

router.post('/signup', (req, res) => {
  const { name, username, email, password } = req.body;
  
  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Add logic to save to the database
  res.status(200).json({ message: "User created successfully" });
});



router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(422).json({ error: "Please add both email and password" });
  }

  try {
    // Check if the user exists
    const savedUser = await User.findOne({ email });
    if (!savedUser) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Compare the password
    const isMatch = await bcrypt.compare(password, savedUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Optional: Generate a JWT token
    const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
    const { _id, name, email, userName } = savedUser;

    // Return success response
    return res.status(200).json({
      message: "Sign-in successful",
      token,
      user: { _id, name, email, userName },
    });
  } catch (err) {
    console.error("Sign-in Error:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
