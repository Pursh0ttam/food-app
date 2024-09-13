const userModel = require("../model/userModel")


let getusercontroller = async (req, res) => {
    try {
        let id = req.body.id
        let userVAlue = await userModel.findById(id)
        if (!userVAlue) {
            res.status(400).send("user not found")
        }
        userVAlue.password = undefined
        res.status(200).send({
            success: true,
            message: "user founded successfully",
            userVAlue
        })


    } catch (error) {
        res.status(500).send({
            success: true,
            message: "error in get user Api",
            error
        })
    }
}

let updateUser = async (req, res) => {
    try {
        let user = await userModel.findById({ _id: req.body.id })
        if (!user) {
            res.status(404).send({
                success: false, message: "user not found"
            })
        }
        let {userName,address,phone} = req.body
        if(userName)user.userName = userName
        if(address)user.address = address
        if(phone)user.address = phone
        await user.save()
        res.status(201).send({
            success:true,
            message:"user updated",
            user
            
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: "error is update api",
            error
        })
    }
}

module.exports = { getusercontroller, updateUser }