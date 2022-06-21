// as a middleware, `authenticator` will be passed to the routes that need authenticated user requests
// req.isAuthenticated() is a function exposing from Passport.js, and returns true or false
module.exports = {
  authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', 'Please login or register an account!')
    res.redirect('/users/login')
  }
}