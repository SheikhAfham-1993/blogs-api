const express = require('express');
const blogsController = require('../controllers/blogsController');
const router = express.Router();

router.get('/getAll', blogsController.getAllblogs);

// router.get('/get/:id', (req, res) => {
//   res.status(200).json({
//     message: `user with ${req.params.id} id`,
//   });
// });

module.exports = router;
