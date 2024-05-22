const User = require("../models/user_model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { check } = require("express-validator");

// Function to generate JWT token
const generateToken = (user) => {
  return jwt.sign(
    { userId: user.UserID, email: user.Email },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
};

// User login
exports.loginUser = async (req, res) => {
  const { Email, Password } = req.body;
  try {
    const user = await User.findOne({ where: { Email } }); // Find user by email
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" }); // If user not found, return 401 status with error message
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(Password, user.Password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Generate JWT token
    const token = generateToken(user);

    res.json({ token, user: { id: user.UserID, email: user.Email } }); // Send token and user data
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Validation rules for creating a new user
exports.createUserValidationRules = () => {
  return [
    check("FirstName").notEmpty().withMessage("First name is required"),
    check("LastName").notEmpty().withMessage("Last name is required"),
    check("Email").isEmail().withMessage("Invalid email address"),
    check("Password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ];
};

// // User logout
// exports.logoutUser = async (req, res) => {
//   res.json({ message: "Logout successful" });
// };

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Get user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Create a new user
exports.createUser = async (req, res) => {
  const errors = validationResult(req); // Check for validation errors
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { UserID, FirstName, LastName, Email, Password, PhoneNumber } =
    req.body;
  try {
    const user = await User.create({
      UserID,
      FirstName,
      LastName,
      Email,
      Password,
      PhoneNumber,
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Update user by ID
exports.updateUserById = async (req, res) => {
  const userId = req.params.id;
  const { FirstName, LastName, Email, Password, PhoneNumber } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.update({ FirstName, LastName, Email, Password, PhoneNumber });
    res.json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// Delete user by ID
exports.deleteUserById = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
