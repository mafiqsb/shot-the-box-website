const express = require('express');
const cors = require('cors');
const path = require('path');
const imageRouter = require('./Routes/imageRoutes.js');
const seedRouter = require('./Routes/seedRoutes.js');
const uploadRouter = require('./Routes/uploadRoutes.js');
const userRouter = require('./Routes/userRoutes.js');
const dotenv = require('dotenv');
const emailnotifyRouter = require('./Routes/emailnotifyRoutes.js');

const { Sequelize } = require('sequelize');

dotenv.config();

const app = express();

// Serve frontend on /frontend route
app.use('/frontend', express.static(path.join(__dirname, 'frontend', 'build')));
app.get('/frontend/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
});

// Serve admin on /admin route
app.use('/admin', express.static(path.join(__dirname, 'admin', 'build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin', 'build', 'index.html'));
});

// app.get('/api/test-database', async (req, res) => {
try {
  const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });

  // Test the database connection
  sequelize.authenticate();

  // If the connection is successful, send a success response
  // res.status(200).json({ message: 'Database connection test successful' });
} catch (error) {
  // If there's an error, send an error response
  console.error('Error connecting to the database:', error.message);
  // res.status(500).json({ error: 'Database connection test failed' });
}
// });

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
