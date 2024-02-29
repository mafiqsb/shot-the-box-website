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
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    port: 5432,
    database: 'stb_database_00s5',
    username: 'mafiqsb',
    password: '3rblukLeDWUmNIHxBJJxngf0RNCyGpDU',
    host: 'dpg-cnfaf0icn0vc73e6os00-a',
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: (msg) => console.log('[sequelize]', msg),
  });
  // Test the database connection
  sequelize.authenticate();
} catch (error) {
  // If there's an error, send an error response
  console.error('Error connecting to the database:', error.message);
}

// Serve frontend on /frontend route
app.use('/frontend', express.static(path.join(__dirname, 'frontend', 'build')));
app.get('/frontend/*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
  } catch (err) {
    res.status(404).send({ message: 'error : ' + err });
  }
});

// Serve admin on /admin route
app.use('/admin', express.static(path.join(__dirname, 'admin', 'build')));
app.get('/admin/*', (req, res) => {
  try {
    res.sendFile(path.join(__dirname, 'admin', 'build', 'index.html'));
  } catch (err) {
    res.status(404).send({ message: 'error : ' + err });
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
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host, () => {
  console.log(`server at http://${host}:${port}`);
});
