const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const router = express.Router();

// Signup Route
// router.post("/signup", async (req, res) => {
//   try {
//     const {  email, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ firstName,lastName,phoneNo,gender, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: "User registered successfully!" });
//   } catch (error) {
//     res.status(500).json({ error: "Signup failed!" });
//   }
// });
router.post("/signup", async (req, res) => {
  try {
    console.log("Received signup request:", req.body);

    const { firstName, lastName, phoneNo, gender, email, password } = req.body;

    // Log the extracted data
    console.log("Extracted user data:", { firstName, lastName, phoneNo, gender, email });

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Password hashed successfully");

    const newUser = new User({ firstName, lastName, phoneNo, gender, email, password: hashedPassword });
    console.log("New user object created:", newUser);

    await newUser.save();
    console.log("User saved to the database");

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ error: "Signup failed!" });
  }

});


// log IN


// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }

//     const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
//     res.json({ message: "Login successful!", token });
//   } catch (error) {
//     res.status(500).json({ error: "Login failed" });
//   }
// });



router.post("/login", async (req, res) => {
  try {
    console.log("Received login request:", req.body);

    const { email, password } = req.body;
    console.log("Extracted login data:", { email });

    const user = await User.findOne({ email });
    console.log("User found in database:", user);

    if (!user) {
      console.log("User not found for email:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    console.log("Password validation result:", isPasswordValid);

    if (!isPasswordValid) {
      console.log("Invalid password for email:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });
    console.log("JWT token generated:", token);

    res.json({ message: "Login successful!", token });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
