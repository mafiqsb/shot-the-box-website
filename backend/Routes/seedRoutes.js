const express = require('express');
const seedController = require('../Controller/seedController.js');

const seedRouter = express.Router();

seedRouter.post('/', seedController.upload_images_seed);

module.exports = seedRouter;
