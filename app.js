const express = require('express')
const exphbs = require('express-handlebars')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

// test setting
app.get('/', (req, res) => {
  res.send(`oooolala`)
})

app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})