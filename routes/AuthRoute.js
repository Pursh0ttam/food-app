const express = require('express');
const auth = require('../middlewares/auth');
const {registrationController,loginController }= require('../controller/registrationController');
const { getusercontroller, updateUser } = require('../controller/getuserController');

let Router = express.Router()

Router.post('/userregister',registrationController)
Router.post('/userlogin',loginController)
Router.get('/getAlluser',auth,getusercontroller)
Router.put('/updateUser',auth,updateUser)



module.exports = Router