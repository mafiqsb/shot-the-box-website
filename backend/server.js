const express = require('express');
const cors = require('cors');
const path = require('path');
const imageRouter = require('./Routes/imageRoutes.js');
const seedRouter = require('./Routes/seedRoutes.js');
const uploadRouter = require('./Routes/uploadRoutes.js');
const userRouter = require('./Routes/userRoutes.js');
const dotenv = require('dotenv');
const emailnotifyRouter = require('./Routes/emailnotifyRoutes.js');
const app = express();
const { Sequelize } = require('sequelize');

dotenv.config();

try {
  if (process.env.NODE_ENV === 'production') {
    const sequelize = new Sequelize(process.env.DATABASE_URL, {
      port: 5432,
      database: 'stb_database_00s5',
      username: 'mafiqsb',
      password: '3rblukLeDWUmNIHxBJJxngf0RNCyGpDU',
      host: 'dpg-cnfaf0icn0vc73e6os00-a',
      dialect: 'postgres',
      dialectOptions: {
        app: 'psql',
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
      keepAlive: true, // Enable keep-alive
      ssl: true,
      logging: (msg) => console.log('[sequelize]', msg),
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
      },
    });

    // Test the database connection
    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully.');

        // Additional logging for query execution
        sequelize
          .query('SELECT 1+1 AS result')
          .then(([results]) => {
            console.log('Query result:', results);
          })
          .catch((error) => {
            console.error('Error executing query:', error);
          });
      })
      .catch((error) => {
        console.error('Unable to connect to the database:', error);
      });
  }
} catch (error) {
  console.error('Error connecting to the database:', error.message);
}

// Serve frontend on /frontend route

app.use('/frontend', express.static(path.join(__dirname, './build')));
app.get('/frontend/*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
    console.log('successful join');
  } catch (err) {
    res.status(404).send({ message: 'error : ' + err });
    console.log({ message: 'error : ' + err });
  }
});

// Serve admin on /admin route
app.use('/admin', express.static(path.join(__dirname, './build')));
app.get('/admin/*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, '../admin/build', 'index.html'));
    console.log('successful join');
  } catch (err) {
    res.status(404).send({ message: 'error : ' + err });
    console.log({ message: 'error : ' + err });
  }
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/dataImages', imageRouter);
app.use('/api/seed', seedRouter);
app.use('/api/upload', uploadRouter);
app.use('/api/user', userRouter);
app.use('/api/emailnotify', emailnotifyRouter);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`server at http://:${port}`);
});
