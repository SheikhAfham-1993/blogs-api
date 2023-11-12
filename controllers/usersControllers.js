const User = require('../model/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.loginUser = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    bcrypt.compare(req.body.password, user.password).then((result) => {
      if (result) {
        jwt.sign(
          {
            name: user.name,
            email: user.email,
            userId: user._id,
          },
          process.env.USER_SECRET,
          {},
          (err, token) => {
            if (err) throw err;

            res.status(200).json({
              message: 'Auth successful',
              user: user,
            });
          },
        );
      } else {
        res.status(401).json({
          message: 'Invalid authentication credentials!',
        });
      }
    });
  }
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
        const newUserData = {
          name: result.name,
          email: result.email,
          userId: result._id,
        };
        console.log({ newUserData });
        res.status(200).json({
          message: 'User created',
        });
      })
      .catch((err) => {
        console.log(err);
        if (err.code === 11000) {
          res.status(409).json({
            message: 'This email is already registered!',
          });
        } else {
          res.status(500).json({
            message: 'Invalid authentication credentials!',
          });
        }
      });
  });
};

exports.logOut = (req, res, next) => {
  res.clearCookie('token').status(200).json({
    message: 'User logged out',
  });
};
exports.verifyUser = (req, res, next) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.USER_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({
        message: 'Auth failed',
      });
    }
    res.status(200).json(decoded);
  });
};
