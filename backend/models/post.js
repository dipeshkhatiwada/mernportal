const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;


const postSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxlength:100,
        },
        slug:{
            type:String,
            trim:true,
            required:true,
            maxlength:100,
        },
        photo:{
            type:String,
        },
        rank:{
            type:Number,
            default:1,
        },
        description:{
            type:String,
            trim:true,
            required:true,
            maxlength:1500,
        },
        view_count:{
            type:Number,
            default:0,
        },
        category:{
            type:ObjectId,
            ref:"Category"
        },
        status: {
            type: Boolean,
            default: true,
        },
        main: {
            type: Boolean,
            default: true,
        },
        
    },
    {timestamps:true}
);


module.exports = mongoose.model("Post",postSchema)