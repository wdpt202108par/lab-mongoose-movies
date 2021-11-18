const { Schema, model } = require('mongoose');
 
const celebritySchema = new Schema(
  {
    name: String,
    occupation: String,
    catchPhrase: String,
  },
  {
    timestamps: true
  }
);
 const Celebrity = model("Celebrity", schema)

 module.exports = Celebrity;

// module.exports = model('Celebrity', celebritySchema);
