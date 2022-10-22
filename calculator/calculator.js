const express = require('express')
const bodyParser=require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended:true}))
const port = 3000

app.get('/', (req, res) => {
  res.send(`<h1 align="center"> This is Home Page</h1>

    <p><a href="/contact">contact us</a></p>  `)
})
app.post('/', (req, res) => {
  res.send(`<h1 align="center"> This is Home Page</h1>

    <p><a href="/contact">contact us</a></p>  `)
})

app.get('/contact', (req, res) => {
  res.send('<h1>mobile:6295737320</h1>')
})
app.get('/notes', (req, res) => {
  res.send('<h1>currently I am learning from Angela Yu</h1>')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})