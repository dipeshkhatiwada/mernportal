const Post = require("../models/post");
// const formidable = require("formidable");
// const _ = require("lodash");
// const fs = require("fs");

exports.getPostById = (req, res, next, id) => {
    Post.findById(id)
        .populate("category")
        .exec((err, post) => {
            if (err) {
                return res.status(400).json({
                    error: "Post not found"
                });
            }
            req.post = post
            next();

        })
};

exports.createPost = (req, res)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('Photo is required.');
    }
    // The name of the input field (i.e. "photo") is used to retrieve the uploaded file
    let photo = req.files.photo;
    // Use the mv() method to place the file somewhere on your server
    photo.mv('./uploads/'+photo.name, function(err) {
        if (err){
            return res.status(500).send(err);
        }
    });
    Post.create({
        ...req.body,
        photo: `/uploads/${photo.name}`//this code is what I get in the database photo
    }, (err, post) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json({
            post
        });
    }); 
};

exports.getPost = (req, res) => {
    // req.post.photo = undefined;
    return res.json(req.post);
};
exports.getAllPost = (req, res) => {
    Post.find()
    .populate("category")
    .exec((err, posts) => {
        if (err) {
            return res.status(400).json({
                error: "Error DB, No Category",
            });
        }
        return res.json(posts);
    });
};

// MIDDLEWARE
// exports.photo = (req, res, next) => {
//     if (req.post.photo.data) {
//         res.set("Content-Type", req.post.photo.contentType);
//         return res.send(req.post.photo.data);
//     }
//     next();
// };

exports.updatePost = (req, res) => {
    let form = formidable.IncomingForm();
    form.keepExtension = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            res.status(400).json({
                error: "problem with image"
            })
        }

        // updation code
        let post = req.post;
        post = _.extend(post, fields)

        // handling file!!
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "file size is big"
                });
            }
            post.photo.data = fs.readFileSync(file.photo.path)
            post.photo.contentType = file.photo.type
        }

        // save to DB
        post.save((err, post) => {
            if (err) {
                res.status(400).json({
                    error: "Post updated Failed"
                });
            }
            res.json(post);
        })
    });
};

exports.removePost = (req, res) => {
    let post = req.post;
    post.remove((err, deletedPost) => {
        if (err) {
            return res.status(400).json({
                error: "Post failed to delete",
            });
        }
        return res.json({
            message: "Successfully deleted",
            deletedPost
        })
    })

};

// LISTING ROUTES
exports.getAllPosts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Post.find()
        .select("-photo")
        .populate("catregory")
        .sort([
            [sortBy, "asc"]
        ])
        .limit(limit)
        .exec((err, posts) => {
            if (err) {
                return res.status(400).json({
                    error: "Post not fount in DB",
                });
            }
            res.json(posts)
        })
}

exports.getAllUniqueCategories = (req, res) => {
    Post.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not fount in DB",
            });
        }
        res.json(category);
    })
}

// MIDDLEWARE
exports.updateStock = (req, res, next) => {
    // map() helps in LOOPING
    let myOperations = req.body.order.posts.map(prod => {
        return {
            updateOne: {
                filter: {
                    _id: prod._id
                },
                update: {
                    $inc: {
                        stock: -prod.count,
                        sold: +prod.count
                    }
                }
            }
        }
    })

    Post.bulkWrite(myOperations, {}, (err, posts) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed"
            })
        }
        next();
    })
};