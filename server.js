console.log('May Node be with you')

const express = require('express')
const bodyParser = require('body-parser')
const req = require('express/lib/request')
const app = express()
const MongoClient = require('mongodb').MongoClient

const connectionString = 

MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('star-wars-quotes') 
    const quotesCollection = db.collection('quotes')
    
    app.set('view engine', 'ejs')

    app.use(bodyParser.urlencoded({ extended: true}))

    app.use(bodyParser.json())

    app.use(express.static('public'))
    
    app.get('/', (req, res) => {
        quotesCollection.find().toArray()
            .then(results => {
                console.log(results)
                res.render('index.ejs', {quotes: results })
            })
            .catch(error => console.error(error))    
    })

    app.post('/quotes', (req, res) => {
        quotesCollection.insertOne(req.body)
            .then(result => {
                console.log(result)
                res.redirect('/')
            })
            .catch(error => console.error(error))
    })
    

    app.put('/quotes',(req, res) => {
        quotesCollection.findOneAndUpdate(
        { name: 'Yoda' },
        {
            $set: {
            name: req.body.name,
            quote: req.body.quote
            }
        },
        {
            upsert: true
        }
    )
        .then(result => {
            res.json('Success')
        })
        .catch(error => console.error(error))
    })

    app.delete('/quotes', (req,res) => {
        quotesCollection.deleteOne(
            {name: req.body.name},
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete')
            }
            res.json(`Deleted Darth Vader's quote`)
        })
        .catch(error => console.error(error))
    })

    app.listen(3000, function() {
        console.log('listening on 3000')
    })

  })
  .catch(error => console.error(error))










console.log(__dirname)

