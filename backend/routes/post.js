const express = require("express");
const router = express.Router();

const {
    getPostById,
    createPost,
    getPost,
    photo,
    removePost,
    updatePost,
    getAllPosts,
    getAllUniqueCategories
} = require("../controllers/post");
const {
    isSignedIn,
    isAdmin,
    isAuthenticated
} = require("../controllers/auth");
const {
    getUserById
} = require("../controllers/user");

// PARAMS
router.param("userId", getUserById);
router.param("postId", getPostById);
// ACTUAL ROUTES are here!!
router.post("/post/create/:userId", isSignedIn, isAuthenticated, isAdmin, createPost);

router.get("/post/:postId", getPost);
router.get("/posts", getAllPosts)

//  MIDDLEWARE
// router.get("/post/photo/:postId", photo);

// router.put(
//     "/post/:postId/:userId",
//     isSignedIn, isAdmin, isAuthenticated,
//     updatePost
// );

// router.delete(
//     "/post/:postId/:userId",
//     isSignedIn, isAdmin, isAuthenticated,
//     removePost
// );
// // listing route
// router.get("/posts", getAllPosts);

// router.get("/posts/categories", getAllUniqueCategories);

module.exports = router;