const express = require('express')
const router = express.Router()

// route: GET/ users/ register
router.get('/register', (req, res) => {
  return res.render('register')
})

// route: POST/ users/ register

// route: GET/ users/ login
router.get('/login', (req, res) => {
  return res.render('login')
})

// route: POST/ users/ login

module.exports = router