const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const User = require('./models/User')
const bcrypt = require('bcrypt');
const fetch = require('node-fetch');
const axios = require('axios')


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
    console.log(sub);

    const userBody = {
      firstName: given_name,
      lastName: family_name,
      email: email,
      password: hashedSub
    }

    try {      
      // let user = await fetch('/api/users/login', {
      //   method: 'POST',
      //   headers: {'Content-Type': 'application/json'},
      //   body: {email: email, password: hashedSub}
      // })

      let user = await axios.post('http://localhost:3000/api/users/login', {
        email: email,
        password: sub
      });
      console.log('dudeuuedueudeuuedueuded ', user.data)

      if (user.data.length > 0) {
        // axios.post('/api/users/login', {body : {email: email, password: hashedSub}}).then(() => done(null, user)).catch(err => console.log('yo there was error dummy(dummys addy not carmen)'))
        done(null, user)
      } else {
        let user = await axios.post('http://localhost:3000/api/users/register', 
          userBody
        );

        console.log(user);
        axios.post('http://localhost:3000/api/users/createCookie', {
          userID: user.data
        })
          // axios.post('/api/users/login', {email: email, password: hashedSub}).then(() => done(null, user))
          done(null, user)
      }

  } catch(err) {
      console.log('err');
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
    User.findById(id.id, (err, user) => done(err, user));
  });
  

}
