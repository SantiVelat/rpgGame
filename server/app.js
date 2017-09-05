const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs-readfile-promise')
const mongoose = require('mongoose')
const bodyParser= require('body-parser')

const PORT = process.env.PORT || 3002

global.__base = path.join(__dirname)

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, '../client')))
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const URL_DB = 'mongodb://admin:admingame@ds125914.mlab.com:25914/rpgame'
mongoose.Promise = global.Promise
mongoose.connect(URL_DB, {useMongoClient: true})

const Enemy = require('./models/Enemies')
const History = require('./models/History')

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/score', (req, res) => {
  res.render('global-score')
})

app.get('/register', (req, res) => {
  res.render('register')
})

app.get('/api/historyPhase/:id', (req, res) => {
  const id = req.params.id
  History.find({ id })
    .then(results => res.json(results))
    .catch(err => res.json({ success: false, msg: err }))
})

app.get('/api/getEnemy/:id', (req, res) => {
  const id = req.params.id
  Enemy.find({id})
   .then(enemyMatched => {
     res.json(enemyMatched)
   })
})


/*passport*/

const passport = require('./config/passport/')
app.use(passport.initialize())

const authRoutes = require('./routes/auth/')
// const privateRoutes = require('./routes/private/')
app.use(authRoutes)
// app.use(privateRoutes)


app.listen(PORT)
console.log(`listening on PORT ${PORT}`)
