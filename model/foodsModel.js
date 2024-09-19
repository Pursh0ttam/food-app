const { default: mongoose } = require("mongoose");


let foodsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "title of food is required"]
    },
    description: {
        type: String,
        required: [true, "description is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    },
    ImgUrl: {
        type: String,

    },
    foodTags: {
        type: String,
    },
    Category: {
        type: String,
    },
    code: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
    },
    resturent: {
        type: String,
    },
    resturent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "resturent"
    },
    ratings: {
        type: Number,
        default: 5,
        min: 1,
        max: 5
    },
    ratingCount: {
        type: Number
    }


}, { timestamps: true })

module.exports = mongoose.model('food', foodsSchema)