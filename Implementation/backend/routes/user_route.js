const express = require("express");
const router = express.Router();
const {
  loginUser,
  //logoutUser,
  createUser,
  createUserValidationRules,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} = require("../controllers/user_controller");
const { check } = require("express-validator");

// Validation rules for creating a new user
router.post("/register", createUserValidationRules(), createUser);

// User login
router.post(
  "/login",
  [
    check("Email").isEmail().withMessage("Invalid email address"),
    check("Password").notEmpty().withMessage("Password is required"),
  ],
  loginUser
);

// User logout
// router.post("/logout", logoutUser);

// User routes
router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

module.exports = router;
