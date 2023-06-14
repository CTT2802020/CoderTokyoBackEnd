require('dotenv').config();

const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');
var productRoute = require('./routes/product.route')
var cartRoute = require('./routes/cart.route')

const authMiddleware = require('./middlewares/auth.middleware')
var sessionMiddleware = require('./middlewares/session.middleware')

const port = 3000

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser('process.env.SESSION_SECRET'))
app.use(sessionMiddleware);


// for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

app.get('/', function(req, res)  {
  res.render('index', {
    name: 'AAA'
  })
})

app.use('/users', authMiddleware.requireAuth, userRoute);

app.use('/auth', authRoute);
app.use('/products', productRoute)
app.use('/cart', cartRoute)

app.listen(port, function()  {
  console.log('server listening on port '  + port);
})