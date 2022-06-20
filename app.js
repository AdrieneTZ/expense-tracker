const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

const usePassport = require('./config/passport')

require('./config/mongoose')

const app = express()
const PORT = process.env.PORT

app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', './views')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.urlencoded({ extended: true }))

usePassport(app)

app.use(routes)
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})