const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedMovis` array in User.js
const movieSchema = new Schema({
  movieId:
  {
    type: Number,
  },
  title: {
    type: String,
    required: true,
  },
  // saved movie id from movies
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  releaseDate: {
    type: String,
  },
  rating: {
    type: Number,
    required: true,
  },
});

module.exports = movieSchema;