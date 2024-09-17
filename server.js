const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()


MongoClient.connect('mongodb+srv://Shenan:[pass]@cluster0.cbpp2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('cats-songs')
    const songCollection = db.collection('songs')

    app.set('view engine', 'ejs')
    app.use(express.static('public'))
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.json())

    app.get('/', (req, res) => {
      db.collection('songs').find().toArray()
        .then(songs => {
          res.render('index.ejs', { songs: songs })
        })
        .catch(error => console.error(error))
    })

    app.delete('/deleteSongs', (req, res) => {
      songCollection.deleteOne({nameC: req.body.nameS})
        .then(result => {
          res.json(`Deleted Song`)
        })
        .catch(error => console.error(error))
    })
  
    app.post('/songs', (req, res) => {
      songCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/')
        })
        .catch(error => console.error(error))
    })

    app.listen(3000, function() {
      console.log('listening on 3000')
})
  })
  .catch(console.error)
