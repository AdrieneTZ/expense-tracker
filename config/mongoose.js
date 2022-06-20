const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('Connection error')
})

db.once('open', () => {
  console.log('Successful connection to MongoDB')
})

module.exports = db