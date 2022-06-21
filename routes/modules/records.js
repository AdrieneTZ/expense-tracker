const express = require('express')
const router = express.Router()

// route: GET/ records/ new
router.get('/new', (req, res) => {
  return res.render('new')
})

module.exports = router