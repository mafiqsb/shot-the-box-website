const { client } = require('../databasepg.js');

const home_screen_images = async (req, res) => {
  try {
    const queries = `SELECT * FROM imagedetails `;
    const result = await client.query(queries);

    res.send(result.rows).status(200);
  } catch (err) {
    res.send({ message: 'data not get' }).status(401);
    console.log(err.message);
  }
};

const create_album = async (req, res) => {
  try {
    const names = req.body.names;
    const images = req.body.images;
    const slug = req.body.slug;
    const descriptions = req.body.descriptions;
    const moreImages = req.body.moreImages;
    const confirmImages = req.body.confirmImages;

    const values = [
      names,
      images,
      slug,
      descriptions,
      moreImages,
      confirmImages,
    ];

    const query =
      'INSERT INTO imagedetails(names, images, slug, descriptions, moreImages, confirmImages) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';

    const result = await client.query(query, values);

    // Assuming the result.rows contain the inserted data
    res
      .status(200)
      .send({ message: 'Album successfully created', datas: result.rows });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Failed to create album' });
  }
};

const album_history = async (req, res) => {
  const PAGE_SIZE = 4;
  const { query } = req;

  const page = query.page || 1;
  const pageSize = query.pageSize || PAGE_SIZE;

  try {
    const queries = `SELECT COUNT(*) FROM imagedetails `;
    const allData = await client.query(queries);
    const totalRows = allData.rows[0].count;

    // Get paginated data
    const dataQuery = `SELECT * FROM imagedetails OFFSET $1 LIMIT $2`;
    const dataImages = await client.query(dataQuery, [
      pageSize * (page - 1),
      pageSize,
    ]);

    res
      .send({
        dataImages: dataImages.rows,
        page,
        pages: Math.ceil(totalRows / PAGE_SIZE),
      })
      .status(200);
  } catch (err) {
    res.send({ message: 'data not retrieved' }).status(401);
    console.log(err.message);
  }
};

const delete_album = async (req, res) => {
  try {
    const id = req.params.id;

    // First, retrieve the record you want to delete
    const selectQuery = {
      text: `SELECT * FROM imagedetails WHERE id = $1`,
      values: [id],
    };

    const result = await client.query(selectQuery);

    // Check if the record exists
    if (result.rows.length === 0) {
      res.status(404).send({ message: 'Record not found' });
      return;
    }

    // If the record exists, proceed with the delete operation
    const deleteQuery = {
      text: `DELETE FROM imagedetails WHERE id = $1`,
      values: [id],
    };

    await client.query(deleteQuery);

    res.status(200).send({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: 'Unable to delete the record' });
  }
};

const page_screen_images = async (req, res) => {
  try {
    const slug = req.params.slug;

    const query = {
      text: 'SELECT * FROM imagedetails WHERE slug = $1',
      values: [slug],
    };

    const result = await client.query(query);

    if (result.rows.length > 0) {
      res.json(result.rows);
    } else {
      res.status(404).json({ message: 'image not found' });
    }
  } catch (err) {
    res.send({ message: 'data not get' }).status(500);
    console.log(err.message);
  }
};

const edit_album = async (req, res) => {
  try {
    const id = req.params.id;
    const names = req.body.names;
    const images = req.body.images;
    const slug = req.body.slug;
    const descriptions = req.body.descriptions;
    const confirmimages = req.body.confirmimages;

    const query = {
      text: 'UPDATE imagedetails SET names = $1, images = $2, slug = $3, descriptions = $4, confirmimages = $5 WHERE id = $6',
      values: [names, images, slug, descriptions, confirmimages, id],
    };

    const result = await client.query(query);

    if (result.rowCount > 0) {
      res.json({ message: 'Image updated successfully' });
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  home_screen_images,
  page_screen_images,
  create_album,
  album_history,
  delete_album,
  edit_album,
};
