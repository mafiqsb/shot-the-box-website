const cloudinary = require('cloudinary').v2;
const streamifier = require('streamifier');

const upload_image_cover = async (req, res) => {
  cloudinary.config({
    cloud_name: 'dnfxw6yf4',
    api_key: '437984696696811',
    api_secret: 'xr2Ak1cS25TnXAvY0vXHgj2hRJQ',
  });
  const streamUpload = (req) => {
    return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream((error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      });
      streamifier.createReadStream(req.file.buffer).pipe(stream);
    });
  };
  const result = await streamUpload(req);
  res.send(result);
};

const upload_images = async (req, res) => {
  try {
    cloudinary.config({
      cloud_name: 'dnfxw6yf4',
      api_key: '437984696696811',
      api_secret: 'xr2Ak1cS25TnXAvY0vXHgj2hRJQ',
    });

    const streamUpload = (file) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
          if (result) {
            console.log('Cloudinary Upload Result:', result);
            resolve(result);
          } else {
            console.error('Cloudinary Upload Error:', error);
            reject(error);
          }
        });

        streamifier.createReadStream(file.buffer).pipe(stream);
      });
    };

    const uploadPromises = req.files.map(async (file) => {
      return await streamUpload(file);
    });

    const results = await Promise.all(uploadPromises);

    console.log(results);
    res.status(200).json(results);
  } catch (error) {
    console.error('Server Error:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = { upload_image_cover, upload_images };
