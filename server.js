const express = require('express')
const app = express()
const cors = require('cors')
const PORT = 8000
const tripleCrown = require('./triple-crown')

app.use(cors())


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
}) 

app.get('/api', (req, res) => {
  res.json(tripleCrown)
})

app.get('/api/:id', (req, res) => {
  res.send(tripleCrown.filter((x) => x.id == req.params.id))
})

app.listen(process.env.PORT || PORT, () => {
  console.log(`The server is now running on port ${PORT}!`)
})