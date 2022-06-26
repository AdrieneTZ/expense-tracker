// import mongoose
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true })

// import schemas
const Category = require('../category')
const User = require('../user')
const Record = require('../record')

// data
const RECORDS = require('./record.json')

const generateRecords = async (records) => {
  try {
    for await (const record of records) {
      const { name, date, amount, user, category } = record

      const userObject = await User.findOne({ name: user })
      const userId = userObject._id

      const categoryObject = await Category.findOne({ name: category })
      const categoryId = categoryObject._id

      await Record.create({ name, date, amount, userId, categoryId })
    }

    console.log('seed records created')
  } catch(error) {
    console.log('fail to create seed records', error)
  } finally {
    process.exit()
  }
}

generateRecords(RECORDS)