const bcrypt = require('bcryptjs')
const passport = require('passport')
const LocalStrategy = require('passport-local')

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

  // serialize & deserialize
  passport.serializeUser((user, done) => {
    console.log(user)
    done(null, user.id)
  })
  passport.deserializeUser((id, done) => {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(error => console.log(error))
  })
}