const User = require('../models/User');

const userController = {};

// Password is stored in plaintext at the moment and our verification is passing the User object back and forth.
// Will change to something more secure later on.

userController.register = async (req, res, next) => {
  try {
    console.log('registering user');
    const { firstName, lastName, location, email, password } = req.body;
    const user = await User.create({
      firstName,
      lastName,
      location,
      email,
      password,
    });
    res.locals.id = user._id;
    return next();
  } catch (err) {
    return next(err);
  }
};

userController.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.find({ email, password });
    if (!user) throw new Error('Incorrect login credentials');
    console.log('user controller user data: ', user[0].id)
    res.locals.id = user[0]._id;
    // console.log('res.locals in userController.login', res.locals)
    // console.log('res.locals.user[0]_id', user[0]._id)
    res.cookie('id', (user[0]._id).toString());
    // res.send(user[0].id);
    return next();
  } catch (err) {
    return next(err)
  }
};

userController.getAll = async (req, res, next) => {
  try {
    console.log('GET ALL');
    const users = await User.find({});
    console.log(users);
    res.send(users);
  } catch (err) {
    return next(err);
  }
};

userController.getSpecificUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('gallery');
    res.json(user);
  } catch (err) {
    return next(err);
  }
};

userController.upload = async (req, res, next) => {
  const { link, id } = req.body;
  const user = await User.findByIdAndUpdate(id, { $push: { gallery: link } }, { new : true})
  res.send(user)
}

module.exports = userController;
