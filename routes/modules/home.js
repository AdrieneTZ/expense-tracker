const express = require('express')
const router = express.Router()

const Record = require('../../models/record')

// router.get('/', (req, res) => {
//   const userId = req.user._id
//   Record.findById({ userId })
//     .lean()
//     .sort({ date: -1 })
//     .then(records => res.render('index', { records }))
//     .catch(error => console.log(error))
// })

router.get('/', (req, res) => {
  const userId = req.user._id
  // console.log(userId)

  Record.find({ userId })
    .lean()
    .then(records => res.render('index', { records }))
})
module.exports = router