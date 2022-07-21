const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/getall', userController.getAll)

router.get('/:id', userController.getSpecificUser);

module.exports = router;
