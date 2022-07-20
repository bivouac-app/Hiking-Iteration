const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/new', postController.createPost);

router.delete('/:id', postController.deletePost);

module.exports = router;
