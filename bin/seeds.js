const mongoose = require('mongoose')

const Celebrity = require('../models/celebrity.js')
const Movie = require('../models/movie.js')

mongoose.connect(`mongodb://localhost/lab-mongoose-movies`, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Mongodb connected!')
    })
    .catch(err => {
        console.log(`Error while db connection. ERROR : ${err}`)
    })


// celebrities

const celebrities = [{
        name: "Donald Trump",
        occupation: "45 th President of USA",
        catchPhrase: "Make America great again!"
    },
    {
        name: "Barack Obama",
        occupation: "44 th President of USA",
        catchPhrase: "Change we need!"
    },
    {
        name: "George W. Bush",
        occupation: "43 th President of USA",
        catchPhrase: "I think we agree, the past is over."
    }
]

// movies 

const movies = [{
        title: "Casino",
        genre: "mafia",
        plot: "Robert Deniro is commissioned to managing a casino in Las Vegas.",
        cast: [] // cast will be filled randomly after insertion of celebrities
    },
    {
        title: "E.T.",
        genre: "sci-fi",
        plot: "An alien lands on earth and find a human friend.",
        cast: []
    }
]

// celebrity and movie data insertion to mongodb

Celebrity.create(celebrities)
    .then((createdCelebrities) => {

        console.log(`${createdCelebrities.length} celebrities have been created`)

        // select a celebrity among those inserted in the db
        const randomCelebrityIdx = Math.floor(Math.random() * movies.length);

        // insert the randomly chosen celebrity id in the cast field of a movie
        movies.map(movie => movie.cast.push(createdCelebrities[randomCelebrityIdx]._id))

        Movie.create(movies)
            .then(createdMovies => {
                console.log(`${createdMovies.length} movies have been created`)
                mongoose.connection.close()
            })
            .catch(err => {
                console.log(`Error while movie data insertion. ERROR : ${err}`)
            })

        //mongoose.connection.close()
    })
    .catch(err => {
        console.log(`Error while celebrity data insertion. ERROR : ${err}`)
    })