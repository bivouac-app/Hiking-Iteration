const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('./models/User')
require('dotenv').config()



module.exports = function(passport){
  passport.use(new GoogleStrategy({
     clientID: '911450123865-5bcko0f0n0kqsraedmsloscf5g7t711h.apps.googleusercontent.com',
     clientSecret: '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',
     callbackURL: '/api/auth/google/callback'
  }, 
  async (accessToken,refreshToken, profile, done)=> {
    console.log(profile)
  }))
  
  passport.serializeUser((user, done) => {
    done(null, {
      id: user.id,
      username: user.username,
    });
  })

  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
  

}
