const User = require("../models/user");

exports.getUserById = (req, res, next, id) => {
    User.findById(id).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "User not found in DB",
            });
        }
        req.user = user;
        next();
    });
};

exports.getUser = (req, res) => {
    // TODO: get back here for password
    // removing login credential
    req.user.salt = undefined;
    req.user.encrypt_password = undefined;
    req.user.createdAt = undefined;
    req.user.updatedAt = undefined;

    return res.json(req.user);
};

exports.getAllUsers = (req, res) => {
    User.find().exec((err, users) => {
        if (err || !users) {
            return res.status(400).json({
                error: "Error DB, No user",
            });
        }
        return res.json(users);
    });
};

exports.updateUser = (req, res) => {
    User.findByIdAndUpdate({
            _id: req.user._id,
        }, {
            $set: req.body,
        }, {
            new: true,
            useFindAndModify: false,
        },
        (err, user) => {
            // err is received when _id not found so only err check is also enough
            if (err || !user) {
                return res.status(400).json({
                    error: "You dont have Authority to UPDATE",
                });
            }
            user.salt = undefined;
            user.encrypt_password = undefined;
            user.createdAt = undefined;
            user.updatedAt = undefined;
            res.json(user);
        }
    );
};

