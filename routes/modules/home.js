const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', async (req, res) => {
  try{
    const userId = req.user._id

    // req.query: get selected category id
    // e.g. req.query { categoryId: '62b70c9adc56d7496e67952f' }
    const { categoryId } = req.query

    // if categoryId exists, find that category object by categoryId
    // e.g. selectedCategory { _id: new ObjectId("62b70c9adc56d7496e67952f"), name: '...', ...}
    const selectedCategory = categoryId ? await Category.findById(categoryId).lean() : 'All'
    const selectedCategoryName = categoryId ? selectedCategory.name : 'Select a category'

    // get all categories data: [ {}, {}, ... ]
    const categories = await Category.find().lean()

    let totalAmount = 0

    if (categoryId) {
      // categoryId exists: get records by selected category id
      try{
        const records = await Record.find({ userId, categoryId }).lean()
        categories.unshift({ _id: '', name: 'All'})

        for await (const record of records) {
          // add property, icon, to each record
          const { icon } = await Category.findById(record.categoryId).lean()
          record.icon = icon

          totalAmount += record.amount
        }

        res.render('index', { selectedCategoryName, categories, totalAmount, records })
      } catch(error) {
        console.log('Fail to get the expense records of your selected category', error)
        res.send(`<p4>Fail to get the expense records of your selected category</p4>`)
      }
    } else {
      // categoryId doesn't exists: get all records
      try {
        const records = await Record.find({ userId }).lean()

        for await (const record of records) {
          // add property, icon, to each record
          const { icon } = await Category.findById(record.categoryId).lean()
          record.icon = icon

          totalAmount += record.amount
        }

        res.render('index', { selectedCategoryName, categories, totalAmount, records })
      } catch(error) {
        console.log('Fail to get all expense records', error)
        res.send(`<p4>yFail to get all expense records</p4>`)
      }
    }
  } catch(error) {
    console.log('Fail to get home page', error)
    res.send(`<p4>Fail to get home page</p4>`)
  }
})

module.exports = router