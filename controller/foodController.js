

const foodsSchema = require("../model/foodsModel")
const OrdersSchema = require("../model/OderModel")

const createFoodController = async (req, res) => {
    try {
        let foods = req.body
        console.log(foods);
        if (!foods.title || !foods.price) {
            return res.status(400).send({
                success: false,
                message: "Title and price are required"
            })
        }
        await foodsSchema.create(foods)
        res.status(201).send({
            success: true,
            message: "food added successfully",
            foods
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        })
    }
}
const getAllFoodController = async (req, res) => {
    try {
        let values = await foodsSchema.find({})
        if (!values) {
            return res.status(404).send({
                success: false,
                message: "no user found"
            })
        }
        return res.status(200).send({
            success: true,
            message: "items are founds",
            items: values.length,
            values
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        })
    }
}
const getOneFoodController = async (req, res) => {
    try {

        let values = await foodsSchema.findById(req.params.id)
        if (!values) {
            return res.status(404).send({
                success: false,
                message: "no user found of these id"
            })
        }
        await values.save()
        return res.status(200).send({
            success: true,
            message: "items are founds",

            values
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        })
    }
}
const getFoodByResturantController = async (req, res) => {
    try {
        let resturantId = req.params.id
        if (!resturantId) {
            return res.status(404).send({
                success: false,
                message: "no user found of these id"
            })

        }
        let food = await foodsSchema.find({ resturent: resturantId })
        console.log(food);
        if (!food) {
            return res.status(404).send({
                success: false,
                message: "no user found of these id"
            })
        }

        return res.status(200).send({
            success: true,
            message: "items are founds",
            food
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message,
            error
        })
    }
}
const UpdatefoodController = async (req, res) => {
    try {

        // let { title, description, price, ImgUrl, foodTag, isAvailable, resturen, ratings } = req.body

        // let values = await foodsSchema.findByIdAndUpdate(req.params.id, {
        //     title,
        //     description,
        //     price,
        //     ImgUrl,
        //     foodTag,
        //     isAvailable,
        //     resturen,
        //     ratings
        // }, { new: true })

        ///^ Another method
        let items = req.body

        let values = await foodsSchema.findByIdAndUpdate(req.params.id, items, { new: true })
        if (!values) {
            return res.status(404).send({
                success: false,
                message: "no user found of these id"
            })
        }
        await values.save()
        return res.status(200).send({
            success: true,
            message: "items are founds",
            values
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message

        })
    }
}
const deletefoodController = async (req, res) => {
    try {

        const itemsId = req.params.id
        if (!itemsId) {
            res.status(404).send({
                success: false,
                message: "please provide id of resturent"
            })
        }
        let values = await foodsSchema.findByIdAndDelete(itemsId)
        if (!values) {
            return res.status(404).send({
                success: false,
                message: "no item found of these id"
            })
        }

        return res.status(200).send({
            success: true,
            message: "item deleted successfully",
            values
        })


    } catch (error) {
        res.status(500).send({
            success: false,
            message: error

        })
    }
}

// ^place order

const placeOrderController = async (req, res) => {
    try {
        let { cart } = req.body
        console.log("this is from order", cart);
        if (!cart) {
            return res.status(500).send({
                success: false,
                message: "please provide cart or payment"
            })
        }
        let totalAmountotal = 0;
        cart.map((item) => {
            totalAmountotal += item.price
        })

        let newOrder = new OrdersSchema({
            foods: cart,
            payment: totalAmountotal,
            buyer: req.body.id
        })

        await newOrder.save()
        return res.status(200).send({
            success: true,
            message: "order placed successfully", newOrder
        })
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }

}

//order status Controller

let orderStatusController = async (req, res) => {
    try {
        let orderId = req.params.id
        let { status } = req.body
        console.log("these are two",orderId,status);
        if (!orderId) {
            return res.status(500).send({
                success: false,
                message: "please provide orderID"
            })
        }

        let fetchedVal = await OrdersSchema.findByIdAndUpdate(orderId,{status},{new:true})
        if(!fetchedVal){
            return res.status(404).send({
                success: false,
                message: "No item of this orderID"
            })
        }
        await fetchedVal.save()
        return res.status(200).send({
            success:true,
            message:"status changed successfully"
        })

    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        })
    }



}

module.exports = {
    createFoodController, getAllFoodController, getOneFoodController,
    UpdatefoodController, deletefoodController, getFoodByResturantController, 
    placeOrderController, orderStatusController
}