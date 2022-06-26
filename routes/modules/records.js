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

// router: GET/ records/ :recordId/ edit
router.get('/:id/edit', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const record = await Record.findOne({ userId, _id }).lean()
    const categoryOfRecord = await Category.findById(record.categoryId).lean()
    record.category = categoryOfRecord.name

    const categories = await Category.find().lean()

    res.render('edit', { record, categories })
  } catch(error) {
    console.log('Fail to get the page of editting this expense record', error)
    res.send(`<p4>Fail to get the page of editting this expense record</p4>`)
  }
})

// router: PUT/ records/ :recordId/ edit
router.put('/:id', async (req, res) => {
  try {
    const userId = req.user._id
    const _id = req.params.id
    const { name, date, amount, categoryId } = req.body

    await Record.findByIdAndUpdate(_id, { name, date, amount: Number(amount), categoryId, userId })

    res.redirect('/')
  } catch(error) {
    console.log('Fail to save this editted expense record', error)
    res.send(`<p4>Fail to save this editted expense record</p4>`)
  }
})

// router: DELETE/ records/ :recordId
router.delete('/:id', async (req, res) => {
  try {
    const _id = req.params.id

    await Record.findByIdAndRemove(_id)

    res.redirect('/')
  } catch(error) {
    console.log('Fail to delete this expense record', error)
    res.send(`<p4>Fail to delete this expense record</p4>`)
  }
})
module.exports = router