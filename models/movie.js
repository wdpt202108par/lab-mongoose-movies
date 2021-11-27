const mongoose = require('mongoose');
const {Schema} = mongoose;

require('../models/celebrity.js');

const movieSchema = new Schema({
  title: String,
  genre: String,
  plot: String,
  cast: [ { type : Schema.Types.ObjectId, ref: 'Celebrity' } ]
});

// { type: String,
//  required: [true, 'title field required']
// }
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;