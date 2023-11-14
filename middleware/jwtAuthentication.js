const jwt = require('jsonwebtoken');

exports.jwtAuthentication = (req, res, next) => {
  try {
    const token = req.headers['authorization'];
    const tokenValue = token.split(' ')[1];
    jwt.verify(tokenValue, process.env.USER_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json({
          message: 'Auth failed',
        });
      }
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: 'Auth failed',
    });
  }
};
