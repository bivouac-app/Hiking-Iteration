require('dotenv').config();
// console.log(process.env);
const path = require('path');
const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose')
const passport = require('passport')
const session = require('express-session')
const cookieSession = require('cookie-session');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

mongoose.connect(`mongodb+srv://msBfZUfN:B2rh4bBWTa3PujE@cluster0.4fpu4.mongodb.net/hiking_app?retryWrites=true&w=majority`, () => console.log('Connected to mongodb'));

//passport config
require('./passport')(passport)

// app.use(cookieSession({
//   keys: ['id']
// }));

//oauth Session
app.use(session({
  secret:'id',
  resave: false,
  saveUninitialized: true,
  cookie: {secure: false},
  name: 'carmen'
}))

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

//define the user route
//define the hike route
const userRoute = require('./routers/userRouter');
const hikeRoute = require('./routers/hikeRouter');
const authRoute = require('./auth');
const { Cookie } = require('express-session');

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute)
app.use('/api/hikes', hikeRoute)

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
