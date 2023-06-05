const express = require('express')
const bodyParser = require('body-parser')
const userRoute = require('./routers/user.route');

const port = 3000

const app = express()
app.set('view engine', 'pug')
app.set('views', './views')

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', function(req, res)  {
  res.render('index', {
    name: 'AAA'
  })
})

app.use('/users', userRoute);

app.listen(port, function()  {
  console.log('server listening on port '  + port);
})