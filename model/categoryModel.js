const { Schema, default: mongoose } = require("mongoose");


let categorySchema = new Schema({
    title:{
        type:String,
        required:[true,"title of food is required"]
    },
    imgUrl:{
        type:String,
        required:[true,"img url is required"],
        default:"../images/foodImage.jpg"
    }

}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema)