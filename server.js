//To acess this apps database in mongo atlas
//username: nikiatoll
//password: QYWMbSaTWXCRVtHn

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient
const PORT = 3000
app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(bodyParser.json())

MongoClient.connect('mongodb+srv://nikiatoll:jlk48nuHD9zYm6VZ@cluster0.h3ldwtq.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client=>{
        console.log('connected to database')
        const db = client.db('star-wars-quotes')
        const quotesCollection = db.collection('quotes')

        app.listen(process.env.PORT || PORT, function () {
            console.log(`listening on ${process.env.PORT}`)
        })

        app.get('/', (req, res) => {
            db.collection('quotes').find().toArray()
            .then(results=>{
                res.render('index.ejs', {quotes: results})
            })
            .catch(error=> console.log(error))
            
            // res.sendFile(__dirname + '/index.html')
        })

        app.post("/quotes", (req, res) => {
            quotesCollection.insertOne(req.body)
            .then(result =>{
                res.redirect('/')
            })
            .catch(error=>{
                console.log(error)
            })
        })

        app.put('/quotes', (req, res)=>{
            quotesCollection.findOneAndUpdate(
                { name:'Yoda' },
                {
                    $set: {
                    name: req.body.name,
                    quote: req.body.quote
                    }
                },
                { upsert: true }
            )
            .then(result => {
                console.log(result)
                res.json('Sucess')
            })
            .catch(error => console.error(error))
        })

        app.delete('/quotes', (req, res)=>{
            quotesCollection.deleteOne({name: req.body.name })
            .then(result => {
                if(result.deletedCount===0){
                    return res.json('No quote to delete')
                }
                res.json(`Deleted Darth Vadar's quote`)
            })
            .catch(error => console.error(error))
        })
    })
    .catch(error => console.error(error))

console.log('May node be with you') 