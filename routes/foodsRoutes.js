const { createFoodController, getAllFoodController, getOneFoodController, UpdatefoodController,
    deletefoodController, getFoodByResturantController, placeOrderController, 
    orderStatusController} = require('../controller/foodController');
const adminMiddleware = require('../middlewares/AdminMiddleware');
const auth = require('../middlewares/auth');


const express = require('express');

let foodRoutes = express.Router()

foodRoutes.post("/create", createFoodController)
foodRoutes.get("/getAllUser", getAllFoodController)
foodRoutes.get("/getOnefood/:id", getOneFoodController)
foodRoutes.get("/getfoodByResturent/:id", getFoodByResturantController)
foodRoutes.patch("/Updatefood/:id", UpdatefoodController)
foodRoutes.delete("/deletefood/:id", deletefoodController)

//& Orders routes

//ChangeStatus of Order
foodRoutes.post("/ChangeStatus/:id",auth,adminMiddleware,orderStatusController)



module.exports = foodRoutes