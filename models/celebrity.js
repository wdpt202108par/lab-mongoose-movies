const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: String,
    occupation: String,
    catchPhrase: String
}, {
    timestamps: true
})

const Celebrity = mongoose.model('Celebrity', schema)

module.exports = Celebrity