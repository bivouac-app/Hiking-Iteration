require('dotenv').config();
// console.log(process.env);
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')

mongoose.connect('mongodb+srv://msBfZUfN:B2rh4bBWTa3PujE@cluster0.4fpu4.mongodb.net/hiking_app?retryWrites=true&w=majority', () => console.log('Connected to mongodb'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(`mongodb+srv://msBfZUfN:B2rh4bBWTa3PujE@cluster0.4fpu4.mongodb.net/hiking_app?retryWrites=true&w=majority`, () => console.log('Connected to mongodb'));

//passport config
require('./passport')(passport)
//oauth Session
app.use(session({
  secret:'keyboardcat',
  resave:'false',
  saveUninitialized: 'false'
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//define the user route
//define the hike route
const userRouter = require('./routers/userRouter');
const hikeRouter = require('./routers/hikeRouter');
const authRouter = require('./auth');

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter)
app.use('/api/hikes', hikeRouter)

/**
 * configure express global error handler
 * @see https://expressjs.com/en/guide/error-handling.html#writing-error-handlers
 */
 app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred: ' + err }, 
  };
  
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  console.log(errorObj.message);
  
  // return res.send({'Error status': errorObj.status, 'Message': errorObj.message});
  return res.status(errorObj.status).json(errorObj.message)
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app;
