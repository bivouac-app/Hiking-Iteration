const GoogleStrategy = require('passport-google-oauth20').Strategy
const { default: axios } = require('axios');
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt');


// mongoose.connect(`${process.env.MONGO_URI}`, () => console.log('Connected to mongodb on passport.js'));

module.exports = function(passport){
  passport.use(new GoogleStrategy({
     clientID: '911450123865-5bcko0f0n0kqsraedmsloscf5g7t711h.apps.googleusercontent.com',
     clientSecret: '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', 
     callbackURL: '/api/auth/google/callback'
  }, 

  async(accessToken,refreshToken, profile, done)=> {
    // console.log(profile._json.sub)
    const {given_name, family_name, email} = profile._json
    const sub = profile._json.sub;

    const hashedSub = await bcrypt.hash(sub, 10);
    console.log(hashedSub);

    const userBody = {
      firstName: given_name,
      lastName: family_name,
      email: email,
      password: hashedSub
    }

    try {      
      let user = await User.findOne({email: email})
      console.log('user found: ', user)

      if (user) {
          done(null, user)
      } else {
          user = await User.create(userBody)
          
          console.log('user created: ', user)
          done(null, user)
      }
  } catch(err) {
      console.log(err);
  }
  //axios('/')

  })),
  
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
