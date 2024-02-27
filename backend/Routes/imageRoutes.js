const express = require('express');

const imageRouter = express.Router();

const imageController = require('../Controller/imageController.js');
const { isAuth } = require('../Utils.js');

imageRouter.get('/', imageController.homeScreenImages);

imageRouter.post('/createalbum', imageController.createAlbum);

imageRouter.get('/datahistory', isAuth, imageController.albumHistory);

imageRouter.delete(`/:id`, imageController.deleteAlbum);

imageRouter.get(`/:slug`, imageController.pageScreenImages);

imageRouter.put('/:id', imageController.editAlbum);

module.exports = imageRouter;
