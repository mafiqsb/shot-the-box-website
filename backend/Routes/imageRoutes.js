const express = require('express');

const imageRouter = express.Router();

const imageController = require('../Controller/imageController.js');
const { isAuth } = require('../Utils.js');

imageRouter.get('/', imageController.home_screen_images);

imageRouter.post('/createalbum', imageController.create_album);

imageRouter.get('/datahistory', isAuth, imageController.album_history);

imageRouter.delete(`/:id`, isAuth, imageController.delete_album);

imageRouter.get(`/:slug`, imageController.page_screen_images);

imageRouter.put('/:id', isAuth, imageController.edit_album);

module.exports = imageRouter;
