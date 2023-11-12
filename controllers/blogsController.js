const Blogs = require('../model/blogsModel');

exports.getAllblogs = (req, res, next) => {
  Blogs.find()
    .populate('author')
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.getSingleBlog = (req, res, next) => {
  const id = req.params.id;
  Blogs.findById(id)
    .populate('author')
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
};

exports.createBlog = (req, res, next) => {
  const blog = new Blogs({
    title: req.body.title,
    content: req.body.content,
    description: req.body.description,
    author: req.body.author,
  });

  blog
    .save()
    .then(() => {
      res.status(200).json({
        message: 'Blog created successfully',
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
