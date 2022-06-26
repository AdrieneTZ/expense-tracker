// import bcrypt
const bcrypt = require('bcryptjs')

// import mongoose
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true })

// import user schema
const User = require('../user')

// data
const USERS = require('./user.json')

const generateUsers = async (users) => {
  try {
    // [Promise, Promise, Promise, Promise]
    const arrayOfPromise = users.map(user =>
      bcrypt.genSalt(10)
        .then(salt => bcrypt.hash(user.password, salt))
        .then(hash => {
          user.password = hash
          return user
        })
        .catch(error => console.log(error))
    )
    await Promise.all(arrayOfPromise)

    await User.insertMany(users)
    console.log('seed users created')
  } catch(error) {
    console.log('fail to create seed users', error)
  } finally {
    process.exit()
  }
}

generateUsers(USERS)