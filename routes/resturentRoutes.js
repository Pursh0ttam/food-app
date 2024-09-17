const express = require('express');

const { createResto, getAllresturent, getResturentById, deleteResturent } = require('../controller/resturentMiddleware');
const auth = require('../middlewares/auth');
const { createCategory } = require('../controller/CategoryController');


let resturentRoute = express.Router()
resturentRoute.post('/create', auth, createResto)
resturentRoute.get('/getAllResturent', getAllresturent)
resturentRoute.get('/getResturentByID/:id', getResturentById)
//^delete resturent
resturentRoute.delete('/deleteResturent/:id',auth, deleteResturent)

// category routes

resturentRoute.post('/createCategory',createCategory)




module.exports = resturentRoute