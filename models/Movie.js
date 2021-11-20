const { Schema, model, Mongoose } = require('mongoose');


const movieSchema = new Schema(
    {
    title: String,
    genre: String,
    plot: String,
    cast:[ { type : Schema.Types.ObjectId, ref: 'Celebrity'}],
    },
    {
        timestamps: true  // created time, updated time 
    }
);

const Movie = Mongoose.model("Movie", movieSchema);
module.exports = Movie;