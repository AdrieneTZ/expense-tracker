// import mongoose
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true }, { useUnifiedTopology: true })

// import category schema
const Category = require('./category')

// data
const CATEGORIES = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}

const generateCategories = async (categories) => {
/**
 * step 1. Turn CATEGORY object to array of object: arrayOfCategory
 *         Object.entries: { a: 1, b: 2 } --> [[a: 1], [b: 2]]
 *         Array.map + return {}: [[a: 1], [b: 2]] --> [{ a: 1 }, { b: 2 }]
 *
 *  arrayOfCategories will look like
 *    [
 *      { name: '家居物業', icon: 'https://fontawesome.com/icons/home?style=solid' },
 *      { name: '交通出行', icon: 'https://fontawesome.com/icons/shuttle-van?style=solid'},
 *      ...
 *    ]
 *
 * step 2. create data in database
 *  method: Model.insertMany(doc)
 *  method: loop + Model.create(each data)
 */
  try {
      const arrayOfCategories = Object.entries(categories).map(([name, icon]) => {
        return { name, icon }
      })

      await Category.insertMany(arrayOfCategories)
      // or:
      // for await (const category of arrayOfCategories) {
        // await Category.create({ name: category.name, icon: category.icon })
      // }

      console.log('seed categories created')

  } catch(error) {
      console.log('fail to create seed categories', error)
  } finally {
    process.exit()
  }
}

generateCategories(CATEGORIES)