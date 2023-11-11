const express = require('express');
const cors = require('cors');
var bodyParser = require('body-parser');

const app = express();

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get('/', (req, res) => {
  console.log('hello');
  res.status(200).json({
    message: 'hello',
  });
});

app.get('/blogs', (req, res) => {
  res.status(200).json({
    message: 'blogs',
  });
});

app.listen(4000, () => {
  console.log('listening on port 4000');
});
