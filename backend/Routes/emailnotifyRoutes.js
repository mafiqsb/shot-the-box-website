const express = require('express');
const emailnotifyController = require('../Controller/emailnotifyController.js');

const emailnotifyRouter = express.Router();

emailnotifyRouter.post('/', emailnotifyController.email_notify);
emailnotifyRouter.get('/subscriberlist', emailnotifyController.email_list);

module.exports = emailnotifyRouter;
