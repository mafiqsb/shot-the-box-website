const express = require('express');
const userController = require('../Controller/userController.js');
const userRouter = express.Router();

userRouter.post('/signup', userController.user_signup);
userRouter.post('/signin', userController.user_signin);

module.exports = userRouter;
