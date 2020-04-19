const express = require("express");
const router = express.Router();

const {getUserById, getUser, getAllUsers, updateUser, } = require("../controllers/user");
const {isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");

// PARAMS
router.param("userId", getUserById);

// ACTUAL ROUTES are here!!
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.get("/users/", getAllUsers);

module.exports = router;