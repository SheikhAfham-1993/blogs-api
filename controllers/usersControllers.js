const User = require('../model/userModel');
const bcrypt = require('bcryptjs');

exports.loginUser = (req, res, next) => {
  console.log(req.body);
  res.status(200).json({
    message: 'user logged in',
  });
};

exports.registerUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 12).then((hash) => {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: 'User created',
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: 'Invalid authentication credentials!',
        });
      });
  });
};
