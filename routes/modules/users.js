const express = require('express')
const router = express.Router()

// route: GET/ users/ register
router.get('/register', (req, res) => {
  return res.render('register')
})

// route: GET/ users/ login
router.get('/login', (req, res) => {
  return res.render('login')
})

module.exports = router