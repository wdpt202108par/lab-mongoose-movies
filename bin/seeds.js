const mongoose = require('mongoose')
const Celebrity = require('../models/celebrity.js')

mongoose.connect(`mongodb://localhost/${process.env.DBNAME}`, {
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

const celebrities = [
    {
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

// celebrity data insertion to mongodb

Celebrity.create(celebrities)
    .then((createdCelebrities) => {
        console.log(`${createdCelebrities.length} celebrities have been created`)
        mongoose.connection.close()
    })
    .catch(err => {
        console.log(`Error while celebrity data insertion. ERROR : ${err}`)
    })

// movies 