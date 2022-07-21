const express = require("express");
const passport = require('passport');
const router = express.Router();
//const userController = require ('../controllers/userController');



router.get('/google', passport.authenticate('google', {scope: ['profile','email']}))

router.get('/google/callback', passport.authenticate('google', {failureRedirect: '/'}),
  (req, res) => {
    console.log('req.user in auth js: ', req.user.data);
    res.cookie('id', req.user.data)
    res.redirect('/')
  }
)

//logout user
router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// // Signup
// router.post('/signup', userController.createUser, (req, res) => {
//   return res.status(200).send('user signed up!');
// });

// // Login
// router.post('/login', /*userController.verifyUser,*/ (req,res) => {
//   return res.status(200).send(res.locals.user);
// });

module.exports = router;
