let categorySchema = require("../model/categoryModel")

let createCategory = async (req, res) => {
    try {
        let values = req.body
        console.log(values);
        if (!values.title || !values.imgUrl) {
            return res.status(404).send({
                success: false,
                message: "title and img of food is required"
            })
        } 

        let foods = await categorySchema.create({ ...values })
        foods.save()
        return res.status(201).send({
            success: true,
            message: "category created successfullt", foods
        })
    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }

}


module.exports = { createCategory }