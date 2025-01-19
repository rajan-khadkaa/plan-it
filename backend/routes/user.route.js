const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller.js");
const authenticate = require("../middleware/authenticate.js");

// router.get("/", userController.getAllUsers);
// router.post("/register", userController.registerUser);
router.post("/login", userController.addUser);
router.post("/protected-route", userController.userProtectedRoutes);
router.post("/logout", userController.logoutUser);
router.get("/profile-info", authenticate, userController.getProfileInfo);

module.exports = router;
