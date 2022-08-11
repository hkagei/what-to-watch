// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedMovies: [Movie]
  }

  type Movie {
    # _id: ID!
    authors: [String]
    description: String!
    movieId: String!
    image: String
    link: String
    title: String!
  }

  input MovieInput {
    authors: [String]
    description: String!
    movieId: String!
    image: String
    link: String
    title: String!
  }

  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(movieData: MovieInput!): Auth
    removeMovie(movieId: ID!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }

`;

// export the typeDefs
module.exports = typeDefs;
