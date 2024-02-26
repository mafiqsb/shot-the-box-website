const pkg = require('pg');
const { Pool } = pkg;

const client = new Pool({
  host: 'localhost',
  // user: 'postgres',
  port: '5432',
  password: '5253',
  database: 'dummydataimages',
});

client
  .connect()
  .then(() => {
    console.log('Connected to DB');
  })
  .catch((err) => {
    console.error('Error executing the query:', err.message);
  });

module.exports = { client };
