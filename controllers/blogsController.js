const Blogs = require('../model/blogsModel');

exports.getAllblogs = (req, res, next) => {
  Blogs.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};
