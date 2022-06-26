const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local')
const FacebookStrategy = require('passport-facebook')

const User = require('../models/user')

module.exports = app => {
  // initialize passport module
  app.use(passport.initialize())
  app.use(passport.session())

  // passport strategy: local
  passport.use(new LocalStrategy(
    { usernameField: 'email' },
    (email, password, done) => {
      User.findOne({ email })
        .then(user => {
          if (!user) done(null, false, { message: 'This email has not been registered!' })
          return bcrypt.compare(password, user.password)
            .then(isMatch => {
              if (!isMatch) done(null, false, { message: 'Incorrect email or password!'})
              return done(null, user)
            })
        })
        .catch(error => console.log(error))
    }
  ))

  // passport strategy: facebook
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK_URL,
    profileFields: ['email', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        // create a set of random password to the user registering with Facebook account
        // because password is a required property in the User model
        // this random password still have to be hashed by bcrypt.js
        const randomPassword = Math.random().toString(36).slice(-9)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash,
          }))
          .then(user => done(null, user))
          .catch(error => done(error, false))
      })
  }))

  // serialize & deserialize
  passport.serializeUser((user, done) => {
    // console.log(user)
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => console.log(error))
  })
}