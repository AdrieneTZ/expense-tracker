const express = require('express')
const router = express.Router()

// import user model
const User = require('../../models/user')

// route: GET/ users/ register
router.get('/register', (req, res) => {
  return res.render('register')
})

// route: POST/ users/ register
router.post('/register', (req, res) => {
  // step 1. get the form data
  const { name, email, password, confirmPassword } = req.body

  // step 2. check if the user already exists. condition: email
  // step 3. if exist, return to the register page with the data user entered
  // step 4. if not exist, create a new user ( add id ) and direct to the home page
User.findOne({ email })
  .then(user => {
    if (user) {
      console.log('This email is already registered.')
      return res.render('register', { name, email, password, confirmPassword })
    }
    User.create({ name, email, password })
  })
  .then(() => res.redirect('/'))
  .catch(error => console.log(error))

  // step 5. give each type of error message
  // step 6. add bcrypt to hash the password before saving it to the database
})

// route: GET/ users/ login
router.get('/login', (req, res) => {
  return res.render('login')
})

// route: POST/ users/ login

module.exports = router