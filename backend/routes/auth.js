var express = require('express');
var router = express.Router();
const {check, validationResult } = require('express-validator');
const { signout, signup, signin, isSignedIn } = require("../controllers/auth");
// ACTUAL ROUTES are here!! with validation
// regster
router.post(
    "/signup",
    [ 
        check("name", "Name must be of 3 at leastchatarater").isLength({min: 3}),
        check("email", "Email is required").isEmail(),
        check("password", "Password must be of 3 at leastchatarater").isLength({min: 3}),
    ],
    signup
);
// login
router.post(
    "/signin",
    [
        check("email", "Email is required").isEmail(),
        check("password", "Password field is required").isLength({min: 2}),
    ],
    signin
);
// logout
router.get("/signout", signout)

// TESTING
router.get("/testroute", isSignedIn, (req, res) => {
    res.json(req.auth);
});

module.exports = router;