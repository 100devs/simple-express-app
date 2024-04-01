const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const { ObjectId } = require('mongodb');
const PORT = 5000;
require('dotenv').config();

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'wiseExpression';

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`);
        db = client.db(dbName);
    });

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (request, response) => {
    db.collection('goodExpression').find().sort({ likes: -1 }).toArray()
        .then(data => {
            response.render('index.ejs', { info: data });
        })
        .catch(error => console.error(error));
});

app.post('/addExpression', (request, response) => {
    db.collection('goodExpression').insertOne({
        contributor: request.body.contributor,
        expression: request.body.expression,
        classification: request.body.classification,
        explanation: request.body.explanation,
        likes: 0
    })
        .then(result => {
            console.log('Expression Added');
            response.redirect('/');
        })
        .catch(error => console.error(error));
});

app.put('/addOneLike/:id', (request, response) => {
    const expressionId = request.params.id;

    try {
        const expressionObjectId = new ObjectId(expressionId);

        db.collection('goodExpression').updateOne(
            { _id: expressionObjectId },
            { $inc: { likes: 1 } }
        )
            .then(result => {
                console.log('Added One Like');
                response.json('Like Added');
            })
            .catch(error => {
                console.error(error);
                response.status(500).json({ error: 'Internal Server Error' });
            });
    } catch (error) {
        console.error(error);
        response.status(400).json({ error: 'Invalid Expression ID' });
    }
});

app.delete('/deleteExpression/:id', (request, response) => {
    const expressionId = request.params.id;

    try {
        const expressionObjectId = new ObjectId(expressionId);

        db.collection('goodExpression').deleteOne({ _id: expressionObjectId })
            .then(result => {
                console.log('Expression Deleted');
                response.json('Expression Deleted');
            })
            .catch(error => {
                console.error(error);
                response.status(500).json({ error: 'Internal Server Error' });
            });
    } catch (error) {
        console.error(error);
        response.status(400).json({ error: 'Invalid Expression ID' });
    }
});

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
