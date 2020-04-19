const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    slug: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    rank:{
        type:Number,
        default:1,
    },
    status: {
        type: Boolean,
        default: true,
    },
    menu: {
        type: Boolean,
        default: false,
    },
    
}, {
    timestamps: true
});


module.exports = mongoose.model("Category", categorySchema)