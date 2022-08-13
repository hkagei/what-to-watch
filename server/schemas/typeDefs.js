// Type definitions, or TypeDefs for short, involves literally defining every piece of data that the client can expect to work with through a query or mutation. Every GraphQL API starts with defining this data, as this type of strict type definition will give the client more clarity as to what they are asking for and what they can expect in return. Think of this as not only defining the API endpoint, but also defining the exact data and parameters that are tied to that endpoint.

// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    savedMovie: [movie]
  }

  type movie {
    # _id: ID!
    movieID: [String]
    original_title: String!
    overview: String!
    poster_path: String
    release_date: String
    vote_average: String!
  }

  input movieInput {
    movieID: [String]
    original_title: String!
    overview: String!
    poster_path: String
    release_date: String
    vote_average: String!
  }

  type Query {
    me: User
  }
  
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveMovie(movieData: movieInput!): Auth
    removeBook(movieID: ID!): Auth
  }

  type Auth {
    token: ID!
    user: User
  }

`;

// export the typeDefs
module.exports = typeDefs;
