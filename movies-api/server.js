// const http = require('http') 
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 8000

app.use(cors())

const movies = {
    'la la land': {
        'releaseYear': 2016,
        'genre': 'Musical/Romance',
        'runtime': '2h 8m'
    },
    'arrival': {
        'releaseYear': 2016,
        'genre': 'Sci-fi/Thriller',
        'runtime': '1h 56m'
    },
    'unknown': {
        'releaseYear': 0000,
        'genre': 'unknown',
        'runtime': 'unknown'
    }
}

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('/api', (req, res) => {
    res.json(movies)
})

app.get('/api/:title', (req, res) => {
    const movieTitle = req.params.title.toLowerCase()
    if (movies[movieTitle]) {
        console.log(movies[movieTitle])
        res.json(movies[movieTitle])
    } else {
        console.log('unknown')
        res.json(movies['unknown'])
    }
})

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on ${PORT}. Let's GOOOO!!!`)
})