const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.post('/register', userController.register, (req, res) => {
    res.send(res.locals.id);
});

router.post('/login', userController.login, (req, res) => {
    res.send(res.locals.id);
});

router.post('/upload', userController.upload)

// router.post('/createCookie', userController.createCookie, (req, res) => {
    
// })

router.get('/getall', userController.getAll)

router.get('/:id', userController.getSpecificUser);

router.post('/upload', userController.upload);

router.get('/cookieID', userController.getCookieID, (req, res) => {
    
})

module.exports = router;
