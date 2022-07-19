const User = require('../models/User');

const userController = {};

// Password is stored in plaintext at the moment and our verification is passing the User object back and forth.
// Will change to something more secure later on.

userController.register = async (req, res, next) => {
  try {
    const { firstName, lastName, location, email, password } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      location,
      email,
      password,
    });
    res.locals.user = user;
    res.send(user);
  } catch (err) {
    return next(err);
  }
};

userController.login = async (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({ username, password })
    .then((data) => res.send(data))
    .catch((err) => {
      return next(err);
    });
};

module.exports = userController;
