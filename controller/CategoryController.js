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

const getAllfoods = async (req, res) => {
    try {
        let values = await categorySchema.find({})
        if (!values) {
            return res.status(404).send({
                success: false,
                message: "No items found"
            })
        }
        res.status(200).send({
            success: true,
            message: "all items fetched",
            total_items: values.length,
            values
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}


const updateItems = async (req, res) => {
    try {

        let { title } = req.body
        let value = await categorySchema.findById(req.params.id)

        if (!value) {
            return res.status(404).send({
                success: false,
                message: "no item of this id exits"
            })
        }
        value.title = title
        console.log("this is value", value);
        await value.save()
        return res.status(200).send({
            success: true,
            message: "Name changed successfully",
            value
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }
}

const deleteItems = async (req, res) => {
    try {
        let deletedItem = await categorySchema.findByIdAndDelete(req.params.id)
        if (!deletedItem) {
            return res.status(404).send({
                success: false,
                message: "No items of this id exists"
            })
        }
        return res.status(200).send({
            success: true,
            message: "item successfully deleted",
            deletedItem
        })

    } catch (error) {
        return res.status(500).send({
            success: false,
            message: error.message
        })
    }

}

module.exports = { createCategory, getAllfoods, updateItems, deleteItems }