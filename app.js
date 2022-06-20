const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(bodyParser.urlencoded({ extended: true }))


app.use(routes)
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})