const express = require('express')
const path = require('path')
const app = express()
const fs = require('fs-readfile-promise')
const PORT = process.env.PORT || 3002
app.set('view engine', 'pug')
app.use(express.static(path.join(__dirname, '../client')))
app.set('views', path.join(__dirname, 'views'))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
/*Should module that part*/


const onResponse = function(id,data){
	 return(data.toString())
}
const filterByid = function(id,data) {
     return JSON.parse(data).filter(function(item){
    	return item.phaseId == id        
    })
}
const sendPhase = function(data){
	res.send(JSON.stringify(data))
}
const onRejected = err => console.log('Cannot read the file.' + err)

app.get('/api/historyPhase/:id', (req, res) => {
  const id = req.params.id
  fs('./server/history.json')
  .then(onResponse.bind(null, id), onRejected)
  .then(filterByid.bind(null, id))
  .then(res.send)
})

app.listen(PORT)
console.log(`listening on PORT ${ PORT }`)
