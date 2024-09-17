const express = require('express');
const auth = require('../middlewares/auth');
const {registrationController,loginController }= require('../controller/registrationController');
const { getusercontroller, updateUser,resetpassword, deleteUser  } = require('../controller/getuserController');
// const { resetpassword } = require('../controller/resetpassword');
const updatepasword = require('../controller/updatepassword');

let Router = express.Router()

Router.post('/userregister',registrationController)
Router.post('/userlogin',loginController)
Router.get('/getAlluser',auth,getusercontroller)
Router.put('/updateUser',auth,updateUser)
Router.post('/resetpassword',auth,resetpassword)
Router.post('/updatepassword',auth,updatepasword)
Router.delete('/deleteUser/:id',auth,deleteUser)




module.exports = Router