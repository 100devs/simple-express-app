console.log('woof')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://192.168.0.22:27017/')
 .then(client => {
     console.log("Bork! Bork! Bork!")
     const db = client.db('pug-kennel')
     const activities = db.collection('activities')

     app.set('view engine', 'ejs');
     app.use(express.static('public'));
     app.use(bodyParser.json());
     app.use(bodyParser.urlencoded({extended: true}));

     app.get('/',(req,res)=>{
         db.collection('activities').find().toArray()
         .then (results =>{
            res.render('index.ejs', {activities: results})
        })
        .catch(error => console.error(error))
        // res.sendFile(__dirname + '/index.html')
     })
     app.post('/activities', (req,res)=>{
        activities.insertOne(req.body)
        .then (result =>{
            res.redirect('/')
        })
        .catch(error => console.error(error))
     })
     app.put('/activities', (req,res)=>{
         activities.findOneAndUpdate(
             { name: 'BigPug' },
             {
                $set: {
                    name: req.body.name,
                    activity: req.body.activity
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
     app.delete('/activities', (req, res)=>{
         activities.deleteOne(
             { name: req.body.name }
         )
         .then(result => {
             if (result.deletedCount === 0){
                 return res.json('No more activity - the evil cat is gone!')
             }
             res.json('Removed Kitty Activity')
         })
         .catch(error => console.error(error))
     })
     app.listen(3000,function(){
        console.log('listening on 3000')
     });
 })
 .catch(error => console.error(error))