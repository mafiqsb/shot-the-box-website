const express = require('express');
const cors = require('cors');
const path = require('path');
const imageRouter = require('./Routes/imageRoutes.js');
const seedRouter = require('./Routes/seedRoutes.js');
const uploadRouter = require('./Routes/uploadRoutes.js');
const userRouter = require('./Routes/userRoutes.js');
const dotenv = require('dotenv');
const emailnotifyRouter = require('./Routes/emailnotifyRoutes.js');

dotenv.config();

const app = express();
const __dirname = path.resolve();

// Serve frontend on /frontend route

// app.use(express.static(path.join(__dirname, 'frontend', 'build')));
// app.get('/frontend/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'frontend', 'build', 'index.html'));
// });

app.use(express.static(path.join(__dirname, '/frontend/build')));
app.get('/frontend/*', (req, res) => {
  res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
});

// Serve frontend on /admin route

// app.use(express.static(path.join(__dirname, 'admin', 'build')));
// app.get('/admin/*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'admin', 'build', 'index.html'));
// });

app.use(express.static(path.join(__dirname, '/admin/build')));
app.get('/admin/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin/build/index.html'));
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
  console.log(`server at http://localhost:${port}`);
});
