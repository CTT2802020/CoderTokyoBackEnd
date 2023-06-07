const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/user.route');
const authRoute = require('./routes/auth.route');

const authMiddleware = require('./middlewares/auth.middleware')

const port = 3000

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

// for parsing application/x-www-form-urlencoded
app.use(express.static('public'))

app.get('/', function(req, res)  {
  res.render('index', {
    name: 'AAA'
  })
})

app.use('/users', authMiddleware.requireAuth, userRoute);

app.use('/auth', authRoute);

app.listen(port, function()  {
  console.log('server listening on port '  + port);
})