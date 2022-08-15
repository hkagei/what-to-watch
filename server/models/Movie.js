const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedMovis` array in User.js
const movieSchema = new Schema({
  movieId:
  {
    type: String,
  },
  original_title: {
    type: String,
    required: true,
  },
  // saved movie id from movies
  overview: {
    type: String,
    required: true,
  },
  poster_path: {
    type: String,
  },
  release_date: {
    type: String,
  },
  vote_average: {
    type: String,
    required: true,
  },
});

module.exports = movieSchema;
