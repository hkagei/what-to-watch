const { Schema } = require('mongoose');

// subdocument schema, schema for User's "savedMovies" array
const movieSchema = new Schema({
  id: {
    type: String,
    unique: true
  },
  title: 
  {
    type: String,
    required: true
  },
  poster_path: {
    type: String,
    required: true,
  },  
  overview: {
    type: String,
    required: true,
  },
  release_date: {
    type: String
  },
  popularity: {
    type: Number
  }
},
{
  toJson: {
    getters: true
  }
});

module.exports = movieSchema;
