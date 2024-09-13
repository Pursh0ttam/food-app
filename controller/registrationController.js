const { token } = require("morgan");
const userModel = require("../model/userModel");
const dcryption = require("../passwordprotect/dcryption");
const encryption = require("../passwordprotect/encryption");
let bcrypt = require('bcryptjs')
let JWT = require('jsonwebtoken')




let registrationController = async (req, res) => {
    console.log(req.body);
    try {
        let { userName, password, Email, address, phone } = req.body
        if (!userName || !password || !Email || !address || !phone) {
            return res.status(500).send("All inpuput fileds are required")
        }
        //check user

        const existing = await userModel.findOne({ Email })
        if (existing) {
            res.status(500).send("email already taken please login")
        }
        //^one method to hash passowrd
        // req.body.password = await encryption(password)

        //^2nd method password
        let salt = bcrypt.genSaltSync(8)
        let hashpassword = await bcrypt.hash(password, salt)
        req.body.password = hashpassword

        let user = await userModel.create(req.body)
        return res.status(200).send({
            status: true,
            message: "Registration successfull",
            user
        })
    } catch (error) {
        res.status(500).send({ error: true, message: error.message })
    }

}


let loginController = async (req, res) => {
    let { Email, password } = req.body
    if (!Email || !password) {
        return res.status(500).send("Email,password is required")
    }
    let Userdata = await userModel.findOne({ Email })
    if (!Userdata) {
        return res.status(404).send({
            success: false,
            message: "user not found"
        })
    }

    let hashpassword = Userdata.password
    //^dcryption one way
    // let valid = await dcryption(password, hashpassword)

    //^2nd way dcryption
    let valid = bcrypt.compare(password, hashpassword)

    if (!valid) {
        return res.status(500).send({
            success: false,
            message: "invalid login creadentials"
        })
    }
    //^ token creation
    let token = JWT.sign({id:Userdata._id},process.env.JWT_SECRET,{expiresIn:'1h'})

    Userdata.password = undefined
    res.status(200).send({
        success: true,
        message: "login succesfull",token, Userdata,
    })


}
module.exports = { registrationController, loginController }