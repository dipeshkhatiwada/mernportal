const Category = require("../models/category")

exports.getCategorybyId = (req, res, next, id) => {

    Category.findById(id).exec((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category not found"
            });
        }
        req.category = category;
        next();

    })

}


exports.createCategory = (req, res) => {
    const category = new Category(req.body);
    category.save((err, category) => {
        if (err) {
            return res.status(400).json(err);
        }
        res.json({
            category
        });
    })
}

exports.getCategory = (req, res) => {
    return res.json(req.category);
};

exports.getAllCategory = (req, res) => {
    Category.find().exec((err, categories) => {
        if (err) {
            return res.status(400).json({
                error: "Error DB, No Category",
            });
        }
        return res.json(categories);
    });
};

exports.updateCategory = (req, res) => {
    const category = req.category;
    category.title = req.body.title;
    console.log("CAT",category);

    category.save((err, updatedCategory) => {
        if (err) {
            return res.status(400).json({
                error: "Category update failed",
            });
        }
        return res.json(updatedCategory);
    })
};

exports.removeCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if (err) {
            return res.status(400).json({
                error: "Category failed to delete",
            });
        }
        return res.json({
            message: "Successfully deleted"
        })
    })

};