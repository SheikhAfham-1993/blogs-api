const express = require('express');
const cors = require('cors');
const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');

require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
// app.use(logger);

app.use(cors({ credentials: true, origin: '*' }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);

// middleware
function logger(req, res, next) {
  console.log('logging...');
  next();
}

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((result) => {
    app.listen(4000, () => {
      console.log('listening on port 4000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
