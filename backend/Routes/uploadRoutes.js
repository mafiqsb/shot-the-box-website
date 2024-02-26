const express = require('express');
const multer = require('multer');
const uploadController = require('../Controller/uploadController.js');

const upload = multer();

const uploadRouter = express.Router();

uploadRouter.post(
  '/imgcover',
  upload.single('file'),
  uploadController.upload_image_cover
);

uploadRouter.post('/', upload.array('file'), uploadController.upload_images);

module.exports = uploadRouter;
