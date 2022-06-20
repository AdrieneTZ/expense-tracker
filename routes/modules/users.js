const express = require('express')
const router = express.Router()

// import user model
const User = require('../../models/user')

// route: GET/ users/ register
router.get('/register', (req, res) => {
  return res.render('register')
})

// route: POST/ users/ register
  // step 1. get the form data
  // step 2. check if the user already exists. condition: email
  // step 3. if exist, return to the register page with the data user entered
  // step 4. if not exist, create a new user and direct to the home page
  // step 5. give each type of error message
  // step 6. add bcrypt to hash the password before saving it to the database
router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body

  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: 'All fields are required!' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: 'Password and Confirm Password do not match!' })
  }
  if(errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }

  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: 'This email has been registered!' })
        return res.render('register', { errors, name, email, password, confirmPassword })
      }
      User.create({ name, email, password })
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
    })
})

// route: GET/ users/ login
router.get('/login', (req, res) => {
  return res.render('login')
})

// route: POST/ users/ login

module.exports = router