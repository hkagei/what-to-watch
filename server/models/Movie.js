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
  art: {
    type: String,
    required: true,
  },  
  summary: {
    type: String,
    required: true,
  },
  release_date: {
    type: String
  }
},
{
  toJson: {
    getters: true
  }
});

module.exports = movieSchema;
