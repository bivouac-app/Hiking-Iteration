const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/all', postController.getAll);

router.post('/new', postController.createPost);

router.delete('/:id', postController.deletePost);

router.get('/:id', postController.getSpecificPost);

module.exports = router;
