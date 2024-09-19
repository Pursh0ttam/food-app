const express = require('express');

const { createResto, getAllresturent, getresturentById, deleteresturent } = require('../controller/resturentMiddleware');
const auth = require('../middlewares/auth');
const { createCategory, getAllfoods, updateItems, deleteItems } = require('../controller/CategoryController');


let resturentRoute = express.Router()
resturentRoute.post('/create', auth, createResto)
resturentRoute.get('/getAllresturent', getAllresturent)
resturentRoute.get('/getresturentByID/:id', getresturentById)
//^delete resturent
resturentRoute.delete('/deleteresturent/:id', auth, deleteresturent)

//& category routes
//add a food a route
resturentRoute.post('/createCategory', createCategory)
//get all foods
resturentRoute.get("/getAllfoods", getAllfoods)
//update category
resturentRoute.patch("/updateitems/:id", updateItems)
//delete category
resturentRoute.delete('/deleteCategory/:id', deleteItems)


//admin Route





module.exports = resturentRoute