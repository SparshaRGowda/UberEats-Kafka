const express = require('express')
const dotenv = require('dotenv')
const colors = require('colors')
const connectdb = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const restaurantRoutes = require('./routes/restaurantRoutes')
const orderRoutes = require('./routes/orderRoutes')

//const passport = require('passport')

dotenv.config()

connectdb()

const app = express()

app.use(express.json())

//passport config
//require('./config/passport')(passport)

/*app.use('/api/restaurants', restaurantRoutes)
app.use('/api/dishes', dishRoutes)
app.use('/api/orders',orderRoutes)*/

app.use('/api/users', userRoutes)
app.use('/api/restaurants', restaurantRoutes)
app.use('/api/orders', orderRoutes)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.bold
  )
)

module.exports = app
