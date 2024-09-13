const express = require('express');
const { testMiddleware } = require('../middlewares/testController');
const auth = require('../middlewares/auth');

let Router = express.Router()

Router.get('/home',auth,testMiddleware)


module.exports = Router