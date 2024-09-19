const { Schema, default: mongoose } = require("mongoose");


let OrdersSchema = new Schema({
    foods: [{ type: mongoose.Schema.Types.ObjectId, ref: "foods" }],
    payment: {},
    buyer: {
        type: mongoose.Schema.Types.ObjectId, ref: "User"
    },
    status: {
        type: String,
        enum: ["prepraing", "prepare", "on the way", "delivired"],
        default: "on the way"
    }


}, { timestamps: true });

module.exports = mongoose.model("Orders", OrdersSchema)