// impotr Express and Express router
const express = require('express')
const router = express.Router()

// import Category & Record model
const Category = require('../../models/category')
const Record = require('../../models/record')

// router: GET/ records/ new
router.get('/new', async (req, res) => {
  try {
    const categories = await Category.find().lean()
    res.render('new', { categories })
  } catch(error) {
    console.log('Fail to get create a new record page', error)
    res.send(`<p4>Fail to get create a new record page</p4>`)
  }
})

// router: POST/ records
router.post('/', async (req, res) => {
  try {
    const { name, date, categoryId, amount } = req.body
    const userId = req.user._id
    await Record.create({ name, date, amount: Number(amount), categoryId, userId })
    res.redirect('/')
  } catch(error) {
    console.log('Fail to create this expense record', error)
    res.send(`<p4>Fail to create this expense record</p4>`)
  }
})

module.exports = router