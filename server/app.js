const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs-readfile-promise')
const onFulfilled = buffer => console.log(buffer.toString())
const onRejected = err => console.log('Cannot read the file.' + err)

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

app.get('/api/historyPhase/:id', (req, res) => {
  const id = req.params.id
  fs('./server/database.json')
  .then(onFulfilled, onRejected)
})

app.listen(process.env.PORT || 3002)
