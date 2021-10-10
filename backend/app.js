require('dotenv').config();

const express = require('express');
const cors = require('cors');
var cookieParser = require('cookie-parser');
const path = require('path');

const app = express();
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors({ credentials: true, origin: 'http://localhost:4200' }));

app.use(express.static('./frontend/parkinglot'));
app.set('view engine', 'pug');

const errFun = (req, res, next) => {
  const err = new Error(
    'I think you are not supposed to hit here, anyways welcome to Server Home.'
  );
  err.status = 404;
  next(err);
};

app.get('/api/', errFun);
app.use('/api/auth', require('./controllers/auth/AuthAPI'));
app.use('/api/student', require('./controllers/student/StudentAPI'));
app.get('/api/Test/GetQuestionsAndOptions', (req, res, next) => {
  res.json(require('./conffig/initialData.json'));
});
app.post('/api/UserDashboard/GetUserMarks', (req, res, next) => {
  res.json(req.body);
});

app.all('*', (req, res, next) => {
  if (req.url.includes('/api')) {
    next();
  } else {
    try {
      if (
        [
          '.js',
          '.icon',
          '.css',
          '.png',
          '.gif',
          '.jpg',
          '.woff2',
          '.wof',
          '.ttf',
          '.svg',
          '.jfif'
        ].filter(ext => req.url.indexOf(ext) > 0)
      ) {
        res.sendFile(path.resolve('./frontend/parkinglot/index.html'));
      } else
        res.sendFile(path.join(__dirname, './frontend/parkinglot/index.html'));
    } catch (error) {}
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    `> Server is up and running in ${process.env.NODE_ENV} mode  on port : ${port}`
  )
);

app.use(function (err, req, res, next) {
  const status = err.status || 500;
  console.log(err);
  res.status(status);
  if (process.env.NODE_ENV === 'development') console.log(err);
  if (err.data) res.json({ message: err.message, ...err.data });
  else res.json({ message: err.message });
});
