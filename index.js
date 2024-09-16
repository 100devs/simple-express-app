const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
require('dotenv').config()


let db,
    todoCollection,
    dbConnectionStr = process.env.DB_STRING


MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log('connected to database')
        db = client.db('todo')
        todoCollection = db.collection('todos')
    })

app.use(express.static('public'))
app.set('view engine', 'ejs')
//app.use(bodyParser.json())
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    db.collection('todos').find().toArray()
        .then(results => {
            res.render('index.ejs', { todos: results })

        })
        .catch(error => console.error(error))

})

app.post('/todos', (req, res) => {

    todoCollection.insertOne(req.body)
        .then(result => {
            res.redirect('/')
        })
        .catch(error => console.error(error))
})

app.delete('/deleteTodo', (req, res) => {
    todoCollection.deleteOne({ todo: req.body.todoName })
        .then(result => {
            console.log('Todo Deleted')
            res.json('Todo Deleted')
        })
        .catch(error => console.error(error))
})

app.put('/editTodo', (req, res) => {

    todoCollection.updateOne({ todo: req.body.todoName }, {
        $set: {
            todo: req.body.editName
        }
    }, {
        // sort: { _id: -1 },
        // upsert: false
    })
        .then(result => {
            console.log('edited')
            res.json('Edit Added')
        })
        .catch(error => console.error(error))
})
app.listen(2000, function () {
    console.log('your server is running')
})




