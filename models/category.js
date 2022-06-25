// import mongoose
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create a new schema with constructor Schema
const categorySchema = new Schema({
  name: { type: String, required: true },
  icon: { type: String, require: true }
})

// export schema module and name it Category
module.exports = mongoose.model('Category', categorySchema)