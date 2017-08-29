const express = require('express')
const path = require('path')
const app = express()

app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, '../client')))
app.set('views', path.join(__dirname, 'views'))
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

app.listen(process.env.PORT || 3002)
