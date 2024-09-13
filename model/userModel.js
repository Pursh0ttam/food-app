const { default: mongoose } = require("mongoose");


let userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"userName is required"]
    },
    Email:{
        type:String,
        required:[true,"Email is required"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Email is required"],
    },
    address:{
        type:Array
    },
    phone:{
        type:Number,
        required:[true,"Mobile number is required"],
        unique:true
    },
    userType:{
        type:String,
        required:[true,"userType is required"],
        default:'client',
        enum:['client','driver','admin','vendor']
    },
    profile:{
        type:String,
        default:'../images/profile.jpg'
    }
},{timestamps:true})

module.exports = mongoose.model('User',userSchema)