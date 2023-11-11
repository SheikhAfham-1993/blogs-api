const express = require('express');
const cors = require('cors');
const blogsRouter = require('./routes/blogs');
const usersRouter = require('./routes/users');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const app = express();
// app.use(logger);

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

app.use('/users', usersRouter);
app.use('/blogs', blogsRouter);

// middleware
function logger(req, res, next) {
  console.log('logging...');
  next();
}

mongoose
  .connect(
    'mongodb+srv://afhamsh:03452519534123@nodejscluster.cmp6nre.mongodb.net/blog?retryWrites=true&w=majority',
  )
  .then((result) => {
    app.listen(4000, () => {
      console.log('listening on port 4000');
    });
  })
  .catch((err) => {
    console.log(err);
  });
