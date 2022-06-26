// import mongoose
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true })

// import category schema
const Category = require('../category')

// data
const CATEGORIES = require('./category.json')

const generateCategories = async (categories) => {
  try {
    await Category.insertMany(categories)
    console.log('seed categories created')
  } catch(error) {
    console.log('fail to create seed categories', error)
  } finally {
    process.exit()
  }
}

generateCategories(CATEGORIES)