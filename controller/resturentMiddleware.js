const resturentModel = require("../model/resturantSchema")


const createResto = async (req, res) => {
    try {
        // const { title, imgUrl, foods, time, pickUp, delivery, isOpen, logUrl, rating, ratingCount, code, coords } = req.body
        let values = req.body
        if (!values.title || !values.coords) {
            return res.status(500).send({
                success: false,
                message: "title and coodrs are mendatory"
            })
        }
        let newResturent = new resturentModel({ ...values })
        await newResturent.save()
        res.status(201).send({
            success: true,
            message: "new user created successfully"
        })
    } catch (error) {
        return res.status(500).send({
            success: true,
            message: error.message
        })
    }

}

const getAllresturent = async (req, res) => {
    try {

        let resturents = await resturentModel.find({})
        if (!resturents) {
            return res.send({
                success: false,
                message: "no resturents found"
            })
        }
        return res.status(200).send({
            success: true,
            TotalCount: resturents.length,
            resturents
        })
    } catch (error) {
        return res.status(500).send({
            success: true,
            message: error.message
        })
    }
}

const getResturentById = async (req, res) => {
    console.log(req.params.id);
    try {
        let restroId = req.params.id
        if (!restroId) {
            return res.status(404).send({
                success: false,
                message: "please provide resturent id"
            })
        }
        let resturent = await resturentModel.findById(restroId)
        if (!resturent) {
            return res.status(500).send({
                success: false,
                message: "no resturents found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "Resturent founded", resturent
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const deleteResturent = async (req, res) => {
    try {
        let restroId = req.params.id
        if (!restroId) {
            res.status(404).send({
                success: false,
                message: "please provide id of resturent"
            })
        }

        let resturent = await resturentModel.findByIdAndDelete(restroId)
        if (!resturent) {
            return res.status(404).send({
                success: false,
                message: "resturent not deleted due to wrong resturent id"
            })
        }
        
        return res.status(200).send({
            success: true,
            message: "restro deleted successfully",
            resturent
        })

    } catch (error) {
        return res.status(500).send({
            success: true,
            message: error.message,

        })
    }

}



module.exports = { createResto, getAllresturent, getResturentById, deleteResturent }