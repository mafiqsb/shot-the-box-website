const { client } = require('../databasepg.js');
const data = require('../data.js');

const upload_images_seed = async (req, res) => {
  try {
    for (const imageDetail of data.imageDetails) {
      console.log('Inserting data for:', imageDetail);
      const names = imageDetail.names;
      const images = imageDetail.images;
      const slug = imageDetail.slug;
      const descriptions = imageDetail.descriptions;
      const moreImages = imageDetail.moreImages;
      const values = [names, images, slug, descriptions, moreImages];
      const query = `INSERT INTO imagedetails (names, images, slug, descriptions, moreImages) VALUES ($1, $2, $3, $4, $5)`;

      await client.query(query, values);
      // client.end();
      res.status(200).json({ message: 'Data inserted successfully' });
    }
  } catch (err) {
    // console.error('Error:', err.message);
    res.status(500).json({ message: 'Internal server error' });
  }
  //   // Close the database connection after all queries are executed
  //   client.end();
};

module.exports = { upload_images_seed };
